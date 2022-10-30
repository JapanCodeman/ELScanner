import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import FunctionGreenButton from '../helpers/functionGreenButton';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function EditClass(props) {

  const location = useLocation()

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

  const handleChange = (event) => {
    setThisClass({...thisClass, [event.target.name] : event.target.value})
  }



  return (
    <div className='edit-class'>
      <PageTitler pagetitle='Edit Class' />
      <label className='classname-input-label'>Class Name</label>
      <input className='classname-input' type='text' name='class' defaultValue={thisClass.class} onChange={handleChange} />
      <label className='class-words-read-label'>Total Class Words Read</label>
      <input className='class-words-read' type='number' name='classWordsRead' defaultValue={thisClass.classWordsRead} onChange={handleChange} />
      <label className='class-total-books-read-label'>Total Class Books Read</label>
      <div className='class-total-books-read'>{thisClass.classTotalBooksRead}</div>
      <label className='class-number-of-students-label'>Number of Students</label>
      <div className='class-number-of-students'>{thisClass.numberOfStudents}</div>
      <label className='class-reader-leaders-label'>Class Reader leaders</label>
      <div className='class-reader-leaders'>Reader Leaders</div>
      <div className='reader-leaders-wrapper'>
      {readerLeaders?.map(student => 
        <SmallerGreenButton 
          className='smaller-green-button' 
          text={`${student.first} ${student.last}`} 
          clickHandler={() => console.log(student.first)} 
        />)} : {<div className='no-readers'>None yet... GET READING!!!</div>}
      <FunctionGreenButton className='delete-button' text='DELETE THIS CLASS' onClick={() => console.log('class deleted')} />
      </div>
    </div>
  );
}

export default EditClass;