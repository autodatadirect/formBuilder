/**
 * General documentation page handling
 */

// Handle nav bar highlight
var sideNav = $('.sideNav');
var navItems = sideNav.find('li');

var refreshNavBar = function(){
	var anchors = $('.anchor');

	navItems.removeClass('current');

	anchors.each(function(index, element){
		var e = $(element);
		var nextAnchor;

		if(index + 1 < anchors.length) {
			nextAnchor = $(anchors[index + 1]);
		}

		if(!nextAnchor || e.offset().top + (nextAnchor.offset().top - e.offset().top)*0.9 > $(window).scrollTop()) {
			var navCurrent = navItems.filter('[name="'+e.attr('name')+'"]');

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
