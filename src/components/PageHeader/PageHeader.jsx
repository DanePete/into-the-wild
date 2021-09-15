import React from 'react';
import './PageHeader.css';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function PageHeader() {
  return (
    <section class="position-relative py-6 page-header">
      <div>
        <h1>gheeadsfa</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="bg-white rounded-lg shadow p-5">
              <strong class="text-uppercase text-secondary d-inline-block mb-2 text-sm">Featured</strong>
              <h2 class="mb-3">Escape the city today</h2>
              <p class="text-muted">Is am hastily invited settled at limited civilly fortune me. Really spring in extent an by. Judge but built party world...</p>
              <a class="p-0 btn btn-link" href="/blog/escape-city-today">Continue reading <i class="fa fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
