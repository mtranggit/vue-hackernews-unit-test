import { mount } from '@vue/test-utils';
import Item from '@/components/Item';

describe('Item.vue', () => {
  test('renders a link to the item.url with item.title as text', () => {
    const item = {
      url: 'http://someurl.com',
      title: 'some title',
    };
    const wrapper = mount(Item, {
      propsData: { item },
    });
    const a = wrapper.find('a');
    expect(a.text()).toBe(item.title);
    expect(a.attributes().href === item.url).toBe(true);
  });
});
