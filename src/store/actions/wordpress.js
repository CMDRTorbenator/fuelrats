// Component imports
import actionStatus from '../actionStatus'
import actionTypes from '../actionTypes'
import { createAxiosAction } from './services'
import wpApi from '~/services/wordpress'





// prefer export member for consistency
export const getWordpressPage = (slug) => {
  return async (dispatch) => {
    const response = await wpApi.request({
      url: '/pages',
      params: {
        slug,
      },
    })

    return dispatch({
      ...createAxiosAction(actionTypes.wordpress.pages.read, response),
      status: response.data && response.data.length ? actionStatus.SUCCESS : actionStatus.ERROR,
    })
  }
}