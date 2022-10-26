import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import GreenButton from './components/helpers/greenButton';
import PageTitler from './components/helpers/pageTitler';

function ViewClasses() {

  // const navigate = useNavigate()
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

  // const editClass = (classPublicId) => {
  //   navigate('/edit-class', {state : {"public_id" : classPublicId}})
  // }

  return (
    <div className='view-classes'>
      <PageTitler pagetitle='All Classes' />
      <div className='returned-classes-container'>
        {allClasses?.map((thisClass) => <GreenButton text={thisClass.class} toPage='/edit-class' key={thisClass.public_id} />)} 
        {/* Create new button component without to prop; just a simple button  */}
      </div>
    </div>
  );
}

export default ViewClasses;