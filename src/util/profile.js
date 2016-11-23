let start, last;

export function startProfile() {
	start = new Date().getTime();
	last = start;
}

export function profile(label = '?') {
	let now = new Date().getTime();
	let time = now - last;
	last = now;
	console.log(`*PROFILE* ${label} [${time}ms]`); 
}