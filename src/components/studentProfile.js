import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function StudentProfile(props) {

  const [holdingBooks, setHoldingBooks] = useState()

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }        
      axios.post('http://127.0.0.1:5000/retrieve-checked-out-books', {"checkedOutBooks" : props.student.checkedOutBooks}, config)
      .then(response => {
          setHoldingBooks(response.data)
      })
      .catch(error => {
        console.log("error in useEffect on studentProfile.js", error)
      })
      window.location.reload()
    }, [props.student.checkedOutBooks])

    function checkBookIn(book) {
      console.log(book)
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          }
      }   
      let studentAndBookUPC = {
        student : props.student.public_id,
        book : book
      }
      axios
      .post('http://127.0.0.1:5000/check-book-in', {studentAndBookUPC}, config)
      .then(response => {
        console.log(response)
        window.alert(`${book.title} checked back in from ${props.student.first} ${props.student.last} to Onomichi Gakuen English Library. `)
      })
      .catch(error => {
        console.log("Error in checkBookIn() in studentProfile.js", error)
      })
    }
    

  return (
    <div className='student-profile'>
      <PageTitler pagetitle={`${props.student.first} ${props.student.last}`} /> 
      <label className='words-read-label'>Words Read:</label>
      <div className='words-read'>{props.student.wordsRead}</div>
      <label className='total-books-read-label'>Total Books Read:</label>
      <div className='total-books-read'>{props.student.totalBooksRead}</div>
      <label className='checked-out-books-label'>Checked Out List:</label>
      <div className='checked-out-books-wrapper'>
      {props.student.checkedOutBooks.length > 0 ? holdingBooks.map(book => 
        <SmallerGreenButton 
          className='smaller-green-button'
          text={book.title}
          typeSet='button'
          clickHandler={() => checkBookIn(book.upc)}
          key={book._id}
          />)
          : null}
        <GreenButton toPage='/admin-home' text='Return to Admin Home' />
      </div>
    </div>
  );
}

export default StudentProfile;