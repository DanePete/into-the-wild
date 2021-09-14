import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './EditHike.css'
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
import { getHikes } from '../../graphql/queries'
import { useParams } from 'react-router-dom';
const initialState = { name: '', city: '', description: '', mapdata: '', image: ''}


export default function EditHike(latLng) {



  const [hike, setHike] = useState()
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();




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







  async function fetchHike() {
    try {
      const hikeCall = await API.graphql(graphqlOperation(getHikes, { id: id }))
      setHike(JSON.parse(hikeCall.data.getHikes.mapdata))
      console.log('hike call', hikeCall.data.getHikes);
      setInput('name', hikeCall.data.getHikes.name)
      setInput('description', hikeCall.data.getHikes.description)
      setLoading(false);
    } catch (err) { console.log('error fetching todos') }
  }

  useEffect(() => {
    fetchHike();
  }, []);






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

        <select className="form-control">
        <option value="NA">State...</option>
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
