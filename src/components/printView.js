import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon, List, Button, Comment } from 'semantic-ui-react'
import GraphView from './graphView'
import { togglePrintView } from './../reducers/projectsReducer'
import Recipe from './recipe'
import moment from 'moment'
import './../styles/printView.style.css'

const ListComments = (props) => {

  if (props.comments.length > 0) {

    const startTime = props.startTime
    let previousTime = 0

    const PrintComment = (props) => {
      
      const DisplayDescription = (props) => {
        if( milliTimestampToHours(props.timestamp)-milliTimestampToHours(previousTime) > 0 ){
          previousTime = props.timestamp
          return(
            <div className="printcommentmetadata">
              +{milliTimestampToHours(props.timestamp-startTime)}h
            </div>
          )
        }else return(<></>)
      }
      const milliTimestampToHours = (timestamp) => {
        return Math.round((timestamp) / 3600000)
      }

      return (
        <div className ="printcomment">
          <DisplayDescription timestamp={props.comment.timestamp}/>
          <div className="printcommentcontent">{props.comment.content}</div>
        </div>
      )
    }
    return (
      <div className="printcomments">
        <Header>Comments</Header>
        {props.comments.map( (comment,index) => <PrintComment key={'printcomment'+index} comment={comment} />)}
      </div>
    )
  } else {
    return (<></>)
  }
}

const PrintView = (props) => {

  const windowHeight = (window.innerHeight * 0.95) + 'px'
  const windowWidth = (window.innerHeight / 1.414) + 'px'
  const selected = props.projects.items.find(item => item.id === props.projects.selected)
  if (typeof (selected) === 'undefined') return (<></>)
  else {

    return (
      <div className="printviewSupercontainer">
        <div className="printviewcontainer" style={{ width: windowWidth, height: windowHeight }}>
            <div style={{float:'left'}}><Header>{selected.name}</Header></div><div style={{float:'right', textAlign:'right'}}><a style={{cursor:'pointer'}} onClick={props.togglePrintView}>back</a></div><br/>
            <div className="ui divider"></div>
            <div className="printgraph">
              <GraphView showInstructions={false} />
            </div>
            <div className="ui divider"></div>
            <div>
              <div className="printviewsubcontainerLeft">
                <div className="printinitialsettings">
                  <p className="printparagraph"><b>Project date:</b><br/>{moment(selected.history[0].timestamp).format("DD-MM-YYYY h:mm:ss")}</p>
                  <p className="printparagraph"><b>Initial settings</b><br/>
                    <b>Max pressure:</b><br/>{selected.project.pressure} kPa<br/>
                    <b>Alcohol content:</b><br/>{Math.round(100*selected.project.composition.ethanol/(selected.project.composition.ethanol+selected.project.composition.water))} %<br/>
                  </p>
                </div>
                <div style={{float:"right"}}>
                  <Recipe
                    water={selected.project.composition.water}
                    sugar={selected.project.initialSugar}
                    ethanol={selected.project.composition.ethanol}
                    carbondioxide={selected.project.composition.ethanol}
                    carbondioxideToRelease={selected.project.carbondioxideToRelease}
                    style={{boxShadow:'none',border:'none'}}
                  />
                </div>
              </div>
              <div className="printviewsubcontainerRight">
                <ListComments startTime={selected.history[0].timestamp} comments={selected.comments} />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, {togglePrintView})(PrintView)