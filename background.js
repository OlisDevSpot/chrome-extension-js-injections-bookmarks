// const bookmarksToAdd = [
//   { title: "Google", url: "https://www.google.com" },
//   { title: "Stack Overflow", url: "https://stackoverflow.com" },
//   { title: "Wikipedia", url: "https://www.wikipedia.org" },
//   { title: "GitHub", url: "https://github.com" },
//   { title: "News", url: "https://news.google.com" },
//   // Add more up to 20...
// ];

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.bookmarks.create(
//     { parentId: "1", title: "Company Bookmarks" },
//     (folder) => {
//       for (const bm of bookmarksToAdd) {
//         chrome.bookmarks.create({
//           parentId: folder.id,
//           title: bm.title,
//           url: bm.url,
//         });
//       }
//     }
//   );
// });
