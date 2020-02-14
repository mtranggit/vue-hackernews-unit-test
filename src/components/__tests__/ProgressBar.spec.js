import { shallowMount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar';

describe('ProgressBar.Vue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('should be hidden by default', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden');
    expect(wrapper.element.style.width).toBe('0%');
  });
  test('sets the bar to 100% width when finish is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(wrapper.element.style.width).toBe('100%');
  });
  test('should show the bar when finish is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(wrapper.classes()).toContain('hidden');
  });
  test('should reset the bar to 0% when start is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    expect(wrapper.element.style.width).toBe('0%');
  });
  test('increases width by 1% for every 100ms after start calls', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    jest.runTimersToTime(100);
    expect(wrapper.element.style.width).toBe('1%');
    jest.runTimersToTime(900);
    expect(wrapper.element.style.width).toBe('10%');
    jest.runTimersToTime(4000);
    expect(wrapper.element.style.width).toBe('50%');
    jest.runTimersToTime(5000);
    expect(wrapper.element.style.width).toBe('100%');
  });
  test('clears timer when finish is called', () => {
    jest.spyOn(window, 'clearInterval');
    setInterval.mockReturnValue(123);
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });
});
