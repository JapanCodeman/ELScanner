import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentId (props) {
  const navigate = useNavigate()

  const [scanning, setScanning] = useState(true)

  const lookupUser = (public_id) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/lookup-user/${public_id}`)
    .then(student => {
      console.log(student)
      props.handleSetStudent({...student.data})
      setScanning(false)
      if (props.book) {
        navigate('/checkout-confirm')
      } else
      navigate('/student-profile')
    })
    .catch(error => {
      console.log("There was an error in lookupUser function", error)
    })
  }

  return (
    <div>
      <PageTitler pagetitle="Student Id" />
      {scanning === true ? 
      <Scanner scanning = {scanning} returnedInfo = {(public_id) => lookupUser(public_id)} />

      :

      null}
    </div>
  );
}

export default ScanStudentId;