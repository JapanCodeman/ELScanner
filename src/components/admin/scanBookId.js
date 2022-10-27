import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from '../helpers/pageTitler';
import Scanner from './scanner';

function ScanBookId(props) {

  const navigate = useNavigate()
  
  const updateBookId = (bookID) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/retrieve-book-info/${bookID}`)
    .then(book => {
      console.log(book)
      if (props.userRole === 'Student' && book.data !== 'Book not registered') {
        const config = {
          headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          }
      };
        let studentAndBookUPC = {
          book_upc : book.data.upc,
          public_id : props.public_id
        }
        axios
        .post("https://elscanner-backend.herokuapp.com/check-book-out", studentAndBookUPC, config)
        .then(response => {
          console.log(response)
          window.alert(`${response.data} - returning to admin-home`)})
        .catch(error => {
          console.log('There was an error in checkout()', error)
        })
        navigate('/admin-home')
      }
      else if (book.data !== 'Book not registered') {
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