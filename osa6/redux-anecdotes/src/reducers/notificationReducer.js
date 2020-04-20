const initialState = 'message...'

export const addMessage = message => {
  return {
    type: 'NEW_MESSAGE',
    message
  }
}

export const resetMessage = () => {
  return {
    type: 'NEW_MESSAGE',
    message: ''
  }
}

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message

    default: return state
  }
}

export default notificationReducer
