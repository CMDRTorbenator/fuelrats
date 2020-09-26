import imageLoader from '~/services/imageLoader'

import actionTypes from '../actionTypes'





export const getImage = (payload) => {
  return (dispatch) => {
    imageLoader(dispatch).postMessage(payload)
  }
}

export const disposeImage = ({ id, url }) => {
  return (dispatch) => {
    window.URL.revokeObjectURL(url)

    return dispatch({
      type: actionTypes.images.dispose,
      payload: id,
    })
  }
}
