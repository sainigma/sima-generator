import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon } from 'semantic-ui-react'
import Comments from './comments'
import GraphView from './graphView'

const ProjectTitle = (props) => {
  return (
    <Header>
      <Icon name='edit' />
      <Header.Content>{props.selected.name}</Header.Content>
    </Header>
  )
}

const ProjectView = (props, ignores) => {
  if( props.projects.selected!=='' && props.projects.selected!=='home' && props.projects.selected!=='new' ){
    const selected = props.projects.items.find( item => item.id === props.projects.selected )
    return(
      <Segment.Group horizontal style={{width:'100%'}}>
        <Segment style={{borderTopLeftRadius: '1.5em',borderBottomLeftRadius: '1.5em',width:'50%'}}>
          <GraphView/>
        </Segment>
        <Segment inverted color='orange' style={{borderTopRightRadius: '1.5em',borderBottomRightRadius: '1.5em',width:'50%'}}>
            <ProjectTitle selected={selected}/>
            <li>{selected.id}</li>
            <li>water: {selected.project.composition.water} litre(s)</li>
            <li>ethanol: {selected.project.composition.ethanol} litre(s)</li>
            <li>carbondioxide: {selected.project.composition.carbondioxide} litre(s)</li>
          <Comments/>
        </Segment>
      </Segment.Group>

    )
  }else{
    return(<></>)
  }
}

const mapStateToProps = (state) => {
  return{
    projects:state.projects
  }
}

export default connect(mapStateToProps,null)(ProjectView)