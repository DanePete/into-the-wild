import React from 'react';
import './EditProfile.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function EditProfile() {
  return (
    <div className="container">
      <h1 className="hero-heading mb-0">Your Account</h1>
      <p className="text-muted mb-5"> Manage your account and settings here.</p>
      <div className="row">
        <div className="mb-30px col-6 col-md-4">
          <div className="h-100 border-0 shadow hover-animate card">
            <div className="card-body">
              <div className="icon-rounded bg-secondary-light mb-3">
                icon
              </div>
              <h5 className="mb-3 card-title">
                <a className="text-decoration-none text-dark stretched-link">
                  Personal Info
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EditProfile;
