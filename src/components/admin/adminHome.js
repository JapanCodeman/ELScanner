import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import FunctionGreenButton from '../helpers/functionGreenButton';

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
      .get('http://127.0.0.1:5000/get-all-classes', config)
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

  const requestAdminRegistrationCode = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }
    let publicId = props.public_id
    axios.post('http://127.0.0.1:5000/request-admin-registration-code', publicId, config)
    .then(response => {
      window.alert(`Use this code to register a new administrator: ${response.data}`)
    })
    .catch(error => {
      console.log('Error retrieving admin registration code', error)
    })
  }

  const requestSystemReset = () => {
    props.handleLoading(true)
    let configSet = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }
    const userInfo = jwtDecode(window.sessionStorage.getItem('token'))
    const publicId = userInfo.sub.public_id
    axios.get('http://127.0.0.1:5000/check-year-reset-count', configSet, userInfo, { withCredentials: true })
    .then(response => {
      props.handleLoading(false)
      if (response.data === "TIME_DELTA_ERROR") {
        window.alert("This function is only available after March 20th of the current year.")
        return
      }
      if (response.data === 1) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("YOU ARE ABOUT TO RESET THE ELSCANNER SYSTEM. THIS ACTION IS IRREVERSIBLE AND SHOULD ONLY BE PERFORMED AT THE END OF THE YEAR. DO YOU WISH TO RESET THE SYSTEM AND REMOVE ALL CLASS AND STUDENT INFORMATION?")) {
          props.handleLoading(true)
          window.alert("SYSTEM RESET IN PROGRESS - THIS WILL TAKE A FEW MOMENTS - PLEASE DO NOT LEAVE THE PAGE")
          axios.post('http://127.0.0.1:5000/year-reset', publicId, configSet, { withCredentials: true })
          .then(response => {
            if (response.data === "SYSTEM_RESET_TEST_COMPLETE") {
              window.alert("System reset complete. Please assign new classes before allowing students to login to select their new class.")
              props.handleLoading(false)
            } else if (response.data === "ADMIN_REQUEST_FAILED") {
              window.alert("The system reset has failed. Error in system reset function adminHome.js")
              props.handleLoading(false)
            } else if (response.data === 'YEAR_REQUEST_SUCCESS') {
              props.yearResetRequestCallback()
              window.alert("Your request to reset the system has been submitted. Please request another administrator to submit their request to complete the process.")
              props.handleLoading(false)
            }
          })
          .catch(error => {
            console.log('There has been an error in adminHome.js', error)
            props.handleLoading(false)
          }) 
        } else {
          window.alert("System reset aborted. If a system reset is not necessary, please tell other administrators to check their account and withdraw their system reset requests.")
          props.handleLoading(false)
        }
      } 
    })
  }

  const revokeSystemReset = () => {
    props.handleLoading(true)
    const userInfo = jwtDecode(window.sessionStorage.getItem('token'))
    const publicId = userInfo.sub.public_id
    let configSet = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }
    axios.post('http://127.0.0.1:5000/revoke-system-reset-request', publicId, configSet, { withCredentials: true})
    .then(response => {
      props.handleLoading(false)
      if (response.data === "SYSTEM_RESET_REQUEST_REVOKED") {
        props.yearResetRequestCallback()
        window.alert('You have removed your request to reset the system.')
      } else {
        window.alert('There was an error.')
      }
    })
    .catch(error => {
      console.log("Error in revokeSystemReset function", error)
    })
  }

  const renderReset = () => {
    return !props.yearResetRequest ?           
    <FunctionGreenButton className='green-button' text='Year End Reset' style={{backgroundColor: 'red'}} onClick={() => requestSystemReset()} />
    :
    <FunctionGreenButton className='green-button' text='Undo System Reset Request' onClick={() => revokeSystemReset()} disabled={true}/>
  }

  let today = new Date();
  let march20th = new Date(today.getFullYear(), 2, 20);
  let april15 = new Date(today.getFullYear(), 3, 15);
  let dateCheck = today > march20th && today < april15 // Does this work?

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
        <FunctionGreenButton className='green-button' text='Get Admin Registration Code' style={{fontSize: '4vh'}} onClick={() => requestAdminRegistrationCode()} />
        {dateCheck ? renderReset() : null}
      </div>
    </div>
  );
}

export default AdminHome;