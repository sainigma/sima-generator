import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Home from './components/home'
import InitializeMead from './components/initializeMead'
import ProjectView from './components/projectView'
import ProjectTabs from './components/projectTabs'
import PrintView from './components/printView'
import { loadFromLocal } from './reducers/projectsReducer'

import { Container, Segment } from 'semantic-ui-react'
import 'fomantic-ui-css/semantic.css';

const App = (props) => {
  useEffect( ()=>{
    props.loadFromLocal()
  },[])

  if( !props.projects.printView ){
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
  }else return(
    <PrintView/>
  )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps,{loadFromLocal})(App)