import React from 'react';

function BookInfo(props) {

  return (
    <div>
      {props.book.title}
    </div>
  );
}

export default BookInfo;