import React, { Component } from 'react';
import PageTitler from './helpers/pageTitler';

export default class Login extends Component {
  constructor() {
    super() 

    this.state = {
      username: '',
      password: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.value]: event.target.name
    })
  }

  render () {
    return (
      <div className='login-page'>
        <PageTitler pagetitle='Login' />
        <div className='login-page__input-wrapper'>
          <form>
            <label className='login-page__username-label'>Username</label>
            <input className='login-page__username-input' type='text' name='username' autoComplete='username' onChange={this.handleChange} />
            <label className='login-page__password-label'>Password</label>
            <input className='login-page__password-input' type='password' name='password' autoComplete='current-password' onChange={this.handleChange}/>
          </form>
        </div>
      </div>
    );
  }
}