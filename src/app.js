import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Home from './components/home'
import InitializeMead from './components/initializeMead'
import ProjectView from './components/projectView'
import ProjectTabs from './components/projectTabs'
import { loadFromLocal } from './reducers/projectsReducer'

import { Container, Segment } from 'semantic-ui-react'
import 'fomantic-ui-css/semantic.css';

const App = (props) => {
  useEffect( ()=>{
    props.loadFromLocal()
  },[])

  
  return(
    <div style={{width:'100%'}}>
      <ProjectTabs/>
      <Container style={{width:'80%'}}>
        <Home/>
        <ProjectView/>
        <InitializeMead/>
      </Container>
    </div>
  )
  /*
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
  )*/
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps,{loadFromLocal})(App)