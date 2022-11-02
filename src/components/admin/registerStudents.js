import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PageTitler from '../helpers/pageTitler';

import SmallerGreenButton from '../helpers/smallerGreenButton';


function RegisterStudents(props) {
  const navigate = useNavigate()

  const [newStudent, setNewStudent] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    class:''
  })

  const validate = useCallback(() => {
      return newStudent.first.length && 
      newStudent.last.length && 
      newStudent.email.length &&
      newStudent.class.length;
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
    props.handleLoading(true)
    console.log("handleSubmit clicked")
      const newUser = {...newStudent}
      axios.post('https://elscanner-backend.herokuapp.com/register-new-user', newUser)
      .then(response => {
        if (response.data === "Email already registered") {
          alert("That email is already registered - please enter a different email")
        }
        if (response.data === "Registration successful") {
          alert("Registration successful - the student may now login and set their password")
          navigate('/login')
        }
      })
      .catch(error => 
        console.log("Error in register.js:handleSubmit()", error))
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
          <SmallerGreenButton className='smaller-green-button' text={buttonText()} typeSet='submit' clickHandler={(e) => handleSubmit(e)} disabled={!validate()}/>
          <SmallerGreenButton className='smaller-green-button' text='Return to Title' typeSet='button' clickHandler={handleRedirect}/>
        </div>
      </form>
    </div>
  );
}

export default RegisterStudents;