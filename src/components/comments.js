import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Comment, Header, Form, Button } from 'semantic-ui-react'
import { addComment } from './../reducers/projectsReducer'

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const DisplayComment = (props) => {
  let dateString = ""
  const dateNow = new Date(Date.now())
  const date = new Date(props.timestamp)

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  if (date.getMonth() == dateNow.getMonth() &&
    date.getDate() == dateNow.getDate() &&
    date.getYear() == dateNow.getYear()
  ) {
    dateString = "Today, " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }else{
    const endings = ['st','nd','rd','th']
    let ending = ''
    if( date.getDate < 4) ending = endings[ date.getDate -1 ]
    else ending = endings[3]
    dateString = date.getDate() + ending + ' of ' + months[date.getMonth()] + '. ' + ( date.getYear() + 1900 ) +', ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }

  return (
    <Comment style={{width:'50%'}}>
      <Comment.Avatar src='/textures/avatar.png' />
      <Comment.Content>
        <Comment.Author as='a'>You</Comment.Author>
        <Comment.Metadata>
          <div>{dateString}</div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

const DisplayComments = (props) => {
  const indexOfSelected = props.projects.items.findIndex(item => item.id === props.projects.selected)
  if (props.projects.items[indexOfSelected].comments.length > 0) {
    return(
      <>
        { props.projects.items[indexOfSelected].comments.map( comment => <DisplayComment key={"kommentti"+comment.timestamp} timestamp={comment.timestamp} content={comment.content} />) }
      </>
    )
  } else return (<></>)
}

const ConnectedDisplayComments = connect(mapStateToProps, null)(DisplayComments)

const Comments = (props) => {
  const [newComment, setNewComment] = useState('')

  const changeComment = (event) => {
    setNewComment(event.target.value)
  }
  const submitComment = () => {
    props.addComment(props.projects.selected, newComment)
    setNewComment('')
  }


  return (
    <Comment.Group>
      <Header>Comments</Header>
      <ConnectedDisplayComments/>
      <Form reply onSubmit={submitComment}>
        <Form.Field>
          <input placeholder='new comment here..' value={newComment} onChange={changeComment} />
        </Form.Field>
      </Form>
    </Comment.Group>
  )
}

export default connect(mapStateToProps, { addComment })(Comments)
//<Button content='Add comment' color='red' labelPosition='left' icon='edit' primary />