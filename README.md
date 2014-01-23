# pagingSlider
=======================


## Notice
Inspired by http://coenraets.org/blog/2013/03/hardware-accelerated-page-transitions-for-mobile-web-apps-phonegap-apps/ 
I have written an extension. This extension allows the page slider to control several pages away, 
retrieve individual pages and sliden from one side to another.

![ScreenShot](https://raw2.github.com/linslin/pagingSlider/master/art/screen3.png)

## Useage
 - Checkout and run app/index.html in Browser.
 - Modify the Template
 - Take a look at the demo directory for cordova examples
 
```html
<html>
<head>
    <title>pagingSlider</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<h3>pagingSlider example</h3>
<div id="wrapper">
    <div id="wrapper-inner">
        <div class="slidepage-container myPageContainerClass">
            <div id="badges-slidepage-1" page="1" class="page center current">
                <div class="content">
                   <h2>Page 1</h2>
                </div>
            </div>
            <div id="badges-slidepage-2" page="2" class="page right">
                <div class="content">
                   <h2>Page 2</h2>
                </div>
            </div>
            <div id="badges-slidepage-3" page="3" class="page right">
                <div class="content">
                   <h2>Page 3</h2>
                </div>
            </div>
            <div id="badges-slidepage-4" page="4" class="page right">
                <div class="content">
                   <h2>Page 4</h2>
                </div>
            </div>
        </div>
        <div class="footer-menu">
            <ul class="pager clearfix">
                <li class="active"></li>
                <li class="inactive"></li>
                <li class="inactive"></li>
                <li class="inactive"></li>
            </ul>
        </div>
    </div>   
    <h4>Page menu:</h4>
    <div class="header-menu clearfix">
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage($('.myPageContainerClass'), '1');">1</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage($('.myPageContainerClass'), '2');">2</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage($('.myPageContainerClass'), '3');">3</a>
        <a href="javascript:void(0);" onclick="pagingSlider.switchToPage($('.myPageContainerClass'), '4');">4</a>
    </div>                
</div>

<script type="text/javascript" src="lib/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="lib/quoJs/package/quo.js"></script>
<script type="text/javascript" src="lib/fastclick.js"></script>
<script type="text/javascript" src="pagingSlider.js"></script>
<script type="text/javascript">

    //setup current page slider page
    pagingSlider.currentPage = $('#wrapper-inner .page.current');
    
    $$('#wrapper-inner').swipeLeft(function(){
        pagingSlider.slidePageFrom("#wrapper-inner", "badges-slidepage-", 'right');
    });
    
    $$('#wrapper-inner').swipeRight(function(){
        pagingSlider.slidePageFrom("#wrapper-inner", "badges-slidepage-", 'left');
    });
</script>

</body>
</html>
```


## Features

- slide to pages with touch swipes
- auto switch to pages by clicking menu item
- animated mobile pagebrowser
- integrated touch events with QuoJS


## Screenshots

![ScreenShot](https://raw2.github.com/linslin/pagingSlider/master/art/screen1.png)
![ScreenShot](https://raw2.github.com/linslin/pagingSlider/master/art/screen2.png)


## Tested with

 - cordova 3.3
 - Android 4.1<
 - iOS 6.0<

## Thanks to Christophe Coenraets