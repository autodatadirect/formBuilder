import isEmpty from './isEmpty';
export default function equals(a, b) {
	let p;

	if(a === b){
		return true;
	}

	if(isEmpty(a) && isEmpty(b)){
		return true;
	}

	if(isEmpty(a) || isEmpty(b)){
		return false;
	}

	switch(typeof(a)) {
	case 'object':
		for(p in a) {
			if(a.hasOwnProperty(p)) {
				if(!equals(a[p], b[p])) {
					return false;
				}
			}
		}

		for(p in b) {
			if(b.hasOwnProperty(p)) {
				if(!equals(a[p], b[p])) {
					return false;
				}
			}
		}
		
		break;
	case 'function':
		if(typeof(b) === 'undefined' || (a.toString() !== b.toString())) {
			return false;
		}
		break;
	default:
		if(a.toString() !== b.toString()) {
			return false;
		}
	}

	return true;
}
