import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
      axios.post('http://127.0.0.1:5000/retrieve-book-titles', {"checkedOutBooks" : props.student.checkedOutBooks}, config)
      .then(response => {
          setHoldingBooks(response.data)
      })
      .catch(error => {
        console.log("error in useEffect on studentProfile.js", error)
      })
    })

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
      {holdingBooks ? holdingBooks.map(book => 
        <SmallerGreenButton 
          className='smaller-green-button'
          text={book}
          typeSet='button'
          onClick={(book) => checkBookIn(book)}
          />)
          : null}
    </div>
  );
}

export default StudentProfile;