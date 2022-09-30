import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

  function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState({
      email: '',
      password: ''
    })

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
      // "Authorization" : `Bearer ${token}`
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post('https://elscanner-backend.herokuapp.com//login', {
      ...user
    },
    { withCredentials: true },
    config)
    .then(response => {
      window.sessionStorage.setItem('token', response.data.token)
      navigate('/home')
    })
    .catch(error => {
      console.log('There was an error in handleSubmit in login.js', error)
    })
  }

  return (
    <div className='login-page'>
      <PageTitler pagetitle='Login' />
      <div className='login-page__input-wrapper'>
        <form>
          <label className='login-page__username-label'>Email</label>
          <input className='login-page__username-input' type='text' name='email' autoComplete='email' onChange={handleChange} />
          <label className='login-page__password-label'>Password</label>
          <input className='login-page__password-input' type='password' name='password' autoComplete='current-password' onChange={handleChange} />
          <SmallerGreenButton className='login-page__login-button' text='Login' typeSet='submit' clickHandler={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default Login
