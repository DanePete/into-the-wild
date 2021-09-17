import React from 'react';
import './PageHeader.css';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function PageHeader({title, description}) {
  return (
    <section class="position-relative py-6 page-header">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      <div class="container">
        <div class="row page-header-row">
          <div class="col-lg-6">
            <div class="bg-white rounded-lg shadow p-5">
              <strong class="text-uppercase text-secondary d-inline-block mb-2 text-sm">Featured</strong>
              <h2 class="mb-3">{title}</h2>
              <p class="text-muted">{description}</p>
              <a class="p-0 btn btn-link" href="/blog/escape-city-today">More Info... <i class="fa fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
