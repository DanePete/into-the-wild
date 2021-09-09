import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';

function Nav() {
  // const user = useSelector((store) => store.user);
  const [user, setUser] = useState({}) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
  }

  useEffect(() => {
    checkUser()
  }, [])

  console.log('user id', user);

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
      <AmplifySignOut />
    </div>
  );
}

export default Nav;
