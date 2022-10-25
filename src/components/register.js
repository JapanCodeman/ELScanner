import React, { useState } from 'react';
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

  const validate = () => {
    return user.first.length & 
    user.last.length & 
    user.email.length & 
    user.password.length &
    user.class.length;
  };

  const buttonText = () => {
    if (validate()) {
      return 'Register'
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
    props.handleLoading(true)
    console.log("handleSubmit clicked")
    if (user.password !== confirm.confirmPass) {
      window.alert("Passwords do not match - reenter")
      return
    }
    if (user.registrationCode === '') {
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

    else {
      const newAdmin = {...user}
      axios.post('http://127.0.0.1:5000/register-new-admin', newAdmin)
      .then(response => {
        console.log(response.status)
        if (response.status === 200) {
          window.alert(response.data)
          navigate('/login')
        } else if (response.status !== 200) {
          window.alert('Administrator code not found')
        }
      })
      .catch(error => {
        console.log('There was an error in registering the user as admin', error)
        window.alert('Invalid Admin Registration Code')
      })
    }
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
          <option value style={{display:"none", color:"red"}}>select class</option>
          <option value='1-1'>1-1</option>
          <option value='1-2'>1-2</option>
          <option value='2-1'>2-1</option>
          <option value='2-2'>2-2</option>
          <option value='3-1'>3-1</option>
          <option value={null}>N/A</option>
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
        {adminCode === true ? 
        <div className='register-page__form__admin-field'>
          <label className='register-page__form__admin-field__registration-code-label' onClick={handleAdminCode}>Registration Code</label>
          <input className='register-page__form__admin-field__registration-code-input' type='text' name='registrationCode' autoComplete='one-time-code' value={user.registrationCode} onChange={handleChange}/>
        </div>

          :
          
        <div className='register-page__form__admin-field'>
          <label className='register-page__form__admin-field__is-admin-checkbox-label' htmlFor='adminCode' onClick={handleAdminCode}>Create Admin Account?</label>
        </div>
      }


        <div className='register-page__buttons'>
          <SmallerGreenButton className='smaller-green-button' text={buttonText()} typeSet='submit' clickHandler={e => handleSubmit(e)} disabled={!validate()}/>
          <SmallerGreenButton className='smaller-green-button' text='Return to Title' typeSet='button' clickHandler={handleRedirect}/>
        </div>
      </form>
    </div>
  );
}

export default Register