import React from 'react';
import Map from '../Map/Map';
import './Hike.css';

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike(latLng) {
  console.log('hike latlng', latLng);
  return (
    <div className="hike-map-container">
      <h1>Hike</h1>
      <Map
        latLng = {latLng.latLng}
      />
    </div>
  );
}

export default Hike;
