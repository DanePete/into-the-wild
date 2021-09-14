import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map(hike) {
  console.log('latng map', hike);
  let markers = hike.mapdata.mapdata;
  const position = [51.505, -0.09]

  /**
   * Map Component
   * Utilizes react-leaflet, Leaflet
   * Pulls precipitation and cloud data from Open Weather Map API
   */
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
 
    {markers?.map(data => {
      console.log(data.lat);
      console.log(data.lng);
      let array = [Number(data.lat), Number(data.lng)]
      console.log('array', array);
      return (
        <Marker position={array}>
        <Popup>
        FOUND YOU! 
        </Popup>
        </Marker>
      );
    })}
  </MapContainer>
  );
}

export default Map;
