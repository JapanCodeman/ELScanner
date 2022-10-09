import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate()

  const logoutCallback = () => {
    window.sessionStorage.removeItem('token')
    props.logoutHandler()
    navigate('/')
  }
  
  return (
    <div className='header-wrapper'>
      <Link className='header' to='/'>ELScanner</Link>
      {props.logged_status === 'LOGGED_IN' ? <button className='logout-button' onClick={logoutCallback}>logout</button> : null}
    </div>
  );
}

export default Header