import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon, Input, Button, Radio, SegmentGroup } from 'semantic-ui-react'

import Comments from './comments'
import GraphView from './graphView'
import Recipe from './recipe'
import WeightControls from './weightControls'
import { removeProject } from './../reducers/projectsReducer'

const ProjectTitle = (props) => {
  return (
    <Header>
      <Icon name='edit' />
      <Header.Content>{props.selected.name}</Header.Content>
    </Header>
  )
}

const MiscControls = (props) => {

  return(
    <Segment style={{width:'100%', padding:'0.5em', margin:'0px'}} basic>
      <Segment.Group horizontal>
        <Segment style={{width:'60%', padding:'2em', margin:'0px'}} basic>
          <Radio label='Toggle instructions' checked={true} toggle/>
        </Segment>
        <Segment style={{width:'40%', padding:'0.5em', margin:'0px'}} basic>
          <Button color='red' content='Print' labelPosition='left' icon='print' style={{width:'100%',marginBottom:'0.5em'}}/>
          <Button color='red' content='Delete' labelPosition='left' icon='trash' style={{width:'100%'}} onClick={props.deleteProject}/>
        </Segment>
      </Segment.Group>
    </Segment>
  )
}

const ProjectView = (props) => {

  if( props.projects.selected!=='' && props.projects.selected!=='home' && props.projects.selected!=='new' ){
    const selected = props.projects.items.find( item => item.id === props.projects.selected )

    const deleteProject = () => {
      props.removeProject( selected.id )
    }

    return(
      <Segment.Group horizontal style={{width:'100%',border:'none',borderRadius:'1.5em', boxShadow:'10px 10px 20px black', opacity:'0.9'}}>
        <Segment style={{borderTopLeftRadius: '1.5em',borderBottomLeftRadius: '1.5em',width:'50%'}}>
          <GraphView/>
        </Segment>
        <Segment inverted color='orange' style={{borderTopRightRadius: '1.5em',borderBottomRightRadius: '1.5em',width:'50%'}}>
            <ProjectTitle selected={selected}/>
            <Segment.Group horizontal>
              <Segment inverted color='orange' style={{width:'60%'}} basic>
                <WeightControls/>
                <MiscControls deleteProject={deleteProject}/>
              </Segment>
              <Recipe 
                water={selected.project.composition.water}
                sugar={selected.project.initialSugar}
                ethanol={selected.project.composition.ethanol}
                carbondioxide={selected.project.composition.ethanol}
                carbondioxideToRelease={selected.project.carbondioxideToRelease}
              />
            </Segment.Group>
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

export default connect(mapStateToProps,{removeProject})(ProjectView)