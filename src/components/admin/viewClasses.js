import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';

function ViewClasses() {

  const navigate = useNavigate()
  const [allClasses, setAllClasses] = useState()

  useEffect(() => {
    axios
    .get('http://127.0.0.1:5000/get-all-classes')
    .then(response => {
      setAllClasses(response.data)
    })
    .catch(error => {
      console.log("There was an error in useEffect() in viewClasses", error)
    })
  }, [])

  const createNewClass = () => {
    navigate('/create-class')
  }

  const editClass = (classPublicId) => {
    navigate('/edit-class', {state : {"public_id" : classPublicId}})
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
        {allClasses?.map((thisClass) => 
          <FunctionGreenButton
            className='green-button'
            text={thisClass.class}
            onClick={editClass}
            key={thisClass.public_id}
          />)} 
      </div>
    </div>
  );
}

export default ViewClasses;