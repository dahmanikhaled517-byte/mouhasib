const V='mps-pack-1';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>{const n=fetch(e.request).then(x=>{if(x&&x.ok)c.put(e.request,x.clone());return x}).catch(()=>r);return r||n})))});
