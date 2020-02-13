import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import merge from 'lodash.merge';
import mergeWith from 'lodash.mergewith';
import ItemList from '@/views/ItemList';
import Item from '@/components/Item';
// import { fetchListData } from '@/api/api';
import flushPromises from 'flush-promises';

// jest.mock('@/api/api.js');

const localVue = createLocalVue();
localVue.use(Vuex);

// If customizer returns a value,
// Lodash will assign the property using the new value.
// If customizer returns undefined, Lodash will use the default merge strategy
function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue;
  }
  // return srcValue ? srcValue : objValue;
}

describe('ItemList.Vue', () => {
  function createStore(overrides) {
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn(),
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve()),
      },
    };
    return new Vuex.Store(mergeWith(defaultStoreConfig, overrides, customizer));
    // return new Vuex.Store(merge(defaultStoreConfig, overrides));
  }

  function createWrapper(overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn(),
        },
      },
      localVue,
      store: createStore(),
    };
    return shallowMount(ItemList, mergeWith(defaultMountingOptions, overrides, customizer));
    // return shallowMount(ItemList, merge(defaultMountingOptions, overrides));
  }
  // let storeOptions;
  // let store;

  // beforeEach(() => {
  //   createStore();
  // });

  // controlling a getter in a fake store
  test('renders an Item with data for each item', async () => {
    expect.assertions(4);
    // const $bar = {
    //   start: () => {},
    //   finish: () => {},
    // };
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    // storeOptions.getters.displayItems.mockReturnValue(items);

    // fetchListData.mockResolvedValueOnce(items);
    // fetchListData.mockImplementationOnce(() => Promise.resolve(items));
    // const wrapper = shallowMount(ItemList, { mocks: { $bar }, localVue, store });

    const store = createStore({
      getters: {
        displayItems: () => items,
      },
    });

    const wrapper = createWrapper({ store });

    // await flushPromises();
    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(items.length);
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i]);
    });
  });

  test('calls $bar start on load', () => {
    // const $bar = {
    //   start: jest.fn(),
    //   finish: () => {},
    // };
    // shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    const mocks = {
      $bar: {
        start: jest.fn(),
      },
    };
    createWrapper({ mocks });
    expect(mocks.$bar.start).toHaveBeenCalledTimes(1);
  });

  test('calls $bar finish when load successful', async () => {
    expect.assertions(1);
    const mocks = {
      $bar: {
        finish: jest.fn(),
      },
    };
    createWrapper({ mocks });
    // const $bar = {
    //   start: () => {},
    //   finish: jest.fn(),
    // };
    // shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();
    expect(mocks.$bar.finish).toHaveBeenCalled();
  });

  test('dispatches fetchListData with top', async () => {
    expect.assertions(1);
    const store = createStore();
    store.dispatch = jest.fn(() => Promise.resolve());
    createWrapper({ store });
    await flushPromises();
    // const $bar = {
    //   start: () => {},
    //   finish: () => {},
    // };
    // store.dispatch = jest.fn(() => Promise.resolve());
    // shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top',
    });
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);
    const store = createStore({
      actions: {
        fetchListData: jest.fn(() => Promise.reject()),
      },
    });
    const mocks = {
      $bar: {
        fail: jest.fn(),
      },
    };
    createWrapper({ store, mocks });
    // const $bar = {
    //   start: () => {},
    //   fail: jest.fn(),
    // };
    // storeOptions.actions.fetchListData.mockRejectedValue();
    // fetchListData.mockImplementationOnce(() => Promise.reject());

    // shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();
    expect(mocks.$bar.fail).toHaveBeenCalled();
  });
});
