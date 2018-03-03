const root = document.querySelector('#root');
const info = document.querySelector('#info');
const list = document.querySelector('#list');
const body = document.querySelector('body');
const activateBtn = document.querySelector('#activate');
const colorBtn = document.querySelector('#color');

const BASIC_ARTIST_URL =
	'https://rest.bandsintown.com/artists/tycho?app_id=someid';
const EVENTS_URL =
	'https://rest.bandsintown.com/artists/tycho/events?app_id=someid';

fetch(BASIC_ARTIST_URL)
	.then(res => {
		const r = res.json();
		r.then(data => {
			const bandInfo = `<img src="${data.thumb_url}"/><h1>${data.name}</h1>`;
			info.innerHTML = bandInfo;
			console.log(data);
		});
	})
	.catch(err => console.log(err));

fetch(EVENTS_URL)
	.then(res => {
		const r = res.json();
		r.then(data => {
			data.forEach(el => {
				const li = `<li>${el.venue.name}</li>`;
				list.insertAdjacentHTML('beforeend', li);
			});
		});
	})
	.catch(err => console.log(err));

const changeColor = el => {
	const props = getComputedStyle(el);
	props.backgroundColor === 'rgb(221, 238, 255)'
		? (el.style.backgroundColor = 'rgb(255, 238, 221)')
		: (el.style.backgroundColor = 'rgb(221, 238, 255)');
	console.log(
		props.backgroundColor,
		props.backgroundColor === 'rgb(221, 238, 255)',
	);
};

activateBtn.addEventListener('click', () => {
	console.log('clicked #1');
	colorBtn.addEventListener('click', () => {
		console.log('clicked #2');
		changeColor(body);
	});
});