import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { createHikes } from '../../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditControl } from "react-leaflet-draw"

const initialState = { name: '', city: '', state: '', description: '', mapdata: '', difficulty: 0, image: ''}

export default function AddHike() {
  const [file, setFile] = useState();
  const [mapLayers, setMapLayers] = useState([]);
  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const [userLocation, setUserLocation] = useState();
  const [isLoading, setLoading] = useState(true);

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  /**
   * Add HIKE
   */
   async function addHike() {
    try {
      if (formState.name && formState.description && formState.mapdata)  {
        const todo = { ...formState }
        await API.graphql(graphqlOperation(createHikes, {input: todo}))
        await Storage.put(file.name, file, {
          level: 'public',
          type: 'image/png'
          }, {
          progressCallBack(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          },
        }
      )
      history.push("/hikes");
    } else {
      alert('yo dog you suck')
    }
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  // LEAFTLET CONTROL CALLBACKS
  const _onCreated = (e) => {
    console.log('e',e);

    const { layerType, layer } = e;
    if (layerType === "polyline") {
      
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs() },
      ]);

      setInput('mapdata', JSON.stringify({ id: _leaflet_id, latlngs: layer.getLatLngs() }));
    }
  };

  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  getPosition()
  .then((position) => {
    setUserLocation([position.coords.latitude, position.coords.longitude])
    setLoading(false)
  })
  .catch((err) => {
    console.error(err.message);
  });

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
      setInput('mapdata', JSON.stringify(
        (layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      ))
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  if (isLoading) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <div className="container-hike-form">
      <div className="add-hike-global-container container card">
        <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>

        <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
        
        <div className="alert alert-success alert-dismissible">
    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Success!</strong> Indicates a successful or positive action.
    </div>
        
      <h1>ADD HIKE</h1>
      <div className="add-hike-form-container">
        <input
          onChange={event => setInput('name', event.target.value)}
          className="form-control"
          value={formState.name}
          placeholder="Name"
        />
        
        <input
          onChange={event => setInput('city', event.target.value)}
          className="form-control"
          value={formState.city}
          placeholder="City"
        />

        <select 
          className="form-control"
          onChange={event => setInput('state', event.target.value)}
          value={formState.state}
          placeholder="state"
        >
          <option value="" selected disabled hidden>State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>				


        <select 
          className="form-control"
          onChange={event => setInput('difficulty', event.target.value)}
          value={formState.difficulty}
          placeholder="difficulty"
        >
          <option value="" selected disabled hidden>Difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>		        
      </div>

      <div className="hike-images">
        <textarea
          onChange={event => setInput('description', event.target.value)}
          className="form-control"
          value={formState.description}
          placeholder="Description"
        />


      <Editor editorState={editorState} onChange={setEditorState} />
      </div>
      <Map
        center={userLocation}
        zoom={13}
        style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
        />
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
        />
        <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
          />
        </FeatureGroup>
      </Map>

      <hr></hr>
      <button className="btn btn-primary" onClick={addHike}>Create Hike</button>
      </div>

      <div className="hike-images card">
      <input
        type="file"
        className="form-control"
        onChange={event => setInput('image', event.target.files[0].name, setFile(event.target.files[0]))}
      />
    </div>
  </div>
  );
}
