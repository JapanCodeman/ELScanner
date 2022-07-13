import React, { Component } from 'react';
import Html5QrcodePlugin from './html5QrcodeScannerPlugin';

export default class ScanBookID extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Text: '',
      Result: ''
    }
  }
  render () {
    return (
      <div>
        <h1>Html 5Qrcode React example!</h1>
        <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
        <div className='decodedText'>{this.state.decodedText}</div>
        <div className='decodedResult'>{this.state.decodedResult}</div>
      </div>);
  }

  onNewScanResult(decodedText, decodedResult) {
    this.setState({
      Text: {decodedText},
      Result: {decodedResult}
    })
  }
}