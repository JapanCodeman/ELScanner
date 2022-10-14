import React from 'react';
import PageTitler from './helpers/pageTitler';

function StudentProfile(props) {
  return (
    <div>
      <PageTitler pagetitle={`${props.student.first} ${props.student.last}`} /> 
    </div>
  );
}

export default StudentProfile;