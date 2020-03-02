# Checkout Step Group

The Step Group component renders a list of "steps" in the Checkout interfaces. Each step
is represented by a required part of the checkout process that the user must complete before
they finish their order.

## Configuration

1. Add the Step Group app to your theme's dependencies in the `manifest.json`. For example:

```json
{
  "dependencies": {
    "vtex.checkout-step-group": "0.x"
  }
}
```

2. Add the `checkout-step-group` block inside the block which renders the checkout. For example:

> `interfaces.json`

```json
{
  "my-checkout-page": {
    "around": ["checkout-container"],
    "composition": "children"
  }
}
```

> `blocks.json`

```json
{
  "my-checkout-page": {
    "children": ["checkout-step-group"]
  }
}
```

## Advanced customization

The `checkout-step-group` block renders by default 3 steps, the most common ones in the checkout process:

- `profile-step`: Renders the profile form, and the profile summary
- `shipping-step`: Renders the shipping form, which includes the address form and pickup point
- `payment-step`: Renders the payment form, with all the available payment methods in the current store


If you want to customize and remove (or add) one of these steps, you can do so by doing the following:

> `blocks.json`

```jsonc
{
  "checkout-step-group#my-checkout": {
    "children": [
      // you can include here only the steps you need
      // in your store
      "profile-step",
      "payment-step"
    ]
  },
  "my-checkout-page": {
    "children": ["checkout-step-group#my-checkout"]
  }
}
```

## CSS Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in [this recipe](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization)
regarding using CSS classes for store customization.

| CSS Handles |
| --- |
| `stepGroupWrapper` |
| `stepGroupList` |
