import React, { Component } from 'react';
import GreenButton from './helpers/greenButton';

export default class Title extends Component {
  render () {
    return (
      <div className='home-wrapper'>
        <GreenButton className='green-button' toPage='/login' text='Login' />
        <div className='home-wrapper__spacer' />
        <GreenButton className='green-button' toPage='/register' text='Register' />
      </div>
    );
  }
}