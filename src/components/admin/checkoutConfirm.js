import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function CheckoutConfirm(props) {

  const navigate = useNavigate()

  function checkout() {
    // const publicid = JSON.stringify({ public_id : props.public_id })
    const config = {
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      }
  };
    let studentAndBookUPC = {
      book_upc : props.book.upc,
      public_id : props.public_id
    }
    axios
    .post("http://127.0.0.1:5000/check-book-out", studentAndBookUPC, config)
    .catch(error => {
      console.log('There was an error in checkout()', error)
    })
    props.clearBook()
    props.clearStudent()
    window.alert(`${props.book.title} checked out to ${props.first} ${props.last} - returning to admin-home`)
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