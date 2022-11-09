import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Loading from '../helpers/loading';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function ViewClasses() {

  const navigate = useNavigate()
  const [allClasses, setAllClasses] = useState()

  useEffect(() => {
    let token = window.sessionStorage.getItem('token')
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
        }
    }
    axios
    .get('http://127.0.0.1:5000/get-all-classes', config)
    .then(response => {
      if (response.status === 200) {
        setAllClasses(response.data)
      }
    })
    .catch(error => {
      if (error.response.status === 401 && window.sessionStorage.getItem('token')) {
        window.sessionStorage.removeItem('token')
        alert('SESSION_TIMEOUT - please login again')
        navigate('/login')
      }
      console.log("There was an error in useEffect() in viewClasses", error)
    })
  }, [navigate])

  const createNewClass = () => {
    navigate('/create-class')
  }

  const editClass = (classInfo) => {
    navigate('/edit-class', {state: [classInfo]})
  }

  return (
    <div className='view-classes'>
      <PageTitler pagetitle='All Classes' />
      <div className='returned-classes-container'>
        <FunctionGreenButton
          className='green-button'
          text='Create New Class'
          onClick={createNewClass}
        />
        {allClasses ? allClasses.map((thisClass) => 
          <FunctionGreenButton
            className='green-button'
            text={thisClass.class}
            onClick={() => editClass(thisClass)}
            key={thisClass.public_id}
          />) :
          <Loading className='loader' />} 
      </div>
    </div>
  );
}

export default ViewClasses;