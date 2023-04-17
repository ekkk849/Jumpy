var CACHE_NAME = "gih-cache-v2";

var responseContent =
  "<html>" +
  "<body>" +
  "<style>" +
  "body {text-align: center; background-color: #333; color: #eee;}" +
  "</style>" +
  "<H1>You seem to be offline, Jumpy store unavailable</H1>";
"</body>" + "</html>";

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response(responseContent, {
        headers: { "Content-Type": "text/html" },
      });
    })
  );
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-site-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/homepage.html",
        //javascript files
        "/js/app.js",
        "/js/script.js",
        "/js/cat.js",
        "/js/payment.js",
        "/js/product.js",
        "/js/test.js",

        //images
        "/images/app-icon.png",
        "/images/bfjean_1.jpg",
        "/images/bfjeans_2.jpg",
        "/images/cardigan_1.jpg",
        "/images/cardigan_2.jpg",
        "/images/highjean_1.jpg",
        "/images/highjean_2.jpg",
        "/images/homepage.png",
        "/images/hood_1.jpg",
        "/images/hood_2.jpg",
        "/images/kid1.jpg",
        "/images/kid2.jpg",
        "/images/kid3.jpg",
        "/images/left-arrow.png",
        "/images/male.jpg",
        "/images/male1.jpg",
        "/images/male2.jpg",
        "/images/male3.jpg",
        "/images/menu.png",
        "/images/momjean_1.jpg",
        "/images/momjean_2.jpg",
        "/images/overt_1.jpg",
        "/images/overt_2.jpg",
        "/images/search.png",
        "/images/shopping-cart.png",
        "/images/tanktop_1.jpg",
        "/images/tanktop_2.jpg",
        "/images/tshirt_1.jpg",
        "/images/tshirt_2.jpg",
        "/images/woman1.jpg",
        "/images/woman2.jpg",
        "/images/woman3.jpg",

        //html pages
        "/cart.html",
        "/Cat.html",
        "/categories.html",
        "/CheckOut.html",
        "/homepage.html",
        "/node/CSIT242Proj-deliverable2/public/homepage-offline.html",
      ]);
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match(
            "/node/CSIT242Proj-deliverable2/public/homepage-offline.html"
          );
        }
      });
    })
  );
});

self.addEventListener("fetch", function(event) {
  var requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === "/" || requestURL.pathname === "/node/CSIT242Proj-deliverable2/public/homepage.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("/node/CSIT242Proj-deliverable2/public/homepage.html").then(function(cachedResponse) {
          var fetchPromise = fetch("/node/CSIT242Proj-deliverable2/public/homepage.html").then(function(networkResponse) {
            cache.put("/node/CSIT242Proj-deliverable2/public/homepage.html", networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  // Handle requests for my account page
  } else if (requestURL.pathname === "/node/CSIT242Proj-deliverable2/public/cart.html") {
    event.respondWith(
      caches.match("/node/CSIT242Proj-deliverable2/public/cart.html").then(function(response) {
        return response || fetch("/node/CSIT242Proj-deliverable2/public/cart.html");
      })
    );
  // Handle requests for reservations JSON file
  } else if (requestURL.pathname === "/node/CSIT242Proj-deliverable2/public/data.json") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  // Handle requests for events JSON file
  } else if (requestURL.pathname === "/node/CSIT242Proj-deliverable2/package.json") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  // Handle requests for event images.
  } else if (requestURL.pathname.startsWith("/node/CSIT242Proj-deliverable2/public/images")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cacheResponse) {
          return cacheResponse||fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function() {
            return cache.match("/node/CSIT242Proj-deliverable2/public/images/homepage.png");
          });
        });
      })
    );
  // Handle requests for files cached during installation
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});