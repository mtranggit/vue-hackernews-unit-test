import { shallowMount } from '@vue/test-utils';
import ItemList from '@/views/ItemList';
import Item from '@/components/Item';

describe('ItemList.Vue', () => {
  test('renders an Item for each item in the window.items data', () => {
    const newsItems = [
      {
        title: 'Top news',
        url: 'https//www.someurl.com/topnews',
      },
      {
        title: 'Ginger Shallot',
        url: 'https//www.someurl.com/ginger',
      },
      {
        title: 'Top stories',
        url: 'https//www.someurl.com/topstories',
      },
    ];
    window.items = newsItems;
    const wrapper = shallowMount(ItemList);
    const items = wrapper.findAll(Item);
    expect(items).toHaveLength(window.items.length);
    items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i]);
    });
  });
});
