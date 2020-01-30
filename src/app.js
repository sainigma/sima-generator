import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import InitializeMead from './components/initializeMead'

const App = (props) => {
  useEffect( ()=>{
    console.log("start")
  },[])

  return(
    <div>
      <Router>
        <Link to="/">main </Link><Link to="/new"> new user </Link><Link to="/login"> login </Link><br/>
        <InitializeMead/>
      </Router>
    </div>
  )
}


export default App