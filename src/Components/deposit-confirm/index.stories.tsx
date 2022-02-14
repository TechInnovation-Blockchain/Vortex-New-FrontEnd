import { ComponentMeta } from '@storybook/react'
import { withTheme, withProvider } from '../../stories/decorators'
import DepositConfirm from '.'

export default {
  title: 'Components/Deposit Confirm',
  component: DepositConfirm,
  decorators: [withTheme, withProvider],
  args: {
    title: 'title',
    confirmed: false,
    cancelled: false,
    getDescription: () => {},
  },
} as ComponentMeta<typeof DepositConfirm>

export { DepositConfirm }
