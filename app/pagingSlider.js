/**
 * pagingSlider.js - object class
 *
 * @category  Mobile-Hybrid
 * @package   pagingSlider
 * @author    Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @copyright 2013-2014 Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @license   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version   0.1
 * @link      https://github.com/linslin
 *
 */



/** ################## class params ################## **/

	/**
	 * Current page slider page as object
	 * @var object
	 */
	var currentSliderPage = null;
	
	/**
	 * holds count of elements to overjump due to 
	 * page slider slideToPage left direction
	 * @var integer
	 */
	var globalCount = 0;

	

/** ################## class methods ################## **/

var pagingSlider = {	
		
	/**
	 * Sliding a single page to another
	 * 
	 * @param string viewID
	 * @param string pageId
	 * @param string from
	 */
	slidePageFrom: function(viewId, pageId, from)
	{
		
		//Init function var
		var direction = '';
		var fullPageId = '';
		var nextPageId = null;
		
		switch(from){
		
			case 'left':
				direction = 'right';
				nextPageId = parseInt($(viewId + ' .slidepage-container .page.current').attr('page')) - 1;
				fullPageId = pageId + nextPageId;
			break;
			
			case 'right':
				direction = 'left';
				nextPageId = parseInt($(viewId + ' .slidepage-container .page.current').attr('page')) + 1;
				fullPageId = pageId + nextPageId;
			break;
		}
		
		//get next page
		page = $('#' + fullPageId);
		
		
		if(page.length > 0){
			
			//switch css classes
		    $(page).attr('class', "page current" + from); // Position the page at the starting position of the animation
		    $(page).attr('class', "page current transition center");  // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation

		    //setup current page
		    $(currentSliderPage).attr('class', "page transition " + direction);
		    currentSliderPage = $(page);	
		    
		   //setup current page pointer //@Todo this could be lines with nice selector and without a loop.. later
		    $(viewId + ' .footer-menu .pager li').each(function(i, e){
		    	if(i+1 === nextPageId){
		    		$(e).removeClass('inactive');
		    		$(e).addClass('active');
		    	}else{
		    		$(e).removeClass('active');
		    		$(e).removeClass('inactive');
		    		$(e).addClass('inactive');
		    	}
		    });
		}
	},
	
	
	/**
	 * Switch to a specific page
	 * 
	 * @param object sliderPageContainer jquery object of 
	 * @param string pageId pageId as string
	 */
	switchToPage: function(sliderPageContainer, pageId)
	{
		//Init vars
		var pages = sliderPageContainer.find('.page');
		var currentPage =  sliderPageContainer.find(".current");
		var maxPageIndex = parseInt(pages.length-1);
		var sickDif = (maxPageIndex-parseInt(currentPage.attr('page')));
		var watchDiv = (maxPageIndex+1) -(parseInt(currentPage.attr('page')));
		
		if(parseInt(pageId) > parseInt(currentPage.attr('page'))){
			
			pages.each(function(i, e){
				if( i+1 >= parseInt(currentPage.attr('page'))){
					setTimeout(function() {
						pagingSlider.switchIt(e, i, pageId, 'right', null, sliderPageContainer, currentPage);
					}, (300*((i+1)-currentPage.attr('page'))));
				}
			});
			
		}else if (parseInt(pageId) < parseInt(currentPage.attr('page'))) {
			
			if(parseInt(currentPage.attr('page')) !== (maxPageIndex+1)){
				rightDif = sickDif;
			}else{
				rightDif = sickDif;
			}			
			
			//RESET clogbal count
			globalCount = 0;
			
			pages.each(function(i, e){
				
				if(i < parseInt(currentPage.attr('page'))){
					setTimeout(function() {
						pagingSlider.switchIt(pages[(maxPageIndex-(i)-(watchDiv))], i, pageId, 'left', maxPageIndex, sliderPageContainer, currentPage);
					}, (300*((i))));
				}
			});
		}
	},


	/**
	 * Switch an specific element
	 * 
	 * @param object e
	 * @param interger i
	 * @param string pageId
	 * @param string direction
	 * @param integer maxPageIndex
	 * @param object sliderPageContainer
	 * @param object currentPage
	 */
	switchIt: function(e, i, pageId, direction, maxPageIndex, sliderPageContainer, currentPage)
	{
		
		var currentPageId = parseInt($(currentPage).attr('page'));
		var sickVar = (currentPageId-parseInt(pageId));
		
		if(i+1 < pageId && direction === 'right'){
			
			$(e).next('.page').attr('class', "page current left");
			$(e).next('.page').attr('class', "page current transition center");
			$(e).attr('class', "page transition left");
			currentSliderPage = $(e).next('.page').first();	 //set element as current global
			
		}else if(globalCount < sickVar  && i-1 < (maxPageIndex-parseInt(pageId)) && direction === 'left'){
			
			//count up if direction "left"
			globalCount++;
			
			$(e).prev('.page').attr('class', "page current right");
			$(e).prev('.page').attr('class', "page current transition center");
			$(e).attr('class', "page transition right"); //set element as current global
			currentSliderPage = $(e).prev('.page').first();	
		}
		
		//setup current page pointer //@Todo this could be lines with nice selector and without a loop.. later
		$('.footer-menu .pager li').each(function(i, e){
			if(i+1 === parseInt(currentSliderPage.attr('page'))){
				$(e).removeClass('inactive');
				$(e).addClass('active');
			}else{
				$(e).removeClass('active');
				$(e).removeClass('inactive');
				$(e).addClass('inactive');
			}
		});
	}
};