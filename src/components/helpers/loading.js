import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';

function Loading() {
  return (
    <div className='loading-page'>
      <FontAwesomeIcon className='spinner' icon="fa-solid fa-spinner" spin />
    </div>
  );
}

export default Loading