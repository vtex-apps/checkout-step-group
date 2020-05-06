import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'
import { Payment, PaymentSummary } from 'vtex.checkout-payment'
import { OrderForm } from 'vtex.order-manager'

import Step from './Step'

const PAYMENT_ROUTE = '/payment'

const PaymentStep: React.FC = () => {
  const { orderForm } = OrderForm.useOrderForm()
  const history = Router.useHistory()
  const match = Router.useRouteMatch(PAYMENT_ROUTE)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-payment-step-title" />}
      actionButton={
        !match && (
          <ButtonPlain
            onClick={() => history.push(PAYMENT_ROUTE)}
            disabled={!orderForm.canEditData}
          >
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={PAYMENT_ROUTE}>
          <Payment />
        </Router.Route>
        <Router.Route path="*">
          <PaymentSummary />
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default PaymentStep
