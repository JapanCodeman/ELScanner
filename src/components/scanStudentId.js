import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
// import { useLocation } from 'react-router';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentId (props) {
  const navigate = useNavigate()

  const lookupUser = (public_id) => {
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${public_id}`)
    .then(student => {
      console.log(student)
      props.handleSetStudent({student : {...student.data}})
      // ReactDOM.unmountComponentAtNode(document.getElementById('qr-reader'))
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

      {/* {props.title ? 
      <div className='book-checkout-info'>Checking out {props.title}</div>
      :
      null}
      <div className='checkout-confirmation'>
      {student.public_id ? 
        <div className='checkout-confirmation__student-info'>
          <label className='checkout-confirmation__student-name-label'>Student Name: </label>
          <div className='checkout-confirmation__student-name'>{student.first} {student.last}</div>
          <label className='checkout-confirmation__student-class-label'>Class: </label>
          <div className='checkout-confirmation__student-class'>{student.class}</div>
          <label className='checkout-confirmation__student-checkout-status-label'>Currently Checked Out Books: </label>
          <div className='checkout-confirmation__student-checkout-status'>#Fill in later</div>
          {props.status === "Checked Out" ? 
            <button className='checkout-confirmation__message' onClick={checkOutBook}>
              Check out title: {props.title} to {student.first} {student.last}?
            </button>
          
        :

          <div className='checkout-confirmation-wrapper'>
            <div className='checkout-confirmation__confirmed'>{props.title} checked out to {student.first} {student.last}</div>
            <SmallerGreenButton text='Checkout another title?' clickHandler={() => navigate('/scan-book-id')} /> 
          </div>}
        </div>
        :
        null}
      </div> */}
    </div>
  );
}

export default ScanStudentId;