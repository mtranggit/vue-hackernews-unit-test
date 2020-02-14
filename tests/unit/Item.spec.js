import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils';
import merge from 'lodash.merge';
import Item from '@/components/Item';

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub,
    },
    propsData: {
      item: {},
    },
  };
  return shallowMount(Item, merge(defaultMountingOptions, overrides));
}

describe('Item.vue', () => {
  // test('renders a link to the item.url with item.title as text', () => {
  //   const item = {
  //     url: 'http://someurl.com',
  //     title: 'some title',
  //   };
  //   const wrapper = mount(Item, {
  //     propsData: { item },
  //   });
  //   const a = wrapper.find('a');
  //   expect(a.text()).toBe(item.title);
  //   expect(a.attributes().href === item.url).toBe(true);
  // });

  test('renders the hostname', () => {
    const item = {
      url: 'https://www.google.com/long/path',
    };
    const wrapper = createWrapper({
      propsData: {
        item,
      },
    });
    expect(wrapper.text()).toContain('(google.com)');
  });

  test('renders the time since last post', () => {
    const dateNow = jest.spyOn(Date, 'now');
    const dateNowTime = new Date('2020');

    dateNow.mockImplementation(() => dateNowTime);

    const item = {
      time: dateNowTime / 1000 - 600,
    };
    const wrapper = createWrapper({
      propsData: {
        item,
      },
    });
    dateNow.mockRestore(); // reset the value just in case other test rely on Date.now functionality
    expect(wrapper.text()).toContain('10 minutes ago');
  });
});
