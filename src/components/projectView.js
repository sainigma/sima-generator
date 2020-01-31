import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

const ProjectView = (props) => {
  if( props.projects.selected!==''){
    const selected = props.projects.items.find( item => item.id === props.projects.selected )
    return(
      <div>
        <h1>Project view</h1>
          <li>{selected.id}</li>
          <li>{selected.name}</li>
          <li>water: {selected.project.composition.water} litre(s)</li>
          <li>ethanol: {selected.project.composition.ethanol} litre(s)</li>
          <li>carbondioxide: {selected.project.composition.carbondioxide} litre(s)</li>
      </div>
    )
  }else{
    return(<div></div>)
  }
}

const mapStateToProps = (state) => {
  return{
    projects:state.projects
  }
}

export default connect(mapStateToProps,null)(ProjectView)