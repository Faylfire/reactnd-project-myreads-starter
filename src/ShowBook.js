import React, { Component } from 'react'


//Takes a list of books and displays them in the order they appear with
//a selection box.
class ShowBook extends Component {

	render() {
		const { booksOnShelf, updateShelf, shelfIndex } = this.props


		return (
			<ol className="books-grid">
	      {booksOnShelf.map((book, index) =>
	        <li key={book.id}>
	          <div className="book">
	            <div className="book-top">
	              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail : "./icons/content.png" })` }}></div>
	                  <div className="book-shelf-changer accent-color">
	                    <select id={book.id}
	                            value={shelfIndex[book.id]? shelfIndex[book.id] : "none"}
	                            onChange={(event) => updateShelf(event.target)}>
	                      <option value="disabled" disabled>Move to...</option>
	                      <option value="currentlyReading">Currently Reading</option>
	                      <option value="wantToRead">Want to Read</option>
	                      <option value="read">Read</option>
	                      <option value="none">None</option>
	                    </select>
	                  </div>
	            </div>
	            <div className="book-title primary-text-color">{book.title}</div>
	            <div className="book-authors secondary-text-color ">{book.authors ? book.authors[0] : 'None'}</div>
	            <div className="book-published secondary-text-color ">{"Published: " + book.publishedDate}</div>
	          </div>
	        </li>
        )}
       </ol>

		)
	}
}

export default ShowBook