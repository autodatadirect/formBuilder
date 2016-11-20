/**
 * helper function to build basic types
 */
import $ from 'jquery';
import formatters from './standardFormatters';
import converters from './standardConverters';

//TODO: refactor
const dict = {};

export default function(pattern, filter, flags, max) {
	if(flags === undefined) {
		flags = {};
	}

	if(flags.toUpper !== false) {
		flags.toUpper = true;
	}

	const type = {
		validate: function(ifw) {
			if(!ifw.element.val().match(pattern)) {
				return {
					message: dict.invalid
				};
			}
		}
	};

	if(filter || max) {
		type.setUp = function(ifw) {

			const filterData = {
				pattern: filter || /./,
				toUpper: flags.toUpper,
				max: max || 0
			};

			if(ifw.element.attr('data-max')){
				filterData.max = ifw.element.attr('data-max');
			}

			ifw.element.inputFilter(filterData);
		};
	}

	// Legacy support
	if(flags.cannedFormatter) {
		flags.formatter = flags.cannedFormatter;
	}

	// passed in formatter?
	if(flags.formatter) {
		if(typeof flags.formatter === 'string' && $.isFunction(formatters[flags.formatter])) {
			// standard
			type.format = formatters[flags.formatter];
			type.converter = converters.formatter;
		} else if($.isFunction(flags.formatter)) {
			// custom
			type.format = flags.formatter;
			type.converter = converters.formatter;
		}
	}

	// passed in converter?
	if(flags.converter) {
		if(typeof flags.converter === 'string' && converters[flags.converter]) {
			type.converter = converters[flags.converter];
		} else if($.isFunction(flags.converter)) {
			type.converter = flags.converter;
		}
	}

	return type;
}