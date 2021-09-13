import React, { useEffect } from 'react'
import './Admin.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- hike
 */
function Admin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const hikes = useSelector(store => store.hikesListReducer);
  useEffect(() => {
    dispatch({
      type: 'FETCH_HIKES_LIST'
    });
  }, []);

  const user = useSelector((store) => store.user);
  console.log('user', user);
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

  async function deleteHike(id) {
    try {
      console.log('id is ', id);
      await API.graphql({ query: mutations.deleteHikes, variables: {input: {id: id}}});
      dispatch({
        type: 'FETCH_HIKES_LIST'
      });
    } catch (err) { console.log('error deleting hike', err) }
  }
    
  return (
    <div className="hike-list">
      <h1>Discover Hike</h1>
      {/* TODO MAP */}
      <table className="table table-dark table-stripped">
        <thead>
          <tr>
            <th>Name of hike</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody> 
        {
          hikes.map((hike, index) => (
          <tr key={hike.id ? hike.id : index} >
            <td>{hike.name}</td>
            <td>{hike.description}</td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary" onClick={() => deleteHike(hike.id)}>
                EDIT
              </button>
            </td>
            <td>
            <button className="btn btn-danger" onClick={() => deleteHike(hike.id)}>
                DELETE
              </button>
            </td>
          </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default withAuthenticator(Admin)

