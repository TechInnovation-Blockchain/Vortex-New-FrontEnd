import { ComponentMeta } from '@storybook/react'
import { withTheme, withProvider, withBackground } from '../../stories/decorators'
import WalletDialog from '.'

export default {
  title: 'Components/Wallet Dialog',
  decorators: [withTheme, withProvider, withBackground()],
  component: WalletDialog,
  parameters: { loki: { skip: true } },
  args: {
    open: true,
    setOpen: () => {},
    address: '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E',
    items: [],
    activate: () => {},
  },
} as ComponentMeta<typeof WalletDialog>

export { WalletDialog }
