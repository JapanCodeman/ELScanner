import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

  function RegisterNewBook() {
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
      event.preventDefault();
      axios
      .post(`https://elscanner-backend.herokuapp.com/users/register-new-book/${bookInfo.upc}`, {...bookInfo})
      .then(response => {
        if (response.status === 200) {
          window.alert(`${bookInfo.title} registered to database - redirecting to await`)
          navigate('/await')
        }
      })
      .catch(error => {
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
          <input className='register-book-form__book-pub' type='text' name='publisher' onChange={handleChange} />
          <label className='register-book-form__book-auth-label'>Author</label>
          <input className='register-book-form__book-auth' type='text' name='author' onChange={handleChange} />
          <label className='register-book-form__book-wordcount-label'>Word count</label>
          <input className='register-book-form__book-wordcount' type='number' name='wordCount' onChange={handleChange} />
          <SmallerGreenButton className='register-book-form__submit-button' text='Register New Book' typeSet='submit' clickHandler={handleSubmit} />
        </form>
      </div>
    );
  }

export default RegisterNewBook;
