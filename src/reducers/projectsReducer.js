const initialState = {
  length:0,
  selected:'asd',
  items:[{}],
}

const projectsReducer = (state = initialState, action) =>{
  let newState = JSON.parse(JSON.stringify(state))
  if( action.type === 'ADD' ){
    const newItems = [
      ...state.items,
      action.project
    ]
    newState.items = newItems
    return newState
  }else if( action.type === 'SETSELECTED' ){
    newState.selected = action.selected
    return newState
  }
  return state
}

export const appendProject = (project) => {
  return{
    type: 'ADD',
    project
  }
}

export const removeProject = (id) => {
  return{
    type: 'REMOVE',
    id
  }
}

export const setSelected = (id) => {
  return{
    type: 'SETSELECTED',
    selected: id
  }
}

export default projectsReducer