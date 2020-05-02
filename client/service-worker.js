const MODULE_CACHE = "MODULE_CACHE"

self.addEventListener("fetch", e => {
  const url = e.request.url
  const isModuleBundle = url.startsWith("https://wzrd.in/bundle")

  const handle = async () => {
    if (!isModuleBundle) return await fetch(e.request)

    const cachedRes = await caches.match(e.request)
    if (cachedRes) return cachedRes

    const cache = await caches.open(MODULE_CACHE)
    const res = await fetch(e.request)

    await cache.put(e.request, res.clone())
    return res
  }

  e.respondWith(handle())
})
