import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function Register(props) {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    class:'',
    registrationCode: ''
  })

  const [confirm, setConfirmPass] = useState({
    confirmPass: ''
  })

  const [adminCode, setAdminCode] = useState(false)

  const [submitted, setSubmitted] = useState(false)


  const validate = useCallback(() => {
    if (user.class !== "Administrator") {
      return user.first.length && 
      user.last.length && 
      user.email.length && 
      user.password.length &&
      user.class.length &&
      confirm.confirmPass.length;}

    if (user.class === "Administrator") {
      return user.first.length && 
      user.last.length && 
      user.email.length && 
      user.password.length &&
      user.class.length &&
      user.registrationCode &&
      confirm.confirmPass.length;
    }
  }, [user, confirm]);
  
  useEffect(() => {
    validate()
  }, [validate])

  const buttonText = () => {
    if (validate()) {
      return 'Register'
    } else if (submitted) {
      return 'Please Wait'
    }
    else {
      return 'Complete Form'
    }
  }

  const handleAdminCode = () => {
    setAdminCode(!adminCode)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitted) {
      return
    }
    setSubmitted(true)
    props.handleLoading(true)
    console.log("handleSubmit clicked")
    if (user.password !== confirm.confirmPass) {
      alert("Passwords do not match - reenter")
      return
    }
    if (user.class !== 'Administrator' && user.registrationCode === '') {
      const newUser = {...user}
      axios.post('http://127.0.0.1:5000/register-new-user', newUser)
      .then(response => {
        if (response.data === "Email already registered") {
          alert("That email is already registered - please enter a different email or request a password reset from an administrator")
        }
        if (response.data === "Registration successful") {
          alert("Registration successful - please login to continue")
          navigate('/login')
        }
      })
      .catch(error => 
        console.log("Error in register.js:handleSubmit()", error))
      props.handleLoading(false)
    }

    if (user.registrationCode !== '' && user.class === 'Administrator') {
      const newAdmin = {...user}
      axios.post('http://127.0.0.1:5000/register-new-admin', newAdmin)
      .then(response => {
        console.log(response.data)
        if (response.data === 'ADMINISTRATOR_REGISTERED') {
          alert("Account successfully registered with administration privileges - please login to continue")
          navigate('/login')
        } else if (response.data === 'ADMINISTRATOR_REGISTRATION_FAILED') {
          console.log(response)
          alert('Invalid Registration Code')
        } else if (response.data === 'EMAIL_ALREADY_REGISTERED') {
          console.log(response)
          alert('This email is already registered - contact an administrator to reset your email')
        }
      })
      .catch(error => {
        console.log('There was an error in registering the user as admin', error)
        alert('Invalid Admin Registration Code')
      })
    }
    if (user.registrationCode !== '' && user.class !== 'Administrator') {
      alert("You are not registering as an Administrator - please clear the registration code field")
    }
    props.handleLoading(false)
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
        <label className='register-page__form__class-select-label'>Class</label>
        <select className='register-page__form__class-select' name='class' onChange={handleChange}>
          <option value style={{display:"none"}}>select class</option>
          {props.classNames?.map(_class => <option value={_class} key={_class}>{_class}</option>)}
          <option value='Administrator'>Administrator</option>
        </select>
        <input className='register-page__form__first-name-input' type='text' name='first' value={user.first} autoComplete='given-name' onChange={handleChange}/>
        <label className='register-page__form__last-name-label'>Last Name</label>
        <input className='register-page__form__last-name-input' type='text' autoComplete='family-name' name='last' value={user.last} onChange={handleChange}/>
        <label className='register-page__form__email-label'>Email</label>
        <input className='register-page__form__email-input' type='text' autoComplete='email' name='email' value={user.email} onChange={handleChange}/>
        <label className='register-page__form__password-label'>Password</label>
        <input className='register-page__form__password-input' type='password' autoComplete='new-password' name='password' value={user.password} onChange={handleChange}/>
        <label className='register-page__form__confirm-password-label'>Confirm Password</label>
        {user.password === confirm.confirmPass ? 
          <div className='register-page__form__confirm-password-nomatch' />
          :
          <div className='register-page__form__confirm-password-nomatch'>Passwords must match</div>}
        <input className='register-page__form__confirm-password-input' type='password' autoComplete='new-password' name='confirmPass' value={confirm.confirmPass} onChange={handleUpdate}/>
        <div className='register-page-admin-field-wrapper'>
          {user.class === 'Administrator' ? 
          <div className='register-page__form__admin-field'>
            <label className='register-page__form__admin-field__registration-code-label' onClick={handleAdminCode}>Registration Code</label>
            <input className='register-page__form__admin-field__registration-code-input' type='text' name='registrationCode' autoComplete='one-time-code' value={user.registrationCode} onChange={handleChange}/>
          </div>

          :
          
          null}
        </div>

        <div className='register-page-buttons'>
          <SmallerGreenButton className='smaller-green-button' text={buttonText()} typeSet='submit' clickHandler={(e) => handleSubmit(e)} disabled={!validate()}/>
          <SmallerGreenButton className='smaller-green-button' text='Return to Title' typeSet='button' clickHandler={handleRedirect}/>
        </div>
      </form>
    </div>
  );
}
export default Register

