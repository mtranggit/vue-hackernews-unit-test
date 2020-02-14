const ITEM_PER_PAGE = 20;
export default {
  displayItems(state) {
    const page = Number(state.route.params.page) || 1;
    const start = (page - 1) * ITEM_PER_PAGE;
    const end = page * ITEM_PER_PAGE;
    return state.items.slice(start, end);
    // return state.items.slice(0, 20);
  },
  maxPage(state) {
    return Math.ceil(state.items.length / ITEM_PER_PAGE);
  },
};
