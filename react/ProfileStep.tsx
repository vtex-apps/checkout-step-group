import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { ContainerContext, routes } from 'vtex.checkout-container'
import { ProfileForm, ProfileSummary } from 'vtex.checkout-profile'
import { OrderForm } from 'vtex.order-manager'
import { useRuntime } from 'vtex.render-runtime'

import Step from './Step'

const { useOrderForm } = OrderForm
const { useCheckoutContainer } = ContainerContext

const ProfileStep: React.FC = () => {
  const { orderForm } = useOrderForm()
  const { navigate, page } = useRuntime()
  const match = page === 'store.checkout.profile'
  const { requestLogin, isProfileEditable } = useCheckoutContainer()

  const handleProfileEdit = () => {
    if (orderForm.canEditData) {
      navigate({ to: routes.PROFILE })
    } else {
      requestLogin()
    }
  }

  return (
    <Step
      title={<FormattedMessage id="store/checkout-profile-step-title" />}
      data-testid="edit-profile-step"
      actionButton={
        !match &&
        isProfileEditable && (
          <ButtonPlain onClick={handleProfileEdit}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      {match ? <ProfileForm /> : <ProfileSummary />}
    </Step>
  )
}

export default ProfileStep
