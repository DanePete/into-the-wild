import React, { useEffect, useState } from 'react'
import './Hike.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Map, TileLayer, Polyline} from 'react-leaflet'
import { useParams } from 'react-router-dom';
import { getHikes } from '../../graphql/queries'
import { useHistory } from 'react-router-dom';
import{ API, graphqlOperation } from 'aws-amplify'
import WeatherList from '../WeatherList/WeatherList';
// import { Polyline } from 'leaflet';

const position = [51.505, -0.09]
/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hike() {
  const history = useHistory();
  const [hike, setHike] = useState()
  const [hikeDetail, setHikeDetail] = useState();
  const [isLoading, setLoading] = useState(true);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [weather, setWeeather] = useState();

  const [polylines, setPolylines] = useState();

  const { id } = useParams();
  let convertObjectArray = [];
  
  async function fetchHike() {
    try {
      const hikeCall = await API.graphql(graphqlOperation(getHikes, { id: id }))
      convertObjectsToArrays(JSON.parse(hikeCall.data.getHikes.mapdata).latlngs);
      setHike(JSON.parse(hikeCall.data.getHikes.mapdata).latlngs)
      setHikeDetail(hikeCall.data.getHikes);
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${hikeCall.data.getHikes.city}&cnt=5&appid=11ec4ec7b29812e54c0f261032fbce7b&units=imperial`)
      .then((response) => response.json())
      .then((result) => setWeeather(result), setWeatherIsLoading(false));
      setLoading(false);
    } catch (err) { console.log('error fetching todos') }
  }

  function convertObjectsToArrays(hikeData) {
    for (let index = 0; index < hikeData.length; index++) {
      convertObjectArray.push([hikeData[index].lat, hikeData[index].lng])
      setPolylines(convertObjectArray);
    }
  }

  useEffect(() => {
    fetchHike();
  }, []);

  if (isLoading && weatherIsLoading) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <div className="hike-map-container">

        <button onClick={history.goBack}>
          Back
        </button>
        <Map center={hike[0]} zoom={16} scrollWheelZoom={false}>
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

          <Polyline 
            positions={polylines}
          />

        </Map>
        <section className="py-5 bg-gray-100 shadow">
          <div className="container">
            <h1>{hikeDetail.name}</h1>
            <p className="lead mb-5">{hikeDetail.description}</p>
            <h5>Hike Detail</h5>
            <ul className="nav-pills-custom nav">
              <li className="nav-item"><a href="#" className="active nav-link">Difficulty: <span className="difficulty-num">{hikeDetail.difficulty}</span></a></li>
              <li className="nav-item"><a href="#" className="nav-link">city: {hikeDetail.city}</a></li>
              <li className="nav-item"><a href="#" className="nav-link">State: {hikeDetail.state}</a></li>
            </ul>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <h1>Weather near this location</h1>
            <h5>Forecast for the next 5 days</h5>
            {weather && <WeatherList weathers={weather.list} />}
          </div>
        </section>
    </div>
  );
}

export default withAuthenticator(Hike)

