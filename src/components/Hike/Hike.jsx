import React, { useEffect, useState } from 'react'
import Map from '../Map/Map';
import './Hike.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike() {
  const user = useSelector((store) => store.user);
  const hike = useSelector(store => store.hikeReducer);
  // console.log('hike', hike.mapdata);
  // console.log('hike parse', JSON.parse(hike.mapdata));
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser()
    } catch (err) {
      // props.history.push(route)
    }
  }

  useEffect(() => {
    checkAuthState()
  })

  return (
    <div className="hike-map-container">
      <h1>Hike</h1>
      <MapContainer zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
      />
      {/* <Marker position={latLng.latLng}>
        <Popup>
          FOUND YOU! 
        </Popup>
      </Marker> */}
    </MapContainer>
    </div>
  );
}

export default withAuthenticator(Hike)

