/**
 * pagingSlider.js - object class
 *
 * @category  Mobile-Hybrid
 * @package   pagingSlider
 * @author    Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @copyright 2013-2014 Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @license   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version   0.2
 * @link      https://github.com/linslin
 * 
 * @todo page ids removen um löschunen von divs zu erlauben
 * @todo add loop wenn letztes element erreicht/infity scroller
 *
 */

var pagingSlider = {    
    
    /**
     * private - Current page slider page as object
     * @var object
     */
    _currentPage : null,
        
    /**
     * private - disabled status. Will be set to true while swiping -> dont touch
     * @var boolean
     */
    _disabled : false,

    /**
     * private - holds count of elements
     * @var integer
     */
    _pageCount : 0,

    /**
     * pubic - true|false to disable or enable page pointer menu.
     */
    disablePagePointer: false,
    
    
    /** ################## class methods ################## **/
    
    
    /**
     * Sliding a single page to another
     * 
     * @param string sliderPageContainer
     * @param string from
     */
    slidePageFrom: function(sliderPageContainer, from)
    {
        
        //Init function var
        var direction = '';
        
        //set current page
        this._updateCurrentPage(sliderPageContainer);
        
        //check if disabled -> swipe is disabled while animation swipe
        if(this._disabled === true){
            return;
        }
        
        //switch direction
        switch(from){
            case 'left':
                direction = 'right';
                page = $(sliderPageContainer + ' .page.current').prev().first();
            break;
            
            case 'right':
                direction = 'left';
                page = $(sliderPageContainer + ' .page.current').next().first();
            break;
        }
       
        
        if(page.length > 0){
            
            //switch css classes
            $(page).attr('class', "page current" + from); // Position the page at the starting position of the animation
            $(page).attr('class', "page current transition center");  // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            $(this._currentPage).attr('class', "page transition " + direction);
            
            //setup current page
            this._currentPage = page;   
            
            //setup page browser
            this._updatePagePointer($(sliderPageContainer), parseInt(page.attr('page')));
        }
    },
    
    
    /**
     * Switch to a specific page
     * 
     * @param object sliderPageContainer jquery object
     * @param integer pageId pageId as string
     */
    switchToPage: function(sliderPageContainer, pageId)
    {
        
        //Init vars
        var pages = $(sliderPageContainer).find('.page');
        var currentPage =  $(sliderPageContainer).find(".current");
        var maxPageIndex = parseInt(pages.length-1);
        var sickDif = (maxPageIndex-parseInt(currentPage.attr('page')));
        var watchDiv = (maxPageIndex+1) -(parseInt(currentPage.attr('page')));
        
        //check if _disabled -> swipe is _disabled while animation swipe, also return if the current page is clicked
        if(this._disabled === true || parseInt(currentPage.attr('page')) === pageId){
            return;
        }
        
        //disable swiping
        this._disabled = true;
        
        if(pageId > parseInt(currentPage.attr('page'))){
            
            pages.each(function(i, e){
                if( i+1 >= parseInt(currentPage.attr('page'))){
                    setTimeout(function() {
                        pagingSlider.switchIt(e, i, pageId, 'right', null, currentPage);
                        
                        //done
                        if(i+1 === pageId) {
                            pagingSlider._disabled = false; //enable swiping after page swipes are done
                        }
                        
                    }, (300*((i+1)-currentPage.attr('page'))));
                } 
            });
            
        }else if (pageId < parseInt(currentPage.attr('page'))) {
            
            if(parseInt(currentPage.attr('page')) !== (maxPageIndex+1)){
                rightDif = sickDif;
            }else{
                rightDif = sickDif;
            }            
            
            //RESET clogbal count
            this._pageCount = 0;
            
            pages.each(function(i, e){
                // aktuelle id - neue id = IIIIII!!!
                if(i < parseInt(currentPage.attr('page'))){
                    setTimeout(function() {
                        pagingSlider.switchIt(pages[(maxPageIndex-(i)-(watchDiv))], i, pageId, 'left', maxPageIndex, currentPage);
                        
                        //done
                        if(i === currentPage.attr('page') - pageId) {
                            pagingSlider._disabled = false; //enable swiping after page swipes are done
                        }
                    }, (300*((i))));
                }
            });
        } else {
            this._disabled = false;
        }
    },


    /**
     * Switch an specific element
     * 
     * @param object   e
     * @param interger i
     * @param integer  pageId
     * @param string   direction
     * @param integer  maxPageIndex
     * @param object   currentPage
     */
    switchIt: function(e, i, pageId, direction, maxPageIndex, currentPage)
    {
        
        var currentPageId = parseInt($(currentPage).attr('page'));
        var sickVar = (currentPageId-pageId);
        
        if(i+1 < pageId && direction === 'right'){
            
            $(e).next('.page').attr('class', "page current left");
            $(e).next('.page').attr('class', "page current transition center");
            $(e).attr('class', "page transition left");
            this._currentPage = $(e).next('.page').first();     //set element as current global
            
        }else if(pagingSlider._pageCount < sickVar  && i-1 < (maxPageIndex-pageId) && direction === 'left'){
            
            //count up if direction "left"
            pagingSlider._pageCount++;
            
            $(e).prev('.page').attr('class', "page current right");
            $(e).prev('.page').attr('class', "page current transition center");
            $(e).attr('class', "page transition right"); //set element as current global
            this._currentPage = $(e).prev('.page').first();    
        }
        
        //setup current page pointer //@Todo slidePage could be lines with nice selector and without a loop.. later
    	if (!this.disablePagePointer) {
            $('.footer-menu .pager li').each(function(i, e){
                if(i+1 === parseInt($(pagingSlider._currentPage).attr('page'))){
                    $(e).addClass('active');
                }else{
                    $(e).removeClass('active');
                }
            }); 		
    	}

    },
    
    
    /**
     * Directly call an other page or set a current page before display
     * 
     * @param string pageId
     */
    setPage: function(sliderPageContainer, pageId)
    {
    	
    	//Init
        var pages = $(sliderPageContainer).find('.page');

        //check if disabled -> swipe is disabled while animation swipe
        if(this._disabled === true){
            return;
        }
        
        //set current page
        this._updateCurrentPage(sliderPageContainer);
        
        //set page classes
        pages.each(function(i, e){
        	if(i+1 < pageId) { // all pages before next current
        		$(e).attr('class', 'page left');
        	} else if (i+1 === pageId) { // current page item to set
        		$(e).attr('class', 'page current transition center');
        	} else if (i+1 > pageId) {  // all pages after next current
        		$(e).attr('class', 'page right');
        	}
        });

        //setup current page
        this._currentPage = pages.get(pageId-1);  
        
        //setup page browser
        this._updatePagePointer($(sliderPageContainer), pageId);
    },
    
    
    /**
     * Auto update function for footer
     * 
     * @param object sliderPageContainer jquery object 
     * @param integer pageId pageId as string
     * 
     * @return boolean
     */
    _updatePagePointer: function(sliderPageContainer, pageId)
    {
    	if (this.disablePagePointer) {
    		return false;
    	}
    	
        sliderPageContainer.next('.footer-menu').find('.pager li.active').removeClass('active');
        $(sliderPageContainer.next('.footer-menu').find('.pager li').get(pageId-1)).addClass('active');
    },
    
    
    /**
     * Set current active page
     * @param object sliderPageContainer jquery object  
     */
    _updateCurrentPage: function(sliderPageContainer)
    {
    	this._currentPage =  $(sliderPageContainer + ' .page.current');
    }
};