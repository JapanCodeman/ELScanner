import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './styles/main.scss';

import AdminHome from './components/admin/adminHome';
import BookInfo from './components/admin/bookInfo';
import CheckoutConfirm from './components/admin/checkoutConfirm';
import ClassReset from './components/student/classReset';
import CreateClass from './components/admin/createClass';
import EditClass from './components/admin/editClass';
import Header from './components/header';
import Home from './components/student/home';
import Loading from './components/helpers/loading.js';
import Login from './components/login';
import MyClass from './components/student/myClass';
import Register from './components/register';
import RegisterNewBook from './components/admin/registerNewBook';
import RegisterStudents from './components/admin/registerStudents';
import ScanStudentID from './components/admin/scanStudentId';
import ScanBookID from './components/admin/scanBookId';
import StudentProfile from './components/admin/studentProfile';
import Title from './components/title';
import PageNotFound from './components/pageNotFound';
import ViewAdministrators from './components/admin/viewAdministrators';
import ViewClasses from './components/admin/viewClasses';
import ViewClassProgress from './components/admin/viewClassProgress';
import ViewStudents from './components/admin/viewStudents';
import PasswordReset from './components/passwordReset';
import AdminProfile from './components/admin/adminProfile';
import ViewCheckedOutBooks from './components/admin/viewCheckedOutBooks';

  function App() {

    const [user, setUser] = useState({
      logged_status: 'NOT_LOGGED_IN',
      userRole: ''
    })

    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState()
    const [student, setStudent] = useState()
    const [classes, setClasses] = useState([])
    const [classNames, setClassNames] = useState([])


  const adminAuthorizedPages = () => {
    return [
      <Route path = '/admin-home' element = {<AdminHome {...user} handleLoading={handleLoading} clearBook={clearBook} clearStudent={clearStudent} setClasses={setClasses} classes={[...classes]} loginHandler={setUser} yearResetRequestCallback={yearResetRequest}/>} key = {'admin-home'} />,
      <Route path = '/admin-profile' element = {<AdminProfile handleLoading={handleLoading} />} key = {'admin-profile'} />,
      <Route path = '/book-info' element = {<BookInfo {...book} clearBook={clearBook} clearStudent={clearStudent} />} handleLoading={handleLoading} key = {'book-info'} />,
      <Route path = '/checkout-confirm' element = {<CheckoutConfirm {...book} {...student} clearBook={clearBook} clearStudent={clearStudent} />} key = {'checkout-confirm'} />,
      <Route path = '/create-class' element = {<CreateClass loginHandler={setUser}/>} key = 'create-class' />,
      <Route path = '/edit-class' element = {<EditClass setStudent={setStudent} loginHandler={setUser}/>} key = 'edit-class' />,
      <Route path = '/password-reset' element={<PasswordReset />} key = {'password-reset'} />,
      <Route path = '/register-new-book' element={<RegisterNewBook {...student} handleLoading={handleLoading} />} key = {'register-new-book'} />,
      <Route path = '/register-students' element={<RegisterStudents classes={[...classes]} handleLoading={handleLoading} />} key = {'register-students'} />,
      <Route path = '/scan-book-id' element={<ScanBookID {...user} {...student} clearBook={clearBook} clearStudent={clearStudent} handleSetBook={setBook} loginHandler={setUser}/>} key = {'scan-book-id'} />,
      <Route path = '/scan-student-id' element={<ScanStudentID {...user} {...book} clearStudent={clearStudent} handleSetStudent={setStudent} handleLoading={handleLoading} />} key = {'scan-student-id'} />,
      <Route path = '/student-profile' element={<StudentProfile {...student} classes={classNames} clearBook={clearBook} clearStudent={clearStudent} handleLoading={handleLoading} setNewStudentClassCallback={setNewStudentClass} />} key = 'student-profile' />,
      <Route path = '/view-administrators' element={<ViewAdministrators handleLoading={handleLoading} />} key = {'view-administrators'} />, 
      <Route path = '/view-checked-out-books' element={<ViewCheckedOutBooks handleSetBook={setBook} />} key = {'view-checked-out-books'} />,
      <Route path = '/view-class-progress' element={<ViewClassProgress />} key = {'view-class-progress'} />,
      <Route path = '/view-classes' element={<ViewClasses />} key = {'view-classes'} />,
      <Route path = '/view-students' element={<ViewStudents {...loading} {...[classes]} handleSetStudent = {setStudent} />} key = {'view-students'} />
    ]
  }

  const yearResetRequest = () => {
    setUser(
      {...user,
      yearResetRequest: !user.yearResetRequest}
    )
  }

  const clearBook = () => {
    setBook()
  }

  const clearStudent = () => {
    setStudent()
  }

  const setNewStudentClass = () => {
    console.log('setNewStudentClass fired')
    setStudent()
  }

  const userAuthorizedPages = () => {
      return [
        <Route path = '/home' element = {<Home {...user} handleLoading = {handleLoading} />} key = {'home'} />,
        <Route path = '/my-class' element = {<MyClass {...user} handleLoading = {handleLoading} />} key = {'my-class'} />,
        <Route path = '/password-reset' element={<PasswordReset />} key = {'password-reset'} />
      ]
  }

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        }
    }
    axios
    .get('https://elscanner-backend.herokuapp.com/get-all-class-names', config)
    .then(response => {
      setClassNames(response.data)
    })
    .catch(error => {
      console.log("There was an error getting the class names", error)
    })
  }, [classes])

  useEffect(() => {
    const loadingOnRefresh = async () => {
      if (window.sessionStorage.getItem('token')) {
        const decodedToken = jwtDecode(window.sessionStorage.getItem('token'))
          let config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }
        await axios.get(`https://elscanner-backend.herokuapp.com/lookup-user/${decodedToken.sub.public_id}`, config)
        .then(response => {
          if (response.status === 200) {
            setUser({
              logged_status: 'LOGGED_IN',
              ...response.data
            })
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.sessionStorage.removeItem('token')
            setUser({
              logged_status: "NOT_LOGGED_IN",
              userRole: ''
            })
            window.alert("SESSION_TIMEOUT - please login again - Please login")
            window.location.assign('/login') // untested
          }
          console.log('error in useEffect() in root App', error)
        })
      } else if (user.status === "LOGGED_IN" && !window.sessionStorage.getItem('token')) {
        console.log("no token")
      }
      setLoading(false)
    }
    loadingOnRefresh();
  }, [user.status])
  
  const handleLoading = (bool) => {
    setLoading(bool)
  }

  const handleSuccessfulLogout = () => {
    setUser({
      logged_status: 'NOT_LOGGED_IN'
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header {...user} logoutHandler={handleSuccessfulLogout}/>
          {loading === true ? (<Loading className='loading-page' />) : 
          <Routes>
            {user.userRole === 'Administrator' && user.logged_status === 'LOGGED_IN' ?
            adminAuthorizedPages() : null}
            {user.userRole === 'Student' && user.logged_status === "LOGGED_IN" ?
            userAuthorizedPages() : null}
            <Route exact path = '/' element={<Title />} />
            <Route path = '/class-reset' element={<ClassReset {...user} classNames={classNames} setLoading={setLoading} />} /> 
            <Route path = '/login' element={<Login {...user} handleLoading={handleLoading} loginHandler={setUser}/>} />
            <Route path = '/register' element={<Register classNames={classNames} handleLoading={handleLoading}/>} />
            <Route path = '*' element={<PageNotFound {...user} />} />
          </Routes>
          }
        </Router>
      </header>
    </div>
  );
}

export default App;
