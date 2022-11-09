import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function BookInfo(props) {

  const navigate = useNavigate()

  const [currentHolder, setCurrentHolder] = useState()

  useEffect(() => {
    const config = {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    };
    if (props.book === undefined) {
      navigate('/scan-book-id')
    }
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${props.book.currentHolder}`, config)
    .then(response => {
      if (response.data.first) {
        setCurrentHolder({
          first: response.data.first,
          last: response.data.last
        })
      }
      else {
        setCurrentHolder({
          first: "Onomichi Gakuen",
          last: "English Library"
        })
      }
    })
    .catch(error => {
      console.log("Error in useEffect() in bookInfo.js", error)
    })
  }, [navigate, props.book])

  function checkBookIn(book) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Check ${props.book.title} back in from ${currentHolder.first} ${currentHolder.last}?`)) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }   
    let studentAndBookUPC = {
      student : props.book.currentHolder,
      book : props.book.upc,
      wordCount : props.book.wordCount
    }
    axios
    .post('http://127.0.0.1:5000/check-book-in', {studentAndBookUPC}, config)
    .then(response => {
      if (response.status === 200) {
        alert(`${response.data}`)
        props.clearStudent()
        props.clearBook()
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        window.sessionStorage.removeItem('token')
        props.loginHandler({
          logged_status: "NOT_LOGGED_IN",
          userRole: ''
        })
        alert("Session Timeout - Please login")
        navigate('/login')
      }
      console.log("Error in checkBookIn() in studentProfile.js", error)
    })
    navigate('/admin-home')
  }
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
        <div className='scan-result__current-holder'>{currentHolder ? `${currentHolder.first} ${currentHolder.last}` : <Loading className='mini-loader' />}</div>
        <div className='book-info-button-wrapper'>
          {props.book.currentHolder === "Onomichi Gakuen English Library" ? 
          
          <SmallerGreenButton text='Check this book out' clickHandler={checkBookOut} />

          :

          <SmallerGreenButton text='Check this book back in' clickHandler={() => checkBookIn(props.book.upc)} />}
          <button onClick={rescan} className='scan-result__restart'>Wrong title?</button>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;