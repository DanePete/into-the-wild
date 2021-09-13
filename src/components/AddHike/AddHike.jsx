import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import {
  MapContainer,
  TileLayer,
  MapConsumer
} from "react-leaflet";
import { useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../constants";
import { createHikes } from '../../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';

// let array = [{name: 'dane'},'asdfasdfa', 'adsfasdfasf', 'asdfasdfasf']
// console.log('stringit',JSON.stringify(array));
const initialState = { name: '', description: '', mapdata: '', image: ''}

export default function AddHike(latLng) {

  console.log('latLng', latLng);

  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);

  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const user = useSelector((store) => store.user);
  const [hikes, setHikes] = useState([])
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  console.log('our default latLng', latLng);
  const [markers, setMarkers] = useState([[51.505, -0.09]]);

  function setInput(key, value) {
    console.log('key', key);
    console.log('value', value);
    setFormState({ ...formState, [key]: value })
  }

  // const addMarker = (e) => {
  //   // const {markers} = this.state
  //   console.log('clicked!');
  //   console.log('lat lng drop', e.latLng);
  //   // markers.push(e.latlng)
  //   setMarkers(...markers, e.latlng);
  //   // this.setState({markers})
  // }

  // console.log('markers array', markers);

  /**
   * Add HIKE
   */
   async function addTodo() {
    try {
      if (!formState.name || !formState.description || !formState.mapdata) return
      const todo = { ...formState }
      setHikes([...hikes, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createHikes, {input: todo}))
      console.log('file is ', file);
      const storageResult = await Storage.put(file.name, file, {
        level: 'public',
        type: 'image/png'
      })
      // Insert predictions code here later
      setUploaded(true)
      console.log('storage results',storageResult);
      history.push("/hikes");
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }


  return (
    <>
    <h1>ADD HIKE</h1>
    <MapContainer
      center={latLng.latLng}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            console.log('lat, lng', lat, lng);
            L.marker([lat, lng], { icon }).addTo(map);
            setInput('mapdata', JSON.stringify(e.latlng))
          });
          return null;
        }}
      </MapConsumer>
    </MapContainer>

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
    {/* <AmplifyS3ImagePicker /> */}
    <input
      type="file"
      className="form-control"
      onChange={event => setInput('image', event.target.files[0].name, setFile(event.target.files[0]))}
    />

    <button className="btn btn-primary" onClick={addTodo}>Create Hike</button>
    </>
  );
}
