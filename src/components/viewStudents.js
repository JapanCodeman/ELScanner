import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageTitler from './helpers/pageTitler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import SmallerGreenButton from './helpers/smallerGreenButton';

function ViewStudents(props) {

  const [thisClass, setThisClass] = useState({
    class : '0-0'
  })
  const [students, setStudents] = useState([])

  const handleChange = (event) => {
    setThisClass({[event.target.name] : event.target.value})
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
      console.log(response)
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
        {/* {props[0] ? console.log(props[0]) : null} */}
        <select className='select-class' name='class' onChange={handleChange}>
          {props[0] ? props[0].map(thisClass => <option className='selected-class' key={thisClass.public_id} value={thisClass.class}>{thisClass.class}</option>) : null}
        </select>
      </div>

      <div className='student-results-wrapper'>
        {students ? students.map(student => <SmallerGreenButton key = {student.public_id} className='smaller-green-button' text={`${student.first} ${student.last}`} />) : null}
      </div>
    </div>
  );
}

export default ViewStudents;