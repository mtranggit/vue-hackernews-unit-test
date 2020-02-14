import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
// import merge from 'lodash.merge';
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
        $route: {
          params: { type: 'top' },
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
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

  test('dispatches fetchListData with $route.params.type', async () => {
    expect.assertions(1);
    const store = createStore();
    store.dispatch = jest.fn(() => Promise.resolve());
    // const $bar = {
    //   start: () => {},
    //   finish: () => {},
    // };
    // store.dispatch = jest.fn(() => Promise.resolve());
    // shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    const type = 'a type';
    const mocks = {
      $route: {
        params: {
          type,
        },
      },
    };
    createWrapper({ store, mocks });
    await flushPromises();
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type,
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

  test('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5,
      },
    });
    const wrapper = createWrapper({ store });
    expect(wrapper.text()).toContain('1/5');
  });

  test('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5,
      },
    });
    const mocks = {
      $route: {
        params: {
          page: '2',
        },
      },
    };
    const wrapper = createWrapper({ store, mocks });
    expect(wrapper.text()).toContain('2/5');
  });

  test('calls $router.replace when the page parameter is greater than the max page content', async () => {
    expect.assertions(1);
    const store = createStore({
      getters: {
        maxPage: () => 5,
      },
    });
    const mocks = {
      $route: {
        params: {
          page: '1000',
        },
      },
      $router: {
        replace: jest.fn(),
      },
    };
    createWrapper({ store, mocks });
    await flushPromises();
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1');
  });

  test('calls $router.replace when the page parameter is 0', async () => {
    expect.assertions(1);
    const mocks = {
      $route: {
        params: {
          page: '0',
        },
      },
      $router: {
        replace: jest.fn(),
      },
    };
    createWrapper({ mocks });
    await flushPromises();
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1');
  });

  test('calls $router.replace when the page parameter not a numer', async () => {
    expect.assertions(1);
    const mocks = {
      $route: {
        params: {
          page: 'abc',
        },
      },
      $router: {
        replace: jest.fn(),
      },
    };
    createWrapper({ mocks });
    await flushPromises();
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1');
  });

  test('renders a RouterLink with the previous page if one exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5,
      },
    });
    const mocks = {
      $route: {
        params: {
          page: '2',
        },
      },
    };
    const wrapper = createWrapper({ store, mocks });
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/1');
    expect(wrapper.find(RouterLinkStub).text()).toBe('< previous');
  });

  test('renders a RouterLink with the next page if one exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5,
      },
    });
    const mocks = {
      $route: {
        params: {
          page: '1',
        },
      },
    };
    const wrapper = createWrapper({ store, mocks });
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/2');
    expect(wrapper.find(RouterLinkStub).text()).toBe('more >');
  });

  test('renders an <a> element without an href if there are no previous page', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('a').attributes().href).toBe(undefined);
    expect(wrapper.find('a').text()).toBe('< previous');
  });

  test('renders an <a> element without an href if there are no next page', () => {
    const store = createStore({
      getters: {
        maxPage: () => 1,
      },
    });
    const wrapper = createWrapper({ store });
    expect(
      wrapper
        .findAll('a')
        .at(1)
        .attributes().href,
    ).toBe(undefined);
    expect(
      wrapper
        .findAll('a')
        .at(1)
        .text(),
    ).toBe('more >');
  });

  test('sets document.title with the capitalized type prop', () => {
    const mocks = {
      $route: {
        params: {
          type: 'top',
        },
      },
    };
    createWrapper({ mocks });
    expect(document.title).toBe('Vue HN | Top');
  });
});
