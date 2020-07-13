import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router, routes } from 'vtex.checkout-container'
import { Payment, PaymentSummary } from 'vtex.checkout-payment'

import Step from './Step'

const { useHistory, useRouteMatch } = Router

const PaymentStep: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch(routes.PAYMENT)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-payment-step-title" />}
      data-testid="edit-payment-step"
      actionButton={
        !match && (
          <ButtonPlain onClick={() => history.push(routes.PAYMENT)}>
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
