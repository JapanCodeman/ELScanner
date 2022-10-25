import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from './components/history';
import jwtDecode from 'jwt-decode';
import './styles/main.scss';

import AdminHome from './components/adminHome';
import BookInfo from './components/bookInfo';
import CheckoutConfirm from './components/checkoutConfirm';
import Header from './components/header';
import Home from './components/home';
import Loading from './components/helpers/loading.js';
import Login from './components/login';
import MyClass from './components/myClass';
import Register from './components/register';
import RegisterNewBook from './components/registerNewBook';
import RegisterStudents from './components/registerStudents';
import ScanStudentID from './components/scanStudentId';
import ScanBookID from './components/scanBookId';
import StudentProfile from './components/studentProfile';
import Title from './components/title';
import PageNotFound from './components/pageNotFound';
import ViewClasses from './viewClasses';
import ViewClassProgress from './components/viewClassProgress';
import ViewStudents from './components/viewStudents';
import PasswordReset from './components/passwordReset';

  function App() {

    const [user, setUser] = useState({
      logged_status: 'NOT_LOGGED_IN',
      userRole: ''
    })

    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState()
    const [student, setStudent] = useState()
    const [classes, setClasses] = useState()

    useEffect(() => {
      if (user.userRole === "Administrator" && user.logged_status === "LOGGED_IN") {
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          }
      }
      axios
      .get('https://elscanner-backend.herokuapp.com/get-all-classes', config)
      .then(response => {
        setClasses(response.data)
      })
      .catch(error => {
        console.log("Error in getting classes", error)
      })
      }}, [user])

  const adminAuthorizedPages = () => {
    return [
      <Route path = '/admin-home' element = {<AdminHome {...user} handleLoading={handleLoading} clearBook={clearBook} clearStudent={clearStudent} />} key = {'admin-home'} />,
      <Route path = '/book-info' element = {<BookInfo {...book} />} handleLoading={handleLoading} key = {'book-info'} />,
      <Route path = '/checkout-confirm' element = {<CheckoutConfirm {...book} {...student} clearBook={clearBook} clearStudent={clearStudent} />} key = {'checkout-confirm'} />,
      <Route path = '/register-new-book' element={<RegisterNewBook {...student} handleLoading={handleLoading} />} key = {'register-new-book'} />,
      <Route path = '/register-students' element={<RegisterStudents />} key = {'register-students'} />,
      <Route path = '/scan-book-id' element={<ScanBookID {...user} {...student} clearBook={clearBook} clearStudent={clearStudent} handleSetBook = {setBook} />} key = {'scan-book-id'} />,
      <Route path = '/scan-student-id' element={<ScanStudentID {...user} {...book} clearStudent={clearStudent} handleSetStudent={setStudent} />} key = {'scan-student-id'} />,
      <Route path = '/student-profile' element={<StudentProfile {...student} clearBook={clearBook} clearStudent={clearStudent} handleLoading = {handleLoading} />} key = 'student-profile' />,
      <Route path = '/view-class-progress' element={<ViewClassProgress />} key = {'view-class-progress'} />,
      <Route path = '/view-classes' element={<ViewClasses />} key = {'view-classes'} />,
      <Route path = '/view-students' element={<ViewStudents {...loading} {...[classes]} handleSetStudent = {setStudent} />} key = {'view-students'} />
    ]
  }

  const clearBook = () => {
    setBook()
  }

  const clearStudent = () => {
    setStudent()
  }

  const userAuthorizedPages = () => {
    return [
      <Route path = '/home' element = {<Home {...user} handleLoading = {handleLoading} />} key = {'home'} />,
      <Route path = '/my-class' element = {<MyClass {...user} handleLoading = {handleLoading} />} key = {'my-class'} />
    ]
  }

    useEffect(() => {
      const loadingOnRefresh = async () => {
        if (user.logged_status === 'NOT_LOGGED_IN' && window.sessionStorage.getItem('token')) {
          const decodedToken = jwtDecode(window.sessionStorage.getItem('token'))
            let config = {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
              }
          }
          await axios.get(`https://elscanner-backend.herokuapp.com/lookup-user/${decodedToken.sub.public_id}`, config)
          .then(response => {
            setUser({
              logged_status: 'LOGGED_IN',
              ...response.data
          })},
          )
          .catch(error => {
            console.log('error in useEffect() in root App', error)
          })
        }
        setLoading(false)
      }
      loadingOnRefresh();
    }, [user.logged_status])
  
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
        <Router history = {history}>
          <Header {...user} logoutHandler={handleSuccessfulLogout}/>
          {loading === true ? (<Loading />) : (null)}
          <Routes>
            {user.userRole === 'Administrator' && user.logged_status === 'LOGGED_IN' ?
            adminAuthorizedPages() : null}
            {user.userRole === 'Student' && user.logged_status === "LOGGED_IN" ?
            userAuthorizedPages() : null}
            <Route exact path = '/' element={<Title />} />
            <Route path = '/login' element={<Login {...user} handleLoading = {handleLoading} loginHandler = {setUser}/>} />
            <Route path = '/password-reset' element={<PasswordReset />} />
            <Route path = '/register' element={<Register handleLoading={handleLoading}/>} />
            <Route path = '*' element={<PageNotFound {...user} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
