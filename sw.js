/* 袋米旅行手账 · Service Worker
 *
 * 这个 App 整个就是一张 HTML —— 样式、脚本、76 张配图、20 只袋米全在里头，
 * 所以「缓存首页」等于「缓存全部」，断网打开一样完整。
 *
 * 地图瓦片是外部地址，一律不拦，交给页面自己的降级逻辑（探测失败会画手绘路线图）。
 */
var CACHE = 'daimi-trip-v6';
var HOME = new URL('./', self.location).href;
var CORE = [HOME, 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* 逐个 add，任何一个失败都不至于让整个安装挂掉 */
      return Promise.all(CORE.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; })
                          .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;      /* 瓦片等外部资源走网络 */

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;                              /* 命中缓存：秒开，省流量 */
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy).catch(function () {}); });
        }
        return res;
      }).catch(function () {
        /* 断网：导航请求统一回首页 —— 单文件 App，任何路径都能兜住 */
        if (req.mode === 'navigate') return caches.match(HOME);
        return new Response('', { status: 504, statusText: 'offline' });
      });
    })
  );
});
