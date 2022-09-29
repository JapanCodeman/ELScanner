import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from './components/history';
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

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      logged_status: 'NOT_LOGGED_IN',
      isAdmin: 'NOT_ADMIN',
      id: '',
      isLoading: false,
      bookId: '',
      studentId: ''
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router history = {history}>
            <Header />
            <Routes>
              <Route exact path = '/' element={<Title/>} />
              <Route path = '/await' element={<Await/>} />
              <Route path = '/home' element={<Home/>} />
              <Route path = '/login' element={<Login/>} />
              <Route path = '/register' element={<Register />} />
              <Route path = '/register-new-book' element={<RegisterNewBook />} />
              <Route path = '/scan-book-id' element={<ScanBookID />} />
              <Route path = '/scan-student-id' element={<ScanStudentID />} />
              <Route path = '*' element={<PageNotFound />} />
            </Routes>
          </Router>
        </header>
      </div>
    );
  }
}
