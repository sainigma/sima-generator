import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'

const Home = (props) => {

  if( props.projects.selected === 'home' ){
    return(
      <Segment.Group horizontal style={{width:'100%',border:'none',boxShadow:'none'}}>
        <Segment basic style={{width:'50%',border:'none'}}/>
        <Segment style={ {width:'50%',border:'none'}}>
          test
        </Segment>
      </Segment.Group>

    )
  }else return( <></> )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps,null)(Home)