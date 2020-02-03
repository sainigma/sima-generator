import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

const Home = (props) => {

  if( props.projects.selected === 'home' ){
    return(
      <div>
        Lorem ipsum jne.
      </div>
    )
  }else return( <></> )
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps,null)(Home)