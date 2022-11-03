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
    axios
    .get(`https://elscanner-backend.herokuapp.com/lookup-user/${location.state}`)
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
          'Access-Control-Allow-Origin': '*'
          }
      }
      axios
      .post('https://elscanner-backend.herokuapp.com/delete-password', {"public_id" : admin.public_id}, config)
      .then(response => {
        console.log(`Password for ${admin.first} ${admin.last}`, response)
        window.alert(`You have reset ${admin.first} ${admin.last}'s password.`)
      })
      .catch(error => {
        console.log('Error resetting admin password', error)
      })
    }}

    const deleteAdminAccount = () => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`YOU ARE ABOUT TO DELETE ${admin.first} ${admin.last}'S ACCOUNT! THIS ACTIONS IS IRREVERSIBLE! ARE YOU SURE?`)) {
        window.alert('Account deleted - returning to View Administrators') // this displays even before last admin alert; this can be handled in the front end
        axios
        .delete(`https://elscanner-backend.herokuapp.com/delete-a-user/${admin.public_id}`)
        .then(response => {
          if (response.data === 'USER_DELETED') {
            navigate('/view-administrators')
          }
          if (response.data === 'LAST_ADMIN') {
            return alert('One admin account must remain active. Please register another admin account before deleting this account.')
          }
        })
        .catch(error => {
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