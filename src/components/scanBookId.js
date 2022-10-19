import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanBookId(props) {

  const navigate = useNavigate()
  
  const updateBookId = (bookID) => {
    axios
    .get(`http://127.0.0.1:5000/retrieve-book-info/${bookID}`)
    .then(book => {
      console.log(book)
      if (book.data !== 'Book not registered') {
        props.handleSetBook({book : {...book.data}})
        navigate('/book-info')
      } 
      else {
        navigate('/register-new-book', {state : {upc: bookID}})
      }
    })
    .catch(error => {
      console.log("There was an error in updateBookId function", error)
    })
  }

  return (
    <div className='scan-book-wrapper'>
      <PageTitler pagetitle='Scan Book' />
      <Scanner returnedInfo = {(bookID) => updateBookId(bookID)}/>
    </div>
  );
}
export default ScanBookId;