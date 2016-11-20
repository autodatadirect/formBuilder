import arraySelectCreator from '../util/arraySelectCreator';

const date = new Date(),
	years = [];

for (let i = 0; i <= 10; i++) {
	years.push((date.getFullYear() + i).toString());
}

export default arraySelectCreator(years);
