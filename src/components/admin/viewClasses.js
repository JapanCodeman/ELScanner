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
    axios
    .get('https://elscanner-backend.herokuapp.com/get-all-classes')
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