import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


function Loading() {
  return (
    <div className='loading-page'>
      <FontAwesomeIcon icon={solid("spinner")} spin />
    </div>
  );
}

export default Loading;