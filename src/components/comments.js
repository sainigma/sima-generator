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

  if (date.getMonth() == dateNow.getMonth() &&
    date.getDay() == dateNow.getDay() &&
    date.getYear() == dateNow.getYear()
  ) {
    dateString = "Today, " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }

  return (
    <Comment style={{width:'50%'}}>
      <Comment.Avatar src='./meadAvatar.png' />
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