import React, { useEffect, useState } from 'react'
import Map from '../Map/Map';
import './Hikes.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo } from '../../graphql/mutations'
import { listTodos } from '../../graphql/queries'
import Amplify, { API, graphqlOperation } from 'aws-amplify'


/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hikes() {
  const dispatch = useDispatch();
  const hikes = useSelector(store => store.hikesListReducer);
  console.log('hikes', hikes);
  useEffect(() => {
    dispatch({
      type: 'FETCH_HIKES_LIST'
    });
  }, []);

  const user = useSelector((store) => store.user);
  const [todos, setTodos] = useState([])
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
      <h1>All Hikes</h1>

      <AmplifySignOut />

      {/* <Map
        latLng = {latLng.latLng}
      /> */}

      {/* TODO MAP */}
      {
        hikes.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
        <p style={styles.todoName}>{todo.name}</p>
        <p style={styles.todoDescription}>{todo.description}</p>
        </div>
        ))
      }
      
    </div>
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


export default withAuthenticator(Hikes)

