import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

  function RegisterNewBook(props) {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [bookInfo, setBookInfo] = useState({
      ...location.state,
      status: 'Checked in',
      currentHolder: 'Onomichi Gakuen English Library'
    });

    const handleChange = (event) => {
      setBookInfo({...bookInfo, [event.target.name] : event.target.value})
    }

    const handleSubmit = (event) => {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
        }
      event.preventDefault();
      axios
      .post(`https://elscanner-backend.herokuapp.com/register-new-book/${bookInfo.upc}`, {...bookInfo}, config)
      .then(response => {
        console.log(response)
        if (response.data === 'BOOK_ALREADY_REGISTERED') {
          window.alert("This upc is already registered to a book")
        }
        if (response.data === 'BOOK_REGISTERED') {
          console.log(response)
          if (props.userRole !== "Student") {
          window.alert(`${bookInfo.title} registered to database`)
          navigate('/admin-home')
          }
          if (props.userRole === "Student") {
            let config = {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                }
              }
            let studentAndBookUPC = {
              book_upc : bookInfo.upc,
              public_id : props.public_id
            }
            axios
            .post("https://elscanner-backend.herokuapp.com/check-book-out", studentAndBookUPC, config)
            .then(window.alert(`${bookInfo.title} checked out to ${props.first} ${props.last} - returning to admin-home`))
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
              console.log('There was an error in checkout()', error)
            })
            navigate('/admin-home')
          }
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
        console.log('There was an error in the handleSubmit of registerNewBook.js', error)
      })
    }

    return (
      <div className='register-book'>
        <PageTitler pagetitle='Register New Book' />
        <form className='register-book-form' onSubmit={handleSubmit}>
          <label className='register-book-form__upc-label'>UPC</label>
          <input className='register-book-form__upc-input' type='text' name='upc' onChange={handleChange} defaultValue={bookInfo.upc} />
          <label className='register-book-form__book-title-label'>Book Title</label>
          <input className='register-book-form__book-title' type='text' name='title' onChange={handleChange} />
          <label className='register-book-form__book-pub-label'>Publisher</label>
          <input className='register-book-form__book-pub' type='text' name='publisher' defaultValue='Oxford Reading Tree' onChange={handleChange} />
          <label className='register-book-form__book-auth-label'>Author</label>
          <input className='register-book-form__book-auth' type='text' name='author' defaultValue='Hunt and Brychta' onChange={handleChange} />
          <label className='register-book-form__book-wordcount-label'>Word count</label>
          <input className='register-book-form__book-wordcount' type='number' name='wordCount' onChange={handleChange} />
          <SmallerGreenButton className='register-book-form__submit-button' text='Register New Book' typeSet='submit' clickHandler={handleSubmit} />
        </form>
      </div>
    );
  }

export default RegisterNewBook;
