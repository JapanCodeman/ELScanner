import React, { Component } from 'react';
import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

export default class Register extends Component {
  constructor() {
    super()

    this.state = {
      first: '',
      last: '',
      password: '',
      confirmPass: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    console.log(this.state)
  }

  render () {
    return (
      <div className='register-page'>
        <PageTitler pagetitle='Register' />
        <form className='register-page__form' onSubmit={this.handleSubmit}>
          <label className='register-page__form__first-name-label'>First Name</label>
          <input className='register-page__form__first-name-input' type='text' name='first' autoComplete='cc-given-name' onChange={this.handleChange}/>
          <label className='register-page__form__last-name-label'>Last Name</label>
          <input className='register-page__form__last-name-input' autoComplete='cc-family-name' name='last' onChange={this.handleChange}/>
          <label className='register-page__form__password-label'>Password</label>
          <input className='register-page__form__password-input' type='password' autoComplete='new-password' name='password' onChange={this.handleChange}/>
          <label className='register-page__form__confirm-password-label'>Confirm Password</label>
          <input className='register-page__form__confirm-password-input' type='password' autoComplete='new-password' name='confirmPass' onChange={this.handleChange}/>
        </form>
        <div className='register-page__buttons'>
          <SmallerGreenButton className='green-button' toPage='/login' text='Register' onClick={this.handleSubmit}/>
          <SmallerGreenButton toPage='/' text='Return to Title' />
        </div>
      </div>
    );
  }
}