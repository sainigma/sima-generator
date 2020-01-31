import {uuid} from 'uuidv4'

const initialState = {
  id:'',
  name:'empty',
  history:[{
    timestamp:0,
    weightGrams:0,
  }],
  comments:[{
    timestamp:0,
    content:'',
  }],
  meadSystem:{
    composition:{
      water:0,
      ethanol:0,
      carbondioxide:0,
    }
  },
  bottleWeight:0,
}

const projectReducer = (state = initialState, action) =>{
  switch( action.type ){

    case 'INIT':
      const project = {
        id:uuid(),
        name:'New Mead Project',
        history:[],
        comments:[],
        meadSystem:action.meadSystem,
        bottleWeight:action.bottleWeight
      }
      return project
      break

    case 'EDIT':
      const currentProject = state
      let tempProject = JSON.parse(JSON.stringify(currentProject))

      switch( action.subtype ){
        case 'NAME':
          tempProject.name = action.name
          break
        case 'COMMENT':
          const newComments = [
            ...currentProject.comments,
            action.comment
          ]
          tempProject.comments = newComments
          break
        case 'HISTORY':
          const newHistory = [
            ...currentProject.history,
            action.history
          ]
          tempProject.history = newHistory
          break
        case 'REMOVECOMMENT':
          const splicedComments = currentProject.comments.splice( action.index, 1 )
          tempProject.comments = splicedComments
          break
        case 'REMOVEHISTORY':
          const splicedHistory = currentProject.history.splice( action.index, 1 )
          tempProject.history = splicedHistory
          break
      }

      return tempProject
      break
  }
  return state
}

export const initialize = (meadSystem, bottleWeight) => {
  return {
    meadSystem,
    bottleWeight,
    type: 'INIT'
  }
}

export const changeName = (name) => {
  return {
    name,
    type: 'EDIT',
    subtype: 'NAME'
  }
}

export const addComment = (content) => {
  return {
    comment:{
      timestamp:0,
      content
    },
    type: 'EDIT',
    subtype: 'COMMENT'
  }
}

export const removeComment = (index) => {
  return {
    type: 'EDIT',
    subtype: 'REMOVECOMMENT',
    index
  }
}

export const addHistory = (weightGrams) => {
  return {
    type: 'EDIT',
    subtype: 'HISTORY',
    history:{
      timestamp:0,
      weightGrams
    }
  }
}

export const removeHistory = (index) => {
  return {
    type: 'EDIT',
    subtype: 'REMOVEHISTORY',
    index
  }
}

export default projectReducer