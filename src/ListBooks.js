import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListShelf from './ListShelf'

//Lists books in your library separated by it's current shelf state
class ListBooks extends Component{

	constructor() {
		super()
		this.selections = ["currentlyReading", "wantToRead", "read"]
	}


	returnShelf (shelf) {
		for (let i=0; i<this.selections.length;i++){
			if(shelf===this.selections[i]){
				return i
			}
		}
		return null
	}


	render () {
		const {shelves, myBooks, shelfIndex, updateShelf} = this.props

		let shelfList = []
		for (let i of shelves){
			shelfList.push([])
		}

		for (let book of myBooks){
			let shelfIdx = this.returnShelf(book.shelf)
			if (shelfIdx != null){
				shelfList[shelfIdx].push(book)
			}
		}
		//console.log(shelfList)


		return (
			<div className="list-books">
				<div className="list-books-title default-primary-color">
					<div className="book-logo default-primary-color"></div>
					<h1 className="text-primary-color">MyReads</h1>
				</div>
				<div className="title-padding">
				</div>
				<div className="list-books-content">
					{shelves.map((shelf, index) =>
						<ListShelf
							shelfName={shelf}
							booksOnShelf={shelfList[index]}
							shelfIndex={shelfIndex}
							idx={index}
							updateShelf={updateShelf}
							key={index}
						/>
					)}
				</div>
				<div className="open-search">
	        <Link
	        	to="/search"
	        	className="accent-color"
	        >Add a Book</Link>
	      </div>
			</div>
		)
	}

}

export default ListBooks
