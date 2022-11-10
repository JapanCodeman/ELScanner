import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Loading from '../helpers/loading';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function EditClass(props) {

  const location = useLocation()
  const navigate = useNavigate()

  const [thisClass, setThisClass] = useState(
    ...location.state
  )
  const [readerLeaders, setReaderLeaders] = useState()

  useEffect(() => {
    const getReaderLeaders = () => {
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          }
      }
      axios
      .post('https://elscanner-backend.herokuapp.com/get-reader-leaders', {"class" : thisClass.class}, config)
      .then(response => {
        setReaderLeaders(response.data)
      })
      .catch(error => {
        console.log("Error retrieiving reader leaders", error)
      })
    }
    getReaderLeaders()
  },[thisClass.class])

  const confirmClassChanges = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to change the class name? This will affect all students in the class.")) {
      await axios
      .post('https://elscanner-backend.herokuapp.com/update-class', {...thisClass}, config)
      .then(response => {
        if (response.status === 200) {
          window.alert(response.data)
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
        } else {
            console.log("Error in confirming class name change", error)
          }
      })
      navigate('/view-classes')
    }
  }

  const deleteThisClass = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("CLASS WILL BE DELETED - THIS WILL AFFECT ALL STUDENTS IN THE CLASS AND CANNOT BE UNDONE - ARE YOU SURE?")) {
      let config = {
        headers: {
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
        }
      console.log({"class" : thisClass.class})
      axios
      .delete(`https://elscanner-backend.herokuapp.com/delete-class/${thisClass.class}`, config)
      .then(response => {
        if (response.data === "CLASS_DELETED") {
          window.alert("Class deleted - returning to View Classes")
          navigate('/view-classes')
        } else {
          window.alert("Class could not be deleted")
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
        //   window.sessionStorage.removeItem('token')
        //   props.loginHandler({
        //     logged_status: "NOT_LOGGED_IN",
        //     userRole: ''
        //   })
        //   window.alert("SESSION_TIMEOUT - please login again - Please login")
        //   navigate('/login')
        // } else {
          console.log("Error in deleting class", error)
        }
      })
    }}

  const handleChange = (event) => {
    setThisClass({...thisClass, [event.target.name] : event.target.value})
  }

  const viewReaderLeader = (student) => {
    props.setStudent(student)
    navigate('/student-profile')
  }

  return (
    <div className='edit-class'>
      <PageTitler pagetitle='Edit Class' />
      <label className='classname-input-label'>Class Name</label>
      <input className='classname-input' type='text' name='class' defaultValue={thisClass.class} onChange={handleChange} />
      <label className='class-words-read-label'>Total Class Words Read</label>
      <div className='class-words-read'>{thisClass.classWordsRead}</div>
      <label className='class-total-books-read-label'>Total Class Books Read</label>
      <div className='class-total-books-read'>{thisClass.classTotalBooksRead}</div>
      <label className='class-number-of-students-label'>Number of Students</label>
      <div className='class-number-of-students'>{thisClass.numberOfStudents}</div>
      <label className='class-reader-leaders-label'>Class Reader leaders</label>
      <div className='reader-leaders-wrapper'>
      {readerLeaders ? readerLeaders.map(student => 
        <SmallerGreenButton 
          className='smaller-green-button' 
          text={`${student.first} ${student.last}`} 
          clickHandler={() => viewReaderLeader({...student})}
          key={student.public_id} 
        />) : <Loading className='mini-loader' />}
      <FunctionGreenButton className='green-button' text='Confirm Class Changes' onClick={confirmClassChanges} />
      <FunctionGreenButton className='delete-button' text='DELETE THIS CLASS' onClick={deleteThisClass} />
      </div>
    </div>
  );
}

export default EditClass;