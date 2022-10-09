import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound () {
  return (
    <div className='page-not-found'>
      "404 - Page not found"
      <Link className='return-title' to='/'>Return to Title</Link>
    </div>
  );
}

export default PageNotFound