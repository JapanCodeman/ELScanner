import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.scss';

import Await from './components/await';
import Header from './components/header';
import Home from './components/home.js';
import Login from './components/login';
import Register from './components/register';
import ScanStudentID from './components/scanStudentId';
import ScanBookID from './components/scanBookId';

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
          <Router>
            <Header />
            <Routes>
              <Route path = '/' element={<Home/>} />
              <Route path = '/await' element={<Await/>} />
              <Route path = '/login' element={<Login/>} />
              <Route path = '/register' element={<Register />} />
              <Route path = '/scan-book-id' element={<ScanBookID />} />
              <Route path = '/scan-student-id' element={<ScanStudentID />} />
            </Routes>
          </Router>
        </header>
      </div>
    );
  }
}
