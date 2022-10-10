import React from 'react';

import GreenButton from './helpers/greenButton';
import PageTitler from './helpers/pageTitler';

function AdminHome() {
  return (
    <div className='admin-home'>
      <PageTitler pagetitle = 'Administrator' />
      <div className='admin-home__buttons'>
        <GreenButton className='green-button' toPage='/scan-student-id' text='Scan Student ID' />
        <GreenButton className='green-button' toPage='/scan-book-id' text='Scan Book ID' />
        <GreenButton className='green-button' toPage='/view-students' text='View Students' />
        <GreenButton className='green-button' toPage='/view-class-progress' text='View Class Progress' />
      </div>
    </div>
  );
}

export default AdminHome