import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import Scanner from './scanner';

function ScanBookId() {

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
    .get(`http://127.0.0.1:5000/retrieve-book-info/${bookID}`)
    .then(book => {
      updateBook({
        ...book.data
      })
    })
    .catch(error => {
      console.log("There was an error in updateBookId function", error)
    })
  }

  const checkBookIn = () => {
    navigate('/scan-student-id', {state: {...book}})
    axios
    .patch(`http://127.0.0.1:5000/${book.upc}`)
  }

  const checkBookOut = () => {
    navigate('/scan-student-id', {state: {...book}});
  }

  const rescan = () => {
    // eslint-disable-next-line no-unused-expressions
    window.location.reload()
  }

  return (
    <div className='scan-book-wrapper'>
      <PageTitler pagetitle='Scan Book' />
      <Scanner returnedInfo = {(bookID) => updateBookId(bookID)}/>
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