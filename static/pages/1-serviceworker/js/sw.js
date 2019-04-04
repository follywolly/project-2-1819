var CACHE = 'core-cache';

self.addEventListener('install', e => {
  console.log('Service worker is installed');
  e.waitUntil(precache())
})

self.addEventListener('fetch', async e => {
  const request = e.request
  e.respondWith(caches
    .open(CACHE)
    .then(cache => cache.match(request))
    .then(res => {
      if (res) {
        // get from cache
        return res
      } else {
        // get from server
        return fetch(request)
          .then(response => caches
            .open(CACHE)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response)
          )
          .catch(e => {console.error('fetch error: ', e)})
      }
    })
  )

  e.waitUntil(update(e.request))
})

function precache() {
  return caches.open(CACHE)
    .then(cache => cache
      .addAll([
        '/'
      ])
    )
    .then(() => self.skipWaiting())
    .catch(e => {console.error('precache error: ', e)})
}

function update(request) {
  return caches.open(CACHE)
    .then(cache => fetch(request)
      .then(response => cache.put(request, response))
    )
    .catch(e => {console.error('update error: ', e)})
}
