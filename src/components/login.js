import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import jwtDecode from 'jwt-decode';

  function Login(props) {

    const navigate = useNavigate()

    const [user, setUser] = useState({
      email: '',
      password: ''
    })

    useEffect(() => {
      if (props.userRole === 'Student') {
        navigate('/home')
      } else if (props.userRole === 'Administrator') {
        navigate('/admin-home')
      } 
    }, [props, navigate])

    const handleChange = (event) => {
      setUser({...user, [event.target.name] : event.target.value})
    }

    async function handleSubmit(e) {
      e.preventDefault();
      props.handleLoading(true)
        let config = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        }
        await axios
        .post('https://elscanner-backend.herokuapp.com/login', {
          ...user
        },
        { withCredentials: true },
        config)
        .then(response => {
          console.log(response)
          if (response.data === 'password-reset') {
            navigate('/password-reset')
          } else {
          window.sessionStorage.setItem('token', response.data.token)
        }})
        .catch(error => {
          console.log('There was an error in handleSubmit in login.js', error)
        })
        const token = jwtDecode(window.sessionStorage.getItem('token'))
        await axios.get(`https://elscanner-backend.herokuapp.com/lookup-user/${token.sub.public_id}`, config)
        .then(response => {
          props.loginHandler({
            logged_status: 'LOGGED_IN',
            ...response.data
        })},
        )
        .catch(error => {
          window.alert(`There was an error logging in - ${error}`)
        })
      }

  return (
    <div className='login-page'>
      <React.StrictMode>
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
      </React.StrictMode>
    </div>
  );
}

export default Login;
