import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

import Home from './components/home'
import InitializeMead from './components/initializeMead'
import ProjectView from './components/projectView'
import ProjectTabs from './components/projectTabs'

import { loadFromLocal } from './reducers/projectsReducer'

const InitializeMeadWithRouter = withRouter(InitializeMead)

const App = (props) => {
  useEffect( ()=>{
    props.loadFromLocal()
  },[])

  return(
    <Router>
      <div>
        <ProjectTabs/>
        <Link to="/new">Begin new project</Link>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/new">
          <InitializeMeadWithRouter/>
        </Route>
        
        <Route path="/project">
          <ProjectView/>
        </Route>
        
      </div>
    </Router>
  )
}

export default connect(null,{loadFromLocal})(App)