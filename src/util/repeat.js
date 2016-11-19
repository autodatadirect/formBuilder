export default function repeat(work, delay, count, idx) {
	idx = idx || 0;
	if(idx < count) {
		work();
		setTimeout(function() {
			repeat(work, delay, count, idx + 1);
		}, delay);
	}
}