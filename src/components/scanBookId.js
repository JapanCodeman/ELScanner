import axios from 'axios';
import React, { Component } from 'react';
import Scanner from './scanner';

export default class scanBookId extends Component {
  constructor(props) {
    super(props) 

    this.state = {
    }

    this.rescan = this.rescan.bind(this)
    this.updateBookId = this.updateBookId.bind(this)
  }
  
  async updateBookId(bookID) {
    await
    axios
    .get(`http://127.0.0.1:5000/retrieve-book-info/${bookID}`)
    .then(book => {
      this.setState({
        book
      })
    })
    .catch(error => {
      console.log("There was an error in updateBookId function", error)
    })
  }

  rescan() {
    // eslint-disable-next-line no-unused-expressions
    window.location.reload()
  }

  render () {
    return (
      <div className='scan-book-wrapper'>
        <Scanner updateBookId = {(bookID) => this.updateBookId(bookID)}/>
        {this.state.book != null ? 
        <div className='scan-result-table'>
          <button onClick={this.rescan} className='scan-result__restart'>Wrong title?</button>
          <label className='scan-result__upc-label'>UPC</label>
          <div className='scan-result__upc'>{this.state.book.data.upc}</div>
          <label className='scan-result__title-label'>Title</label>
          <div className='scan-result__title'>{this.state.book.data.title}</div>
          <label className='scan-result__publisher-label'>Publisher</label>
          <div className='scan-result__publisher'>{this.state.book.data.publisher}</div>
          <label className='scan-result__author-label'>Author</label>
          <div className='scan-result__author'>{this.state.book.data.author}</div>
          <label className='scan-result__word-count-label'>Word Count</label>
          <div className='scan-result__word-count'>{this.state.book.data.wordCount}</div>
          <label className='scan-result__status-label'>Status</label>
          <div className='scan-result__status'>{this.state.book.data.status}</div>
          <label className='scan-result__current-holder-label'>Held by</label>
          <div className='scan-result__current-holder'>{this.state.book.data.currentHolder}</div>
        </div>
          
          : 
          
          null }
      </div>
    );
  }
}