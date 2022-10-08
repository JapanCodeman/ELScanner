import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className='header-wrapper'>
      <Link className='header' to='/'>ELScanner</Link>
      {props.logged_status === 'LOGGED_IN' ? <button className='logout-button'>logout</button> : null}
    </div>
  );
}

export default Header