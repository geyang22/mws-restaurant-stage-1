const urlToCache = [
	'/',
	'/index.html',
	'restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/dbhelper.js',
	'https://fonts.googleapis.com/css?family=Montserrat:700',
	'https://fonts.googleapis.com/css?family=Open+Sans',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
];

const staticCacheName = 'r-reviews-v1';

self.addEventListener('install', e => {
	console.log('Attempting to install service worker and cache static assets');
	e.waitUntil(
		caches.open('staticCacheName')
			.then(cache => {
				return cache.addAll(filesToCache);
			}).catch(error => {
				console.log('Attempt to store assets in cache resulted in ' + error)
			})
	);
});

self.addEventListener('fetch', e => {
	console.log('Fetch event for ', e.request.url);
	e.respondWith(
		caches.match(e.request).then(response => {
			if (response) {
				console.log('Found ', e.request.url, ' in cache');
				return response;
			}
			console.log('Network request for ', e.request.url);
			return fetch(e.request)
		})
	);
});
