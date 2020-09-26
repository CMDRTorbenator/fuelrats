// Module imports
import React from 'react'
import { createStructuredSelector } from 'reselect'

import { Link } from '~/routes'
import { connect } from '~/store'
import { selectSession } from '~/store/selectors'



function INeedFuel (props) {
  const {
    session,
  } = props

  let supportMessage = null

  if (session.userAgent.match(/playstation/giu)) {
    supportMessage = `
      The built-in PS4 browser is currently not supported.
      This is due to bugs in the PS4 browser, and outside of our control.
      Please use your phone or computer instead.
    `
  }

  return (
    <div className="page-content">
      <div>
        <img
          alt="Fuel rat riding a limpet"
          className="pull-right"
          src="https://wordpress.fuelrats.com/wp-content/uploads/2016/07/vig_rescue_250-200x126.jpg?resize=200%2C126&ssl=1" />

        <h4>
          {'DO YOU SEE A "OXYGEN DEPLETED IN" TIMER?'}
          <br />
          {'If so, quit to the main menu of the game immediately!'}
        </h4>

        <br />

        {supportMessage && (<h5>{supportMessage}</h5>)}

        {
          !supportMessage && (
            <>
              <p>{'Have you found yourself low on fuel and unable to make it to your nearest refuel point? Never fear! The Fuel Rats are here to help!'}</p>

              <div className="buttons">
                <a
                  className="button call-to-action green"
                  href="https://clients.fuelrats.com:7778/"
                  rel="noopener noreferrer"
                  target="_blank">
                  {'Yes, I Need Fuel!'}
                </a>

                <br />

                <p>{"Don't need a fill up? Just looking to chat, or perhaps even help the cause?"}</p>

                <a
                  className="button secondary"
                  href="https://kiwi.fuelrats.com/"
                  rel="noopener noreferrer"
                  target="_blank">
                  {"I don't need fuel, but I still want to chat."}
                </a>
              </div>

              <br />

              <strong>
                {'By connecting to our IRC and using our services, you agree to our '}
                <Link params={{ slug: 'terms-of-service' }} route="wordpress">
                  <a>{'Terms of Service'}</a>
                </Link>
                {' and '}
                <Link params={{ slug: 'privacy-policy' }} route="wordpress">
                  <a>{'Privacy Policy'}</a>
                </Link>
                {'.'}
              </strong>
            </>
          )
        }
      </div>
    </div>
  )
}

INeedFuel.getPageMeta = () => {
  return {
    title: 'I Need Fuel',
  }
}

INeedFuel.mapStateToProps = createStructuredSelector({
  session: selectSession,
})


export default connect(INeedFuel)
