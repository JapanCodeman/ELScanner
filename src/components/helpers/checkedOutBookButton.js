import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function CheckedOutBookButton(props) {

  const navigate = useNavigate()

  const [student, setStudent] = useState()

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${props.heldBy}`, config)
    .then(response => {
      setStudent(response.data)
    })
    .catch(error => {
      console.log("Error in retrieving user info", error)
    })
  }, [props.heldBy])

  return (
    <div className='checked-out-book-button'>
      <div className='checked-out-book-button__book-title'>{props.bookTitle}</div>
      {student ? <div className='checked-out-book-button__held-by'>Held by: {student.first} {student.last}</div> : null}
      <div className='checked-out-book-button__held-length'>Days Checked Out: {props.heldLength}</div>
      <button className='checked-out-book-button__to-book-info' onClick={() => {props.handleSetBook({book: props.bookInfo}); navigate('/book-info')}}>To Book Info</button>
    </div>
  );
}
export default CheckedOutBookButton;