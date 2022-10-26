import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import SmallerGreenButton from './helpers/smallerGreenButton';
import PageTitler from './helpers/pageTitler';

function BookInfo(props) {

  const navigate = useNavigate()

  useEffect(() => {
    if (props.book === undefined) {
      navigate('/scan-book-id')
    }
  })

  const checkBookIn = () => {
    navigate('/scan-student-id')
    axios
    .patch(`http://127.0.0.1:5000/${props.book.upc}`)
    .catch(error => {
      console.log('Error in checkBookIn() in scanBookId.js', error)
    })
  }

  const checkBookOut = () => {
    navigate('/scan-student-id');
  }

  const rescan = () => {
    navigate('/scan-book-id')
  }

  return (
    <div>
      <PageTitler pagetitle='Book Info' />
      {props.student ? 
      <div className='checking-out-to'>Checking out to: {props.student.first} {props.student.last}</div>
      :
      null}
      {props.book.upc !== null ? 
      <div className='scan-result-table'>
        <label className='scan-result__upc-label'>UPC</label>
        <div className='scan-result__upc'>{props.book.upc}</div>
        <label className='scan-result__title-label'>Title</label>
        <div className='scan-result__title'>{props.book.title}</div>
        <label className='scan-result__publisher-label'>Publisher</label>
        <div className='scan-result__publisher'>{props.book.publisher}</div>
        <label className='scan-result__author-label'>Author</label>
        <div className='scan-result__author'>{props.book.author}</div>
        <label className='scan-result__word-count-label'>Word Count</label>
        <div className='scan-result__word-count'>{props.book.wordCount}</div>
        <label className='scan-result__status-label'>Status</label>
        <div className='scan-result__status'>{props.book.status}</div>
        <label className='scan-result__current-holder-label'>Held by</label>
        <div className='scan-result__current-holder'>{props.book.currentHolder}</div>
          {props.book.currentHolder === "Onomichi Gakuen English Library" ? <SmallerGreenButton text='Check this book out' clickHandler={checkBookOut} />

          :

          <SmallerGreenButton text='Check this book back in' clickHandler={checkBookIn} />}
        </div>
        
        : 
        
        null }
      <button onClick={rescan} className='scan-result__restart'>Wrong title?</button>
    </div>
  );
}

export default BookInfo;