import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    registrationCode: ''
  })

  const [confirm, setConfirmPass] = useState({
    confirmPass: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit clicked")
    if (user.password !== confirm.confirmPass) {
      window.alert("Passwords do not match - reenter")
      return
    }
    const newUser = {...user}
    axios.post('http://127.0.0.1:5000/register-new-user', newUser)
    .then(response => {
      if (response.status === 200) {
        navigate('/login')
      }
    })
    .catch(error => 
      console.log("Error in register.js:handleSubmit()", error))
  }

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleUpdate = (event) => {
    setConfirmPass({...confirm, [event.target.name] : event.target.value})
  }

  const handleRedirect = () => {
    console.log("handleRedirect clicked")
    navigate('/')
  }

  return (
    <div className='register-page'>
      <PageTitler pagetitle='Register' />
      <form className='register-page__form' onSubmit={(e) => handleSubmit(e)}>
        <label className='register-page__form__first-name-label'>First Name</label>
        <input className='register-page__form__first-name-input' type='text' name='first' value={user.first} autoComplete='given-name' onChange={handleChange}/>
        <label className='register-page__form__last-name-label'>Last Name</label>
        <input className='register-page__form__last-name-input' type='text' autoComplete='family-name' name='last' value={user.last} onChange={handleChange}/>
        <label className='register-page__form__email-label'>Email</label>
        <input className='register-page__form__email-input' type='text' autoComplete='email' name='email' value={user.email} onChange={handleChange}/>
        <label className='register-page__form__password-label'>Password</label>
        <input className='register-page__form__password-input' type='password' autoComplete='new-password' name='password' value={user.password} onChange={handleChange}/>
        <label className='register-page__form__confirm-password-label'>Confirm Password</label>
        <input className='register-page__form__confirm-password-input' type='password' autoComplete='new-password' name='confirmPass' value={confirm.confirmPass} onChange={handleUpdate}/>
        <label className='register-page__form__registration-code-label'>Registration Code</label>
        <input className='register-page__form__registration-code-input' type='text' name='registrationCode' autoComplete='one-time-code' value={user.registrationCode} onChange={handleChange}/>
        <div className='register-page__buttons'>
          <SmallerGreenButton className='smaller-green-button' text='Register' typeSet='submit' clickHandler={e => handleSubmit(e)}/>
          <SmallerGreenButton className='smaller-green-button' text='Return to Title' typeSet='button' clickHandler={handleRedirect}/>
        </div>
      </form>
    </div>
  );
}

export default Register