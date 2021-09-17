import React, { useEffect, useState } from 'react'
import './Hikes.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import PageHeader from '../PageHeader/PageHeader';

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
    
    <div className="container-fluid">
         <PageHeader 
            title = "Hikes"
            description = "INTO THE WILD"
         />
      <div className="container hike-list">
      {/* <section className="hero py-6 py-lg-7 text-white dark-overlay">
        <div className="display: block; overflow: hidden; position: absolute; inset: 0px; box-sizing: border-box; margin: 0px;">
          
        </div>
      </section> */}
      <div className="hike-btn">
        <button
            type="button"
            className="btn btn-primary btn_asLink"
            onClick={() => {
              history.push('/add');
            }}
          >
            Add A Hike
          </button>
      </div>
      
      {/* TODO MAP */}
      <div className="container">
        <div className="mb-5 row">
          {
            hikes.map((todo, index) => (
              <div className="mb-4 hover-animate col-sm-6 col-lg-4">
                <div key={todo.id ? todo.id : index} className="border-0 h-100 shadow card">
                  <AmplifyS3Image imgKey={todo.image} 
                    onClick={() => hikeClick(todo.id)}
                  />
                  <div className="card-body">
                    <h6 className="card-title hike-title"
                      onClick={() => hikeClick(todo.id)}
                    >
                      {todo.name}
                    </h6>
                    <p className="flex-grow-1 mb-0 text-muted text-sm">{todo.description}</p>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </div>
    </div>
  );
}

export default withAuthenticator(Hikes)

