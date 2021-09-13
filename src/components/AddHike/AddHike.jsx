import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  MapConsumer
} from "react-leaflet";
import { useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../constants";
import { createTodo } from '../../graphql/mutations'
import { createHikes } from '../../graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify'

let array = [{name: 'dane'},'asdfasdfa', 'adsfasdfasf', 'asdfasdfasf']
console.log('stringit',JSON.stringify(array));
const initialState = { name: '', description: '', mapdata: JSON.stringify(array)}

export default function AddHike(latLng) {

  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const user = useSelector((store) => store.user);
  const [hikes, setHikes] = useState([])
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  console.log('our default latLng', latLng);
  const [markers, setMarkers] = useState([[51.505, -0.09]]);

  function setInput(key, value) {
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
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setHikes([...hikes, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createHikes, {input: todo}))
      history.push("/hikes");
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }


  return (
    <>
    <MapContainer
      center={[46.392410, -94.636230]}
      zoom={6}
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
      <input
        onChange={event => setInput('description', event.target.value)}
        className="form-control"
        value={formState.description}
        placeholder="Description"
      />
      <button className="btn btn-primary" onClick={addTodo}>Create Hike</button>
    </>
  );
}
