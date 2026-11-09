var C='puro-umami-v9';
var F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./logo.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:'reload'})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==self.location.origin)return;
if(q.mode==='navigate'||/\/$|\.html$/.test(u.pathname)){e.respondWith(new Promise(function(ok){var done=false,
f=function(){caches.match(q,{ignoreSearch:true}).then(function(r){return r||caches.match('./index.html')}).then(function(r){if(!done&&r){done=true;ok(r)}})};
var t=setTimeout(f,4000);fetch(q,{cache:'no-cache'}).then(function(r){if(r.ok){var c=r.clone();caches.open(C).then(function(x){x.put('./index.html',c)})}clearTimeout(t);if(!done){done=true;ok(r)}}).catch(function(){clearTimeout(t);f()})}));return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(function(r){return r||fetch(q)}))});
