import React, { useState } from 'react';
import { useLocation } from 'react-router';

import PageTitler from './helpers/pageTitler';
import Scanner from './scanner';

function ScanStudentId () {
  const location = useLocation()

  const [student, updateInfo] = useState({
    book: {
      ...location.state
    },
    student: {
      _id: "",
      first: "",
      last: "",
      role: "Student",
      class: "",
      public_id: "",
      email: "",
      password: "",
      loggedStatus: "",
      isAdmin: "NOT_ADMIN"
    }
  })

  return (
    <div>
      <PageTitler pagetitle="Student Id" />
      <Scanner returnedInfo = {(studentInfo) => updateInfo(studentInfo)} />
      <div className='student-info'>
        {student.student._id}
        {student.student.first}
        {student.student.last}
        {student.student.role}
        {student.student.class}
        {student.student.public_id}
        {student.student.email}
        {student.student.password}
        {student.student.loggedStatus}
        {student.student.isAdmin}
      </div>
    </div>
  );
}

export default ScanStudentId