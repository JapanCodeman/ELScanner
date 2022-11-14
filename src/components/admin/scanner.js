import React, { Component } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

import Loading from '../helpers/loading';

export default class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      availableCameras: [],
      loading: true
    }
  }

handleChange(event) {
  this.setState({
  [event.target.name] : event.target.value
  });
}

componentDidMount() {
  Html5Qrcode.getCameras().then(devices => {
    this.setState({
      availableCameras: devices
    })
    const html5QrCode = new Html5Qrcode("qr-reader");

  html5QrCode.start(
    { facingMode: "environment" },     // retrieved in the previous step.
    {
      fps: 20,    // sets the framerate to 10 frame per second
      qrbox: 350  // sets only 250 X 250 region of viewfinder to
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
      const availablePaths = ['/scan-student-id', '/scan-book-id']
      if (!availablePaths.includes(window.location.pathname)) {
        html5QrCode.stop().then(ignore => {
        })
      } 
      this.setState({loading: false})
      // console.log(`QR Code no longer in front of camera.`);
    })
  .catch(err => {
    // Start failed, handle it. For example,
    console.log(`Unable to start scanning, error: ${err}`);
  })
  .catch(error => {
    console.log("There was an error in Html5Qrcode component in componentDidMount", error)})
  })
}

  render () {
    return (
      <div className='scanner-wrapper'>
        {this.state.loading ? <Loading className='scanner-loader' /> : null}
        <div id="qr-reader" />
      </div>
    );
  }
}