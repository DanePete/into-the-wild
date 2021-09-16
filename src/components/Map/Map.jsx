import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
function MapConponent() {
  const position = [51.505, -0.09];
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */
  return (
    <Map center={position} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Routing /> */}
    </Map>
  );
}

export default MapConponent;
