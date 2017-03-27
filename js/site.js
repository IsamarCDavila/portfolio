var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
        var isWinPhone = (navigator.userAgent.toLowerCase().indexOf("windows phone") > -1) || (navigator.userAgent.toLowerCase().indexOf("wpdesktop") > -1); //&& ua.indexOf("mobile");
        var isMac = navigator.appVersion.indexOf("Mac") != -1;

        if ($.browser.msie) {
            $('body').addClass('browser-msie');
        }

        if ($.browser.webkit) {
            $('body').addClass('browser-webkit');
        }

        if ($.browser.safari) {
            $('body').addClass('browser-safari');
        }

        if ($.browser.mozilla) {
            $('body').addClass('browser-mozilla');
        }

        if ($.browser.opera) {
            $('body').addClass('browser-opera');
        }

        if (iOS || isAndroid || isWinPhone) {
            $('body').addClass('device-mobile');
        }

        if (iOS) {
            $('body').addClass('device-ios');
        }

        if (isAndroid) {
            $('body').addClass('device-android');
        }

        if (isWinPhone) {
            $('body').addClass('device-android');
        }
        if (isMac) {
            $('body').addClass('device-mac');
        }

        if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
            $('body').addClass('touch-enabled');
        }

        enquire.register("screen and (min-width:" + _s.config.screen_md + "px)", {
            match: site.onScreenMdMatch,
            unmatch: site.onScreenMdUnmatch,
        });

        enquire.register("screen and (min-width:" + _s.config.screen_lg + "px)", {
            match: site.onScreenLgMatch,
            unmatch: site.onScreenLgUnmatch,
        });

        enquire.register("screen and (min-width:" + _s.config.screen_sm + "px)", {
            match: site.onScreenSmMatch,
            unmatch: site.onScreenSmUnmatch,
        });

        enquire.register("screen and (min-width:0px)", {
            match: site.onScreenXsMatch,
            unmatch: site.onScreenXsUnmatch,
        });

        enquire.register("screen and (max-width:" + _s.config.screen_md_max + "px)", {
            match: site.onScreenMdMaxMatch,
            unmatch: site.onScreenMdMaxUnmatch,
        });

        enquire.register("screen and (max-width:" + _s.config.screen_sm_max + "px)", {
            match: site.onScreenSmMaxMatch,
            unmatch: site.onScreenSmMaxUnmatch,
        });

        enquire.register("screen and (max-width:" + _s.config.screen_xs_max + "px)", {
            match: site.onScreenXsMaxMatch,
            unmatch: site.onScreenXsMaxUnmatch,
        });


        enquire.register("screen and (min-aspect-ratio: 13/9)", {
            match: site.onScreenVerticalMaxMatch,
            unmatch: site.onScreenVerticalMaxUnMatch,
        });

        if (!_s.locationInfo[0]) {
            _s.setLocation(['Home'], true);
        }

        if (_s.locationInfo[0] && _s.locationInfo[0] != "Home") {
            _s.redirect(_s.locationInfo[0]);
        }

        //alert("test");
        _s.bindEvents();
        _s.loadAssets();

        requestAnimFrame(function () {
            $('.preloader').addClass('state-loading');
        });

        // preloading
        //setTimeout(function() {


        _s.cookieTL.add('start');
        _s.cookieTL.to($('.cookieLineTopLeft, .cookieLineTopRight'), .4, {width: '30%', ease: Power1.easeInOut}, 'start+=.2');
        _s.cookieTL.to($('.cookieLineRight, .cookieLineLeft'), .4, {height: '100%', ease: Power1.easeInOut}, 'start+=.6');
        _s.cookieTL.to($('.cookieLineBottom'), .4, {width: '52%', ease: Power1.easeInOut}, 'start+=1');
//        _s.cookieTL.to($('.cookieLineTopLeft, .cookieLineTopRight'), .5 , {width: '30%'}, 'start');
//

        $('#acceptCookieNotice').on('click', function (e) {
            e.preventDefault();
            $('.cookieNoticeContainer').fadeOut();

            createCookie('noticeAccepted', true, 14);
        });
        $('#acceptCookieNotice').on('mouseenter', function (e) {
            TweenMax.to($(this), .3, {letterSpacing: '0.4em'})
        });
        $('#acceptCookieNotice').on('mouseleave', function (e) {
            TweenMax.to($(this), .3, {letterSpacing: '0.2em'})

        });

        document.onkeydown = function (e) {
            if (e.which == 9) {
                e.preventDefault();
            }
        }


        if (readCookie('noticeAccepted')) {
            $('.cookieNoticeContainer').hide();

        } else {
            $('.cookieNoticeContainer').css('display', 'flex');

        }

        $(site).on('assets-loaded', function () {



            //alert('assets-loaded');
            requestAnimFrame(function () {
                var tlInit = new TimelineMax();
                var ease = Power2.easeOut;
                var easeBg = Power4.easeIn;
                var durationBg = 1;

                tlInit.to($('.textContainer'), 0.5, {opacity: 0})

                tlInit.add('bgOut');


                /*tlInit.to($('.bgSprite').eq(0),durationBg,{y:'-100%',ease:easeBg},'bgOut');
                 tlInit.to($('.bgSprite').eq(1),durationBg,{y:'-100%',ease:easeBg},'bgOut');
                 tlInit.to($('.bgSprite').eq(2),durationBg,{y:'100%',ease:easeBg},'bgOut');
                 tlInit.to($('.bgSprite').eq(3),durationBg,{y:'100%',ease:easeBg},'bgOut'); */

                tlInit.to($('.bgSprite'), 0.5, {opacity: 0}, 'bgOut');
                tlInit.add('showNav');


                if ($('.navItemNewsBlog').hasClass('state-active'))
                    tlInit.fromTo($('.navItemNewsBlog'), 0.5, {y: '100%'}, {y: '0%', ease: ease}, 'showNav');
                else
                    tlInit.fromTo($('.navItemNewsBlog'), 0.5, {y: '-100%'}, {y: '0%', ease: ease}, 'showNav');


                if ($('.navItemAbout').hasClass('state-active'))
                    tlInit.fromTo($('.navItemAbout'), 0.5, {x: '100%'}, {x: '0%', ease: ease}, 'showNav');
                else
                    tlInit.fromTo($('.navItemAbout'), 0.5, {x: '-100%'}, {x: '0%', ease: ease}, 'showNav');


                if ($('.navItemProjects').hasClass('state-active'))
                    tlInit.fromTo($('.navItemProjects'), 0.5, {y: '-100%'}, {y: '0%', ease: ease}, 'showNav');
                else
                    tlInit.fromTo($('.navItemProjects'), 0.5, {y: '100%'}, {y: '0%', ease: ease}, 'showNav');

                if ($('.navItemContact').hasClass('state-active'))
                    tlInit.fromTo($('.navItemContact'), 0.5, {x: '-100%'}, {x: '0%', ease: ease}, 'showNav');
                else
                    tlInit.fromTo($('.navItemContact'), 0.5, {x: '100%'}, {x: '0%', ease: ease}, 'showNav');

                tlInit.set($('.preloader'), {opacity: 0})

                tlInit.add(function () {
                    /*$(site).trigger('assets-loaded', {
                     resources:resources
                     });*/

                    setTimeout(function () {
                        //if (_p.$el.hasClass('state-active'))
                        //alert('page active');
                        $('.page.state-active').trigger('page-active', {
                            preventLocationPush: true
                        });
                    });
                }, '-=0.5')

                $('.preloader').addClass('state-loading-finished');
            });



            setTimeout(function () {
                //if (_p.$el.hasClass('state-active'))
                //$('.page.state-active').trigger('page-active');
            }, 2000);
        });

        $.jqoteload('templates/product_detail.tpl?bla=' + Math.random(), function (templates) {
            $.extend(site.templates, templates);
            $(site).trigger('template-loaded-project_detail');
        });


    },

    useLowPerformanceVersion: function () {

        return $('body').hasClass('browser-msie') || $('body').hasClass('browser-mozilla') || $('body').hasClass('browser-safari');
    },
    useFallbackVersion: function () {
        return $('body').hasClass('device-mobile') || !$('html').hasClass('webgl') || !$('html').hasClass('canvas');
    },

    redirect: function (pagename) {
        var $navItem = $('.navItem[rel=' + pagename + ']');
        var $page = $('.page[rel=' + pagename + ']');

        var navItem = $navItem.data('navItem');
        navItem.jumpToPage();
    },

    loadAssets: function (callback) {
        var _s = this;
        PIXI.loader.add('data_projects', _s.apiBaseUrl + 'api/ProjectItem?SortOrder__sort=ASC&isPublic=1');
        PIXI.loader.add('data_news', _s.apiBaseUrl + 'api/NewsItem?SortOrder__sort=ASC');
        PIXI.loader.add('data_awards', _s.apiBaseUrl + 'api/AwardItem?SortOrder__sort=ASC&isPublic=1');


        PIXI.loader.load(function (loader, resources) {
            resources['data_projects'] = $.parseJSON(resources['data_projects'].data);
            resources['data_news'] = $.parseJSON(resources['data_news'].data);
            resources['data_awards'] = $.parseJSON(resources['data_awards'].data);
            //console.log(resources);
            $(resources['data_projects']).each(function () {
                var project = this;
                if (project.MyImage)
                    PIXI.loader.add('project_image_' + project.ID, _s.apiBaseUrl + project.MyImage.Filename);

                $(this.ProjectRows).each(function () {
                    var project_row = this;

                    if (typeof project_row.MyImage == "undefined")
                        return;


                    //PIXI.loader.add('project_row_image_'+project_row.ID,_s.apiBaseUrl+project_row.MyImage.Filename);
                });
            });

            $(resources['data_news']).each(function () {
                var news = this;
                //console.log

                if (typeof news.BildHQ != "undefined")
                    PIXI.loader.add('news_bildhq_' + news.ID, _s.apiBaseUrl + news.BildHQ.Filename);

                if (typeof news.BildLQ != "undefined")
                    PIXI.loader.add('news_bildlq_' + news.ID, _s.apiBaseUrl + news.BildLQ.Filename);
            });

            PIXI.loader.add('noise1', 'images/noisy-texture-300x100-o73-d10-c-ffffff-t1.png');
            PIXI.loader.add('noise2', 'images/noisy-texture-300x100-o74-d10-c-ffffff-t1.png');
            PIXI.loader.add('noise3', 'images/noisy-texture-300x100-o80-d10-c-ffffff-t1.png');
            PIXI.loader.add('noise4', 'images/noisy-texture-300x100-o85-d10-c-ffffff-t1.png');
            PIXI.loader.add('noise5', 'images/noisy-texture-300x100-o87-d10-c-ffffff-t1.png');


            PIXI.loader.load(function (loader, resources) {
//                console.log(resources);

                $(site).trigger('assets-loaded', {
                    resources: resources
                });
            });

        });

        $(_s).on('assets-loaded', function (event, params) {
            site.resources = params.resources;

            if (typeof callback != "undefined")
                callback();
        });

        /*PIXI.loader.load(function(loader, resources) {
         site.resources = resources;
         
         //			console.log('ASSETS _s',resources);
         
         
         if (typeof callback != "undefined")
         callback();
         }); */
    },

    onScreenMdMatch: function () {
        var _s = site;
        $('body').addClass('screen-md');
    },

    onScreenMdUnmatch: function () {
        var _s = site;
        $('body').removeClass('screen-md');
    },

    onScreenSmMatch: function () {
        var _s = site;
        $('body').addClass('screen-sm');
    },

    onScreenSmUnmatch: function () {
        var _s = site;
        $('body').removeClass('screen-sm');
    },

    onScreenXsMatch: function () {
        var _s = site;
        $('body').addClass('screen-xs');
    },

    onScreenXsUnmatch: function () {
        var _s = site;
        $('body').removeClass('screen-xs');
    },

    onScreenMdMaxMatch: function () {
        var _s = site;
        $('body').addClass('screen-md-max');
    },

    onScreenMdMaxUnmatch: function () {
        var _s = site;
        $('body').removeClass('screen-md-max');
    },

    onScreenSmMaxMatch: function () {
        var _s = site;
        $('body').addClass('screen-sm-max');
    },

    onScreenSmMaxUnmatch: function () {
        var _s = site;
        $('body').removeClass('screen-sm-max');
    },

    onScreenXsMaxMatch: function () {
        var _s = site;
        $('body').addClass('screen-xs-max');

    },

    onScreenXsMaxUnmatch: function () {
        $('body').removeClass('screen-xs-max');

    },

    onScreenVerticalMaxMatch: function () {
        var _s = site;
        $('body').addClass('screen-vertical-max');
    },

    onScreenVerticalMaxUnMatch: function () {
        var _s = site;
        $('body').removeClass('screen-vertical-max');
    },

    /**
     * locationData: Array of Data for the Url -> will be joined with '/' -> nested Array with '-'
     * redirect: state will not be pushed to the history
     * extradata: array of data stored in the history
     * inQueue: add it to the Location Queue or not
     */
    setLocation: function (locationData, redirect, extradata, inQueue) {

        if (typeof inQueue == "undefined")
            inQueue = false;

        var _s = this;
        //
        var url = "";

        var myLocation = [];

        if (!locationData[0])
            myLocation[0] = _s.locationInfo[0];
        else
            myLocation[0] = locationData[0];

        for (var i = 1; i <= 5; i++) {
            //if (!locationData[i]) {
            //	myLocation[i] = locationData[i];
            //}
            //else if (_s.locationInfo[i])
            myLocation[i] = locationData[i];
        }

        //console.log(myLocation,locationData,_s.locationInfo);

        if (typeof extradata == "undefined") {
            extradata = {};
        }

        extradata.previous_page = window.location.pathname;
        extradata.previous_location = _s.locationInfo;

        _s.locationInfo = myLocation;

        var url = _s.getUrl(myLocation);

        if (typeof redirect != "undefined" && redirect) {
            history.replaceState(
                    extradata,
                    url,
                    url);
            return;
        } else {

            history.pushState(
                    extradata,
                    url,
                    url);
        }

        _s.locationChangedQueue = [];

        if (inQueue) { // trigger the event later
            _s.locationChangedQueue.push({
                locationInfo: _s.locationInfo,
                url: url,
                extradata: extradata
            });
        } else {
            $(_s).trigger('location-changed', {
                locationInfo: _s.locationInfo,
                url: url,
                extradata: extradata
            });
        }

    },

    getUrl: function (locationInfo) {
        var _s = this;

        var url = "";
        var myLocation = $.map(_s.locationInfo, function (a) {

            if ($.isArray(a))
                return a.join('-');
            else
                return a;
        });

        return myLocation.join('/');
    },

    getLocationInfo: function (url) {
        var _s = this;

        if (typeof url == "undefined") {
            var url = window.location.pathname.replace(_s.baseUrl, '');
        }


        var _info = url.split('/');

        $.each(_info, function (index, ar) {

            if (ar.indexOf('-') > -1)
                _info[index] = ar.split('-');
            else
                _info[index] = ar;
        });

        return _info;
    },
    currentPageName: 'Home',
    preventLocationPush: false,
    locationChangedQueue: [],
    bindEvents: function () {
        var _s = this;
        window.onpopstate = function (event) {
            //alert('popstate');
//            console.log('popstate', event);

            _s.locationInfo = _s.getLocationInfo();

            _s.locationChangedQueue.push({
                locationInfo: _s.locationInfo,
                url: window.location.pathname.replace(_s.baseUrl, ''),
                extradata: event.state
            });

            /*$(_s).trigger('location-changed',{
             locationInfo:_s.locationInfo,
             url:window.location.pathname.replace(_s.baseUrl,'')
             }); */

            //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        };

        setInterval(function () { // queue animations

            if ($('body').hasClass('state-animating') || $('body').hasClass('state-animating-element'))
                return;
            // TODO:check if body has class 'state-animating'
            // if not trigger event from queue
            // else do nothing
            if (_s.locationChangedQueue.length) {

                var data = _s.locationChangedQueue.shift();
                data.fromQueue = true;
//                console.log('From Location Queue', _s.locationChangedQueue.length, _s.locationChangedQueue);
                //alert(_s.locationChangedQueue.length);
                $(_s).trigger('location-changed', data);
            }
        }, 10);

        $(_s).on('location-changed', function (event, params) {

            if (typeof params.fromQueue != "undefined" && params.fromQueue) {
                if (params.locationInfo[0] != _s.currentPageName) {
                    _s.preventLocationPush = true;

                    if (params.locationInfo[0] == "Home") {
                        $('.navItem' + _s.currentPageName).trigger('click', {
                            preventLocationPush: true
                        });
                    } else {
                        $('.navItem' + params.locationInfo[0]).trigger('click', {
                            preventLocationPush: true
                        });
                    }
                }
            }


            _s.currentPageName = params.locationInfo[0];
            //console.log('location-changed',event,params);

            //alert($('.page'+_s.currentPageName).length);
            $('.page' + _s.currentPageName).trigger('location-changed', params);
        });

        /*$('.navItem').on('click', function() {
         _s.gotoPage($(this).attr('rel'));
         }); */

        $('.navItem').on('click', function (event, params) {
            TweenMax.to($('.menuCloseLogo, .menuSpatzekLogo'), 0.2, {opacity: "0", ease: Power1.easeInOut});
            TweenMax.to($('.menuCloseLogo button'), 0.2, {className: '+=tcon-transform'});
            TweenMax.to($('.menuSpatzekLogo  svg polyline'), 0.2, {drawSVG: '0%'});

            pageContact.displaceTransitionBlock = false;
//console.log('clicked');
//
//            if ($('.homeImageActive').hasClass('homeImage_1')) {
//                page_home.playWords(1);
//                console.log('has1');
//            }
//            if ($('.homeImageActive').hasClass('homeImage_2')) {
//                page_home.playWords(0);
//                console.log('has2');
//
//            }
//            if ($('.homeImageActive').hasClass('homeImage_3')) {
//                page_home.playWords(2);
//                console.log('has3');
//
//            }
        });


        $('.navItem').on('mouseenter', function () {
            TweenMax.to($('.menuCloseLogo .blockA'), .3, {className: '+=tcon-transform'});
            TweenMax.to($(' .menuCloseLogo .blockB'), .3, {className: '+=tcon-transform'});
            TweenMax.to($('.menuSpatzekLogo'), 1, {delay: 0.3, className: '+=hoverJS'});

            $('.menuSpatzekLogo').trigger('mouseenter');

        });
        $('.navItem').on('mouseleave', function () {
            TweenMax.to($('.menuCloseLogo .blockA'), .3, {className: '-=tcon-transform'});
            TweenMax.to($('.menuCloseLogo .blockB'), .3, {className: '-=tcon-transform'});
            TweenMax.to($('.menuSpatzekLogo'), 1, {delay: 0.3, className: '-=hoverJS'});


            $('.menuSpatzekLogo').trigger('mouseleave');

        });

        $('.menuCloseLogo, .menuSpatzekLogo').on('click', function () {
            $('.navItem.state-active').click();
        });

        $('.page').on('page-active', function (event, params) {
            var preventLocationPush = false;

            if (typeof params != "undefined") {
                if (typeof params.preventLocationPush != "undefined")
                    preventLocationPush = params.preventLocationPush;
            }

//            console.log('site on page active', preventLocationPush, params);
//            console.log('page active', this, $(this).data());

            var rel = $(this).attr('Rel');

//            console.log(pageAbout.pageTl);

            var addClass = '';
            switch (rel) {

                case 'Home':
                    if (pageAbout.pageTl != null) {
                        pageAbout.pageTl.progress(0);
                        pageAbout.pageTl.pause();
                    }
                    pageAbout.disableAnimation = true;

                    pageContact.disableAnimation = true;
                    break;
                case 'NewsBlog':
                    if (pageAbout.pageTl != null) {
                        pageAbout.pageTl.progress(0);
                        pageAbout.pageTl.pause();
                    }
                    pageContact.disableAnimation = true;
                    pageAbout.disableAnimation = true;

                    page_home.disableAnimation = true;

                    break;
                case 'Contact':
                    if (pageAbout.pageTl != null) {
                        pageAbout.pageTl.progress(0);
                        pageAbout.pageTl.pause();
                    }
                    pageAbout.disableAnimation = true;
                    pageContact.disableAnimation = false;

                    page_home.disableAnimation = true;

                    break;
                case 'Projects':
                    if (pageAbout.pageTl != null) {
                        pageAbout.pageTl.progress(0);
                        pageAbout.pageTl.pause();
                    }
                    pageContact.disableAnimation = true;
                    pageAbout.disableAnimation = true;

                    page_home.disableAnimation = true;

                    break;
                case 'About':
                    pageContact.disableAnimation = true;

                    page_home.disableAnimation = true;

                    break;
            }

            TweenMax.to($('.menuCloseLogo, .menuSpatzekLogo'), 1, {opacity: "1", delay: 0.5, ease: Power1.easeInOut}, '+=.2');
            TweenMax.set($('.menuSpatzekLogo  svg polyline'), {display: 'block', drawSVG: '0%', delay: .5});
            TweenMax.to($('.menuSpatzekLogo  svg polyline'), 1, {delay: 1.3, drawSVG: '100%', delay: .55});


            //alert(params.preventLocationPush);

            if ($(this).data('currentProject')) {
                if (!preventLocationPush)
                    _s.setLocation([rel, [$(this).data('currentProject').id, $(this).data('currentProject').name]]);
            } else {

                if (rel == "Projects") {
                    //alert(pageProjects.data[0].name);

                    if (!preventLocationPush)
                        _s.setLocation([rel, [pageProjects.data[0].id, pageProjects.data[0].name]]);
                } else
                if (!preventLocationPush)
                    _s.setLocation([rel]);
            }

        });

        // check resize



        $(window).on('resize', function () {

            if ($('body').hasClass('state-resizing')) {
                return;
            }
            //if ($('.overlay-resize').hasClass('resizeEnd')) {
//			console.log('resizing');
            $(_s).trigger('resize-start');
            $('.overlay-resize').addClass('state-visible');
            $('body').addClass('state-resizing');

            clearInterval(_s.resizeInterval);
            _s.setResizeInterval();
            //}

            //return;
//            console.log('rel');

        });


        //var windowSize = {};
        _s.windowSize.width = $(window).width();
        _s.windowSize.height = $(window).height();


    },

    setResizeInterval: function () {
        var _s = this;

        _s.resizeInterval = setInterval(function () {
            //console.log(windowSize);

            if ($('body').hasClass('state-animating'))
                return;

            if (_s.windowSize.width != $(window).width() || _s.windowSize.height != $(window).height()) {

                _s.windowSize.width = $(window).width();
                _s.windowSize.height = $(window).height();

                $(_s).trigger('resize');

                $('body').removeClass('state-resizing');
//                $('.overlay-resize').removeClass('state-visible');
            }
            window.location.reload();

        }, 1500);
    },

    gotoPage: function (pagename) {
        //alert(pagename);


    }

}

$(document).ready(function () {
    site.init();

})