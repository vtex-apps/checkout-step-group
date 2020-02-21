import React from 'react'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'

import IconMastercard from './icons/IconMastercard'
import Step from './Step'

const PAYMENT_ROUTE = '/payment'

const PaymentStep: React.FC = () => {
  const history = Router.useHistory()
  const match = Router.useRouteMatch(PAYMENT_ROUTE)

  return (
    <Step
      title={
        <>
          <h1 className="f4 mv0">Payment</h1>
          <div className="pl4">
            <ButtonPlain onClick={() => history.push(PAYMENT_ROUTE)}>
              <IconEdit solid />
            </ButtonPlain>
          </div>
        </>
      }
      active={!!match}
    >
      <div className="flex items-center">
        <IconMastercard />
        <span className="c-base ml5">
          Credit Card &middot; &middot; &middot; &middot; 0000
        </span>
      </div>
    </Step>
  )
}

export default PaymentStep
