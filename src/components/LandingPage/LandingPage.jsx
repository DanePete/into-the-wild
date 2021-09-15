import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landing-container">
      <div className="h-100 container">
        <div className="d-flex h-100 text-white overlay-content align-items-center">
          <div className="w-100">
            <div className="row">
              <div className="col-lg-6">
                <p className="subtitle text-white letter-spacing-3 mb-3 font-weight-light">into the wild</p>
                <h2 className="display-3 font-weight-bold mb-3">Get Back Outside</h2>
              </div>
              <div className="pl-lg-5 my-3 my-md-5 my-lg-0 col-lg-6">
                {/* RIGHT COLUMN */}
              </div>
              <a href="/hikes" className="d-none d-sm-inline-block btn btn-outline-light landing-btn">
                START EXPLORING
                <i className="fa fa-angle-right ml-2"></i>
                </a>
            </div>
          </div>
        </div>
      </div>



      <div className="h-100 container">
        <div className="d-flex h-100 text-white overlay-content align-items-center">
          <div className="w-100">
            <div className="row">
              <div className="col-lg-6">
                <p className="subtitle text-white letter-spacing-3 mb-3 font-weight-light">into the wild</p>
                <h2 className="display-3 font-weight-bold mb-3">Get Back Outside</h2>
              </div>
              <div className="pl-lg-5 my-3 my-md-5 my-lg-0 col-lg-6">
                {/* RIGHT COLUMN */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
