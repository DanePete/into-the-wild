import React, { useEffect, useState } from 'react'
import './Hikes.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hikes() {
  const history = useHistory();
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
    <div className="hike-list">
      <h1>Discover Hike</h1>

      <button
          type="button"
          className="btn btn-primary btn_asLink"
          onClick={() => {
            history.push('/add');
          }}
        >
          Add Your Own Hike
        </button>

      {/* TODO MAP */}
      {
        hikes.map((todo, index) => (
        <div key={todo.id ? todo.id : index} className="card hike-card">
          <p>{todo.name}</p>
          <p>{todo.description}</p>
        </div>
        ))
      }
      
    </div>
  );
}



export default withAuthenticator(Hikes)

