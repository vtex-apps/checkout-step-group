import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router } from 'vtex.checkout-container'

import Step from './Step'

const SHIPPING_ROUTE = '/shipping'

const ShippingStep: React.FC = () => {
  const history = Router.useHistory()
  const match = Router.useRouteMatch(SHIPPING_ROUTE)

  return (
    <Step
      title={<FormattedMessage id="store/checkout-shipping-step-title" />}
      actionButton={
        !match && (
          <ButtonPlain onClick={() => history.push(SHIPPING_ROUTE)}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <div className="flex flex-column">
        <span className="c-base lh-title">
          USPS Express Same-day
          <br />
          Get it Mon, Dec 21 &mdash; $23.00
        </span>
        <span className="c-base mt5 lh-title">
          1223 Maglonia St Apt 1A
          <br />
          Hempstead NY 11550
        </span>
      </div>
    </Step>
  )
}

export default ShippingStep
