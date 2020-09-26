import { isError } from 'flux-standard-action'
import { produce } from 'immer'





import actionTypes from '../actionTypes'
import initialState from '../initialState'





const wordpressReducer = produce((draftState, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.wordpress.pages.read:
    case actionTypes.wordpress.pages.search:
      if (!isError(action)) {
        payload.forEach((page) => {
          draftState.pages[page.slug] = page
        })
      }
      break

    default:
      break
  }
}, initialState.rescues)





export default wordpressReducer
