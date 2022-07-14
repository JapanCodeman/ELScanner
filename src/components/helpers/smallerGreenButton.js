import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SmallerGreenButton extends Component {
  render () {
    return (
        <Link className='smaller-green-button' to={this.props.toPage} text={this.props.text}>{this.props.text}</Link> 
    );
  }
}