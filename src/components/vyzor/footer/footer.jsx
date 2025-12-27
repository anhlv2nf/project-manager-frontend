import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span className="text-muted"> Copyright © <span id="year">{new Date().getFullYear()}</span> <a
            href="#!" className="text-dark fw-semibold">Vyzor</a>.
            Designed with <span className="bi bi-heart-fill text-danger"></span> by <a href="#!">
              <span className="fw-semibold text-primary text-decoration-underline">Spruko</span>
            </a> All
            rights reserved
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;