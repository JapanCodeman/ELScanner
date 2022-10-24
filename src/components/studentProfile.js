import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function StudentProfile(props) {

  const [holdingBooks, setHoldingBooks] = useState()

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
      axios.post('http://127.0.0.1:5000/retrieve-checked-out-books', {"checkedOutBooks" : props.checkedOutBooks}, config)
      .then(response => {
        setHoldingBooks(response.data)
      })
      .catch(error => {
        console.log("error in useEffect on studentProfile.js", error)
      })
    }
  }, [props.checkedOutBooks, props.student, navigate])


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
    .post('http://127.0.0.1:5000/check-book-in', {studentAndBookUPC}, config)
    .then(response => {
      window.alert(`${book.title} checked back in from ${props.first} ${props.last} to Onomichi Gakuen English Library.`)
      navigate('/admin-home')
    })
    .catch(error => {
      console.log("Error in checkBookIn() in studentProfile.js", error)
    })
  }

  function resetPassword() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }
    axios
    .post('http://127.0.0.1:5000/delete-password', {"public_id" : props.public_id}, config)
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
      {holdingBooks ? holdingBooks.map(book => 
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