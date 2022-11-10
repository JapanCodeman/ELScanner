import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import QRCode from 'react-qr-code';

import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function Home(props) {

  const navigate = useNavigate()

  const toClass = () => {
    navigate('/my-class')
  }

  useEffect(() => {
    props.handleLoading(false)
  }, [props])

  return (
    <div className='home'>
      <PageTitler pagetitle='Home' />
      <div className='welcome'>Welcome back, {`${props.first} ${props.last}`}</div>
      <div className='your-qr-code'>Your QR Code</div>
      <div className='qr-code-wrapper'>
        <QRCode
          className='qr-code'
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          title='StudentQRCode'
          value={props.public_id}
          size={256}
        />
      </div>
      <div className='your-word-count'>
        Your total word count so far is: {props.wordsRead} words!
      </div>
      <div className='your-book-count'>
        You have read {props.totalBooksRead} books!
      </div>
      <div className='buttons-wrapper'>
        <SmallerGreenButton className='smaller-green-button' text='View My Class' clickHandler={toClass} />
      </div>
    </div>
  );
}

export default Home