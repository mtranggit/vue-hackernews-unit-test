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
