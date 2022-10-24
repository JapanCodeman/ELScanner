import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanBookId(props) {

  const navigate = useNavigate()
  
  const updateBookId = (bookID) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/retrieve-book-info/${bookID}`)
    .then(book => {
      console.log(book)
      if (props.first) {
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
        .catch(error => {
          console.log('There was an error in checkout()', error)
        })
        props.clearBook()
        window.alert(`${book.title} checked out to ${props.first} ${props.last} - returning to admin-home`)
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