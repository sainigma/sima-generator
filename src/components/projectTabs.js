import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setSelected } from './../reducers/projectsReducer'

const DisplayTab = (props) => {

  const changeSelected = (event) => {
    if (event.target.id !== props.selected && event.target.id !== '') {
      props.setSelected(event.target.id)
    }
  }

  if (props.item.id !== props.selected) {
    return (
      <li id={props.item.id} key={props.item.id} onClick={changeSelected}>{props.item.name}</li>
    )
  } else {
    return (
      <li id={props.item.id} key={props.item.id} onClick={changeSelected}><b>{props.item.name}</b></li>
    )
  }
}

const ProjectTabs = (props) => {

  if (props.projects.length > 0) {
    return (
      <div>
        <h1>Tabs</h1>
        {props.projects.items.map(item => <DisplayTab item={item} selected={props.projects.selected} setSelected={props.setSelected} />)}
        <br />
      </div>
    )
  } else return (<div></div>)

}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, { setSelected })(ProjectTabs)