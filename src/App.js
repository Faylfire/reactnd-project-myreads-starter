import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListSearch from './ListSearch'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      query: "",
      shelves: ["Currently Reading", "Want to Read", "Read"],
      results:[],
      myBooks:[],
      shelfIndex:{}
    }
  }


  componentDidMount(){
    //Loads the initial state of the bookshelf from the backend into the state
    BooksAPI.getAll().then((books) => {

      let index = this.buildShelfIndex(books)
      return {myBooks:books,
              shelfIndex:index
             }
      })
      .then((state) => {
        return this.setState(state)
      })
      //this.setState({contacts})
      //console.log(this.state.myBooks)

  }


  //Build an index for fast access of which shelf books belong
  //Possibly a better way with spread operator
  buildShelfIndex = (books) => {
    let index = {}
    for (let book of books) {
      index[book.id]=book.shelf
    }
    return index
  }

  //Method for managed input component
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    //this.searchResults()
  }

  //updates which shelf a book belongs to
  updateShelf = (event) => {
    //console.log("ID: " + event.id)
    //console.log("Value: " + event.value)
    let bookIdx = null


    this.setState((state) => {

      //If book on shelf in myBook list
      if (event.id in this.state.shelfIndex){
        //Find the book on the shelf
        bookIdx = this.findBook(event.id, this.state.myBooks)
        //Update the shelf value
        state.myBooks[bookIdx].shelf = event.value
        BooksAPI.update(state.myBooks[bookIdx],event.value)
      } else {
        //If book not already on shelf
        //Find book in the search results
        bookIdx = this.findBook(event.id, this.state.results)
        //Update the shelf value on in the results
        state.results[bookIdx].shelf = event.value
        //Assign the new book to the list of myBooks
        state.myBooks.push(state.results[bookIdx])
        BooksAPI.update(state.results[bookIdx],event.value)
      }
      state.shelfIndex[event.id] = event.value
      //set state followed by render
      return ({shelfIndex: state.shelfIndex,
               myBooks: state.myBooks,
               results: state.results
              })
    })
  }

  //helper function for finding a book in your bookshelf
  findBook = (id, books) => {
    let idx = 0
    for (let book of books){
      if (book.id === id){
        //console.log("book found!" + idx)
        return idx
      }
      idx++
    }
  }

  //Search Function, sets the state.results with array of search results for render
  //Also verfies state of books in the search
  searchResults = (query) => {
    //console.log(this.state.query)
    //console.log("from ListSearch: "+ query)
    if (query === ""){
      this.setState({results: []})
    } else {
      BooksAPI.search(query, 5).then((books)=>{
        if (books===undefined){
          books=[]
        }
        let len = books.length;
        let res = [];
        //console.log(len)
        let d = 0
        let shelf = "none"
        //Tests if there is a published Date set to the Year or "Unknown"
        for (var i=0 ; i< len; i++){
          //console.log(i, books[i])
          //Tests if there is a published Date set to the Year or "Unknown"
          let book = books[i]
          let id = books[i].id

          if (books[i].publishedDate){
            d = new Date(books[i].publishedDate)
            d = d.getFullYear()
          } else {
            d = "Unknown"
          }
          book['publishedDate']= d

          //Verify if the searched book is already on our shelves then retreive state
          if (id in this.state.shelfIndex){
            shelf = this.state.shelfIndex[id]
          }
          book['shelf']=shelf

          //Parse out relevant data from each book after a search
          //Add it to a temporary list
          res.push(book)
        }

        //console.log(res)
        this.setState({results: res})
      })
    }
    //console.log(res)
  }


  render() {


    //let showingbooks = this.state.results
    //Uses react router to load the appropriate page
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <ListSearch
            searchQuery={this.searchResults}
            results={this.state.results}
            shelfIndex={this.state.shelfIndex}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path="/" render={()=>(
          <ListBooks
            shelves={this.state.shelves}
            myBooks={this.state.myBooks}
            shelfIndex={this.state.shelfIndex}
            updateShelf={this.updateShelf}

          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
