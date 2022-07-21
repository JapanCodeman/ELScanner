import React, { Component } from 'react';

import axios from 'axios';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

export default class Register extends Component {
  constructor() {
    super()

    this.state = {
      userInfo: 
        {first: '',
        last: '',
        email: '',
        password: '',
        registrationCode: ''},
      confirmPass: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUserChange(event) {
    this.setState({
      ...this.state,
      userInfo : { ...this.state.userInfo, [event.target.name] : event.target.value }
    })
  }

  handleSubmit() {
    if (this.state.password !== this.state.confirmPass) {
      window.alert("Passwords do not match - reenter")
    }
    const newUser = {...this.state}
    axios.post('http://127.0.0.1:5000/register', newUser)
    .then(response => console.log(response))
  }

  render () {
    return (
      <div className='register-page'>
        <PageTitler pagetitle='Register' />
        <form className='register-page__form' onSubmit={this.handleSubmit}>
          <label className='register-page__form__first-name-label'>First Name</label>
          <input className='register-page__form__first-name-input' type='text' name='first' value={this.state.userInfo.first} autoComplete='given-name' onChange={this.handleUserChange}/>
          <label className='register-page__form__last-name-label'>Last Name</label>
          <input className='register-page__form__last-name-input' autoComplete='family-name' name='last' onChange={this.handleUserChange}/>
          <label className='register-page__form__email-label'>Email</label>
          <input className='register-page__form__email-input' autoComplete='email' name='email' onChange={this.handleUserChange}/>
          <label className='register-page__form__password-label'>Password</label>
          <input className='register-page__form__password-input' type='password' autoComplete='new-password' name='password' onChange={this.handleUserChange}/>
          <label className='register-page__form__confirm-password-label'>Confirm Password</label>
          <input className='register-page__form__confirm-password-input' type='password' autoComplete='new-password' name='confirmPass' onChange={this.handleChange}/>
          <label className='register-page__form__registration-code-label'>Registration Code</label>
          <input className='register-page__form__registration-code-input' name='registrationCode' autoComplete='one-time-code' onChange={this.handleUserChange}/>
        </form>
        <div className='register-page__buttons'>
          <SmallerGreenButton className='green-button' text='Register' onClick={this.handleSubmit}/>
          <SmallerGreenButton toPage='/' text='Return to Title' />
        </div>
      </div>
    );
  }
}