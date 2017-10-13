import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShowBook from './ShowBook'



//Renders the search interface and passes a list of books to ShowBook
//after the database query is completed
class ListSearch extends Component{
	state = {
		query: "",
		showSearchPage: true,

	}

	updateQuery = (query) => {
    this.setState({ query: query.trim() })
    console.log(this.props)
    this.props.searchQuery(query.trim())
  }


	render () {
		const { searchQuery, results, shelfIndex, updateShelf } = this.props
    const { query } = this.state

    let showingBooks = results
    console.log(this.props)
		return (
	    <div className="search-books">
        <div className="search-books-bar">
          <Link
          	to="/"
          	className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input
              className="search-books"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        	<ShowBook
						updateShelf={updateShelf}
						booksOnShelf={showingBooks}
						shelfIndex={shelfIndex}
					/>
        </div>
      </div>
		)
	}

}

export default ListSearch