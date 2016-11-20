import $ from 'jquery';

export default function removeEqual(a, b, ignoreDiffKeys) {
	let p, remove, removeTmp;

	if(!ignoreDiffKeys){
		ignoreDiffKeys = [];
	}

	if(a === undefined || b === undefined) {
		return;
	}

	switch(typeof(a)) {
	case 'object':
		remove = true;
		for(p in a) {
			if(a.hasOwnProperty(p)) {
				
				if($.inArray(p, ignoreDiffKeys) > -1){
					removeTmp = true;
				}else{
					removeTmp = removeEqual(a[p], b[p]);
				}

				if(removeTmp){
					delete a[p];
					delete b[p];
				}
				remove = remove && removeTmp;
			}
		}
		return remove;
	default:
		return a.toString() === b.toString();
	}
}
