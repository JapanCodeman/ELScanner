import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import FunctionGreenButton from '../helpers/functionGreenButton';
import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';

function AdminProfile(props) {

  const navigate = useNavigate()
  const location = useLocation()

  const [admin, setAdmin] = useState({
    ...location.state
  })

  useEffect(() => {
    const config = {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    };
    axios
    .get(`htts://elscanner-backend.herokuapp.com/lookup-user/${location.state}`, config)
    .then(response => {
      setAdmin(response.data)
    })
    .catch(error => {
      console.log('There was an error retrieving the admin info', error)
    })
    props.handleLoading(false)
    }, [location.state, props])

    const resetAdminPassword = () => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`You are about to reset ${admin.first} ${admin.last}'s password. They will set a new password on their next login. Continue?`)) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
      }
      axios
      .post('htts://elscanner-backend.herokuapp.com/delete-password', {"public_id" : admin.public_id}, config)
      .then(response => {
        if (response.status === 200) {
        window.alert(`You have reset ${admin.first} ${admin.last}'s password.`)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          window.alert('SESSION_TIMEOUT')
        }
        console.log('Error resetting admin password', error)
      })
    }}

    const deleteAdminAccount = () => {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
      }
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`YOU ARE ABOUT TO DELETE ${admin.first} ${admin.last}'S ACCOUNT! THIS ACTIONS IS IRREVERSIBLE! ARE YOU SURE?`)) {
        window.alert('Account deleted - returning to View Administrators') // this displays even before last admin alert; this can be handled in the front end
        axios
        .delete(`htts://elscanner-backend.herokuapp.com/delete-a-user/${admin.public_id}`, config)
        .then(response => {
          if (response.data === 'USER_DELETED') {
            navigate('/view-administrators')
          }
          if (response.data === 'LAST_ADMIN') {
            return window.alert('One admin account must remain active. Please register another admin account before deleting this account.')
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.sessionStorage.removeItem('token')
            window.alert('SESSION_TIMEOUT - please login again')
            navigate('/login')
          }
          console.log("Error in deleting admin account", error)
        })
      }
    }

  return (
    <div className='admin-profile'>
      {admin.first !== undefined ?
      <div>
        <PageTitler pagetitle={`${admin.first} ${admin.last}`} />
        <div className='buttons-wrapper'>
          <FunctionGreenButton 
            className='green-button' 
            text='Reset Password' 
            onClick={resetAdminPassword} 
          />
          <FunctionGreenButton 
            className='green-button' 
            text='Delete This Account' 
            onClick={deleteAdminAccount} 
          />
        </div>
      </div>

      :
      
      <Loading className='loading-page' />}
    </div>
  );
}

export default AdminProfile;