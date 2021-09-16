/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import awsExports from "./aws-exports";
import Nav from './components/Nav/Nav';
import './App.css';

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

/**
 * Components
 */
import LandingPage from './components/LandingPage/LandingPage'
import Hikes from './components/Hikes/Hikes'
import Hike from './components/Hike/Hike'
import AddHike from './components/AddHike/AddHike'
import AboutPage from './components/AboutPage/AboutPage'
import Admin from './components/Admin/Admin'
import HikesMap from './components/HikesMap/HikesMap'
import Map from './components/Map/Map'
import EditHike from './components/EditHike/EditHike'
import YourAccount from './components/YourAccount/YourAccount'


Amplify.configure(awsExports);

function App() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    fetuserLocation()
  }, [])

  /**
   * Fetch User Location
   * fetches user location via the navigator module
   * and sets user location to local state
   */
   async function fetuserLocation() {
    try {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <Router>
      <div className="main">
        <Nav />
        <div className="container-fluid">
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/hike/:id"
            >
              <Hike
                latLng = {[lat, lng]}
              />
            </Route>
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/hikes"
            >
              <Hikes/>
            </Route>

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/hikes-map"
            >
              <HikesMap/>
            </Route>

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/add"
            >
              <AddHike 
                latLng = {[lat, lng]}
              />
            </Route>

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/admin"
            >
              <Admin  />
            </Route>

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/map"
            >
              <Map  />
            </Route>

            <Route
              exact
              path="/home"
            >
              <LandingPage /> 
            </Route>

            <Route
              exact
              path="/edit-hike/:id"
            >
              <EditHike /> 
            </Route>

            <Route
              exact
              path="/account"
            >
              <YourAccount /> 
            </Route>


            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App