import React, { Component } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      availableCameras: []
    }
  }

handleChange(event) {
  this.setState({
  [event.target.name] : event.target.value
  });
}
  
componentDidMount() {
  console.log(window.location.pathname) // "/scan-student-id"
  Html5Qrcode.getCameras().then(devices => {
    this.setState({
      availableCameras: devices
    })
    const html5QrCode = new Html5Qrcode("qr-reader");

  // if (this.state.availableCameras.length > 0) {
  //   this.setState({cameraToBeUsed : devices[0]})
  // } else {
  //   this.setState({cameraToBeUsed : {facingMode: "environment"}})
  // }

  html5QrCode.start(
    { facingMode: "environment" },     // retrieved in the previous step.
    {
      fps: 2,    // sets the framerate to 10 frame per second
      qrbox: 250  // sets only 250 X 250 region of viewfinder to
                  // scannable, rest shaded.
    },
    qrCodeMessage => {
      // do something when code is read. For example:
      html5QrCode.stop().then(ignore => {
        // QR Code scanning is stopped.
      }).catch(err => {
        // Stop failed, handle it.
        console.log("Unable to stop scanning.", err);
      });
      this.props.returnedInfo(qrCodeMessage);
    },
    errorMessage => {
      // parse error, ideally ignore it. For example:
      console.log(`QR Code no longer in front of camera.`);
    })
  .catch(err => {
    // Start failed, handle it. For example,
    console.log(`Unable to start scanning, error: ${err}`);
  })
  .catch(error => {
    console.log("There was an error in Html5Qrcode component in componentDidMount", error)})
  })
}

componentWillUnmount() {
  console.log("camera unmounted")
}

  render () {
    return (
        <div id="qr-reader" />
    );
  }
}