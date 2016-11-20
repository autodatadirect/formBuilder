import createRegexType from '../util/regexInputFieldTypeCreator';

export default {
	utext: createRegexType(/.*/, /.*/, {toUpper: true}),
	state: createRegexType(/^(A[LKZR]|C[AOT]|DE|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINSOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY])$/, /[A-Z]/, {}, 2),
	feid: createRegexType(/^[0-9]{2}\-?[0-9]{7}$/, /[0-9\-]/, {}, 10),
	zip: createRegexType(/(^\d{5}(\-?\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} ?\d{1}[A-Za]{1}\d{1})$/, /[0-9A-Z\s\-]/, {}, 10),
	email: createRegexType(/^(?!.*\.{2})[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/, /[A-Za-z0-9._%+\-@]/, {
		toUpper: false,
		cannedFormatter: 'trim'
	}),
	integer: createRegexType(/^-?[0-9]*$/, /[-0-9]/, {
		converter: 'number'
	}),
	number: createRegexType(/^-?[0-9]+\.?[0-9]*$/, /[-0-9.]/, {
		converter: 'number'
	})
};
