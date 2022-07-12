import React, { Component } from 'react';

export default class PageTitler extends Component {
  render () {
    return (
      <div className='page-titler'>
        {this.props.pagetitle}
      </div>
    );
  }
}