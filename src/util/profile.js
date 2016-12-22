let start, last;

export function startProfile() {
	start = new Date().getTime();
	last = start;
}

export function profile(label = '?') {
	if(!start && start != 0){
		return;
	}
	let now = new Date().getTime();
	let time = now - last;
	last = now;
	console.log(`*PROFILE* ${label} [${time}ms]`); 
}