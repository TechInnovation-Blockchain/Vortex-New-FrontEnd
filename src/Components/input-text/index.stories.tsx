import { ComponentMeta, Story } from '@storybook/react'
import { withMuiPickersUtilsProvider } from '../../stories/decorators'
import InputText from '.'
import type { Props as InputProps } from '.'

export default {
  title: 'Components/Input Text',
  component: InputText,
  decorators: [withMuiPickersUtilsProvider],
  args: {
    className: 'h-100',
    type: 'number',
    label: 'Dist.',
    onChange: () => { },
    tooltip: 'The distribution limit specifies the quantity of staked tokens needed before rewards start accumulating for all stakers.',
    placeholder: '0',
  },
} as ComponentMeta<typeof InputText>

const Template: Story<InputProps> = (args: InputProps) => <InputText {...args} /> // eslint-disable-line react/jsx-props-no-spreading

export const InputTextError = Template.bind({})

InputTextError.args = {
  error: 'This is not correct input',
}

export { InputText }
