var pageAbout = {
    $el: null,
    scrollTl: null,
    pageTl: null,
    stage: null,
    renderer: null,
    scrollTlController: null,
    disableAnimation: true,
    textContainer: null,
    dontScroll: false,
    init: function ($el) {
        var _p = this;

        _p.$el = $el;


        _p.bindEvents();

        setTimeout(function () {


            //_p.makeScrollAnimation();

			//_p.animate();
        }, 3000);

        if (site.useFallbackVersion() || _p.mobile) {
            _p.slider = new ImageSliderFallback();
            _p.slider.init();
            

        } else {



            _p.slider = new ImageSlider(_p.$el.find('.imageSlideshow'), [
                'http://www.danielspatzek.com/images/daniel_spatzek_01.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_02.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_03.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_04.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_05.jpg'
            ], 1400, 1400);
            _p.slider.init();
        }



    },

    buildPage: function () {
        var _p = this;


        $(site.resources.data_awards).each(function () {
            var proto = $('.awardPrototype').clone();
            proto.addClass('award');
            proto.find('.awardImage').css('background-image', 'url(http://backend.danielspatzek.com/' + this.MyImage.Filename + ')');
            proto.find('.awardAmount').html(this.Line1);
            proto.find('.awardDescr').html(this.Line2);
//            proto.find('.awardDescr2').html(this.Line3);

            proto.find('.awardName').html(this.Line3);
            proto.removeClass('awardPrototype');

            $('.awardsContainer').append(proto);
//                    proto.find('.awardDescr').css('background-image', 'url(http://apps2go.at/kunden/danielspatzek_rest/' + this.MyImage.Filename + ')');
//                    proto.find('.awardName').css('background-image', 'url(http://apps2go.at/kunden/danielspatzek_rest/' + this.MyImage.Filename + ')');

//            console.log(this);
        });



        //var mySplitText = new SplitText(_p.$el.find('.aboutTextInner'), {type:"chars,lines", charsClass:"char char++", wordsClass:'word wordd++', linesClass:'line line++' });
        var mySplitText = new SplitText(_p.$el.find('.cssAwards .headline'), {type: "chars words", charsClass: "char char++"});
        var myOtherSplitText = new SplitText(_p.$el.find('.imprintContainer p, .imprintContainer h3, .imprintContainer a '), {type: "chars", charsClass: "char char++"});

        /*if (site.useFallbackVersion() || _p.mobile) {
            _p.slider = new ImageSliderFallback();
            _p.slider.init(); 

        } else {



            _p.slider = new ImageSlider(_p.$el.find('.imageSlideshow'), [
                'http://www.danielspatzek.com/images/daniel_spatzek_01.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_02.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_03.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_04.jpg',
                'http://www.danielspatzek.com/images/daniel_spatzek_05.jpg'
            ], 1400, 1400);
            _p.slider.init();
        }*/
        //_p.slider.init();

        var controller = new ScrollMagic.Controller({
			container:_p.$el.find('.pageContent')[0],
			loglevel:3,
			vertical:true
		});

        var backgroundScene = new ScrollMagic.Scene({
            triggerElement:_p.$el.find('.cssAwards')[0],
			triggerHook:1,
			//duration:'20%'
		});
        backgroundScene.addTo(controller);

        backgroundScene.on('enter', function() {
            if ($('body').hasClass('screen-sm-max'))
                TweenMax.to(_p.$el.find('.imageSlideShow_mobile'),0.5,{opacity:0});
        });
        backgroundScene.on('leave', function() {
            if ($('body').hasClass('screen-sm-max'))
                TweenMax.to(_p.$el.find('.imageSlideShow_mobile'),0.5,{opacity:1});
        });
    },

    bindEvents: function () {
        var _p = this;
        $(site).on('assets-loaded', function (event, params) {
            _p.buildPage();
        });
        _p.$el.on('page-active', function () {
            //alert('page_active');
//			console.log('page_active');

            _p.disableAnimation = false;

            //_p.$el.addClass('state-active');

            if (!_p.$el.hasClass('state-timeline-active')) {
                _p.$el.find('.scrollListenerC').scrollTop(0);

                if (_p.pageTl != undefined)
                    _p.pageTl.progress(0);

                //return;
                _p.makeInitAnimation();

                _p.makeScrollAnimation();


                setTimeout(function () {
                    if ($(window).width() >= 1024) {
                        _p.pageTl.play();
                    }

                }, 0);
            }


            _p.$el.addClass('state-timeline-active');
            //_p.scrollTl.play();
        });

        _p.$el.on('page-inactive', function () {


            //_p.makeInitAnimation();
            _p.$el.removeClass('state-timeline-active');
        });

        _p.$el.find('.pageContent').on('mousewheel', function (e) {
            //console.log(e);
            if (!_p.dontScroll)
                _p._onScroll(e);
        });

        _p.$el.find('#googleAnalytics').on('click', function (e) {
            e.preventDefault();
            $('.googleAnalyticsContainer').fadeIn('fast');
            _p.dontScroll = true;
        });
        _p.$el.find('.googleAnalytics_closeLogo').on('click', function (e) {
            e.preventDefault();
            $('.googleAnalyticsContainer').fadeOut('fast');
            _p.dontScroll = false;

        });


        /*_p.$el.find('.scrollListenerC').on('scroll',function(e) {
         _p._onScroll(e);
         }); */

        $(site).on('resize', function () {

            if (_p.pageTl == undefined)
                return;

//			console.log('on page_about resize');



            if (_p.scrollTimeout != undefined) {
                clearTimeout(_p.scrollTimeout);
            }

            if (_p.scrollTween)
                _p.scrollTween.kill();

            _p.pageTl.progress(0);

            _p.pageTl.clear();
            _p.pageTl.kill();



            //return;

            //setTimeout(function() {
            TweenMax.set(_p.$el.find('.scrollContainer'), {clearProps: 'all'});
            TweenMax.set(_p.$el.find('.aboutText'), {clearProps: 'all'});
            TweenMax.set(_p.$el.find('.aboutTextInner'), {clearProps: 'all'});
            TweenMax.set(_p.$el.find('.cssAwards *', {clearProps: 'all'}));

            _p.$el.find('.cssAwards').removeClass('state-visible');

            _p.makeScrollAnimation();
            _p.pageTl.play();
            //},2000);

        });

        /*$(".scrollContainer").swipe({swipeStatus: function (event, phase, direction, distance) {
         //console.log(distance);
         _p._onSwipe(event, phase, direction, distance);
         }, allowPageScroll: "horizontal"});*/
    },

    makeScrollAnimation: function () {

        if ($(window).width() <= 1024) {
            return;
        }
        var _p = this;
        _p.pageTl = new TimelineMax({paused: true});

        //alert(_p.textContainer.height);
        //_p.scrollTl.to(_p.textContainer.scale,5,{x:0.1,y:0.1},0);
        //_p.scrollTl.to(_p.textContainer.position,5,{y:-200},"-=2");

        var scale = 0.2;

        _p.pageTl.addLabel('scrollStart', 0);

        if ($('body').hasClass('screen-md')) {
            _p.pageTl.addLabel('start');
            _p.pageTl.set(_p.$el.find('.scrollContainer'), {force3D: true});

            TweenMax.to(_p.$el.find('.imageSlideshow'), 1, {opacity: 1, ease: Power0.easeNone}, 'start');

            _p.pageTl.to(_p.$el.find('.aboutText'), 50, {height: (_p.$el.find('.aboutText').outerHeight() * 0.2), ease: Power3.easeOut}, 'start');
            _p.pageTl.to(_p.$el.find('.aboutTextInner'), 50, {scale: 0.2, ease: Power3.easeOut}, 'start'); 

            /*
            _p.pageTl.to(_p.$el.find('.aboutText'), 25, {height: (_p.$el.find('.aboutText').outerHeight() * 0.4), ease: Power0.easeNone}, 'start');
            _p.pageTl.to(_p.$el.find('.aboutTextInner'), 25, {scale: 0.4, ease: Power0.easeNone}, 'start');

            _p.pageTl.addLabel('start2');
            _p.pageTl.to(_p.$el.find('.aboutText'), 25, {height: (_p.$el.find('.aboutText').outerHeight() * 0.2), ease: Power0.easeOut}, 'start2');
            _p.pageTl.to(_p.$el.find('.aboutTextInner'), 25, {scale: 0.2, ease: Power0.easeOut}, 'start2');*/

            //_p.pageTl.to(_p.$el.find('.aboutText'), 25, {scale: 0.4, ease: Power0.easeNone}, 'start');


            var transform = (_p.$el.find('.aboutText').outerHeight() * scale)
                    + _p.$el.find('.cssAwards').outerHeight()
                    /*+ parseInt(_p.$el.find('.cssAwards').css('top').replace('px',''))*/
                    + parseInt(_p.$el.find('.aboutText').css('margin-top').replace('px', ''))

            transform *= -1;

            transform += $(window).height();
            transform -= 200;

            //_p.pageTl.fromTo(_p.$el.find('.scrollContainer'), 35, {y: 0}, {y: transform * 0.34, ease: Power0.easeNone}, 'scrollStart');
            _p.pageTl.to(_p.$el.find('.scrollContainer'), 50, {y: transform, ease: Power2.easeIn}, 'start');

        } else {
            var transform = (_p.$el.find('.aboutText').outerHeight())
                    + _p.$el.find('.cssAwards').outerHeight()
                    /*+ parseInt(_p.$el.find('.cssAwards').css('top').replace('px',''))*/
                    + parseInt(_p.$el.find('.aboutText').css('margin-top').replace('px', ''))

            transform *= -1;
            transform += $(window).height();
            transform -= 200;

            _p.pageTl.fromTo(_p.$el.find('.scrollContainer'), 35, {y: 0}, {y: transform, ease: Power0.easeNone}, 'scrollStart');
        }
        
         _p.pageTl.addLabel('display_gif', '-=10');
        //_p.pageTl.to(_p.$el.find('.cssAwards'),20,{y:-6000,ease:Ease.Linear},'scrollStart');

        _p.pageTl.add(function () {

            return;
            //alert('display gif');

            //if (!_p.timelineTunning)
            //	return;

            _p.$el.find('.aboutText .cssDesingAwards').addClass('active');

            var $C = $('<div class="aboutGiv" />');

            $C.append('<img src="images/about.gif" />');

            _p.$el.find('.pageContent').append($C);

            setTimeout(function () {
                _p.$el.find('.aboutText .cssDesingAwards').removeClass('active');
                $C.remove();
            }, 3000);
        }, 'display_gif');



        /*_p.pageTl.add(function() {
         // hide Awwards
         
         var myTl = new TimelineMax();
         myTl.to(_p.$el.find('.cssAwards .headline > div'),0.3,{opacity:0},0.1,'display_awwards_headline');
         
         myTl.to(_p.$el.find('.cssAwards .awardImage'),0.3,{opacity:0});
         _p.$el.find('.cssAwards').each(function() {
         //_p.pageTl.fromTo($(this).find('.awardImage'),0.3,{opacity:0,y:20},{opacity:1,y:0});
         myTl.to($(this).find('.awardText > *'),0.3,{opacity:0},0.1);
         });
         },'-=10');*/


        _p.pageTl.addLabel('display_awwards_headline');

        if ($('body').hasClass('screen-sm-max')) {
            _p.pageTl.addLabel('display_awwards_headline', '-=20');
            _p.pageTl.fromTo(_p.$el.find('.imageSlideShow_mobile'), 4, {opacity: 1}, {opacity: 0}, 'display_awwards_headline');
        } else
            _p.pageTl.addLabel('display_awwards_headline', '-=14');


        _p.pageTl.add(function () {

            if (_p.$el.find('.cssAwards').hasClass('state-visible'))
                return;

            _p.$el.find('.cssAwards').addClass('state-visible');

            var myTl = new TimelineMax();
            myTl.staggerFromTo(_p.$el.find('.cssAwards .headline > div > div'), 0.1, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.03);

            var delay = 0;

            myTl.addLabel('display_awwards');

            //myTl.staggerFromTo(_p.$el.find('.cssAwards .awardImage'),0.5,{opacity:0},{opacity:1},0.3);



            if ($('body').hasClass('screen-sm-max')) {
                _p.$el.find('.cssAwards').each(function () {
                    //_p.pageTl.fromTo($(this).find('.awardImage'),0.3,{opacity:0,y:20},{opacity:1,y:0});

                    myTl.set($(this).find('.awardImage'), {y: '-50%'}, 'display_awwards');
                    myTl.fromTo($(this).find('.awardImage'), 0.2, {opacity: 0, x: '-40px'}, {opacity: 1, x: 0}, 'display_awwards+=' + delay);
                    delay += 0.2;
                    myTl.staggerFromTo($(this).find('.awardText > *'), 0.2, {opacity: 0, y: '20px', ease: Power2.easeOut}, {opacity: 1, y: 0}, 0.1, 'display_awwards+=' + delay);
                    delay += 0.2;
                });
            } else {
                _p.$el.find('.cssAwards').each(function () {
                    //_p.pageTl.fromTo($(this).find('.awardImage'),0.3,{opacity:0,y:20},{opacity:1,y:0});
                    myTl.staggerFromTo(_p.$el.find('.awardImage, .awardText > *'), 0.2, {opacity: 0, y: '20px', ease: Power2.easeOut}, {opacity: 1, y: 0}, 0.1, 'display_awwards+=' + delay);
                    delay += 0.2;
                });
            }


            myTl.staggerFromTo(_p.$el.find('.imprintContainer p > div, .imprintContainer h3 > div, .imprintContainer a > div,  .imprintContainer a '), 0.2, {opacity: 0, y: 20}, {opacity: 1, y: 0}, 0.01);
        }, 'display_awwards_headline');

    },

    makeInitAnimation: function () {

    },

    lastScroll: 0,
    timelineRunning: true,
    scrollTimeout: false,
    scrollStack: 0,
    scrollTween: null,

    _onSwipe: function (event, phase, direction, distance) {
        var transform = distance;
        var _p = this;

//		console.log('onScroll',event);
//		console.log('onScroll',phase);
//		console.log('onScroll',direction);
//		console.log('onScroll',distance);

        var percentScreen = distance / ($(window).height() / 100);

        if (phase == "start")
            return;
        else if (phase == "end") {
            var speed = 0;

            if (direction == "up") {
                var myTween = TweenLite.to(_p.pageTl, 1, {timeScale: 1, ease: Power2.easeOut});
            } else {
                //_p.pageTl.timeScale(1);

                var myTween = TweenLite.to(_p.pageTl, 1, {timeScale: 0, ease: Power2.easeOut, onComplete: function () {
                        _p.pageTl.play();

                        TweenLite.to(_p.pageTl, 0.3, {timeScale: 1, ease: Power2.easeOut});

                    }});
            }

            return;
        } else {
            var speed = percentScreen * 0.5;
            _p.pageTl.timeScale(1 + speed);
        }

        _p.scrollTimeout = setTimeout(function () {
            _p.scrollStack -= 1;
        });

        if (direction == "down") {
            _p.pageTl.reverse();
        } else {
            _p.pageTl.play();
        }
    },
    //scrollTween:undefined,
    stopTimeline: undefined,
    _onScroll: function (e) {
        var _p = this;

        if ($(window).width() <= 1024)
            return;

//        console.log('onScroll '+Math.random(), e);



        var $slC = _p.$el.find('.scrollListenerC');
        var $sl = _p.$el.find('.scrollListener');


        if (_p.scrollTimeout != undefined) {
            clearTimeout(_p.scrollTimeout);
        }

        if (_p.scrollTween)
            _p.scrollTween.kill();

        if (_p.stopTimeline != undefined) {
            _p.stopTimeline.kill();
        }


        var timeout = 350;
        if (e.deltaY > 0) {
//            console.log('up');

            _p.scrollTween = TweenLite.to(_p.pageTl, 0.1, {timeScale: 15, ease: Power0.easeIn});

            _p.pageTl.reverse();

        } else {
//            console.log('down');

            _p.scrollTween = TweenLite.to(_p.pageTl, 0.1, {timeScale: 15, ease: Power0.easeIn});

            _p.pageTl.play();

        }

        _p.scrollTimeout = setTimeout(function () {

            if (e.deltaY < 0) {

                // scroll top
//                console.log('down');
                var myTween = TweenLite.to(_p.pageTl, 0.2, {timeScale: 1, ease: Power0.easeIn});
                _p.pageTl.play();

            } else {
                _p.stopTimeline = new TimelineMax();
                _p.stopTimeline.to(_p.pageTl, 0.2, {timeScale: 1});
                _p.stopTimeline.add(function () {
                    _p.pageTl.play();
                });

//                console.log('up');

            }


            _p.scrollStack = 0;

        }, timeout);


    },

    animate: function () {
        var _p = pageAbout;
        requestAnimFrame(_p.animate);
        if ($('.pageAbout').hasClass('state-active')) {

            _p.renderer.render(_p.stage);
        }
    }
};

$(document).ready(function () {
    pageAbout.init($('.pageAbout'));
});