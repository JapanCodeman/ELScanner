import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitler from '../helpers/pageTitler';

import SmallerGreenButton from '../helpers/smallerGreenButton';


function RegisterStudents(props) {
  const navigate = useNavigate()

  const [isDisabled, setIsDisabled] = useState(true)
  const [newStudent, setNewStudent] = useState({
    first: '',
    last: '',
    email: '',
    password: null,
    passwordReset: true,
    class:''
  })

  const validate = useCallback(() => {
      return newStudent.first.length && 
      newStudent.last.length && 
      newStudent.email.length &&
      newStudent.class.length
    }, [newStudent]);
  
  useEffect(() => {
    validate()
  }, [validate])

  const buttonText = () => {
    if (validate()) {
      return 'Register'
    }
    else {
      return 'Complete Form'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsDisabled(true)
    props.handleLoading(true)
    console.log("handleSubmit clicked")
      const newUser = {...newStudent}
      axios.post('https://elscanner-backend.herokuapp.com/admin-register-new-user', newUser)
      .then(response => {
        console.log(response)
        if (response.data === "Email already registered") {
          window.alert("That email is already registered - please enter a different email")
        }
        if (response.status === 200) {
          window.alert(`Account for ${newStudent.first} ${newStudent.last} created. Their temporary password is ${response.data.temporaryPassword}. They should log in with this password and they will be redirected to set their own password.`)
          navigate('/admin-home')
        }
      })
      .catch(error => 
        console.log("Error in register.js:handleSubmit()", error),
        setIsDisabled(false))
      props.handleLoading(false)
    }

  const handleChange = (event) => {
    setNewStudent({...newStudent, [event.target.name] : event.target.value})
  }

  const handleRedirect = () => {
    console.log("handleRedirect clicked")
    navigate('/admin-home')
  }

  return (
    <div className='register-student-page'>
      <PageTitler pagetitle='Register Student' />
      <form className='register-student-page__form' onSubmit={(e) => handleSubmit(e)}>
        <label className='register-student-page__form__first-name-label'>First Name</label>
        <label className='register-student-page__form__class-select-label'>Class</label>
        <select className='register-student-page__form__class-select' name='class' onChange={handleChange}>
          <option value style={{display:"none", color:"red"}}>select class</option>
          {props.classes?.map(_class => <option value={_class.class} key={_class.public_id}>{_class.class}</option>)}
        </select>
        <input className='register-student-page__form__first-name-input' type='text' name='first' value={newStudent.first} autoComplete='given-name' onChange={handleChange}/>
        <label className='register-student-page__form__last-name-label'>Last Name</label>
        <input className='register-student-page__form__last-name-input' type='text' autoComplete='family-name' name='last' value={newStudent.last} onChange={handleChange}/>
        <label className='register-student-page__form__email-label'>Email</label>
        <input className='register-student-page__form__email-input' type='text' autoComplete='email' name='email' value={newStudent.email} onChange={handleChange}/>

        <div className='register-student-page-buttons'>
          <SmallerGreenButton className='smaller-green-button' text={buttonText()} typeSet='submit' clickHandler={(e) => handleSubmit(e)} disabled={!validate() && isDisabled}/>
          <SmallerGreenButton className='smaller-green-button' text='Return to Title' typeSet='button' clickHandler={handleRedirect}/>
        </div>
      </form>
    </div>
  );
}

export default RegisterStudents;