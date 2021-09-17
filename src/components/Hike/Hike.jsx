import React, { useEffect, useState } from 'react'
import './Hike.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Map, TileLayer, Polyline, Marker, withLeaflet, Popup, Tooltip} from 'react-leaflet'
import { useParams } from 'react-router-dom';
import { getHikes } from '../../graphql/queries'
import { useHistory } from 'react-router-dom';
import{ API, graphqlOperation } from 'aws-amplify'
import WeatherList from '../WeatherList/WeatherList';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L, { map } from 'leaflet';
import MeasureControlDefault from 'react-leaflet-measure';
import FullscreenControl from 'react-leaflet-fullscreen';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import 'react-leaflet-fullscreen/dist/styles.css'

import img from '../../assets/output-onlinegiftools.gif'

import 'leaflet/dist/leaflet.css';
const position = [51.505, -0.09]
const MeasureControl = withLeaflet(MeasureControlDefault);
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
  const [totalDistance, setTotalDistance] = useState();

  const [polylines, setPolylines] = useState();

  const { id } = useParams();
  let convertObjectArray = [];

  // LEAFLET MARKER BUG FIX LEAFLET BUG - issue in the version of leaflet currently used not able to access assets
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  // LEAFLET MARKER BUG FIX LEAFLET BUG - END
  
  const measureOptions = {
    position: 'topright',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'M',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'acres',
    activeColor: '#db4a29',
    completedColor: '#9b2d14'
  };
      
  
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
    let previousCoords;
    for (let index = 0; index < hikeData.length; index++) {
      if(previousCoords) {
        let distances = distance(previousCoords, [hikeData[index].lat, hikeData[index].lng], 'M')
        console.log('distance', distances);
        setTotalDistance(distances)
        convertObjectArray.push([hikeData[index].lat, hikeData[index].lng, distances])
      } else {
        previousCoords = [hikeData[index].lat, hikeData[index].lng]
      }
      
      setPolylines(convertObjectArray);
    }
  }

  function distance(array1, array2, unit) {
    if((array1[0] == array2[0]) && (array1[1] == array2[1])) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * array1[0]/180;
      var radlat2 = Math.PI * array2[0]/180;
      var theta = array1[1]-array2[1];
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist.toFixed(2);
    }
  }

  useEffect(() => {
    fetchHike();
  }, []);

  if (isLoading && weatherIsLoading) {
    return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  }

  let options = {
    position: 'topleft',            // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
    unit: 'metres',                 // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
    clearMeasurementsOnStop: true,  // Clear all the measurements when the control is unselected
    showBearings: false,            // Whether bearings are displayed within the tooltips
    bearingTextIn: 'In',             // language dependend label for inbound bearings
    bearingTextOut: 'Out',          // language dependend label for outbound bearings
    tooltipTextFinish: 'Click to <b>finish line</b><br>',
    tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
    tooltipTextMove: 'Click and drag to <b>move point</b><br>',
    tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
    tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
                                    // language dependend labels for point's tooltips
    measureControlTitleOn: 'Turn on PolylineMeasure',   // Title for the control going to be switched on
    measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the control going to be switched off
    measureControlLabel: '&#8614;', // Label of the Measure control (maybe a unicode symbol)
    measureControlClasses: [],      // Classes to apply to the Measure control
    showClearControl: false,        // Show a control to clear all the measurements
    clearControlTitle: 'Clear Measurements', // Title text to show on the clear measurements control button
    clearControlLabel: '&times',    // Label of the Clear control (maybe a unicode symbol)
    clearControlClasses: [],        // Classes to apply to clear control button
    showUnitControl: false,         // Show a control to change the units of measurements
    distanceShowSameUnit: false,    // Keep same unit in tooltips in case of distance less then 1 km/mi/nm
    unitControlTitle: {             // Title texts to show on the Unit Control button
        text: 'Change Units',
        metres: 'metres',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
    },
    unitControlLabel: {             // Unit symbols to show in the Unit Control button and measurement labels
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'mi',
        nauticalmiles: 'nm'
    },
    tempLine: {                     // Styling settings for the temporary dashed line
        color: '#00f',              // Dashed line color
        weight: 2                   // Dashed line weight
    },          
    fixedLine: {                    // Styling for the solid line
        color: '#006',              // Solid line color
        weight: 2                   // Solid line weight
    },
    startCircle: {                  // Style settings for circle marker indicating the starting point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#0f0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    intermedCircle: {               // Style settings for all circle markers between startCircle and endCircle
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#ff0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    currentCircle: {                // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f0f',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    endCircle: {                    // Style settings for circle marker indicating the last point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f00',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
};

    
  // polylineMeasure.seed([51.505, -0.09])

  return (
    <div className="hike-map-container">
        {/* <button onClick={history.goBack}>
          Back
        </button> */}
        <Map bounds={polylines} center={hike[0]} zoom={16} scrollWheelZoom={false}>
          <FullscreenControl position="topright" />
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

          {polylines?.map((data, index) => {
            console.log('data', data);
            return (
            <Marker 
              position={data}
            >
            <Popup className="map-popup-forged">
              <Map center={data}  zoom={16} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                  url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
                />
                <TileLayer
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=11ec4ec7b29812e54c0f261032fbce7b`}
                />
                <Marker 
                  position={data}
                ></Marker>
              </Map>

              <span>Lat: <i>{data}</i></span>
              <br />
              <strong>Distance From Previous Marker: { data[2]} Miles</strong>
            </Popup>
            <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                       <span>{index + 1}</span>
                </Tooltip>
          </Marker>
          );
          })}

          <MeasureControl {...measureOptions}/>
        </Map>
        <section className="py-5 bg-gray-100 shadow">
          <div className="container">
            <h1>{hikeDetail.name}</h1>
            <p className="lead mb-5">{hikeDetail.description}</p>
            <div Class="hikeimagepills">
              <div className="amp-image">
                <AmplifyS3Image imgKey={hikeDetail.image} />
              </div>
              <ul className="nav-pills-custom nav">
                <li className="nav-item"><a href="#" className="btn btn-primary">Difficulty: <span className="difficulty-num">{hikeDetail.difficulty}</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link">Distance: {totalDistance} Miles</a></li>
                <img className="hike-dude" src={img} />
                <li className="nav-item"><a href="#" className="nav-link">Nearest city: {hikeDetail.city}</a></li>
                <li className="nav-item"><a href="#" className="nav-link">State: {hikeDetail.state}</a></li>
                <button type="button" className=" btn btn-primary nav-item" data-toggle="modal" data-target="#exampleModal">
                  View Weather
                </button>         
              </ul>  
            </div>
          </div>
        </section>

    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <section className="py-5">
              <div className="container">
                <h1>Weather near this location</h1>
                <h5>Forecast for the next 5 days</h5>
                {weather && <WeatherList weathers={weather.list} />}
              </div>
            </section>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default withAuthenticator(Hike)

