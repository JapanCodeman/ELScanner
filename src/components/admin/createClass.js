import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function CreateClass() {

  const navigate = useNavigate()

  const [ClassName, setClassName] = useState({

  })

  const handleChange = (event) => {
    setClassName({[event.target.name] : event.target.value})
  }

  const createClass = () => {
    let token = window.localStorage.getItem("token")
    console.log(token)
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
        }
    }
    axios
    .post('https://elscanner-backend.herokuapp.com/create-new-class', {...ClassName}, config)
    .then(response => {
      alert(response.data)
      navigate('/view-classes')
    })
    .catch(error => {
      console.log("Error creating class", error)
    })
  }

  return (
    <div className='create-class'>
      <PageTitler pagetitle='Create Class' />
      <label className='create-class-input-label'>Class Name?</label>
      <input className='create-class-input' type='text' name='class' onChange={handleChange} />
      <FunctionGreenButton className='green-button' text='Create Class' onClick={createClass} />
    </div>
  );
}

export default CreateClass;