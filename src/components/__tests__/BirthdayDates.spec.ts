import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BirthdayDates from '../BirthdayDates.vue'

describe('BirthdayDates', () => {
  it('renders properly', () => {
    const wrapper = mount(BirthdayDates)
    expect(wrapper.text()).toContain('Random Birthday Dates')
  })
})
