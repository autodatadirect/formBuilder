/**
 * For reading boolean values from dom attributes.
 * When the the attribute does not exist, the key retains its !!value. (therefore undefined -> false and true -> true)
 * Allows for 'data-some-key' and 'data-some-key="true"' to both be true.
 * 
 * Note: 'data-some-key="false"' is still false.
 */
import $ from 'jquery';

export default function loadDomToggleData(element, namespace, aKey) {
	$.each(aKey, function(i, key) {
		const data = element.data(key);
		namespace[key] = (typeof data === 'undefined' || data === null)? !!namespace[key] : (data !== false);
	});
}
