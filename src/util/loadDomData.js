import $ from 'jquery';

export default function loadDomData(element, namespace, aKey) {
	$.each(aKey, function(i, key) {
		const data = element.data(key);
		if(typeof data !== 'undefined' && data !== null) {
			namespace[key] = data;
		}
	});
}