import React, { Component } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

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
      <BarcodeScannerComponent
        width={100}
        height={100}
        onUpdate={(err, result) => {
          if (result) this.setState({
            data: result.text}
            );
          else this.setState({
            data: "Not Found"
          });
        }}
      />
      <p>{this.state.data}</p>
      </div>
    );
  }
}