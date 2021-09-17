import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './EditHike.css'
import {
  Map,
  TileLayer,
  Popup,
  Tooltip,
  Polyline,
  Marker,
  FeatureGroup,
  withLeaflet
} from "react-leaflet";
import MeasureControlDefault from 'react-leaflet-measure';
import { useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import { createHikes, updateHikes } from '../../graphql/mutations';
import { API, graphqlOperation, Storage, progressCallBack } from 'aws-amplify'
import { getHikes } from '../../graphql/queries'
import { useParams } from 'react-router-dom';
import { EditControl } from "react-leaflet-draw"
const initialState = { id: '', name: '', city: '', state: '', description: '', mapdata: '', image: ''}

export default function EditHike(latLng) {


  const [hike, setHike] = useState()
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [mapLayers, setMapLayers] = useState([]);
  const [userLocation, setUserLocation] = useState();


  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [items, setItems] = useState([]);
  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const user = useSelector((store) => store.user);
  const [hikes, setHikes] = useState([])



  const MeasureControl = withLeaflet(MeasureControlDefault);
  const [polylines, setPolylines] = useState();
  let convertObjectArray = [];


  const measureOptions = {
    position: 'topright',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'M',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'acres',
    activeColor: '#db4a29',
    completedColor: '#9b2d14'
  };

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchHike() {
    try {
      const hikeCall = await API.graphql(graphqlOperation(getHikes, { id: id }))
      convertObjectsToArrays(JSON.parse(hikeCall.data.getHikes.mapdata).latlngs);
      setHike(JSON.parse(hikeCall.data.getHikes.mapdata).latlngs)
      setFormState({ id: hikeCall.data.getHikes.id, name: hikeCall.data.getHikes.name, city: hikeCall.data.getHikes.city, state: 'MN', description: hikeCall.data.getHikes.description, mapdata: hikeCall.data.getHikes.mapdata, image: ''})
      setLoading(false);
    } catch (err) { console.log('error fetching todos') }
  }

  function convertObjectsToArrays(hikeData) {
    let previousCoords;
    for (let index = 0; index < hikeData.length; index++) {
      if(previousCoords) {
        let distances = distance(previousCoords, [hikeData[index].lat, hikeData[index].lng], 'M')
        console.log('distance', distances);
        convertObjectArray.push([hikeData[index].lat, hikeData[index].lng, distances])
      } else {
        previousCoords = [hikeData[index].lat, hikeData[index].lng]
      }
      
      setPolylines(convertObjectArray);
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

  function distance(array1, array2, unit) {
    if((array1[0] == array2[0]) && (array1[1] == array2[1])) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * array1[0]/180;
      var radlat2 = Math.PI * array2[0]/180;
      var theta = array1[1]-array2[1];
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist.toFixed(2);
    }
  }

  useEffect(() => {
    fetchHike();
  }, []);

  console.log('formstate', formState.mapdata);

    /**
   * Location Marker
   * Allows users to add pins to the map
   */
     function LocationMarker() {
      const [position, setPosition] = useState(null)
      // const map = useMapEvents({
        
      //   click(e) {
      //     const { lat, lng } = e.latlng;
      //     L.marker([lat, lng], { icon }).addTo(map)
      //     setItems([...items, {lat,lng}])
      //     setInput('mapdata', JSON.stringify(items))
      //   }
      // })
    
      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }

  /**
   * Add HIKE
   */
   async function addHike() {
    try {
      if (formState.name && formState.description && formState.mapdata)  {
      const todo = { ...formState }
      console.log('todos', todo);
      setHikes([...hikes, todo])
      await API.graphql(graphqlOperation(updateHikes, {input: todo}))
      await Storage.put(file.name, file, {
        level: 'public',
        type: 'image/png'
        }, {
        progressCallBack(progress) {
          console.log(progress);
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
      
      // Insert predictions code here later'
      setFormState(initialState)
      setUploaded(true)
      history.push("/hikes");
    } else {
      alert('yo dog you suck')
    }
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function addPhoto() {
    await Storage.put(file.name, file, {
      level: 'public',
      type: 'image/png'
      }, {
      progressCallBack(progress) {
        console.log(progress);
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    })
  }

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
        
      <h1>EDIT HIKE</h1>
      <div className="add-hike-form-container">
        <input
          onChange={event => setInput('name', event.target.value)}
          className="form-control"
          value={formState.name}
          placeholder="Name"
        />
        
        <textarea
          onChange={event => setInput('description', event.target.value)}
          className="form-control"
          value={formState.description}
          placeholder="Description"
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
          <option value="" selected disabled hidden>Choose here</option>
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

        {/* <input
          type="file"
          className="form-control"
          onChange={event => setInput('image', event.target.files[0].name, setFile(event.target.files[0]))}
        /> */}
      </div>

      <div className="hike-images">
        <input
          type="file"
          className="form-control"
          onChange={event => setInput('image', event.target.files[0].name, setFile(event.target.files[0]))}
        />
      </div>
      
      <Map
        bounds={polylines}
        center={hike[0]}
        zoom={13}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline 
            positions={polylines}
          />

        {polylines?.map((data, index) => {
            console.log('data', data);
            return (
            <Marker 
              position={data}
            >
            <Popup className="map-popup-forged">
              <Map center={data}  zoom={16} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                  url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
                />
                <TileLayer
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
                />
                <Marker 
                  position={data}
                ></Marker>
              </Map>

              <span>Lat: <i>{data}</i></span>
            </Popup>
            <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                       <span>Hike Marker: {index + 1}</span>
                       <br />
                       <span>Distance From Previous Point: { data[2]} Miles</span>
                </Tooltip>
          </Marker>
          );
          })}

        <MeasureControl {...measureOptions}/>
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
      <button className="btn btn-primary" onClick={addHike}>Save Edits</button>
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
