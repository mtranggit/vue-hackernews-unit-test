import { shallowMount } from '@vue/test-utils';
import Spinner from '@/components/Spinner';

describe('Spinner.vue', () => {
  test('renders correctly', () => {
    expect(shallowMount(Spinner).element).toMatchSnapshot();
  });
});
