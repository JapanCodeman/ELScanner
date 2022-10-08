import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from './components/history';
import jwtDecode from 'jwt-decode';
import './styles/main.scss';

import Await from './components/await';
import Header from './components/header';
import Home from './components/home.js';
import Login from './components/login';
import Register from './components/register';
import RegisterNewBook from './components/registerNewBook';
import ScanStudentID from './components/scanStudentId';
import ScanBookID from './components/scanBookId';
import Title from './components/title.js';
import PageNotFound from './components/pageNotFound';

  function App() {

    const [user, setUser] = useState({
      logged_status: 'NOT_LOGGED_IN',
      isAdmin: true,
      id: '',
      isLoading: false,
      bookId: '',
      studentId: ''
    })

  const adminAuthorizedPages = () => {
    return [
      <Route path = '/await' element={<Await/>} key={'await'} />,
      <Route path = '/register-new-book' element={<RegisterNewBook />} key={'register-new-book'}/>,
      <Route path = '/scan-book-id' element={<ScanBookID />} key={'scan-book-id'}/>,
      <Route path = '/scan-student-id' element={<ScanStudentID />} key={'scan-student-id'} />
    ]
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
          <Header />
          <Routes>
            {user.isAdmin === true ?
            adminAuthorizedPages() : null}
            <Route exact path = '/' element={<Title/>} />
            <Route path = '/home' element = {<Home {...user}/>} />
            <Route path = '/login' element={<Login loginHandler = {handleSuccessfulLogin}/>} />
            <Route path = '/register' element={<Register />} />
            <Route path = '*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App
