import axios from 'axios';
import React, { Component } from 'react';
import Scanner from './scanner';

export default class scanBookId extends Component {
  constructor(props) {
    super(props) 

    this.state = {
    }

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

  render () {
    return (
      <div className='scan-book-wrapper'>
        <Scanner updateBookId = {(bookID) => this.updateBookId(bookID)}/>
        {this.state.book != null ? 
        <div className='scan-result-table'>
          <div className='scan-result__upc-label'>UPC</div>
          <div className='scan-result__upc'>{this.state.book.data.upc}</div>
          <div className='scan-result__title-label'>Title</div>
          <div className='scan-result__title'>{this.state.book.data.title} 
          <div className='scan-result__publisher-label'>Publisher</div>
          <div className='scan-result__publisher'>{this.state.book.data.publisher}</div>
          <div className='scan-result__author-label'>Author</div>
          <div className='scan-result__author'>{this.state.book.data.author}</div>
          <div className='scan-result__word-count-label'>Word Count</div>
          <div className='scan-result__word-count'>{this.state.book.data.wordCount}</div>
          <div className='scan-result__status-label'>Status</div>
          <div className='scan-result__status'>{this.state.book.data.status}</div>
          <div className='scan-result__current-holder-label'>{this.state.book.data.currentHolder}</div>
        </div>
      </div>
          : 
          
          null }
      </div>
    );
  }
}