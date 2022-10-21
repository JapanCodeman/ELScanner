import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function PasswordReset() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      }
  };
    axios
    .post('http://127.0.0.1:5000/password-reset', {...user}, config)
    .then(response => {
      console.log("password reset response", response)
    })
    .catch(error => {
      console.log("error in password reset", error)
    })
    window.alert('New Password Set')
    navigate('/login')
  }

  return (
    <div className='password-reset-wrapper'>
      <PageTitler pagetitle='Reset Password' />
      <form className='password-reset-form' onSubmit={handleSubmit}>
        <label className='email-label'>Email</label>
        <input className='email' type='email' name='email' value={user.email} autoComplete='email' onChange={handleChange} />
        <label className='new-password-label'>New Password</label>
        <input className='new-password' type='password' name='password' value={user.password} autoComplete='new-password' onChange={handleChange} />
        <SmallerGreenButton className='smaller-green-button' text='Set New Password' clickHandler={handleSubmit} />
      </form>
    </div>
  );
}

export default PasswordReset;