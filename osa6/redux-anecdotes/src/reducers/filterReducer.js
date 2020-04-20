const initialState = ''

export const addFilter = text => {
  return {
    type: 'NEW_FILTER',
    text
  }
}

export const resetFilter = () => {
  return {
    type: 'NEW_FILTER',
    text: ''
  }
}

const filterReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'NEW_FILTER':
      return action.text

    default: return state
  }
}

export default filterReducer
