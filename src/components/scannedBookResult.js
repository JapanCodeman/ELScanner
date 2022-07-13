import React, { Component } from 'react';

export default class ScannedBookResult extends Component {
  render () {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}