import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'
import { ProfileForm, ProfileSummary } from 'vtex.checkout-profile'
import { OrderForm } from 'vtex.order-manager'

import Step from './Step'

const PROFILE_ROUTE = '/profile'

const ProfileStep: React.FC = () => {
  const { orderForm } = OrderForm.useOrderForm()
  const history = Router.useHistory()
  const match = Router.useRouteMatch(PROFILE_ROUTE)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-profile-step-title" />}
      data-testid="edit-profile-step"
      actionButton={
        !match && (
          <ButtonPlain
            onClick={() => history.push(PROFILE_ROUTE)}
            disabled={!orderForm.canEditData}
          >
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={PROFILE_ROUTE}>
          <ProfileForm />
        </Router.Route>
        <Router.Route path="*">
          <ProfileSummary />
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default ProfileStep
