import { ComponentMeta } from '@storybook/react'
import { withMuiPickersUtilsProvider } from '../../stories/decorators'
import InputDatepicker from '.'

export default {
  title: 'Components/Input Datepicker',
  component: InputDatepicker,
  decorators: [withMuiPickersUtilsProvider],
  args: {
    label: 'Picker',
    className: 'h-100',
    date: '',
    setDate: () => {},
    tooltip: 'Descriptive text',
  },
} as ComponentMeta<typeof InputDatepicker>

export { InputDatepicker }
