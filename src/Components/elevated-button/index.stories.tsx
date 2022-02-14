import { ComponentMeta } from '@storybook/react'
import { withTheme, withProvider } from '../../stories/decorators'
import ElevatedButton from '.'

export default {
  title: 'Components/Elevated Button',
  component: ElevatedButton,
  decorators: [withTheme, withProvider],
  args: {
    title: 'Press Me',
    onClick: () => {},
    style: {},
    expanded: false,
  },
} as ComponentMeta<typeof ElevatedButton>

export { ElevatedButton }
