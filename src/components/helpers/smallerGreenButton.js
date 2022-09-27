import React from 'react';

function SmallerGreenButton(props) {
    return (
        <button className={props.className} text={props.text} type={props.typeSet} onClick={props.clickHandler}>{props.text}</button> 
    );
  }

export default SmallerGreenButton