// Module imports

import { createAxiosFSA } from '@fuelrats/web-util/actions'
import { isError } from 'flux-standard-action'
import Cookies from 'js-cookie'





// Component imports
import getFingerprint from '~/helpers/getFingerprint'
import { presentApiRequestBody } from '~/helpers/presenters'
import { Router } from '~/routes'
import frApi from '~/services/fuelrats'

import actionTypes from '../actionTypes'
import { frApiPlainRequest } from './services'





// Component constants
const SESSION_TOKEN_LENGTH = 365 // days





export const changePassword = ({ id, ...data }) => {
  return frApiPlainRequest(
    actionTypes.passwords.update,
    {
      url: `/users/${id}/password`,
      method: 'patch',
      data: presentApiRequestBody('password-changes', data),
    },
  )
}


export const login = (options) => {
  return async (dispatch) => {
    const {
      remember,
      data,
    } = options

    const fingerprint = await getFingerprint()

    const action = createAxiosFSA(
      actionTypes.session.login,
      await frApi.request({
        url: '/oauth2/token',
        method: 'post',
        headers: {
          'X-Fingerprint': fingerprint,
        },
        data,
      }),
    )

    if (!isError(action)) {
      const token = action.payload.access_token

      Cookies.set('access_token', token, { expires: remember ? SESSION_TOKEN_LENGTH : null })
      frApi.defaults.headers.common.Authorization = `Bearer ${token}`

      /* eslint-disable no-restricted-globals */
      if (location && location.search) {
        const searchParams = {}

        location.search.replace(/^\?/u, '').split('&').forEach((searchParam) => {
          const [key, value] = searchParam.split('=')

          searchParams[key] = value
        })

        const destination = searchParams.destination ? decodeURIComponent(searchParams.destination) : '/profile'

        Router.push(destination)
      }
      /* eslint-enable no-restricted-globals */
    }

    return dispatch(action)
  }
}


export const getClientOAuthPage = (params) => {
  return frApiPlainRequest(
    actionTypes.oauth.authorize.read,
    {
      url: '/oauth2/authorize',
      params,
    },
  )
}


export const submitOAuthDecision = (data) => {
  return frApiPlainRequest(
    actionTypes.oauth.authorize.create,
    {
      url: '/oauth2/authorize',
      method: 'post',
      data,
    },
  )
}


export const register = (data) => {
  return async (dispatch) => {
    const fingerprint = await getFingerprint()

    return dispatch(
      frApiPlainRequest(
        actionTypes.session.register,
        {
          url: '/register',
          method: 'post',
          headers: {
            'X-Fingerprint': fingerprint,
          },
          data: presentApiRequestBody('registrations', data),
        },
      ),
    )
  }
}


export const resetPassword = (token, data) => {
  return frApiPlainRequest(
    actionTypes.passwords.reset,
    {
      url: `/resets/${token}`,
      method: 'post',
      data: presentApiRequestBody('resets', data),
    },
  )
}


export const sendPasswordResetEmail = (data) => {
  return frApiPlainRequest(
    actionTypes.passwords.requestReset,
    {
      url: '/resets',
      method: 'post',
      data: presentApiRequestBody('resets', data),
    },
  )
}


export const validatePasswordResetToken = (token) => {
  return frApiPlainRequest(
    actionTypes.passwords.validateReset,
    {
      url: `/resets/${token}`,
    },
  )
}
