import React, { useEffect } from 'react';

import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';

function AdminHome(props) {

  useEffect(() => {
    props.handleLoading(false)
    props.clearBook()
    props.clearStudent()
  }, [props])

  return (
    <div className='admin-home'>
      <PageTitler pagetitle = 'Administrator' />
      <div className='admin-home__buttons'>
        <GreenButton className='green-button' toPage='/scan-student-id' text='Scan Student ID' />
        <GreenButton className='green-button' toPage='/scan-book-id' text='Scan Book ID' />
        <GreenButton className='green-button' toPage='/view-students' text='View Students' />
        <GreenButton className='green-button' toPage='/view-class-progress' text='View Class Progress' />
        <GreenButton className='green-button' toPage='/view-classes' text='View or Edit Classes' />
        <GreenButton className='green-button-admin' toPage='/view-administrators' text='View Administrators' />
        <GreenButton className='green-button' toPage='/register-students' text='Register Students' />
      </div>
    </div>
  );
}

export default AdminHome;