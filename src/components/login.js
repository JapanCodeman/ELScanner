import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

  function Login(props) {

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
        let config = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }
        axios
        .post('http://127.0.0.1:5000/login', {
          ...user
        },
        { withCredentials: true },
        config)
        .then(response => {
          window.sessionStorage.setItem('token', response.data.token)
          props.loginHandler()
        })
        .catch(error => {
          console.log('There was an error in handleSubmit in login.js', error)
        })
        navigate('/home')
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
