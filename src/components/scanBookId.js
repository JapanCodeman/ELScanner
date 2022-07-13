import React, { Component } from 'react';
import Html5QrcodePlugin from './html5QrcodeScannerPlugin';
import ScannedBookResult from './scannedBookResult';

export default class ScanBookID extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      result: [],
      text: []
    }

    this.onNewScanResult = this.onNewScanResult.bind(this);
  }
  render () {
    return (
      <div>
        <h1>QR/Barcode Scanner Demo</h1>
        <Html5QrcodePlugin 
            fps={10}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
        {this.state ? this.state.text.map(scanned => <ScannedBookResult result={scanned.result} text={scanned.text}/>) : null}
      </div>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    this.setState({
      result: [...decodedResult],
      text: [...decodedText]
    })
  }
}