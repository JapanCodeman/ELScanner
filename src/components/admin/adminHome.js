import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';

function AdminHome(props) {

  const navigate = useNavigate()

  useEffect(() => {
    props.handleLoading(false)
    props.clearBook()
    props.clearStudent()
    const getAllClasses = () => {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
        }
      axios
      .get('https://elscanner-backend.herokuapp.com/get-all-classes', config)
      .then(response => {
        if (response.status === 200) {
          if (props.classes.length === 0) {
          props.setClasses(response.data)
          }
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          window.sessionStorage.removeItem('token')
          props.loginHandler({
            logged_status: "NOT_LOGGED_IN",
            userRole: ''
          })
          window.alert("SESSION_TIMEOUT - please login again - Please login")
          navigate('/login')
        }
        console.log("Error in getting classes", error)
      })
    }
    getAllClasses()
  })

  return (
    <div className='admin-home'>
      <PageTitler pagetitle = 'Administrator' />
      <div className='admin-home__buttons'>
        <GreenButton className='green-button' toPage='/scan-student-id' text='Scan Student ID' />
        <GreenButton className='green-button' toPage='/scan-book-id' text='Scan Book ID' />
        <GreenButton className='green-button' toPage='/view-students' text='View Students' />
        <GreenButton className='green-button' toPage='/view-class-progress' text='View Class Progress' />
        <GreenButton className='green-button' toPage='/view-classes' text='View or Edit Classes' />
        <GreenButton className='green-button' toPage='/view-administrators' text='View Administrators' />
        <GreenButton className='green-button' toPage='/register-students' text='Register Students' />
        <GreenButton className='green-button' toPage='/register-new-book' text='Manually Register Book' />
        <GreenButton className='green-button' toPage='/view-checked-out-books' text='View Checked Out Books' />
      </div>
    </div>
  );
}

export default AdminHome;