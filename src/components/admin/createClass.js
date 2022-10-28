import axios from 'axios';
import React, { useState } from 'react';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function CreateClass() {

  const [ClassName, setClassName] = useState({

  })

  const handleChange = (event) => {
    setClassName({[event.target.name] : event.target.value})
  }

  const createClass = () => {
    console.log(ClassName)
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }
    axios
    .post('http://127.0.0.1:5000/create-new-class', {...ClassName}, config)
    .then(response => {
      console.log(response)
      window.alert(response.data)
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