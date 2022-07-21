import React, { Component } from 'react';

import axios from 'axios';
import { withRouter } from '../withRouter';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';

class Register extends Component {
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
    this.handleRedirect = this.handleRedirect.bind(this)
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
    console.log("handleSubmit clicked")
    if (this.state.userInfo.password !== this.state.confirmPass) {
      window.alert("Passwords do not match - reenter")
    }
    const newUser = {...this.state.userInfo}
    console.log(newUser)
    axios.post('http://127.0.0.1:5000/register', newUser)
    .then(response => console.log("registered", response))
    .catch(error => 
      console.log("Error in register.js:handleSubmit()", error))
  }

  handleRedirect() {
    this.props.navigate('/')
  }

  render () {
    return (
      <div className='register-page'>
        <PageTitler pagetitle='Register' />
        <form className='register-page__form' onSubmit={this.handleSubmit}>
          <label className='register-page__form__first-name-label'>First Name</label>
          <input className='register-page__form__first-name-input' type='text' name='first' value={this.state.userInfo.first} autoComplete='given-name' onChange={this.handleUserChange}/>
          <label className='register-page__form__last-name-label'>Last Name</label>
          <input className='register-page__form__last-name-input' type='text' autoComplete='family-name' name='last' value={this.state.userInfo.last} onChange={this.handleUserChange}/>
          <label className='register-page__form__email-label'>Email</label>
          <input className='register-page__form__email-input' type='text' autoComplete='email' name='email' value={this.state.userInfo.email} onChange={this.handleUserChange}/>
          <label className='register-page__form__password-label'>Password</label>
          <input className='register-page__form__password-input' type='password' autoComplete='new-password' name='password' value={this.state.userInfo.password} onChange={this.handleUserChange}/>
          <label className='register-page__form__confirm-password-label'>Confirm Password</label>
          <input className='register-page__form__confirm-password-input' type='password' autoComplete='new-password' name='confirmPass' value={this.state.confirmPass} onChange={this.handleChange}/>
          <label className='register-page__form__registration-code-label'>Registration Code</label>
          <input className='register-page__form__registration-code-input' type='text' name='registrationCode' autoComplete='one-time-code' value={this.state.userInfo.registrationCode} onChange={this.handleUserChange}/>
          <div className='register-page__buttons'>
            <SmallerGreenButton className='green-button' text='Register' type='submit' onClick={this.handleSubmit}/>
            <SmallerGreenButton className='green-button' text='Return to Title' type='button' clickHandler={this.handleRedirect}/>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Register)