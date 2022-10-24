import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageTitler from './helpers/pageTitler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import SmallerGreenButton from './helpers/smallerGreenButton';
import { useNavigate } from 'react-router';

function ViewStudents(props) {

  const navigate = useNavigate()

  const [thisClass, setThisClass] = useState({
    class : '0-0'
  })
  const [students, setStudents] = useState([])

  const handleChange = (event) => {
    setThisClass({[event.target.name] : event.target.value})
  }

  const toStudentProfile = (public_id) => {
    axios
    .get(`http://127.0.0.1:5000/lookup-user/${public_id}`)
    .then(student => {
      props.handleSetStudent({...student.data})
      navigate('/student-profile')
    })
    .catch(error => {
      console.log("There was an error in lookupUser function", error)
    })
  }

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
    }
    axios
    .post('http://127.0.0.1:5000/students-by-class', {...thisClass}, config)
    .then(response => {
    setStudents(response.data)
  }).catch(error => {
    console.log("There was an error retrieving students", error)
  })
}, [thisClass])

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
          {props[0] ? props[0].map(thisClass => <option className='selected-class' key={thisClass.public_id} value={thisClass.class}>{thisClass.class}</option>) : null}
        </select>
      </div>

      <div className='student-results-wrapper'>
        {students ? students.map(student => <SmallerGreenButton key = {student.public_id} className='smaller-green-button' text={`${student.first} ${student.last}`} clickHandler={() => toStudentProfile(student.public_id)} />) : null}
      </div>
    </div>
  );
}

export default ViewStudents;