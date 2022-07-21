import React, { Component } from 'react';

export default class SmallerGreenButton extends Component {
  render () {
    return (
        <button className='smaller-green-button' text={this.props.text} onClick={this.props.clickHandler}>{this.props.text}</button> 
    );
  }
}