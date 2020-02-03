import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setSelected } from './../reducers/projectsReducer'
import { Container, Segment, Tab } from 'semantic-ui-react'
import 'fomantic-ui-css/semantic.css';
import ProjectView from './projectView'

const ProjectTabs = (props) => {
  const itemToMenuItem = (item) => {
    let name = ""
    if( item.name !== undefined ) name = item.name.slice(0,8)+"..."
    if( item.id === props.projects.selected ) name = item.name
    return {
      menuItem: { key: item.id+'pane1', content: name },
      key: item.id+'pane',
      id: item.id,
    }
  }

  const homepane = {
    menuItem: { key: 'home', icon: 'home', content: 'Home'},
    key: 'homepane',
    id: 'home'
  }

  const newpane = {
    menuItem: { key: 'new', icon: 'add', content: 'New'},
    key: 'newpane',
    id: 'new'
  }

  const changeTab = (event,data) => {
    const selected = data.activeIndex
    props.setSelected( data.panes[selected].id, selected )
  }

  return(
    <Tab 
      panes={[
        homepane,
        ...props.projects.items.map( item => itemToMenuItem(item)),
        newpane
      ]}
      activeIndex={props.projects.activeIndex}
      menu={{ borderless: true, attached: false, tabular: false }}
      renderActiveOnly={false} key='panes' onTabChange={changeTab}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, { setSelected })(ProjectTabs)