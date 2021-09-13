import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container landing-container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <div className="hero-text">
            OUT OF THE CITY <br /> BACK INTO NATURE
          </div>
        </div>
        <div className="grid-col grid-col_4">

          <center>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
