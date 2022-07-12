import React, { Component } from 'react';
import GreenButton from './helpers/greenButton';

export default class Await extends Component {
  render () {
    return (
      <div className='await-wrapper'>
        <GreenButton className='green-button' toPage='/scan-student-id' text='Scan Student ID' />
        <div className='await-wrapper__spacer' />
        <GreenButton className='green-button' toPage='/scan-book-id' text='Scan Book ID' />
      </div>
    );
  }
}