import { ComponentMeta } from '@storybook/react'
import { withProvider, withBackground, withRouter } from '../../stories/decorators'
import Stake from '.'

export default {
  title: 'Pages/Stake',
  decorators: [withProvider, withBackground(), withRouter],
  component: Stake,
  args: {
    location: { pathname: '' },
    size: 'large',
  },
} as ComponentMeta<typeof Stake>

export { Stake }
