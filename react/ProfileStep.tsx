import React from 'react'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'

import Step from './Step'

const PROFILE_ROUTE = '/profile'

const ProfileStep: React.FC = () => {
  const history = Router.useHistory()
  const match = Router.useRouteMatch(PROFILE_ROUTE)

  return (
    <Step
      title={
        <>
          <h1 className="f4 mv0">Profile</h1>
          <div className="pl4">
            <ButtonPlain onClick={() => history.push(PROFILE_ROUTE)}>
              <IconEdit solid />
            </ButtonPlain>
          </div>
        </>
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={PROFILE_ROUTE}>profile edit</Router.Route>
        <Router.Route path="*">
          <div className="flex flex-column">
            <span className="c-base lh-title">
              John Doe <br />
              long-email-address@hotmail.com
            </span>
          </div>
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default ProfileStep
