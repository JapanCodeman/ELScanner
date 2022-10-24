import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function StudentProfile(props) {

  const [holdingBooks, setHoldingBooks] = useState({
    holdingBooks: []
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!props.checkedOutBooks) {
      navigate('/scan-student-id')
    } else {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }        
      axios.post('https://elscanner-backend.herokuapp.com/retrieve-checked-out-books', {"checkedOutBooks" : props.checkedOutBooks}, config)
      .then(response => {
        setHoldingBooks(response.data)
      })
      .catch(error => {
        console.log("error in useEffect on studentProfile.js", error)
      })
    }}, [props.checkedOutBooks, props.student, navigate])


  function checkBookIn(book) {
    console.log(book)
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }   
    let studentAndBookUPC = {
      student : props.public_id,
      book : book,
      wordCount : book.wordCount
    }
    axios
    .post('https://elscanner-backend.herokuapp.com/check-book-in', {studentAndBookUPC}, config)
    .then(response => {
      window.alert(`${book.title} checked back in from ${props.first} ${props.last} to Onomichi Gakuen English Library.`)
      props.clearStudent()
      navigate('/admin-home')
    })
    .catch(error => {
      console.log("Error in checkBookIn() in studentProfile.js", error)
    })
  }

  function checkBookOut() {
    navigate('/scan-book-id')
  }

  function resetPassword() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }
    axios
    .post('https://elscanner-backend.herokuapp.com/delete-password', {"public_id" : props.public_id}, config)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log("Error in resetPassword()", error)
    })
  }
    

  return (
    <div className='student-profile'>
      <PageTitler pagetitle={`${props.first} ${props.last}`} /> 
      <label className='words-read-label'>Words Read:</label>
      <div className='words-read'>{props.wordsRead}</div>
      <label className='total-books-read-label'>Total Books Read:</label>
      <div className='total-books-read'>{props.totalBooksRead}</div>
      <label className='checked-out-books-label'>Checked Out List:</label>
      <div className='checked-out-books-wrapper'>
      {holdingBooks[0] !== undefined ? holdingBooks.map(book => 
        <SmallerGreenButton 
          className='smaller-green-button'
          text={book.title}
          typeSet='button'
          clickHandler={() => checkBookIn(book.upc)}
          key={book._id}
          />)
          
          : 
          
        <div className='no-checked-out-books'>No Books Checked Out</div>}
      </div>

      <div className='other-options'>
        <SmallerGreenButton
          className='smaller-green-button'
          text={`Check Book out to ${props.first} ${props.last}`}
          typeSet='button'
          clickHandler={checkBookOut}
          />
        <SmallerGreenButton 
          className='reset-password-button'
          text='Reset Password'
          typeSet='button'
          clickHandler={resetPassword}
          />
        <GreenButton toPage='/admin-home' text='Return to Admin Home' />
      </div>
    </div>
  );
}

export default StudentProfile;