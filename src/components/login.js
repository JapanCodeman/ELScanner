import axios from 'axios';
import React, { useState } from 'react';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

  function Login() {

    const [user, setUser] = useState({
      username: '',
      password: ''
    })

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({...user})
    axios
    .post('http://127.0.0.1:5000/login', {...user})
    .then(response => {
      console.log(response, {...user})
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
          <input className='login-page__username-input' type='text' name='username' autoComplete='email' onChange={handleChange} />
          <label className='login-page__password-label'>Password</label>
          <input className='login-page__password-input' type='password' name='password' autoComplete='current-password' onChange={handleChange} />
          <SmallerGreenButton className='login-page__login-button' text='Login' typeSet='submit' clickHandler={(e) => handleSubmit(e)} />
        </form>
      </div>
    </div>
  );
}

export default Login
