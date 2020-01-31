import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

const EditMead = (props) => {
  return(
    <div>
      <h1>Edit view</h1>
        <li>{props.currentProject.id}</li>
        <li>{props.currentProject.name}</li>
        <li>water: {props.currentProject.meadSystem.composition.water} litre(s)</li>
        <li>ethanol: {props.currentProject.meadSystem.composition.ethanol} litre(s)</li>
        <li>carbondioxide: {props.currentProject.meadSystem.composition.carbondioxide} litre(s)</li>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    currentProject:state.currentProject,
    projects:state.projects
  }
}

export default connect(mapStateToProps,null)(EditMead)