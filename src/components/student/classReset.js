import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function ClassReset(props) {

  const navigate = useNavigate()
  const [user, setUser] = useState()

  useEffect(() => {
    props.setLoading(false)
  }, [props])

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const updateClass = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }
    let updateInfo = {
      "public_id": props.public_id,
      "class": user.class
    }
    axios.post('http://127.0.0.1:5000/update-student-class', updateInfo, config)
    .then(response => {
      if (response.data === 'CLASS_UPDATED') {
        console.log('Function test line 36, classReset.js', response.data)
        window.sessionStorage.removeItem('token')
        console.log('Function test after token pull, before useNavigate')
        navigate('/login')}
        console.log('Function test AFTER useNavigate')
        window.alert(`Your class has been set to ${user.class}! Please login again.`)
    }) 
    .catch(error => {
      console.log("Error in updating class in classReset.js", error)
    })
  }

  return (
    <div className='class-reset'>
      <PageTitler pagetitle='Join New Class' />
      <label className='join-new-class-selector-label'>Select Your New Class This Year</label>
      <select className='join-new-class-selector' name='class' onChange={handleChange}>
        <option value style={{display:"none", color:"red"}}>select class</option>
        {props.classNames?.map(_class => <option value={_class.index} key={_class}>{_class}</option>)}
        <option value={null}>N/A</option>
      </select>

      <FunctionGreenButton className='green-button' text='Select this class' onClick={() => updateClass()} />
    </div>
  );
}

export default ClassReset;