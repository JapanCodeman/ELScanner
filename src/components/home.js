import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import PageTitler from './helpers/pageTitler';

function Home() {

  const [user, setUser] = useState({

  })

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userPublicId = decoded.sub.user
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${userPublicId}`)
    .then(response => {
      setUser(...response.data)
    })
    .catch(error => {
      console.log('error in useEffect on mount in home.js', error)
    })
  }, [user])

  return (
    <div className='home'>
      <PageTitler pagetitle='Home' />
      <div className='home__welcome'>
        Welcome back {user.name} 
      </div>
    </div>
  );
}

export default Home