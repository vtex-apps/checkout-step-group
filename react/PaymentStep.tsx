import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { ContainerContext, routes } from 'vtex.checkout-container'
import { Payment, PaymentSummary } from 'vtex.checkout-payment'
import { useOrderPayment } from 'vtex.order-payment/OrderPayment'
import { useRuntime } from 'vtex.render-runtime'

import Step from './Step'

const { useCheckoutContainer } = ContainerContext

const PaymentStep: React.FC = () => {
  const { page, navigate } = useRuntime()
  const match = page === 'store.checkout.payment'
  const { isFreePurchase } = useOrderPayment()
  const { isPaymentEditable } = useCheckoutContainer()

  const shouldShowEditButton = !match && !isFreePurchase && isPaymentEditable

  return (
    <Step
      title={<FormattedMessage id="store/checkout-payment-step-title" />}
      data-testid="edit-payment-step"
      actionButton={
        shouldShowEditButton && (
          <ButtonPlain onClick={() => navigate({ to: routes.PAYMENT })}>
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
