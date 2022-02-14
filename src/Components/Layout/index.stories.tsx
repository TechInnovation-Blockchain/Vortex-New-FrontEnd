import { ComponentMeta } from '@storybook/react'
import { withTheme, withProvider, withWeb3Provider } from '../../stories/decorators'
import Layout from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout',
  component: Layout,
  decorators: [withTheme, withProvider, withWeb3Provider],
} as ComponentMeta<typeof Layout>

export { Layout }
