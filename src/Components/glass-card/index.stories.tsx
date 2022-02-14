import { ComponentMeta } from '@storybook/react'
import GlassCard from '.'

export default {
  title: 'Components/Glass Card',
  component: GlassCard,
  args: {
    color: 'rgba(66, 255, 0, 1)',
    margin: '10% auto',
    height: '450px',
    width: '450px',
    children: <div style={{ height: '200px', width: '200px' }} />,
  },
} as ComponentMeta<typeof GlassCard>

export { GlassCard }
