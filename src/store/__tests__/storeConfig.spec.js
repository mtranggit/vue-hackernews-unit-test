import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import cloneDeep from 'lodash.clonedeep';
import flushPromises from 'flush-promises';
import storeConfig from '../storeConfig';
import { fetchListData } from '../../api/api';

jest.mock('../../api/api');

const localVue = createLocalVue();
localVue.use(Vuex);

function createItems(n) {
  const arr = new Array(n);
  return arr.fill().map((v, i) => ({ id: `${arr[i]}`, name: `item ${i}` }));
}

describe('storeConfig', () => {
  test('dispatching fetchListData updates displayItems getter', async () => {
    expect.assertions(1);
    const items = createItems(22);
    const clonedStoreConfig = cloneDeep(storeConfig);
    const store = new Vuex.Store(clonedStoreConfig);
    const type = 'top';
    fetchListData.mockImplementation(callType => {
      return callType === type ? Promise.resolve(items) : Promise.resolve();
    });
    store.dispatch('fetchListData', { type });
    await flushPromises();
    expect(store.getters.displayItems).toEqual(items.slice(0, 20));
  });
});
