import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'
import { OrderForm } from 'vtex.order-manager'
import { ShippingSummary, ShippingForm } from 'vtex.checkout-shipping'

import Step from './Step'

const SHIPPING_ROUTE = '/shipping'

const ShippingStep: React.FC = () => {
  const { orderForm } = OrderForm.useOrderForm()
  const history = Router.useHistory()
  const match = Router.useRouteMatch(SHIPPING_ROUTE)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-shipping-step-title" />}
      data-testid="edit-shipping-step"
      actionButton={
        !match && (
          <ButtonPlain
            onClick={() => history.push(SHIPPING_ROUTE)}
            disabled={!orderForm.canEditData}
          >
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={SHIPPING_ROUTE}>
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
