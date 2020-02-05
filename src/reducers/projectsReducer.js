import { uuid } from 'uuidv4'

const initialState = {
  length: 0,
  selected: '',
  activeIndex:0,
  items: [],
}

const saveToLocal = (newState) => {
  localStorage.setItem( "projects", JSON.stringify(newState) )
}

const projectsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  if ( action.type === 'LOAD' ){
    newState = JSON.parse( localStorage.getItem( "projects" ) )
    if( newState === null ) return state
    if( newState.selected === undefined ) newState.selected = 'home'
    if( newState.activeIndex === undefined ) newState.activeIndex = 0
    return newState

  } else if (action.type === 'ADD') {
    newState.length++
    let newProject = JSON.parse(JSON.stringify(action.project))
    newProject.name += newState.length
    const newItems = [
      ...state.items,
      newProject
    ]
    newState.items = newItems
    newState.selected = action.project.id
    saveToLocal(newState)
    return newState

  } else if (action.type === 'REMOVE') {
    newState.items = newState.items.filter(item => item.id !== action.id)
    newState.selected = 'new'
    newState.length = newState.items.length
    saveToLocal(newState)
    return newState

  } else if (action.type === 'SETSELECTED') {
    newState.selected = action.selected
    newState.activeIndex = action.activeIndex
    
    saveToLocal(newState)
    return newState

  } else if (action.type === 'MODIFYSELECTED') {
    let selected = newState.items.find(item => item.id === action.id)
    if( action.subtype === 'COMMENT' || action.subtype === 'HISTORY' ){
      let entry = {
        timestamp: action.timestamp,
        content: action.content
      };
      if( action.subtype === 'COMMENT' ){
        selected.comments = [
          ...selected.comments,
          entry
        ]
      } else{
        if(selected.history.length===0){
          selected.bottleWeight = action.content
        }
        selected.history = [
          ...selected.history,
          entry
        ]
      }
    } else if( action.subtype === 'BOTTLEWEIGHT' ){
      selected.bottleWeight = action.bottleWeight
    }

    newState.items = newState.items.filter(item => item.id != action.id)
    newState.items = [
      ...newState.items,
      selected
    ]
    saveToLocal(newState)
    return newState
  }
  return state
}

const generateProject = (project, bottleWeight) => {
  return {
    id: uuid(),
    name: 'New Mead Project ',
    history: [],
    comments: [],
    project,
    bottleWeight
  }
}

export const loadFromLocal = () => {
  return {
    type: 'LOAD'
  }
}

export const addProject = (project, bottleWeight) => {
  return {
    project: generateProject(project, bottleWeight),
    type: 'ADD'
  }
}

export const removeProject = (id) => {
  return {
    type: 'REMOVE',
    id
  }
}

export const setSelected = (id, activeIndex) => {
  return {
    type: 'SETSELECTED',
    activeIndex,
    selected: id
  }
}

export const addComment = (id, content) => {
  return {
    type: 'MODIFYSELECTED',
    subtype: 'COMMENT',
    timestamp: Date.now(),
    content,
    id
  }
}

export const addHistory = (id, timestamp, content) => {
  return {
    type: 'MODIFYSELECTED',
    subtype: 'HISTORY',
    timestamp,
    content,
    id
  }
}

export const editBottleweight = (id, weight) => {
  return {
    type: 'MODIFYSELECTED',
    subtype: 'BOTTLEWEIGHT',
    id,
    weight
  }
}

export default projectsReducer