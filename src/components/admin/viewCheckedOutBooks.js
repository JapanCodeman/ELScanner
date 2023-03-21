import axios from 'axios';
import React, { useEffect, useState } from 'react';

import CheckedOutBookButton from '../helpers/checkedOutBookButton';
import GreenButton from '../helpers/greenButton';
import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';

function ViewCheckedOutBooks(props) {

  const [checkedOutBooks, setCheckedOutBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }
    axios
    .get('https://elscanner-backend.herokuapp.com/retrieve-all-checked-out-books', config)
    .then(response => {
      setCheckedOutBooks(response.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error in retrieving list of checked out books", error)
    })
  }, [])


  return (
    <div className='view-checked-out-books'>
      <PageTitler pagetitle='Checked Out Books' />
      {loading ? 
      <Loading className='loader' />
      :
      <div>
        {checkedOutBooks[0] ?
        null
        :
        <div className='no-books-wrapper'>
          <div className='no-checked-out-books'>No Checked Out Books</div>
          <GreenButton className='green-button' toPage='/admin-home' text='Return to Admin Home' />
        </div>}
        
        <div className='checked-out-books-wrapper'>
          {checkedOutBooks ? checkedOutBooks.map(book => <CheckedOutBookButton bookTitle={book.title} bookInfo={book} handleSetBook={props.handleSetBook} heldBy={book.currentHolder} heldLength={book.totalDaysCheckedOut} key={book._id} />)
          :
          <Loading className='loader' />}
        </div>
      </div>}
    </div>
  );
}

export default ViewCheckedOutBooks;