import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


function Loading(props) {
  return (
    <div className={props.className}>
      <FontAwesomeIcon icon={solid("spinner")} spin />
    </div>
  );
}

export default Loading;