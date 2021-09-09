import React, { useEffect, useState } from 'react'
import Map from '../Map/Map';
import './Hike.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike(latLng) {
  const user = useSelector((store) => store.user);
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
      <AmplifySignOut />
      <Map
        latLng = {latLng.latLng}
      />s
    </div>
  );
}

export default withAuthenticator(Hike)

