import regexTypes from './regexTypes';
import text from './text';
import select from './select';
import phone from './phone';
import date from './date';
import display from './display';
import money from './money';
import time from './time';
import dateTime from './dateTime';
import tmsPhone from './tmsPhone';
import tmsExpYear from './tmsExpYear';
import tmsYesNo from './tmsYesNo';

export default Object.assign({}, regexTypes, {
	text,
	select,
	phone,
	date,
	display,
	money,
	time,
	dateTime,
	tmsPhone,
	tmsExpYear,
	tmsYesNo
});
