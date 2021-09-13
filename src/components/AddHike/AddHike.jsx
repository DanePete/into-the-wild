import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Marker,
  MapConsumer
} from "react-leaflet";
import { useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../constants";
import { createHikes } from '../../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify'
const initialState = { name: '', description: '', mapdata: [], image: ''}

export default function AddHike(latLng) {
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [items, setItems] = useState([]);
  const history = useHistory();
  const [formState, setFormState] = useState(initialState)
  const user = useSelector((store) => store.user);
  const [hikes, setHikes] = useState([])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }


  function LocationMarker() {
    let tempArray = [];
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        console.log('e.latng', e.latlng);
        tempArray.push(e.latlng);
        console.log('temp', tempArray);
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map);
        setItems([...items, {lat,lng}])
        setInput('mapdata', [...formState.mapdata, {lat, lng}]);
      }
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  console.log('formstate', formState.mapdata);
  
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
      const storageResult = await Storage.put(file.name, file, {
        level: 'public',
        type: 'image/png'
      })
      // Insert predictions code here later
      setUploaded(true)
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
      <LocationMarker />
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
