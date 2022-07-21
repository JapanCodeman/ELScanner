import React, { Component } from 'react';

export default class SmallerGreenButton extends Component {
  render () {
    return (
        <div className='smaller-green-button' text={this.props.text}>{this.props.text}</div> 
    );
  }
}