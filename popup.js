// Load saved endpoint URL when popup opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["companyName"], (result) => {
    if (result.companyName) {
      document.getElementById("companyName").value = result.companyName;
    }
  });
});

// Save endpoint URL whenever it changes
document.getElementById("companyName").addEventListener("input", (event) => {
  const companyName = event.target.value;
  chrome.storage.sync.set({ companyName });
});

document.getElementById("syncBtn").addEventListener("click", () => {
  const companyNameInput = document.getElementById("companyName");
  const companyName = companyNameInput.value.trim();

  if (!companyName) {
    alert("Please enter a valid company name.");
    return;
  }

  chrome.storage.sync.set({ companyName });

  fetch(
    `https://construction-js-injections.pages.dev/bookmarks?companyName=${companyName}`
  )
    .then((response) => response.json())
    .then((bookmarkData) => {
      // Remove existing folder (optional)
      chrome.bookmarks.search({ title: "Company Bookmarks" }, (results) => {
        for (const result of results) {
          chrome.bookmarks.removeTree(result.id);
        }

        // Create main folder
        chrome.bookmarks.create(
          { parentId: "1", title: "Company Bookmarks" },
          (mainFolder) => {
            // Process each category
            bookmarkData.forEach((category) => {
              // Create subfolder for each category
              chrome.bookmarks.create(
                { parentId: mainFolder.id, title: category.label },
                (subFolder) => {
                  // Add bookmarks to the subfolder
                  category.bookmarks.forEach((bookmark) => {
                    chrome.bookmarks.create({
                      parentId: subFolder.id,
                      title: bookmark.title,
                      url: bookmark.url,
                    });
                  });
                }
              );
            });
          }
        );
      });
    })
    .catch((error) => {
      console.error("Error syncing bookmarks:", error);
    });
});
