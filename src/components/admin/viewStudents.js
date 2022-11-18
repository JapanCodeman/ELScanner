import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Loading from '../helpers/loading';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';


function ViewStudents(props) {

  const navigate = useNavigate()

  const [thisClass, setThisClass] = useState({
    class : '0-0'
  })
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])

  const handleChange = (event) => {
    setThisClass({[event.target.name] : event.target.value})
  }

  const toStudentProfile = (public_id) => {
    const config = {
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    };
    axios
    .get(`htts://elscanner-backend.herokuapp.com/lookup-user/${public_id}`, config)
    .then(student => {
      props.handleSetStudent({...student.data})
      navigate('/student-profile')
    })
    .catch(error => {
      console.log("There was an error in lookupUser function", error)
    })
  }

  useEffect(() => {
    setLoading(true)
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
      }
    axios
    .post('htts://elscanner-backend.herokuapp.com/students-by-class', {...thisClass}, config)
    .then(response => {
      if (response.status === 200) {
        setStudents(response.data)
        setLoading(false)
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
      console.log("There was an error retrieving students", error)
    })
  }, [thisClass, navigate, props])

  if (props === undefined) {
    return (
      <FontAwesomeIcon className='loader' icon={solid("spinner")} spin />
    )
  }

  return (
    <div className='view-students-wrapper'>
      <PageTitler pagetitle='View Students' />
      <div className='class-selector'>
        <label className='select-class-label'>Select Class</label>
        <select className='select-class' defaultValue={thisClass.class} name='class' onChange={handleChange}>
          <option value style={{display:"none"}}>select class</option>
          {props[0] ? props[0].map(thisClass => <option className='selected-class' key={thisClass.public_id} value={thisClass.class}>{thisClass.class}</option>) 
          : 
          null}
        </select>
      </div>

      <div className='student-results-wrapper'>
        {(thisClass.class) ? students.map(student => <SmallerGreenButton key = {student.public_id} className='smaller-green-button' text={`${student.first} ${student.last}`} clickHandler={() => toStudentProfile(student.public_id)} />) 
        : 
        null}
        
        {loading ? <Loading className='mini-loader' /> : null}
      </div>
    </div>
  );
}

export default ViewStudents;