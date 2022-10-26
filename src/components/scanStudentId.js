import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentId (props) {
  const navigate = useNavigate()

  const lookupUser = (public_id) => {
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${public_id}`)
    .then(student => {
      console.log(student)
      props.handleSetStudent({...student.data})
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
      <Scanner returnedInfo = {(public_id) => lookupUser(public_id)} />
    </div>
  );
}

export default ScanStudentId;