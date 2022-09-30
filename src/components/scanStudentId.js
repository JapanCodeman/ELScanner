import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import Scanner from './scanner';

function ScanStudentId () {
  const location = useLocation()
  // const navigate = useNavigate()

  const [book] = useState({
    ...location.state
  })

  // const [checkOutStatus, updateStatus] = useState(false);

  const [student, updateInfo] = useState({
    _id: "",
    first: "",
    last: "",
    role: "Student",
    class: "",
    public_id: "",
    email: "",
    password: "",
    checkedOutBooks: [],
    loggedStatus: "",
    isAdmin: "NOT_ADMIN"
  })

  const checkOutBook = () => {
    axios
    .patch(`https://elscanner-backend.herokuapp.com/check-book-out/${book.upc}/${student.public_id}`)
    .catch(error => {
      console.log("error in checkOutBook function", error)
    })
    // updateStatus(true)
  }

  const lookupUser = (public_id) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/lookup-user/${public_id}`)
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
          <label className='checkout-confirmation__student-name-label'>Student Name: </label>
          <div className='checkout-confirmation__student-name'>{student.first} {student.last}</div>
          <label className='checkout-confirmation__student-class-label'>Class: </label>
          <div className='checkout-confirmation__student-class'>{student.class}</div>
          <label className='checkout-confirmation__student-checkout-status-label'>Currently Checked Out Books: </label>
          <div className='checkout-confirmation__student-checkout-status'>#Fill in later</div>
        </div>

        {book.status === "Checked Out" ? 
          <button className='checkout-confirmation__message' onClick={checkOutBook}>
            Check out title: {book.title} to {student.first} {student.last}?
          </button>
          
        :
          <div className='checkout-confirmation-wrapper'>
            <div className='checkout-confirmation__confirmed'>{book.title} checked out to {student.first} {student.last}</div>
            <SmallerGreenButton text='Checkout another title?' clickHandler={window.location('https://elscanner-backend.herokuapp.com/scan-book-id')} /> 
          </div>}
      </div>
    </div>
  );
}

export default ScanStudentId