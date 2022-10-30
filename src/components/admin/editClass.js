import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
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
      .post('http://127.0.0.1:5000/get-reader-leaders', {"class" : thisClass.class}, config)
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
    if (window.confirm("Are you sure you want to change the class name? This will affect all students in the class.")) {
      await axios
      .post('http://127.0.0.1:5000/update-class', {...thisClass})
      .then(response => {
        window.alert(response.data)
      })
      .catch(error => {
        console.log("Error in confirming class name change", error)
      })
      props.setUpdatesMade(true)
      navigate('/view-classes')
    }
  }

  const deleteThisClass = () => {
    if (window.confirm("CLASS WILL BE DELETED - THIS WILL AFFECT ALL STUDENTS IN THE CLASS AND CANNOT BE UNDONE - ARE YOU SURE?")) {
    axios
    .delete('http://127.0.0.1:5000/delete-class', {data : {"class" : thisClass.class}})
    .then(response => {
      if (response.data === "CLASS_DELETED") {
        window.alert("Class deleted - returning to View Classes")
        navigate('/view-classes')
      } else {
        window.alert("Class could not be deleted")
      }
    })
    .catch(error => {
      console.log("Error in deleting class", error)
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
        />) : <div className='no-readers'>None yet... GET READING!!!</div>}
      <FunctionGreenButton className='green-button' text='Confirm Class Changes' onClick={confirmClassChanges} />
      <FunctionGreenButton className='delete-button' text='DELETE THIS CLASS' onClick={deleteThisClass} />
      </div>
    </div>
  );
}

export default EditClass;