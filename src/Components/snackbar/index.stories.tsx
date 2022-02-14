import { ComponentMeta } from '@storybook/react'
import { withTheme, withProvider, withBackground } from '../../stories/decorators'
import Snackbar from '.'

export default {
  title: 'Components/Snackbar',
  decorators: [withProvider, withTheme, withBackground()],
  component: Snackbar,
  parameters: { loki: { skip: true } },
} as ComponentMeta<typeof Snackbar>

export { Snackbar }
