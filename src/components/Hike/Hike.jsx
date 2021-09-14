import React, { useEffect, useState } from 'react'
import './Hike.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useParams } from 'react-router-dom';
import { getHikes } from '../../graphql/queries'
import{ API, graphqlOperation } from 'aws-amplify'
const position = [51.505, -0.09]
/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike() {
  const [hike, setHike] = useState()
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  
  async function fetchHike() {
    try {
      const hikeCall = await API.graphql(graphqlOperation(getHikes, { id: id }))
      setHike(JSON.parse(hikeCall.data.getHikes.mapdata))
      setLoading(false);
    } catch (err) { console.log('error fetching todos') }
  }

  useEffect(() => {
    fetchHike();
  }, []);

  if (isLoading) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <div className="hike-map-container container">
      <h1>Hike</h1>
        <MapContainer center={hike[0]} zoom={16} scrollWheelZoom={false}>
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
          {hike?.map(data => {
            let array = [Number(data.lat), Number(data.lng)]
            return (
              <Marker position={array}>
                <Popup>
                FOUND YOU! 
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
    </div>
  );
}

export default withAuthenticator(Hike)

