import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import Scanner from './scanner';

function ScanBookId(props) {

  const [book, updateBook] = useState({
    upc : "",
    title : "",
    publisher : "",
    author : "",
    wordCount : 0,
    checkedOut : "",
    currentHolder : ""
  });

  const navigate = useNavigate()
  
  const updateBookId = (bookID) => {
    axios
    .get(`https://elscanner-backend.herokuapp.com/retrieve-book-info/${bookID}`)
    .then(book => {
      console.log(book)
      if (book.data !== 'Book not registered') {
      updateBook({
        ...book.data
      })
      props.handleSetBook({...book.data})
    }
      else {
        navigate('/register-new-book', {state: {upc: bookID}})
      }
    })
    .catch(error => {
      console.log("There was an error in updateBookId function", error)
    })
  }

  const checkBookIn = () => {
    navigate('/scan-student-id', {state: {...book}})
    axios
    .patch(`https://elscanner-backend.herokuapp.com/${book.upc}`)
  }

  const checkBookOut = () => {
    navigate('/scan-student-id');
  }

  const rescan = () => {
    window.location.reload()
  }

  return (
    <div className='scan-book-wrapper'>
      <PageTitler pagetitle='Scan Book' />
      <Scanner returnedInfo = {(bookID) => updateBookId(bookID)}/>
      {props.student ? 
      <div className='checking-out-to'>Checking out to: {props.student.first} {props.student.last}</div>
      :
      null}
      {book.upc !== null ? 
      <div className='scan-result-table'>
        <button onClick={rescan} className='scan-result__restart'>Wrong title?</button>
        <label className='scan-result__upc-label'>UPC</label>
        <div className='scan-result__upc'>{book.upc}</div>
        <label className='scan-result__title-label'>Title</label>
        <div className='scan-result__title'>{book.title}</div>
        <label className='scan-result__publisher-label'>Publisher</label>
        <div className='scan-result__publisher'>{book.publisher}</div>
        <label className='scan-result__author-label'>Author</label>
        <div className='scan-result__author'>{book.author}</div>
        <label className='scan-result__word-count-label'>Word Count</label>
        <div className='scan-result__word-count'>{book.wordCount}</div>
        <label className='scan-result__status-label'>Status</label>
        <div className='scan-result__status'>{book.status}</div>
        <label className='scan-result__current-holder-label'>Held by</label>
        <div className='scan-result__current-holder'>{book.currentHolder}</div>
          {book.currentHolder === "Onomichi Gakuen English Library" ? <SmallerGreenButton text='Check this book out' clickHandler={checkBookOut} />
          :
          <SmallerGreenButton text='Check this book back in' clickHandler={checkBookIn} />}
      </div>
        
        : 
        
        null }
    </div>
  );
}
export default ScanBookId;