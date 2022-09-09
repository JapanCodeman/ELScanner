import React, { Component } from 'react';
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';


export default class ScanBookID extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bookId: ''
    }
  }
  
  componentDidMount() {
    Html5Qrcode.getCameras().then(devices => {
      console.log(devices);
      if (devices && devices.length) {
        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode("qr-reader");

html5QrCode.start(
  cameraId,     // retreived in the previous step.
  {
    fps: 10,    // sets the framerate to 10 frame per second
    qrbox: 250  // sets only 250 X 250 region of viewfinder to
                // scannable, rest shaded.
  },
  qrCodeMessage => {
    // do something when code is read. For example:
    this.setState({
      bookId: qrCodeMessage
    });
    html5QrCode.stop().then(ignore => {
      // QR Code scanning is stopped.
      console.log("QR Code scanning stopped.");
    }).catch(err => {
      // Stop failed, handle it.
      console.log("Unable to stop scanning.", err);
    });
  },
  errorMessage => {
    // parse error, ideally ignore it. For example:
    console.log(`QR Code no longer in front of camera.`);
  })
.catch(err => {
  // Start failed, handle it. For example,
  console.log(`Unable to start scanning, error: ${err}`);
});
      }
    }).catch(error => {
      console.log("There was an error in Html5Qrcode component in componentDidMount", error)})
    

    function onScanSuccess(decodedResult) {
      console.log(decodedResult)
    }
    let config = {
      fps: 10,
      qrbox: {width: 250, height: 250},
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", config);
    html5QrcodeScanner.render(onScanSuccess);
  }

  render () {
    return (
      <div>
        <div id="qr-reader" style={{width: 600, height: 600}} />
      </div>
    );
  }
}