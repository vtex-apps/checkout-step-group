import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { ContainerContext, routes } from 'vtex.checkout-container'
import { AddressSummary, ShippingAddress } from 'vtex.checkout-shipping'
import { OrderForm } from 'vtex.order-manager'
import { OrderShipping } from 'vtex.order-shipping'
import { useRuntime } from 'vtex.render-runtime'

import Step from './Step'

const { useOrderForm } = OrderForm
const { useOrderShipping } = OrderShipping
const { useCheckoutContainer } = ContainerContext

const AddressStep: React.FC = () => {
  const { page, navigate } = useRuntime()
  const match = page === 'store.checkout.address'
  const { requestLogin, isAddressEditable } = useCheckoutContainer()
  const { orderForm } = useOrderForm()
  const { selectedAddress } = useOrderShipping()

  const handleAddressEdit = () => {
    if (orderForm.canEditData || selectedAddress?.isDisposable) {
      navigate({ to: routes.ADDRESS })
    } else {
      requestLogin()
    }
  }

  return (
    <Step
      title={<FormattedMessage id="store/checkout-address-step-title" />}
      data-testid="edit-address-step"
      actionButton={
        !match &&
        isAddressEditable && (
          <ButtonPlain onClick={handleAddressEdit}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      {match ? <ShippingAddress /> : <AddressSummary />}
    </Step>
  )
}

export default AddressStep
