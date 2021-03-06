import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router, ContainerContext, routes } from 'vtex.checkout-container'
import { ShippingSummary, ShippingForm } from 'vtex.checkout-shipping'

import Step from './Step'

const { useHistory, useRouteMatch } = Router
const { useCheckoutContainer } = ContainerContext

const ShippingStep: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch(routes.SHIPPING)
  const { isShippingEditable } = useCheckoutContainer()

  return (
    <Step
      title={<FormattedMessage id="store/checkout-shipping-step-title" />}
      data-testid="edit-shipping-step"
      actionButton={
        !match &&
        isShippingEditable && (
          <ButtonPlain onClick={() => history.push(routes.SHIPPING)}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={routes.SHIPPING}>
          <ShippingForm />
        </Router.Route>
        <Router.Route path="*">
          <ShippingSummary />
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default ShippingStep
