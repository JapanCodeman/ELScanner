import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';
import SmallerGreenButton from '../helpers/smallerGreenButton';

function StudentProfile(props) {

  const navigate = useNavigate()

  const [holdingBooks, setHoldingBooks] = useState({
    holdingBooks: []
  })
  const [storeClass] = useState({
    class : ""
  })
  const [classChange, setClassChange] = useState({})

  const [newClassOptions, setNewClassOptions] = useState({
    newClassOptions: []
  })

  useEffect(() => {
    if (newClassOptions.newClassOptions.includes(classChange)) {
      console.log(`class was changed as classChange is ${classChange} which is included in newClassOptions which is ${newClassOptions.newClassOptions}`)
      if (window.confirm(`Would you like to change ${props.first} ${props.last}'s class to from ${props.class} to ${classChange}?`)) {
        let config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
          }
        console.log(`classChange is ${classChange}`)
        let student_class_info = {
          "public_id": props.public_id,
          "class": classChange
        }
        console.log(student_class_info)
        axios.post('http://127.0.0.1:5000/update-student-class', student_class_info, config)
        .then(response => {
          console.log(response)
          window.alert(`${props.first} ${props.last}'s class updated to ${classChange}. Please find them in the new class by searching again. Navigating to admin home.`)
          navigate('/admin-home')
        })
        .catch(error => {
          console.log('There was an error in updating the student class', error)
        })
      }
    } else {
      console.log(`class was not changed as classChange is ${classChange} which is not included in newClassOptions which is ${newClassOptions.newClassOptions}`)
    }
  }, [classChange, newClassOptions, props.first, props.last, props.class, props.public_id, navigate])


  useEffect(() => { 
    let classArrayCopy = props.classes.slice()
    let currentClass = classArrayCopy.indexOf(props.class)
    classArrayCopy.splice(currentClass, 1)
    setNewClassOptions({
      newClassOptions: classArrayCopy
    })
  }, [props.class, props.classes])



  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }        
    axios.post('http://127.0.0.1:5000/retrieve-checked-out-books', {"checkedOutBooks" : props.checkedOutBooks}, config)
    .then(response => {
      setHoldingBooks(response.data)
    })
    .catch(error => {
      console.log("error in useEffect on studentProfile.js", error)
    })
    if (!props.public_id) {
      navigate(-1)
    }
  }, [props.public_id, props.class, props.classes, props.checkedOutBooks, props.student, navigate])


  function checkBookIn(book) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }   
    let studentAndBookUPC = {
      student : props.public_id,
      book : book,
      wordCount : book.wordCount
    }
    axios
    .post('http://127.0.0.1:5000/check-book-in', {studentAndBookUPC}, config)
    .then(response => {
      if (response.status === 200) {
        window.alert(`${response.data}`)
        props.clearStudent()
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
        console.log("Error in checkBookIn() in studentProfile.js", error)
        } 
    })
    navigate('/admin-home')
  }

  function checkBookOut() {
    navigate('/scan-book-id')
  }

  function deleteStudentAccount() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`You are about to delete ${props.first} ${props.last}'s account. This action is irreversible. Continue?`)) {
      props.handleLoading(true)
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
          }
        }
      axios
      .delete(`http://127.0.0.1:5000/delete-a-user/${props.public_id}`, config)
      .then(response => {
        if (response.data === 'USER_DELETED') {
        window.alert('Student Deleted - back to view students')
        props.handleLoading(false)
        navigate('/view-students', {class : storeClass.class})
      }})
      .catch(error => {
        if (error.response.status === 401) {
          window.sessionStorage.removeItem('token')
          window.alert('SESSION_TIMEOUT - please login again')
          navigate('/login')
        }
        console.log("Error deleting student", error)
      })
    } else {
      window.alert('Student account deletion cancelled.')
    }
  }

  function handleChange(event) {
    setClassChange(event.target.name = event.target.value);
  }

  function resetPassword() {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
        }
      }
      axios
      .post('http://127.0.0.1:5000/delete-password', {"public_id" : props.public_id}, config)
      .then(response => {
        if (response.status === 200) {
          window.alert(`Password for ${props.first} ${props.last} reset. Their temporary password is ${response.data.temporaryPassword}. They should log in with this password and they will be redirected to set their own password.`)
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
        console.log("Error in resetPassword()", error)
      })
  }
    
  return (
    <div className='student-profile'>
      <PageTitler pagetitle={`${props.first} ${props.last}`} />
      <label className='select-student-new-class-label'>Class</label>
      <select className='select-student-new-class' name='classChange' onChange={handleChange}>
          <option value={props.class}>{props.class}</option>
          {newClassOptions.newClassOptions?.map(_class => <option value={_class} key={_class}>{_class}</option>)}
      </select>
      <label className='words-read-label'>Words Read:</label>
      <div className='words-read'>{props.wordsRead}</div>
      <label className='total-books-read-label'>Total Books Read:</label>
      <div className='total-books-read'>{props.totalBooksRead}</div>
      <label className='checked-out-books-label'>Checked Out List:</label>
      <div className='checked-out-books-wrapper'>
      {holdingBooks[0] !== undefined ? holdingBooks.map(book => 
        <SmallerGreenButton 
          className='smaller-green-button'
          text={book.title}
          typeSet='button'
          clickHandler={() => checkBookIn(book.upc)}
          key={book._id}
          />)
          
          : 
          
        <div className='no-checked-out-books'>No Books Checked Out</div>}
      </div>

      <div className='other-options'>
        <SmallerGreenButton
          className='smaller-green-button'
          text={`Check Book out to ${props.first} ${props.last}`}
          typeSet='button'
          clickHandler={checkBookOut}
          />
        <SmallerGreenButton 
          className='reset-password-button'
          text='Reset Password'
          typeSet='button'
          clickHandler={resetPassword}
          />

        <SmallerGreenButton
          className='delete-student-account'
          text='Delete Account'
          typeSet='button'
          clickHandler={deleteStudentAccount}
          />
        <GreenButton className='green-button' toPage='/admin-home' text='Return to Admin Home' />
      </div>
    </div>
  );
}

export default StudentProfile;