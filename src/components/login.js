import React, { Component } from 'react';
import PageTitler from './helpers/pageTitler';

export default class Login extends Component {
  render () {
    return (
      <div className='login-page'>
        <PageTitler pagetitle='Login' />
        <div className='login-page__input-wrapper'>
          <label className='login-page__username-label'>Username</label>
          <input className='login-page__username-input' />
          <label className='login-page__password-label'>Password</label>
          <input className='login-page__password-input' type='password' />
        </div>
      </div>
    );
  }
}