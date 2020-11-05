/**
 * Our main app reducer
 * 
 * @param {AppState} state 
 * @param {ReducerAction} action 
 */

export default function EventReducer(state, action){
  const {type, payload} = action
  switch (type) {
    case 'reset':
      return {}
    case 'suspend':
      return { ...state, ready : false }
    case 'ready':
      return { ...state, ready : true }
    case 'merge':
      return { ...state, ...payload }
    default:
      return state
  }
}