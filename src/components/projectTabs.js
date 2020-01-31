import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

const ProjectTabs = (props) => {
  return(
    <div>
      <h1>Tabs</h1>
      <li>selected: {props.projects.selected}</li>
      {props.projects.items.map( item => <li key={"asd"+item.id}>{item.name}</li> )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    currentProject:state.currentProject,
    projects:state.projects
  }
}

export default connect(mapStateToProps, null)(ProjectTabs)