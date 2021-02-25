import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router, ContainerContext, routes } from 'vtex.checkout-container'
import { Payment, PaymentSummary } from 'vtex.checkout-payment'
import { useOrderPayment } from 'vtex.order-payment/OrderPayment'

import Step from './Step'

const { useHistory, useRouteMatch } = Router
const { useCheckoutContainer } = ContainerContext

type BillingAddressType = React.ComponentProps<typeof Payment>['billingAddressType']

interface Props {
  billingAddressType?: BillingAddressType
}

const PaymentStep: React.FC<Props> = ({ billingAddressType }) => {
  const history = useHistory()
  const match = useRouteMatch(routes.PAYMENT)
  const { isFreePurchase } = useOrderPayment()
  const { isPaymentEditable } = useCheckoutContainer()

  const shouldShowEditButton = !match && !isFreePurchase && isPaymentEditable

  return (
    <Step
      title={<FormattedMessage id="store/checkout-payment-step-title" />}
      data-testid="edit-payment-step"
      actionButton={
        shouldShowEditButton && (
          <ButtonPlain onClick={() => history.push(routes.PAYMENT)}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <div hidden={!match}>
        <Payment billingAddressType={billingAddressType} />
      </div>
      <div hidden={match}>
        <PaymentSummary />
      </div>
    </Step>
  )
}

export default PaymentStep
