import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { Auth } from 'aws-amplify';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import img from '../../assets/logo.png'
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Hub, Logger } from 'aws-amplify';

function Nav() {
  const history = useHistory();
  const [user, setUser] = useState({}) 
  const [loggedIn, setLoggedIn] = useState(false);
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      console.log('user info', userInfo);
      setUser(userInfo)
    } catch (err) { 
      console.log('error: ', err) 
      history.push('/home');
    }
  }
  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user = user; 
      console.log('user', user.signInUserSession.accessToken.payload["cognito:groups"]);
      setLoggedIn(true)
    } catch (err) {
      // props.history.push(route)
    }
  }

  const logger = new Logger('Logger', 'INFO');
  const listener = (data) => {

  switch (data.payload.event) {
    case 'signIn':
      logger.info('user signed in');
      setLoggedIn(true)
      break;
    case 'signUp':
      logger.info('user signed up');
      break;
    case 'signOut':
      logger.info('user signed out');
      setLoggedIn(false)
      break;
    case 'signIn_failure':
      logger.info('user sign in failed');
      break;
    case 'configured':
      logger.info('the Auth module is configured');
      break;
    default:
      logger.error('Something went wrong, look at data object', data);
  }
}

Hub.listen('auth', listener);

  useEffect(() => {
    // checkUser()
    checkAuthState()
  }, [])

  async function handleLogout() {
    await Auth.signOut().then(
      setLoggedIn(false)
    );
    
    // window.location.reload();
    // history.push("/home");
  }

  return (
    <ProSidebar>
    <SidebarHeader>
      <img className='logo' src={img}></img>
      <h5>Into The Wild</h5>
    </SidebarHeader>
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
    <hr />
    {loggedIn ? 
      <SidebarContent>
        <h5>Admin Links</h5>
        <Menu iconShape="square">
            <MenuItem>
              Admin Hikes
              <Link to="/admin">
            </Link>
            </MenuItem>
            <MenuItem>
              Admin Users
              <Link to="/admin">
            </Link>
            </MenuItem>
          {/* </SubMenu> */}
        </Menu>
      </SidebarContent>
      :
      <SidebarContent></SidebarContent>
    }
    <SidebarFooter>
    {loggedIn ? 
        <AmplifySignOut />
        :
        <div>LOG IN</div>
    }
    </SidebarFooter>
  </ProSidebar>
    
  );
}

export default Nav;
