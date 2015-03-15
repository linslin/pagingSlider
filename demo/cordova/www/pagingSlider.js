/**
 * pagingSlider.js - object class
 *
 * @category  Mobile-Hybrid
 * @package   pagingSlider
 * @author    Nils Gajsek <info@linslin.org>
 * @copyright 2013-2014 Nils Gajsek <info@linslin.org>
 * @license   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version   1.0.7
 * @link      https://github.com/linslin
 *
 *
 */

var pagingSlider = {

    /** ################## class vars ################## **/

    /**
     * private - Current page slider page as object
     * @var {object}
     */
    _currentPage : null,

    /**
     * private - disabled status. Will be set to true while swiping -> dont touch
     * @var {boolean}
     */
    _disabled : false,

    /**
     * private - holds count of elements
     * @var {integer}
     */
    _pageCount : 0,

    /**
     * pubic - true|false to disable or enable page pointer menu.
     * @var {boolean}
     */
    disablePagePointer: false,

    /**
     * pubic - true|false to disable or enable page loop.
     * @var {boolean}
     */
    loop: true,


    /** ################## class methods ################## **/


    /**
     * Sliding a single page to another
     *
     * @param {string} sliderPageContainer
     * @param {string} from
     */
    slidePageFrom: function(sliderPageContainer, from)
    {

        //Init function var
        var direction = '';
        var pages = $(sliderPageContainer).find('.psPage');

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
                page = $(sliderPageContainer + ' .psPage.current').prev().first();
                break;

            case 'right':
                direction = 'left';
                page = $(sliderPageContainer + ' .psPage.current').next().first();
                break;
        }



        if(page.length > 0){

            //switch css classes
            $(page).attr('class', "psPage current" + from + this._getUserCssClass(page)); // Position the page at the starting position of the animation
            $(page).attr('class', "psPage current transition center"  + this._getUserCssClass(page) );  // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            $(this._currentPage).attr('class', "psPage transition " + direction  + this._getUserCssClass(page));

            //setup current page
            this._currentPage = page;

            //setup page browser
            this._updatePagePointer(sliderPageContainer, parseInt(page.attr('page')));
        } else if (pages.length === parseInt(this._currentPage.attr('page')) && this.loop) { //swipe to first if last page & loop is true
            this.setPage(sliderPageContainer, 1);
        } else if (1 === parseInt(this._currentPage.attr('page')) && this.loop) { //swipe to first if last page & loop is true
            this.setPage(sliderPageContainer, pages.length);
        }
    },


    /**
     * Switch to a specific page
     *
     * @param {object}  sliderPageContainer jquery object
     * @param {integer} pageId pageId as string
     */
    switchToPage: function(sliderPageContainer, pageId)
    {

        //Init vars
        var pages = $(sliderPageContainer).find('.psPage');
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
                        pagingSlider.switchIt(e, i, pageId, 'right', null, currentPage, sliderPageContainer);

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

            //RESET global count
            this._pageCount = 0;

            pages.each(function(i, e){
                // current id - new id
                if(i < parseInt(currentPage.attr('page'))){
                    setTimeout(function() {
                        pagingSlider.switchIt(pages[(maxPageIndex-(i)-(watchDiv))], i, pageId, 'left', maxPageIndex, currentPage, sliderPageContainer);

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
     * @param {object}   e
     * @param {interger} i
     * @param {integer}  pageId
     * @param {string}   direction
     * @param {integer}  maxPageIndex
     * @param {object}   currentPage
     * @param {string}   sliderPageContainer
     */
    switchIt: function(e, i, pageId, direction, maxPageIndex, currentPage, sliderPageContainer)
    {
        var currentPageId = parseInt($(currentPage).attr('page'));
        var sickVar = (currentPageId-pageId);


        if(i+1 < pageId && direction === 'right'){

            $(e).next('.psPage').attr('class', "psPage current left" + this._getUserCssClass($(e).next('.psPage')));
            $(e).next('.psPage').attr('class', "psPage current transition center" + this._getUserCssClass($(e).next('.psPage')));
            $(e).attr('class', "psPage transition left" + this._getUserCssClass($(e)));
            this._currentPage = $(e).next('.psPage').first();     //set element as current global

        }else if(pagingSlider._pageCount < sickVar  && i-1 < (maxPageIndex-pageId) && direction === 'left'){

            //count up if direction "left"
            pagingSlider._pageCount++;

            $(e).prev('.psPage').attr('class', "psPage current right" + this._getUserCssClass($(e).prev('.psPage')));
            $(e).prev('.psPage').attr('class', "psPage current transition center" + this._getUserCssClass($(e).prev('.psPage')));
            $(e).attr('class', "psPage transition right" + this._getUserCssClass($(e))); //set element as current global
            this._currentPage = $(e).prev('.psPage').first();
        }

        //setup current page pointer //@Todo slidePage could be lines with nice selector and without a loop.. later
        if (!this.disablePagePointer) {
            $( '.footer-menu' + sliderPageContainer).find('.pager li').each(function(i, e){
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
     * @param {string} pageId
     */
    setPage: function(sliderPageContainer, pageId)
    {

        //Init
        var pages = $(sliderPageContainer).find('.psPage');

        //check if disabled -> swipe is disabled while animation swipe
        if(this._disabled === true){
            return;
        }

        //set current page
        this._updateCurrentPage(sliderPageContainer);

        //set page classes
        pages.each(function(i, e){
            if(i+1 < pageId) { // all pages before next current
                $(e).attr('class', 'psPage left' + pagingSlider._getUserCssClass($(e)));
            } else if (i+1 === pageId) { // current page item to set
                $(e).attr('class', 'psPage current transition center' + pagingSlider._getUserCssClass($(e)));
            } else if (i+1 > pageId) {  // all pages after next current
                $(e).attr('class', 'psPage right' + pagingSlider._getUserCssClass($(e)));
            }
        });

        //setup current page
        this._currentPage = pages.get(pageId-1);

        //setup page browser
        this._updatePagePointer(sliderPageContainer, pageId);
    },


    /**
     * Auto update function for footer
     *
     * @param {object} sliderPageContainer jquery object
     * @param {integer} pageId pageId as string
     *
     * @return boolean
     */
    _updatePagePointer: function(sliderPageContainer, pageId)
    {
        if (this.disablePagePointer) {
            return false;
        }

        $('.footer-menu'+sliderPageContainer).find('.pager li.active').removeClass('active');
        $($('.footer-menu'+sliderPageContainer).find('.pager li').get(pageId-1)).addClass('active');
    },


    /**
     * Set current active page
     * @param {object} sliderPageContainer jquery object
     */
    _updateCurrentPage: function(sliderPageContainer) {
        this._currentPage = $(sliderPageContainer + ' .psPage.current');
    },


    /**
     * Collect user's css classes
     * @param {object} jquery object or selector
     *
     * @return {string}
     */
    _getUserCssClass: function(e)
    {
        //collect classes on given element
        var classList = $(e).attr('class').split(/\s+/);
        var classListToReturn = '';

        $.each(classList, function(index, item){

            switch (item) {

                //don't collect default classes
                case 'psPage':
                case 'current':
                case 'transition':
                case 'center':
                case 'left':
                case 'right':
                    break;

                default:
                    classListToReturn += ' '+item;
                    break;
            }
        });

        return classListToReturn;
    }
};