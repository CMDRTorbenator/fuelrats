// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getRescuesOverTimeStatistics = () => async dispatch => {
  dispatch({ type: actionTypes.GET_RESCUES_OVER_TIME })

  try {
    let response = await fetch(`/api/statistics/rescues`, {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
      method: 'get',
    })

    response = await response.json()

    dispatch({
      payload: response.data,
      status: 'success',
      type: actionTypes.GET_RESCUES_OVER_TIME,
    })

  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_RESCUES_OVER_TIME,
    })

    console.log(error)
  }
}
