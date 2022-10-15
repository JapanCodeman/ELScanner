import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

function CheckoutConfirm(props) {

  const navigate = useNavigate()

  function checkout() {
    const publicid = JSON.stringify({ public_id : props.public_id })
    const customConfig = {
      headers: {
      'Content-Type': 'application/json'
      }
  };
    axios
    .post(`https://elscanner-backend.herokuapp.com/users/check-book-out/${props.upc}`, publicid, customConfig)
    .catch(error => {
      console.log('There was an error in checkout()', error)
    })
    window.alert(`${props.title} checked out to ${props.first} ${props.last} - returning to admin-home`)
    navigate('/admin-home')
  }

  return (
    <div className='checkout-confirm-wrapper'>
      <PageTitler pagetitle='Confirm Checkout' />
      <div className='checkout-confirm'>Check {props.title} out to {props.first} {props.last}?</div>
      <div className='checkout-confirm__button-wrapper'>
        <SmallerGreenButton className='smaller-green-button' text='Confirm' typeSet='button' clickHandler={checkout} />
      </div>
    </div>
  );
}

export default CheckoutConfirm;