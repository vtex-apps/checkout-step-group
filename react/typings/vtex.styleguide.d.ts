import * as Styleguide from 'vtex.styleguide'

declare module 'vtex.styleguide' {
  import React from 'react'

  export const Alert: React.FC

  export const Button: React.FC

  export const Input: React.FC

  export const IconCheck: React.FC
  export const IconClose: React.FC
  export const IconEdit: React.FC
}
