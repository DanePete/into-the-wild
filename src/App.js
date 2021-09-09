/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { useDispatch } from 'react-redux';
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


Amplify.configure(awsExports);

let array = [{name: 'dane'},'asdfasdfa', 'adsfasdfasf', 'asdfasdfasf']
console.log('stringit',JSON.stringify(array));

  let  data = [
      {
        id: 1,
        name: "a",
        age: 29,
        qualification: "B.Com",
        rating: 3,
        gender: "male",
        city: "Kerala"
      },
      {
        id: 2,
        name: "b",
        age: 35,
        qualification: "B.Sc",
        rating: 5,
        gender: "female",
        city: "Mumbai"
      },
      {
        id: 3,
        name: "c",
        age: 42,
        qualification: "B.E",
        rating: 3,
        gender: "female",
        city: "Bangalore"
      }
    ]

    console.log('string it',data);

const initialState = { name: '', description: '', mapdata: JSON.stringify(array)}

function App() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    fetchTodos()
    fetuserLocation()
  }, [])


  /**
   * Fetch User Location
   * fetches user location via the navigator module
   * and sets user location to local state
   */
   const fetuserLocation = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }



  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      console.log('todos', todos);
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <Router>
      <div className="main">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/hike"
          >
            <Hike />
          </Route> */}

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/hike"
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

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute> */}

          {/* <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}

          {/* <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route> */}

          {/* <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route> */}

          <Route
            exact
            path="/home"
          >
            <LandingPage /> 
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
    // <Router>
    //   <div className="main">
    //     <Switch>
    //       {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
    //       <Redirect exact from="/" to="/home" />
    //       {
    //         <Route>
    //           <Hike/>
    //         </Route>
    //                     <Route>
    //                     <Map />
    //                   </Route>


    //         // <Route
    //         // exact
    //         // path="/home"
    //         // >
    //         // {user.id ?
    //         //   // If the user is already logged in, 
    //         //   // redirect them to the /user page
    //         //   <Redirect to="/user" />
    //         //   :
    //         //   // Otherwise, show the Landing page
    //         //   <LandingPage />
    //         // }
    //         // </Route>

    //       }
    //     </Switch>
    //   </div>
    // </Router>


  // <div style={styles.container}>
  //     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  //       <TileLayer
  //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //       <Marker position={[51.505, -0.09]}>
  //         <Popup>
  //         A pretty CSS3 popup. <br /> Easily customizable.
  //         </Popup>
  //       </Marker>
  //     </MapContainer>
  //     <h2>Amplify Todos</h2>
  //     <input
  //       onChange={event => setInput('name', event.target.value)}
  //       style={styles.input}
  //       value={formState.name}
  //       placeholder="Name"
  //     />
  //     <input
  //       onChange={event => setInput('description', event.target.value)}
  //       style={styles.input}
  //       value={formState.description}
  //       placeholder="Description"
  //     />
  //     <button style={styles.button} onClick={addTodo}>Create Todo</button>
      
  //     {
  //       todos.map((todo, index) => (
  //         <div key={todo.id ? todo.id : index} style={styles.todo}>
  //           <p style={styles.todoName}>{todo.name}</p>
  //           <p style={styles.todoDescription}>{todo.description}</p>
  //         </div>
  //       ))
  //     }
  //     <AmplifySignOut />
  //   </div>
  );
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App
