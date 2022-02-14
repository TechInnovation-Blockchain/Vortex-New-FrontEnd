import { ComponentMeta } from '@storybook/react'
import { withProvider, withBackground, withRouter } from '../../stories/decorators'
import Deposit from '.'

export default {
  title: 'Pages/Deposit',
  decorators: [withProvider, withBackground(), withRouter],
  component: Deposit,
  args: {
    location: { pathname: '' },
    size: 'large',
  },
} as ComponentMeta<typeof Deposit>

export { Deposit }
