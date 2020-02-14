const hackernewsApi = {
  apiUrl: 'https://hacker-news.firebaseio.com',
  version: 'v0',
  cachedItems: new Set(),
};

// function fetch(child) {
//   const {apiUrl, version, cachedItems } = hackernewsApi;
//   if (cachedItems && cachedItems.has(child)) {
//     return Promise.resolve(cachedItems.get(child));
//   }
//   return new Promise((resolve, reject) => {

//   }
// };

export function fetchListData(type) {
  console.log('Fetching data for type ', type);
  return Promise.resolve([]);
}

export function fetchItem(id) {
  console.log('Fetching item id ', id);
  return Promise.resolve({});
}

export function fetchItems(ids) {
  console.log('Fetching items with ids', ids);
  return Promise.resolve([{}]);
}

export function fetchUser(id) {
  console.log('Fetching user id ', id);
  return Promise.resolve({ id });
}
