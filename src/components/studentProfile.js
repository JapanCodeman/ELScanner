import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function StudentProfile(props) {

  const navigate = useNavigate()

  const [holdingBooks, setHoldingBooks] = useState({
    holdingBooks: []
  })
  const [storeClass] = useState({
    class : props.class
  })

  useEffect(() => {
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
      if (!props.public_id) {
        navigate('/scan-student-id')
      }
    }, [props.public_id, props.checkedOutBooks, props.student, navigate])


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
      props.clearStudent()
    })
    .catch(error => {
      console.log("Error in checkBookIn() in studentProfile.js", error)
    })
    navigate('/admin-home')
  }

  function checkBookOut() {
    navigate('/scan-book-id')
  }

  function deleteStudentAccount() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }
    axios
    .delete(`http://127.0.0.1:5000/delete-a-user/${props.public_id}`, config)
    .then(window.alert('Student Deleted - back to view students'))
    .catch(error => {
      console.log("Error deleting student", error)
    })
    navigate('/view-students', {class : storeClass.class})
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
      window.alert(`Password for ${props.first} ${props.last} reset. Ask them to login to set new password.`)
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

        <SmallerGreenButton
          className='delete-student-account'
          text='Delete Account'
          typeSet='button'
          clickHandler={deleteStudentAccount}
          />
        <GreenButton toPage='/admin-home' text='Return to Admin Home' />
      </div>
    </div>
  );
}

export default StudentProfile;