import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import InitializeMead from './components/initializeMead'
import EditMead from './components/editMead'
import ProjectTabs from './components/projectTabs'

const App = (props) => {
  useEffect( ()=>{
    console.log("start")
  },[])

  return(
    <div>
      <ProjectTabs/>
      <InitializeMead/>
      <EditMead/>
    </div>
  )
}

export default connect(null,null)(App)