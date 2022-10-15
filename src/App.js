import React, { useState } from 'react';
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
import Register from './components/register';
import RegisterNewBook from './components/registerNewBook';
import RegisterStudents from './components/registerStudents';
import ScanStudentID from './components/scanStudentId';
import ScanBookID from './components/scanBookId';
import StudentProfile from './components/studentProfile';
import Title from './components/title';
import PageNotFound from './components/pageNotFound';
import ViewClassProgress from './components/viewClassProgress';
import ViewStudents from './components/viewStudents';

  function App() {

    const [user, setUser] = useState({
      logged_status: 'NOT_LOGGED_IN',
      id: '',
      bookId: '',
      studentId: ''
    })

    const [page, setPage] = useState({
      isLoading : false})

    const [book, setBook] = useState()

    const [student, setStudent] = useState()

  const adminAuthorizedPages = () => {
    return [
      <Route path = '/admin-home' element = {<AdminHome {...user} />} key = {'admin-home'} />,
      <Route path = '/book-info' element = {<BookInfo {...book} />} key = {'book-info'} />,
      <Route path = '/checkout-confirm' element = {<CheckoutConfirm {...book} {...student} />} key = {'checkout-confirm'} />,
      <Route path = '/register-new-book' element={<RegisterNewBook />} key = {'register-new-book'} />,
      <Route path = '/register-students' element={<RegisterStudents />} key = {'register-students'} />,
      <Route path = '/scan-book-id' element={<ScanBookID {...user} {...student} handleSetBook = {setBook} />} key = {'scan-book-id'} />,
      <Route path = '/scan-student-id' element={<ScanStudentID {...user} {...book} {...page.scanning} handleSetStudent = {setStudent} />} key = {'scan-student-id'} />,
      <Route path = '/student-profile' element={<StudentProfile {...student}/>} key = 'student-profile' />,
      <Route path = '/view-class-progress' element={<ViewClassProgress />} key = {'view-class-progress'} />,
      <Route path = '/view-students' element={<ViewStudents />} key = {'view-students'} />
    ]
  }

  const userAuthorizedPages = () => {
    return [
      <Route path = '/home' element = {<Home {...user} />} key = {'home'} />
    ]
  }

  const handleLoading = () => {
    setPage(prevPage => !prevPage)
  }

  const handleSuccessfulLogin = () => {
    const token = window.sessionStorage.getItem('token')
    const decoded = jwtDecode(token)
    console.log('decoded token from app.js', decoded)
    axios.get(`http://127.0.0.1:5000/lookup-user/${decoded.sub.public_id}`)
    .then(response => {
      setUser({
        logged_status: 'LOGGED_IN',
        ...response.data
    })})
    .catch(error => {
      console.log('error in handleSuccessfulLogin in root App', error)
    })
    handleLoading()
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
          <Routes>
            {page.isLoading === true ? <Loading /> : null}
            {user.userRole === 'Administrator' && user.logged_status === 'LOGGED_IN' ?
            adminAuthorizedPages() : null}
            {user.userRole === 'Student' ?
            userAuthorizedPages() : null}
            <Route exact path = '/' element={<Title />} />
            <Route path = '/login' element={<Login handleLoading = {handleLoading} loginHandler = {handleSuccessfulLogin}/>} />
            <Route path = '/register' element={<Register />} />
            <Route path = '*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App
