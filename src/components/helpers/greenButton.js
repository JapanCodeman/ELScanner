import React from 'react';
import { Link } from 'react-router-dom';

function GreenButton(props) {
    return (
      <Link className={props.className} to={props.toPage} text={props.text} onClick={props.handleClick}>{props.text}</Link> 
    );
  }

export default GreenButton