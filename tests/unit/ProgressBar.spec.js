import { shallowMount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar';

describe('ProgressBar.Vue', () => {
  test('should be hidden by default', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden');
    expect(wrapper.element.style.width).toBe('0%');
  });
});
