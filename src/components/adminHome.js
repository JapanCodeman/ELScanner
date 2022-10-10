import React from 'react';

import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';

function AdminHome() {
  return (
    <div className='admin-home'>
      <PageTitler pagetitle = 'Administrator' />
      <GreenButton className='green-button' toPage='/scan-student-id' text='Scan Student ID' />
      <div className='await-wrapper__spacer' />
      <GreenButton className='green-button' toPage='/scan-book-id' text='Scan Book ID' />
    </div>
  );
}

export default AdminHome