// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'





// prefer export member for consistency
export const setFlag = (name, _value) => {
  return (dispatch) => {
    let value = _value
    let success = true

    if (typeof initialState.flags[name] === 'undefined') {
      success = false
    }

    if (typeof initialState.flags[name] === 'boolean' && typeof value === 'undefined') {
      value = !value
    }

    return dispatch({
      type: actionTypes.session.setFlag,
      payload: {
        [name]: value,
      },
      error: !success,
    })
  }
}
