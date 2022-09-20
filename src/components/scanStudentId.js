import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentId () {
  const location = useLocation()

  const [book] = useState({
    ...location.state
  })

  const [student, updateInfo] = useState({
    _id: "",
    first: "",
    last: "",
    role: "Student",
    class: "",
    public_id: "",
    email: "",
    password: "",
    loggedStatus: "",
    isAdmin: "NOT_ADMIN"
  })

  const lookupUser = (public_id) => {
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${public_id}`)
    .then(response => {
      updateInfo({...response.data}) 
    })
    .catch(error => {
      console.log("There was an error in lookupUser function", error)
    })
  }

  return (
    <div>
      <PageTitler pagetitle="Student Id" />
      <Scanner returnedInfo = {(public_id) => lookupUser(public_id)} />
      <div className='checkout-confirmation'>
        <div className='checkout-confirmation__student-info'>
          Student Name: {student.first} {student.last}
          Class: {student.class}
          Currently Checked Out Books: #Fill in later
        </div>
        <div className='checkout-confirmation__message'>
          Check out title: {book.title} to {student.first} {student.last}?
        </div>
      </div>
    </div>
  );
}

export default ScanStudentId