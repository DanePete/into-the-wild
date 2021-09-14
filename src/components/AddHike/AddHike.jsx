import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './AddHike.css'
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Marker
} from "react-leaflet";
import { useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../constants";
import { createHikes } from '../../graphql/mutations';
import { API, graphqlOperation, Storage, progressCallBack } from 'aws-amplify'
const initialState = { name: '', description: '', mapdata: '', image: ''}


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

  /**
   * Location Marker
   * Allows users to add pins to the map
   */
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map)
        setItems([...items, {lat,lng}])
        setInput('mapdata', JSON.stringify(items))
      }
    })
  
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
      setHikes([...hikes, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createHikes, {input: todo}))
      await Storage.put(file.name, file, {
        level: 'public',
        type: 'image/png'
        }, {
        progressCallBack(progress) {
          console.log(progress);
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
      
      // Insert predictions code here later
      setUploaded(true)
      history.push("/hikes");
    } else {
      alert('yo dog you suck')
    }
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div className="add-hike-global-container container card">
      <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Well done!</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>

      <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
      
      <div class="alert alert-success alert-dismissible">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
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
      
      <textarea
        onChange={event => setInput('description', event.target.value)}
        className="form-control"
        value={formState.description}
        placeholder="Description"
      />

      <input
        type="file"
        className="form-control"
        onChange={event => setInput('image', event.target.files[0].name, setFile(event.target.files[0]))}
      />
    </div>
    
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
    <hr></hr>
    <button className="btn btn-primary" onClick={addHike}>Create Hike</button>
    </div>
  );
}
