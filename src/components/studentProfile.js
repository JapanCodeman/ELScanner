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
      axios.post('https://elscanner-backend.herokuapp.com/retrieve-book-titles', {"checkedOutBooks" : props.student.checkedOutBooks}, config)
      .then(response => {
          setHoldingBooks(response.data)
      })
      .catch(error => {
        console.log("error in useEffect on studentProfile.js", error)
      })
    }, [props.student.checkedOutBooks])

    function checkBookIn(book) {
      console.log(book)
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
      {holdingBooks ? holdingBooks.map(book => 
        <SmallerGreenButton 
          className='smaller-green-button'
          text={book}
          typeSet='button'
          clickHandler={() => checkBookIn(book)}
          />)
          : null}
        <GreenButton toPage='/admin-home' text='Return to Admin Home' />
      </div>
    </div>
  );
}

export default StudentProfile;