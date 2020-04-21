const initialState = 'message...'

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_MESSAGE',
      message
    })
    setTimeout(() => dispatch(clearNotification()), delay * 1000)
  }
}

export const clearNotification = () => {
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
