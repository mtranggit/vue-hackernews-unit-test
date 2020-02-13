import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ItemList from '@/views/ItemList';
import Item from '@/components/Item';
// import { fetchListData } from '@/api/api';
import flushPromises from 'flush-promises';

// jest.mock('@/api/api.js');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ItemList.Vue', () => {
  let storeOptions;
  let store;

  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: jest.fn(),
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve()),
      },
    };
    store = new Vuex.Store(storeOptions);
  });

  // controlling a getter in a fake store
  test('renders an Item with data for each item', async () => {
    expect.assertions(4);
    const $bar = {
      start: () => {},
      finish: () => {},
    };
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    storeOptions.getters.displayItems.mockReturnValue(items);

    // fetchListData.mockResolvedValueOnce(items);
    // fetchListData.mockImplementationOnce(() => Promise.resolve(items));
    const wrapper = shallowMount(ItemList, { mocks: { $bar }, localVue, store });

    // await flushPromises();
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
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    expect($bar.start).toHaveBeenCalledTimes(1);
  });

  test('calls $bar finish when load successful', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: jest.fn(),
    };
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();
    expect($bar.finish).toHaveBeenCalled();
  });

  test('dispatches fetchListData with top', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: () => {},
    };
    store.dispatch = jest.fn(() => Promise.resolve());
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top',
    });
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      fail: jest.fn(),
    };
    storeOptions.actions.fetchListData.mockRejectedValue();
    // fetchListData.mockImplementationOnce(() => Promise.reject());

    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();
    expect($bar.fail).toHaveBeenCalled();
  });
});
