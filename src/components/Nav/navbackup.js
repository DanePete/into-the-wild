import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { Auth } from 'aws-amplify';
import logo from '../Nav/hike.jpg'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const history = useHistory();
  const [user, setUser] = useState({}) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      setUser(userInfo)
    } catch (err) { 
      console.log('error: ', err) 
      history.push('/home');
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  async function handleLogout() {
    await Auth.signOut();
    window.location.reload();
    history.push("/home");
  }

  return (

    
    <div className="">

      <ProSidebar>
        <Menu iconShape="square">
          {/* <SubMenu title="Components"> */}
            <MenuItem>
              Home
              <Link to="/home">
            </Link>
            </MenuItem>
            <MenuItem>
              Hikes
              <Link to="/hikes">
            </Link>
            </MenuItem>
            <MenuItem>
              About
            <Link to="/about">
            </Link>    
            </MenuItem>
            <MenuItem>
              Profile
            <Link to="/profile">
            </Link>    
            </MenuItem>
            
          {/* </SubMenu> */}
        </Menu>
      </ProSidebar>
      <img className="logo" src={logo}></img>
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

            <Link className="navLink" to="/hikes">
              Discover Hikes
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
        <Link className="navLink" to="/profile">
          Profile
        </Link>
          <button
          type="button"
          className="btn btn-warning btn_asLink"
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
