import React from 'react';

function FunctionGreenButton(props) {
  return (
    <div className={props.className} text={props.text} style={props.style} onClick={props.onClick}>{props.text}</div> 
  );
}

export default FunctionGreenButton;