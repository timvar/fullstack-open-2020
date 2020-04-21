const initialState = {
  message: 'message...',
  timerId: undefined
}

export const setNotification = (message, delay) => {
  return async dispatch => {
    const timerId = setTimeout(() => dispatch(clearNotification()), delay * 1000)
    dispatch({
      type: 'NEW_MESSAGE',
      message,
      timerId
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE',
    message: ''
  }
}

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CLEAR_MESSAGE':
      const newMessage = {
        message: action.message
      }
      return newMessage
    case 'NEW_MESSAGE':
      clearTimeout(state.timerId)
      const timerMessage = {
        message: action.message,
        timerId: action.timerId
      }
      return timerMessage

    default: return state
  }
}

export default notificationReducer
