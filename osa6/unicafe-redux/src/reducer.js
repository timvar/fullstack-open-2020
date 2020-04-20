const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodCount = state.good
      goodCount += 1
      return { ...state, good: goodCount }

    case 'OK':
      let okCount = state.ok
      okCount += 1
      return { ...state, ok: okCount }
    case 'BAD':
      let badCount = state.bad
      badCount += 1
      return { ...state, bad: badCount }
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default: return state
  }

}

export default counterReducer
