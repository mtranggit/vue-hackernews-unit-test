const ITEM_PER_PAGE = 20;
export default {
  displayItems(state) {
    return state.items.slice(0, 20);
  },
  maxPage(state) {
    return Math.ceil(state.items.length / ITEM_PER_PAGE);
  },
};
