import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconEdit } from 'vtex.styleguide'
import { Router, ContainerContext, routes } from 'vtex.checkout-container'
import { AddressSummary, ShippingAddress } from 'vtex.checkout-shipping'

import Step from './Step'

const { useHistory, useRouteMatch } = Router
const { useCheckoutContainer } = ContainerContext

const AddressStep: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch(routes.ADDRESS)
  const { isAddressEditable } = useCheckoutContainer()

  return (
    <Step
      title={<FormattedMessage id="store/checkout-address-step-title" />}
      data-testid="edit-address-step"
      actionButton={
        !match &&
        isAddressEditable && (
          <ButtonPlain onClick={() => history.push(routes.ADDRESS)}>
            <IconEdit solid />
          </ButtonPlain>
        )
      }
      active={!!match}
    >
      <Router.Switch>
        <Router.Route path={routes.ADDRESS}>
          <ShippingAddress />
        </Router.Route>
        <Router.Route path="*">
          <AddressSummary />
        </Router.Route>
      </Router.Switch>
    </Step>
  )
}

export default AddressStep
