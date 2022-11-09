import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function CheckoutConfirm(props) {

  const navigate = useNavigate()

  function checkout() {
    const config = {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    };
    let studentAndBookUPC = {
      book_upc : props.book.upc,
      public_id : props.public_id
    }
    axios
    .post("https://elscanner-backend.herokuapp.com/check-book-out", studentAndBookUPC, config)
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
      console.log('There was an error in checkout()', error)
    })
    alert(`${props.book.title} checked out to ${props.first} ${props.last} - returning to admin-home`)
    props.clearBook()
    props.clearStudent()
    navigate('/admin-home')
  }

  return (
    <div className='checkout-confirm-wrapper'>
      <PageTitler pagetitle='Confirm Checkout' />
      <div className='checkout-confirm'>Check {props.book.title} out to {props.first} {props.last}?</div>
      <div className='checkout-confirm__button-wrapper'>
        <SmallerGreenButton className='smaller-green-button' text='Confirm' typeSet='button' clickHandler={checkout} />
      </div>
    </div>
  );
}

export default CheckoutConfirm;