import React, { Component } from 'react';

export default class Header extends Component {
  render () {
    return (
      <div className='header-wrapper'>
        <div className='header'>
          ELScanner
          <button className='header__login-button'>Login</button>
        </div>
      </div>
    );
  }
}