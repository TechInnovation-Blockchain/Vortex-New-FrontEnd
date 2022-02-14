import { ComponentMeta } from '@storybook/react'
import InputLabel from '.'

export default {
  title: 'Components/Input Label',
  component: InputLabel,
  args: {
    label: 'Label',
  },
} as ComponentMeta<typeof InputLabel>

export { InputLabel }
