import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import jwtDecode from 'jwt-decode';

  function Login(props) {

    const navigate = useNavigate()
    const userRole = props.userRole
    const logged_status = props.logged_status


    const [user, setUser] = useState({
      username: '',
      password: null
    })

    useEffect(() => {
      if (userRole === 'Student' && logged_status === 'LOGGED_IN') {
        navigate('/home')
      } 
      if (userRole === 'Administrator' && logged_status === 'LOGGED_IN') {
      navigate('/admin-home')
      }
    }, [userRole, logged_status, navigate])

    const handleChange = (event) => {
      setUser({...user, [event.target.name] : event.target.value})
    }

    async function handleSubmit(e) {
      e.preventDefault();
      props.handleLoading(true)
      let configSet = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
        await axios
        .post('https://elscanner-backend.herokuapp.com/login', {
          ...user
        },
        configSet,
        { withCredentials: true })
        .then(response => {
          if (response.data === 'CLASS_RESET') { // how to fix this?
            navigate('/class-reset')
          }
          else if (response.data.data === 'PASSWORD_RESET') {
            window.sessionStorage.setItem('token', response.data.token)
            window.alert('You have been granted a password reset - please set your new password')
            props.handleLoading(false)
            navigate('/password-reset')
          } 
          else if (response.data === 'USER_NOT_FOUND') {
            window.alert('username or Password Invalid')
            props.handleLoading(false)
          }
          else if (response.data === 'INVALID_PASSWORD') {
            window.alert('username or Password Invalid')
            props.handleLoading(false)
          } else {
          window.sessionStorage.setItem('token', response.data.token)
        }})
        .catch(error => {
          console.log('There was an error in handleSubmit in login.js', error)
        })
        let config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }
        const token = jwtDecode(window.sessionStorage.getItem('token'))
        await axios.get(`https://elscanner-backend.herokuapp.com/lookup-user/${token.sub.public_id}`, config)
        .then(response => {
          if (response.status === 200) {
            props.loginHandler({
              logged_status: 'LOGGED_IN',
              ...response.data
            })
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.alert("SESSION_TIMEOUT in login.js")
          }
          window.alert(`There was an error logging in - ${error}`)
        })
        props.handleLoading(false)
      }

  return (
    <div className='login-page'>
      <React.StrictMode>
      <PageTitler pagetitle='Login' />
      <div className='login-page__input-wrapper'>
        <form>
          <label className='login-page__username-label'>Username</label>
          <input className='login-page__username-input' type='text' name='username' autoComplete='username' onChange={handleChange} />
          <label className='login-page__password-label'>Password</label>
          <input className='login-page__password-input' type='password' name='password' autoComplete='current-password' onChange={handleChange} />
          <SmallerGreenButton className='login-page__login-button' text='Login' typeSet='submit' clickHandler={handleSubmit} />
        </form>
      </div>
      </React.StrictMode>
    </div>
  );
}

export default Login;
