/* eslint-disable no-restricted-globals */
const cacheKey = "MyFancyCacheName_v2";

self.addEventListener("install", (event) => {
  console.log("Service worker installed!");
  
  event.waitUntil(
    caches.open(cacheKey).then((cache) => {
      // Add all the assets in the array to the 'MyFancyCacheName_v2'
      // `Cache` instance for later use.
      return cache.addAll([
        "/logo192.png",
        "/logo512.png"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated!");

  // Specify allowed cache keys
  const cacheAllowList = [cacheKey];

  // Get all the currently active `Cache` instances.
  event.waitUntil(
    caches.keys().then((keys) => {
      // Delete all caches that aren't in the allow list:
      return Promise.all(
        keys.map((key) => {
          if (!cacheAllowList.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});


// Cache first, falling back to network
self.addEventListener('fetch', async (event) => {
  // Is this a request for an image?
  if (event.request.destination === 'image') {

    // Open the cache
    event.respondWith(caches.open(cacheKey).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request.url).then((cachedResponse) => {
        return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
          // Add the network response to the cache for future visits.
          // Note: we need to make a copy of the response to save it in
          // the cache and use the original as the request response.
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});


 // Network first, falling back to cache
// self.addEventListener('fetch', (event) => {
//   // Check if this is a navigation request
//   if (event.request.mode === 'navigate') {

//     // Open the cache
//     event.respondWith(caches.open(cacheKey).then((cache) => {
//       // Go to the network first
//       return fetch(event.request.url).then((fetchedResponse) => {
//         cache.put(event.request, fetchedResponse.clone());

//         return fetchedResponse;
//       }).catch(() => {
//         // If the network is unavailable, get
//         return cache.match(event.request.url);
//       });
//     }));
//   } else {
//     return;
//   }
// });


// Stale-while-revalidate
// self.addEventListener('fetch', (event) => {
//   if (event.request.destination === 'image') {
//     event.respondWith(caches.open(cacheKey).then((cache) => {
//       return cache.match(event.request).then((cachedResponse) => {
//         const fetchedResponse = fetch(event.request).then((networkResponse) => {
//           cache.put(event.request, networkResponse.clone());

//           return networkResponse;
//         });

//         return cachedResponse || fetchedResponse;
//       });
//     }));
//   } else {
//     return;
//   }
// });