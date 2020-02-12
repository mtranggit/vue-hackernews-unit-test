import { shallowMount, mount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader';

describe('AppHeader', () => {
  test('Sanity test', () => {
    expect(true).toBe(true);
  });
  test('if user is not logged in, do not show logout button', () => {
    const wrapper = mount(AppHeader); // mounting the component
    expect(wrapper.find('button').isVisible()).toBe(false);
  });
  test('if user is logged in, show logout button', () => {
    const wrapper = shallowMount(AppHeader); // mounting the component
    wrapper.setData({ loggedIn: true }); // setting our data value
    // console.log(wrapper.html());
    expect(wrapper.find('button').isVisible()).toBe(true);
  });
});
