import { ComponentMeta } from '@storybook/react'
import PopupDropdown from '.'
import { withBackground } from '../../stories/decorators'

export default {
  title: 'Components/Popup Dropdown',
  component: PopupDropdown,
  decorators: [withBackground()],
  args: {
    data: { label: 'Label', options: [{ value: '0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E', label: 'One' }], rewardTokens: [] },
    select: () => {},
    setSelectedTokenOption: () => {},
    setModal: () => {},
    setTokenContractAddresses: () => {},
    setRequestedTokenOptions: () => {},
    setSelectedPortal: () => {},
  },
} as ComponentMeta<typeof PopupDropdown>

export { PopupDropdown }
