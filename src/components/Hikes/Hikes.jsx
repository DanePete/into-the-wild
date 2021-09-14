import React, { useEffect, useState } from 'react'
import './Hikes.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AmplifyS3Image } from '@aws-amplify/ui-react';

/**
 * Hike Component
 * App.js retrieves user location and passes the lat/long via props to the map component
 * Move to local state -- TODO
 */
function Hikes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const hikes = useSelector(store => store.hikesListReducer);
  // console.log('hike parse', JSON.parse(hikes.mapdata));
  useEffect(() => {
    dispatch({
      type: 'FETCH_HIKES_LIST'
    });
  }, []);
  

  const user = useSelector((store) => store.user);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser()
    } catch (err) {
      // props.history.push(route)
    }
  }

  const hikeClick = (id) => {
    history.push(`/hike/${id}`);
  }

  useEffect(() => {
    checkAuthState()
  })

  return (
    <div className="container hike-list">
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

        <button
          type="button"
          className="btn btn-primary btn_asLink"
          onClick={() => {
            history.push('/my-hikes');
          }}
        >
         My Hikes
        </button>

      {/* TODO MAP */}
      <div className="mt-4">
        <div className="row">
          {
            hikes.map((todo, index) => (
              <div className="col-auto mb-3">
                <div key={todo.id ? todo.id : index} className="card hike-card">
                  <AmplifyS3Image imgKey={todo.image} />
                  <div className="card-body">
                    <h5 className="card-title">{todo.name}</h5>
                    <p className="card-text">{todo.description}</p>
                    <button
                    type="button"
                    className="btn btn-primary btn_asLink"
                    onClick={() => hikeClick(todo.id)}
                    >
                    View Hikes
                    </button>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(Hikes)

