import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router, ContainerContext, routes } from 'vtex.checkout-container'
import { ProfileForm, ProfileSummary } from 'vtex.checkout-profile'
import { OrderForm } from 'vtex.order-manager'

import Step from './Step'

const { useOrderForm } = OrderForm
const { useHistory, useRouteMatch } = Router
const { useCheckoutContainer } = ContainerContext

const ProfileStep: React.FC = () => {
  const { orderForm } = useOrderForm()
  const history = useHistory()
  const match = useRouteMatch(routes.PROFILE)
  const { requestLogin, isProfileEditable } = useCheckoutContainer()

  const handleProfileEdit = () => {
    if (orderForm.canEditData) {
      history.push(routes.PROFILE)
    } else {
      requestLogin()
    }
  }

  return (
    <Step
      title={<FormattedMessage id="store/checkout-profile-step-title" />}
      data-testid="edit-profile-step"
      actionButton={
        !match &&
        isProfileEditable && (
          <ButtonPlain onClick={handleProfileEdit}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={routes.PROFILE}>
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
