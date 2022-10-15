import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageTitler from './helpers/pageTitler';

function StudentProfile(props) {

  const [holdingBooks, setHoldingBooks] = useState()

  useEffect(() => {
    const params = {
      currentHolder: props.student.public_id,
      sort: { title : 1 },
      projection: { _id : 0, title : 1}
    }
    axios
    .post('http://127.0.0.1:5000/retrieve-books', params)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log('error in axios', error)
    })
  })

  return (
    <div className='student-profile-wrapper'>
      <PageTitler pagetitle={`${props.student.first} ${props.student.last}`} /> 
      <label className='words-read-label'>Words Read:</label>
      <div className='words-read'>{props.student.wordsRead}</div>
      <label className='total-books-read-label'>Total Books Read:</label>
      <div className='total-books-read'>{props.student.totalBooksRead}</div>
      <label className='checked-out-books-label'>Checked Out List:</label>
      <div className='checked-out-books'>{props.student.checkedOutBooks}</div>
    </div>
  );
}

export default StudentProfile;