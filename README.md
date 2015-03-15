# pagingSlider
=======================

## What is it?
pagingSilder brings you Hardware-Accelerated Page Transitions for Web / Mobile Web Apps / PhoneGap Apps.
Inspired by http://coenraets.org/blog/2013/03/hardware-accelerated-page-transitions-for-mobile-web-apps-phonegap-apps/ 
I have written an extension. This extension allows the page slider to control several pages, 
retrieve individual pages and slide from one side to another.

##### Why singleton pattern? 
Using singleton pattern as class object makes the integration easy in the common way. Also singleton pattern does not
block a multiple use per page. You are able to create new instances of pagingSlider object like "var myPagingSlider = pagingSlider;".

### Demo
http://www.linslin.org/2015/01/13/css-hardware-accelerated-page-transitions/


## Features

- slide to pages with touch swipes by using Hardware-Accelerated Page Transitions
- auto switch to pages by clicking menu item
- call pages directly
- animated mobile pagebrowser
- integrated touch events with quoJS
- loop functionality
- disable/enable pointer foot menu
- multi sliders on one page support

![ScreenShot](https://raw.githubusercontent.com/linslin/pagingSlider/development/art/screen3.png)

## Install via bower

	bower install linslin-pagingslider

## Useage
 - Checkout and run app/index.html in Browser.
 - Modify the Template
 - Take a look at the demo directory for cordova-, web-examples & configurations
 
```html
<html>
<head>
    <title>pagingSlider</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<h3>pagingSlider example</h3>
<div id="wrapper">
    <div class="slidepage-container myPageContainerClass">
        <div id="badges-slidepage-1" page="1" class="psPage center current">
            <div class="content">
               <h2>Page 1</h2>
            </div>
        </div>
        <div id="badges-slidepage-2" page="2" class="psPage right">
            <div class="content">
               <h2>Page 2</h2>
            </div>
        </div>
        <div id="badges-slidepage-3" page="3" class="psPage right">
            <div class="content">
               <h2>Page 3</h2>
            </div>
        </div>
        <div id="badges-slidepage-4" page="4" class="psPage right">
            <div class="content">
               <h2>Page 4</h2>
            </div>
        </div>
    </div>
    <div class="footer-menu myPageContainerClass">
        <ul class="pager clearfix">
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div> 
    <h4>Page menu:</h4>
    <div class="header-menu clearfix">
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage('.myPageContainerClass', 1);">1</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage('.myPageContainerClass', 2);">2</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage('.myPageContainerClass', 3);">3</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage('.myPageContainerClass', 4);">4</a>
        or 
        <a href="javascript:void(0);" onclick="pagingSlider.setPage('.myPageContainerClass', 3);">directly call Page 3</a>
    </div>                
</div>

<script type="text/javascript" src="lib/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="lib/quoJs/package/quo.js"></script>
<script type="text/javascript" src="lib/fastclick.js"></script>
<script type="text/javascript" src="pagingSlider.js"></script>
<script type="text/javascript">
    $$('#wrapper').swipeLeft(function(){
        pagingSlider.slidePageFrom('.myPageContainerClass', 'right');
    });
    
    $$('#wrapper').swipeRight(function(){
        pagingSlider.slidePageFrom('.myPageContainerClass', 'left');
    });
</script>

</body>
</html>
```

## Configurations

### Disable/Enable loop 
```html
<script type="text/javascript">
        pagingSlider.loop = false; //default is true
</script>
```

### Disable/Enable pointer footer menu 
```html
<script type="text/javascript">
        pagingSlider.disablePagePointer = true; //default is false
</script>
```


## Tested with

 - cordova 3.3, 3.4, 3.5, 3.6, 4.0
 - angularJS
 - Android 4.1<
 - iOS 6.0<
 - Firefox OS 1.3
 
 
 
## Changelog

#### Release 1.0.7 - Changelog
- Modified Demo URL. 
- Reordered readme.md contents.

#### Release 1.0.6 - Changelog

- Added bower support
- Added angularJS support

#### Release 1.0.5 - Changelog

- Added live demo

#### Release 1.0.4 - Changelog

- Hotfix: composer support.
- README.md modifications.

#### Release 1.0.3 - Changelog

- Hotfix: composer support.

#### Release 1.0.2 - Changelog

- Added composer support.
- Added platform support (Windows Phone 8.0 & 8.1, amazon-fireos, tizen)

#### Release 1.0.1 - Changelog

- Added user css class support - https://github.com/linslin/pagingSlider/issues/4

#### Release 1.0 - Changelog

- Official stable release
- Added cordova 3.6 & 4.0 support (iOS / Android / blackberry / firefoxos / browser)
- Changed readme.md images paths. 
 
## Known Issues
  - Old Android Versions - Swipe does not work due quoJS/zepto.js. Fix -> "https://github.com/madrobby/zepto/issues/315"

## Thanks to Christophe Coenraets