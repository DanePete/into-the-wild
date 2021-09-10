import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';

function Nav() {
  const history = useHistory();
  // const user = useSelector((store) => store.user);
  const [user, setUser] = useState({}) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      setUser(userInfo)
    } catch (err) { 
      console.log('error: ', err) 
      history.push("/login");
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  console.log('user id', user);

  async function handleLogout() {
    await Auth.signOut();
    
    // userHasAuthenticated(false);
  
    history.push("/login");
  }

  return (
    <div className="nav">
       {/* Home Nav Link */}
      <Link to="/home">
        <h2 className="nav-title"></h2>
      </Link>

      <div>
        {/* If no user is logged in, show these links */}
        {!user &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            {/* <LogOutButton className="navLink" /> */}
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>   
      </div>
      {
        user.username &&
      (
        <>
        {console.log('the user is', user)}
          <AmplifySignOut />
          <button
          type="button"
          className="btn btn-primary btn_asLink"
          onClick={() => {
            handleLogout()
          }}
        >
          LOGOUT
        </button>
        </>
      )}

    </div>
  );
}

export default Nav;
