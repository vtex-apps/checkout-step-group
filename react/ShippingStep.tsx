import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { ContainerContext, routes } from 'vtex.checkout-container'
import { ShippingSummary, ShippingForm } from 'vtex.checkout-shipping'
import { useRuntime } from 'vtex.render-runtime'

import Step from './Step'

const { useCheckoutContainer } = ContainerContext

const ShippingStep: React.FC = () => {
  const { page, navigate } = useRuntime()
  const match = page === 'store.checkout.shipping'
  const { isShippingEditable } = useCheckoutContainer()

  return (
    <Step
      title={<FormattedMessage id="store/checkout-shipping-step-title" />}
      data-testid="edit-shipping-step"
      actionButton={
        !match &&
        isShippingEditable && (
          <ButtonPlain onClick={() => navigate({ to: routes.SHIPPING })}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      {match ? <ShippingForm /> : <ShippingSummary />}
    </Step>
  )
}

export default ShippingStep
