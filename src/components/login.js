import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import jwtDecode from 'jwt-decode';
import Loading from './helpers/loading';

  function Login(props) {

    const navigate = useNavigate()

    const [user, setUser] = useState({
      email: '',
      password: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
      setUser({...user, [event.target.name] : event.target.value})
    }

    async function handleSubmit(e) {
      setLoading()
      e.preventDefault();
        let config = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }
        await axios
        .post('https://elscanner-backend.herokuapp.com/users/login', {
          ...user
        },
        { withCredentials: true },
        config)
        .then(response => {
          window.sessionStorage.setItem('token', response.data.token)
        })
        .catch(error => {
          console.log('There was an error in handleSubmit in login.js', error)
        })
        props.loginHandler()
        const token = jwtDecode(window.sessionStorage.getItem('token'))
        console.log("token response from login.js", token)
        if (token.sub.userRole === "Administrator") {
        navigate('/admin-home')
        } else if (token.sub.userRole === "Student") {
          navigate('/home')
        }
        else {
          window.alert("There was an error logging in - have you registered yet?")
        }
    }

  return (
    <div className='login-page'>
      {loading === true ? <Loading /> : null}
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

export default Login;
