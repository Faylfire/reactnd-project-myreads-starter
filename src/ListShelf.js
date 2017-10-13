import React, { Component } from 'react'
import ShowBook from './ShowBook'

//ListShelf renders the container for a particular shelf and passes
//a list of books to ShowBook component to display each book
class ListShelf extends Component{



	render () {
		let { shelfName, idx, booksOnShelf, shelfIndex, updateShelf } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title primary-text-color">{shelfName}</h2>
				<div className="bookshelf-books">
					<ShowBook
						updateShelf={updateShelf}
						booksOnShelf={booksOnShelf}
						shelfIndex={shelfIndex}
					/>
				</div>
			</div>
		)
	}

}


export default ListShelf