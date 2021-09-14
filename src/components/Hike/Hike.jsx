import React, { useEffect, useState } from 'react'
import Map from '../Map/Map';
import './Hike.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom';
import { getHikes } from '../../graphql/queries'
import Amplify, { API, graphqlOperation } from 'aws-amplify'

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [hike, setHike] = useState([])

  const { id } = useParams();
  console.log('our id is', id);


  async function fetchTodos() {
    try {
      const hikeCall = await API.graphql(graphqlOperation(getHikes, { id: id }))
      console.log('hikeCall', hikeCall);
      const hike = hikeCall.data.getHikes
      console.log('hike', hike);
      setHike(hikeCall.data.getHikes.mapdata)
      // setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="hike-map-container">
      <h1>Hike</h1>
      <Map 
        mapdata = {hike}
      />
    </div>
  );
}

export default withAuthenticator(Hike)

