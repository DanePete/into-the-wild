import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { Auth } from 'aws-amplify';
import logo from '../Nav/hike.jpg'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
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
    <ProSidebar>
    <SidebarHeader>
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
  </ProSidebar>
    
  );
}

export default Nav;
