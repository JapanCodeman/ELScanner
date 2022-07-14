import React, { Component } from 'react';
import Html5QrcodePlugin from './html5QrcodeScannerPlugin';
import ScannedBookResult from './scannedBookResult';

export default class ScanBookID extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      result: '',
      barcodeNumber: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.value]: event.target.name
    })
  }

  render () {
    return (
      <div>
        <h1>QR/Barcode Scanner Demo</h1>
        <Html5QrcodePlugin 
            fps={2}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
        <ScannedBookResult barcode={this.state.barcodeNumber} />
      </div>
    );
  }

  onNewScanResult(decodedText) {
    console.log("decoded text", decodedText) // return simple number of barcode
    // console.log("decoded result", decodedResult) // returns object which includes decodedText as string, format and type of barcode
    this.handleChange(this.state.barcodeNumber)
  }
}