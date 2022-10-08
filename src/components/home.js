import React from 'react';

import PageTitler from './helpers/pageTitler';

function Home(props) {

  return (
    <div className='home'>
      <PageTitler pagetitle='Home' />
      <div className='home__welcome'>
        Welcome back {props.first}
      </div>
      <div className='home__word-count'>
        Your total word count so far is: {props.totalWordCount}
      </div>
    </div>
  );
}

export default Home