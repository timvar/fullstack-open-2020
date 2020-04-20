const initialState = 'message...'

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NEW_MESSAGE':
      return state

    default: return state
  }
}

export default notificationReducer
