import { shallowMount } from '@vue/test-utils';
import ItemList from '@/views/ItemList';
import Item from '@/components/Item';
import { fetchListData } from '@/api/api';
import flushPromises from 'flush-promises';

jest.mock('@/api/api.js');

describe('ItemList.Vue', () => {
  test('renders an Item with data for each item', async () => {
    expect.assertions(4);
    const $bar = {
      start: () => {},
      finish: () => {},
    };
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    fetchListData.mockResolvedValueOnce(items);
    // fetchListData.mockImplementationOnce(() => Promise.resolve(items));
    const wrapper = shallowMount(ItemList, { mocks: { $bar } });
    await flushPromises();
    const Items = wrapper.findAll(Item);
    expect(Items).toHaveLength(items.length);
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i]);
    });
  });

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {},
    };
    shallowMount(ItemList, { mocks: { $bar } });
    expect($bar.start).toHaveBeenCalledTimes(1);
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      fail: jest.fn(),
    };
    fetchListData.mockImplementationOnce(() => Promise.reject());
    shallowMount(ItemList, { mocks: { $bar } });
    await flushPromises();
    expect($bar.fail).toHaveBeenCalled();
  });
});
