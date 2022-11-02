import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function ViewAdministrators() {

  const navigate = useNavigate()

  const [administrators, setAdministrators] = useState()

  useEffect(() => {
    axios
    .get('https://elscanner-backend.herokuapp.com/get-all-administrators')
    .then(response => {
      console.log(response)
      setAdministrators(response.data)
    })
    .catch(error => {
      console.log('Error in useEffect ViewAdministrators', error)
    })
  }, [])

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