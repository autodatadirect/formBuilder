import booleanSelectCreator from '../util/booleanSelectCreator';

//TODO: refactor
const dict = {
	yes: 'Yes',
	no: 'No'
};

export default booleanSelectCreator(dict.yes, dict.no);