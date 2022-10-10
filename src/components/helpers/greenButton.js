import React from 'react';
import { Link } from 'react-router-dom';

function GreenButton(props) {
    return (
      <Link className='green-button' to={props.toPage} text={props.text}>{props.text}</Link> 
    );
  }

export default GreenButton