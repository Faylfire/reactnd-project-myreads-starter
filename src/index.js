import React from 'react'
import ReactDOM from 'react-dom'
import BooksApp from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	<BrowserRouter basename={process.env.PUBLIC_URL} ><BooksApp /></BrowserRouter>,
	document.getElementById('root'));
