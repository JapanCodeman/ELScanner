import React, { Component } from 'react';
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';


export default class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      availableCameras: []
    }
  }
  
componentDidMount() {
  Html5Qrcode.getCameras().then(devices => {
    this.setState({
      availableCameras: devices
    })
    // if (devices && devices.length) {
      var cameraId = devices[0].id;
      const html5QrCode = new Html5Qrcode("qr-reader");

  html5QrCode.start(
    cameraId,     // retrieved in the previous step.
    {
      fps: 10,    // sets the framerate to 10 frame per second
      qrbox: 250  // sets only 250 X 250 region of viewfinder to
                  // scannable, rest shaded.
    },
    qrCodeMessage => {
      // do something when code is read. For example:
      this.props.returnedInfo(qrCodeMessage);
      html5QrCode.stop().then(ignore => {
        // QR Code scanning is stopped.
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
        // }
      }).catch(error => {
        console.log("There was an error in Html5Qrcode component in componentDidMount", error)})
        
      

  function onScanSuccess(decodedResult) {
    
  }

    let config = {
      fps: 10,
      qrbox: {width: 350, height: 300},
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  };

  var html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader", { facingMode: "environment" }, config);
  
  html5QrcodeScanner.render(onScanSuccess)
  }

  componentWillUnmount() {
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      // Stop failed, handle it.
    });
  }

  render () {
    return (
        <div id="qr-reader" />
    );
  }
}
