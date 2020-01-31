import {uuid} from 'uuidv4'

const initialState = {
  length:0,
  selected:'',
  items:[{}],
}

const projectsReducer = (state = initialState, action) =>{
  let newState = JSON.parse(JSON.stringify(state))
  if ( action.type === 'ADD' ){
    const newItems = [
      ...state.items,
      action.project
    ]
    newState.items = newItems
    newState.selected = action.project.id
    return newState
  } else if ( action.type === 'SETSELECTED' ) {
    newState.selected = action.selected
    return newState
  } else if ( action.type === 'MODIFYSELECTED' ) {
    let selected = newState.items.find( item => item.id === action.id )
    return newState
  }
  return state
}

const generateProject = (project, bottleWeight) =>{
  return{
    id:uuid(),
    name:'New Mead Project',
    history:[],
    comments:[],
    project,
    bottleWeight
  }
}

export const addProject = (project, bottleWeight) =>{
  return{
    project: generateProject(project, bottleWeight),
    type: 'ADD'
  }
}


export default newProjectsReducer