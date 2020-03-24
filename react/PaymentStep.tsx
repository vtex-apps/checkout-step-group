import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'
import { Payment } from 'vtex.checkout-payment'

import IconMastercard from './icons/IconMastercard'
import Step from './Step'

const PAYMENT_ROUTE = '/payment'

const PaymentStep: React.FC = () => {
  const history = Router.useHistory()
  const match = Router.useRouteMatch(PAYMENT_ROUTE)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-payment-step-title" />}
      actionButton={
        !match && (
          <ButtonPlain onClick={() => history.push(PAYMENT_ROUTE)}>
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
          <div className="flex items-center">
            <IconMastercard />
            <span className="c-base ml5">
              Credit Card &middot; &middot; &middot; &middot; 0000
            </span>
          </div>
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default PaymentStep
