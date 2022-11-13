import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from '../helpers/pageTitler';
import Scanner from './scanner';

function ScanBookId(props) {

  const navigate = useNavigate()
  
  const updateBookId = async (bookID) => {
    await axios
    .get(`https://elscanner-backend.herokuapp.com/retrieve-book-info/${bookID}`)
    .then(book => {
      if (props.userRole === 'Student' && book.data !== 'Book not registered') {
        const config = {
          headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
      };
        let studentAndBookUPC = {
          book_upc : book.data.upc,
          public_id : props.public_id
        }
        axios
        .post("https://elscanner-backend.herokuapp.com/check-book-out", studentAndBookUPC, config)
        .then(response => {
          if (response.status === 200) {
            window.alert(`${response.data} - returning to admin-home`)
            navigate('/admin-home')
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.sessionStorage.removeItem('token')
            props.loginHandler({
              logged_status: "NOT_LOGGED_IN",
              userRole: ''
            })
            window.alert("SESSION_TIMEOUT - please login again - Please login")
            navigate('/login')
          }
          else {
            console.log('There was an error in checkout()', error)
          }
        })
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