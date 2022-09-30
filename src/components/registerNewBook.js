import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import PageTitler from './helpers/pageTitler';

  function RegisterNewBook() {
    const location = useLocation()
    
    const [bookInfo, setBookInfo] = useState({
      ...location.state
    });

    const handleChange = (event) => {
      setBookInfo({...bookInfo, [event.target.name] : event.target.value})
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      axios
      .post(`http://127.0.0.1:5000/register-new-book/${bookInfo.upc}`)
    }

    return (
      <div className='register-book'>
        <PageTitler pagetitle='Register New Book' />
        <form onSubmit={handleSubmit}>
          <label className='register-book__upc-label'>UPC</label>
          <input className='register-book__upc-input' type='text' name='upc' onChange={handleChange} defaultValue={bookInfo.upc} />
          <label className='register-book__book-title-label'>Book Title</label>
          <input className='register-book__book-title' type='text' name='title' onChange={handleChange} />
          <label className='register-book__book-pub-label'>Publisher</label>
          <input className='register-book__book-pub' type='text' name='publisher' onChange={handleChange} />
          <label className='register-book__book-auth-label'>Author</label>
          <input className='register-book__book-auth' type='text' name='author' onChange={handleChange} />
          <label className='register-book__book-wordcount-label'>Word count</label>
          <input className='register-book__book-wordcount' type='number' name='wordCount' onChange={handleChange} />
        </form>
      </div>
    );
  }

export default RegisterNewBook;
