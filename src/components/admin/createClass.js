import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function CreateClass(props) {

  const navigate = useNavigate()

  const [ClassName, setClassName] = useState({

  })

  const handleChange = (event) => {
    setClassName({[event.target.name] : event.target.value})
  }

  const createClass = () => {
    let token = window.sessionStorage.getItem("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
        }
    }
    axios
    .post('https://elscanner-backend.herokuapp.com//create-new-class', {...ClassName}, config)
    .then(response => {
      if (response.status === 200) {
        window.alert(response.data)
        navigate('/view-classes')
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        window.sessionStorage.removeItem('token')
        props.loginHandler({
          logged_status: "NOT_LOGGED_IN",
          userRole: ''
        })
        window.alert("SESSION_TIMEOUT - please login again - Please login")
        navigate('/login')
      }
      console.log("Error creating class", error)
    })
  }

  return (
    <div className='create-class'>
      <PageTitler pagetitle='Create Class' />
      <label className='create-class__input-label'>Class Name?</label>
      <input className='create-class__input' type='text' name='class' placeholder='Enter class name here' onChange={handleChange} />
      <div className='create-class__button-wrapper'>
        <FunctionGreenButton className='green-button' text='Create Class' onClick={createClass} />
        <FunctionGreenButton className='green-button' text='Return to View Classes' onClick={() =>navigate('/view-classes')} />
      </div>
    </div>
  );
}

export default CreateClass;