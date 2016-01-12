/**
 * General documentation page handling
 */

(function($) {
	'use strict';

	// Handle nav bar highlight
	var sideNav = $('.sideNav');
	var navLinks = sideNav.find('a');

	// Load li


	var refreshNavBar = function(){
		var anchors = $('.anchor');

		navLinks.parent().removeClass('current');

		anchors.each(function(index, element){
			var e = $(element);
			var nextAnchor;

			if(index + 1 < anchors.length) {
				nextAnchor = $(anchors[index + 1]);
			}

			if(!nextAnchor || e.offset().top + (nextAnchor.offset().top - e.offset().top)*0.9 > $(window).scrollTop()) {
				var navCurrent = navLinks.filter('[href="#'+e.attr('name')+'"]').parent();

				navCurrent.addClass('current');

				if(navCurrent.parent().is('.navDepth-0')) {
					navCurrent.children('ul').children().eq(0).addClass('current');
				} else {
					navCurrent.parents('li').addClass('current');
				}
				
				return false;
			}	
		});

		// fix scroll offset
		sideNav.css('top', $(window).scrollTop());	
	};
	refreshNavBar();


	$(window).on('scroll resize', function(){
		refreshNavBar();	
	});


})(jQuery);
