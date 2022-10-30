import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import PageTitler from '../helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentID (props) {
  const navigate = useNavigate()

  const lookupUser = (public_id) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/lookup-user/${public_id}`)
    .then(student => {
      console.log(student)
      if (student.data === 'User Not Found') {
        alert('This QR code isn\'t registered - returning to home')
        navigate('/admin-home')
      } else {
      props.handleSetStudent({...student.data})
      if (props.book) {
        navigate('/checkout-confirm')
      } else
      navigate('/student-profile')
    }})
    .catch(error => {
      console.log("There was an error in lookupUser function", error)
    })
  }

  return (
    <div>
      <PageTitler pagetitle="Student Id" />
      <Scanner returnedInfo = {(public_id) => lookupUser(public_id)} />
    </div>
  );
}

export default ScanStudentID;