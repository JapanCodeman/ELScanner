
import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound (props) {
  
  const redirectOnStatus = () => {
    if (props.userRole === "Student") {
      return '/home'
    }
    if (props.userRole === "Administrator") {
      return '/admin-home'
    } else {
      return '/'
    }
  }

  return (
    <div className='page-not-found'>
      "404 - Page not found"
      <Link className='return-title' to={redirectOnStatus()}>Return to Title</Link>
    </div>
  );
}

export default PageNotFound