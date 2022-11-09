import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate()

  const routeOnRole = () => {
    if (props.userRole === 'Administrator') {
      navigate('/admin-home')
    } else if (props.userRole === 'Student') {
      navigate('/home')
    } else {
      navigate('/')
    }
  }

  const logoutCallback = () => {
    window.sessionStorage.removeItem('token')
    props.logoutHandler()
    navigate('/')
  }
  
  return (
    <div className='header-wrapper'>
      <div className='header' onClick={routeOnRole}>ELScanner</div> 
      {props.logged_status === 'LOGGED_IN' ? <button className='logout-button' onClick={logoutCallback}>logout</button> : null}
    </div>
  );
}

export default Header