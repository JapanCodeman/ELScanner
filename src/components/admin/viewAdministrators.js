import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function ViewAdministrators(props) {

  const navigate = useNavigate()

  const [administrators, setAdministrators] = useState()

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }  
    axios
    .get('https://elscanner-backend.herokuapp.com/get-all-administrators', config)
    .then(response => {
      if (response.status === 200) {
        setAdministrators(response.data)
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
      console.log('Error in useEffect ViewAdministrators', error)
    })
  })

  const adminEdit = (administrator) => {
    navigate('/admin-profile', {state: [administrator]})
  }
  
  return (
    <div className='view-administrators'>
      <PageTitler pagetitle='View Admins' />
      <div className='buttons-wrapper'>
        {administrators ? administrators.map(administrator => 
          <SmallerGreenButton 
            className='smaller-green-button' 
            text={`${administrator.first} ${administrator.last}`} 
            clickHandler={() => adminEdit(administrator.public_id)} 
            key={administrator.public_id} 
          />) 
          : 
          <Loading className='loader' />}
      </div>
    </div>
  );
}

export default ViewAdministrators;