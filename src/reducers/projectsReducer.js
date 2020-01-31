import { uuid } from 'uuidv4'

const initialState = {
  length: 0,
  selected: '',
  items: [{}],
}

const saveToLocal = (state) => {
  localStorage.setItem( "projects", JSON.stringify(state) )
}

const projectsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if ( action.type === 'LOAD' ){
    newState = JSON.parse( localStorage.getItem( "projects" ) )
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
    saveToLocal(newState)
    return newState
  } else if (action.type === 'SETSELECTED') {
    newState.selected = action.selected
    saveToLocal(newState)
    return newState
  } else if (action.type === 'MODIFYSELECTED') {
    let selected = newState.items.find(item => item.id === action.id)
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

export const setSelected = (id) => {
  return {
    type: 'SETSELECTED',
    selected: id
  }
}

export default projectsReducer