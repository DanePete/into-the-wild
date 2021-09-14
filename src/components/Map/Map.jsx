import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Routing from '../../RoutineMachine';
import "leaflet/dist/leaflet.css";
function Map() {
  const position = [51.505, -0.09];
  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */
  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing />
    </MapContainer>
  );
}

export default Map;
