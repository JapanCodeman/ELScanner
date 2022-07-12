import React, { Component } from 'react';

export default class ScanStudentID extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: "Not Found"
    }
  }
  render () {
    return (
      <div>
        Scanning Component goes here...
      </div>
    );
  }
}