import axios from 'axios';
import React, { Component } from 'react';

import PageTitler from './helpers/pageTitler';
import SmallerGreenButton from './helpers/smallerGreenButton';
import Scanner from './scanner';

export default class scanBookId extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      upc : "",
      title : "",
      publisher : "",
      author : "",
      wordCount : 0,
      status : "",
      currentHolder : ""
    }

    this.checkBookIn = this.checkBookIn.bind(this);
    this.checkBookOut = this.checkBookOut.bind(this);
    this.rescan = this.rescan.bind(this);
    this.updateBookId = this.updateBookId.bind(this);
  }
  
  updateBookId(bookID) {
    axios
    .get(`http://127.0.0.1:5000/retrieve-book-info/${bookID}`)
    .then(book => {
      this.setState({
        ...book.data
      })
    })
    .catch(error => {
      console.log("There was an error in updateBookId function", error)
    })
  }

  checkBookIn() {
    axios
    .patch(`http://127.0.0.1:5000/${this.state.upc}`)
  }

  checkBookOut() {
    this.props.history.push('/scan-student-id');
  }

  rescan() {
    // eslint-disable-next-line no-unused-expressions
    window.location.reload()
  }

  render () {
    return (
      <div className='scan-book-wrapper'>
        <PageTitler pagetitle='Scan Book' />
        <Scanner updateBookId = {(bookID) => this.updateBookId(bookID)}/>
        {this.state.book !== null ? 
        <div className='scan-result-table'>
          <button onClick={this.rescan} className='scan-result__restart'>Wrong title?</button>
          <label className='scan-result__upc-label'>UPC</label>
          <div className='scan-result__upc'>{this.state.upc}</div>
          <label className='scan-result__title-label'>Title</label>
          <div className='scan-result__title'>{this.state.title}</div>
          <label className='scan-result__publisher-label'>Publisher</label>
          <div className='scan-result__publisher'>{this.state.publisher}</div>
          <label className='scan-result__author-label'>Author</label>
          <div className='scan-result__author'>{this.state.author}</div>
          <label className='scan-result__word-count-label'>Word Count</label>
          <div className='scan-result__word-count'>{this.state.wordCount}</div>
          <label className='scan-result__status-label'>Status</label>
          <div className='scan-result__status'>{this.state.status}</div>
          <label className='scan-result__current-holder-label'>Held by</label>
          <div className='scan-result__current-holder'>{this.state.currentHolder}</div>
            {this.state.currentHolder === "Onomichi Gakuen English Library" ? <SmallerGreenButton text='Check this book out' onClick={this.checkBookOut} />
            :
            <SmallerGreenButton text='Check this book back in' onClick={this.checkBookIn} />}
        </div>
          
          : 
          
          null }
      </div>
    );
  }
}