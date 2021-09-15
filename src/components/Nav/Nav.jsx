import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { Auth } from 'aws-amplify';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import img from '../../assets/logo.png'
import { AmplifySignOut } from '@aws-amplify/ui-react';

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
    <SidebarFooter>
      <AmplifySignOut />
    </SidebarFooter>
  </ProSidebar>
    
  );
}

export default Nav;
