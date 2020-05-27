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
      data-testid="edit-payment-step"
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
      <div hidden={!match}>
        <Payment />
      </div>
      <div hidden={match}>
        <PaymentSummary />
      </div>
    </Step>
  )
}

export default PaymentStep
