var page_home = {
    stage: null,
    renderer: null,
    spritePlayers: [],
    resources: null,
    currentSpritePlayerIndex: 0,
    currentWordIndex: 0,
    $el: null,
    initTl: null,
    sprite_player_data_loaded: false,
    sprite_player_display_ready: false,
    mobile: null,
    oldMouseInfos: {x: 0, y: 0},
    mouseInfos: {x: 0, y: 0},
    disableAnimation: true,
    playWordTL: new TimelineMax({paused: true}),

    words: [
        ['Night', 'Owl'],
        ['Experience', 'Engineer'],
        ['Cssda', 'Judge'],
        ['Web', 'Head'],
//        ['Skateboard', 'Enthusiast']

    ],

    init: function ($el) {
        var _p = this;
        _p.$el = $el;
        _p.stage = new PIXI.Stage(null, true);
        _p.renderer = PIXI.autoDetectRenderer(441, 500, {transparent: true});

        enquire.register("screen and (max-width: " + site.config.screen_sm + "px)", {
            match: function () {
                _p.mobile = true;
//                console.log('mobile');
            },

        });
        enquire.register("screen and (min-width: " + site.config.screen_sm + "px)", {
            match: function () {
                _p.mobile = false;
//                console.log('desktop');
            },

        });

        $('.homeStage').html(_p.renderer.view);
        _p.$el.addClass('state-active')

        _p.buildPage();
        _p.bindEvents();
        _p.buildInitAnimation();
        requestAnimFrame(_p.animate);

//        console.log($.browser);





    },

    bindEvents: function () {
        var _p = this;

        _p.$el.on('page-active', function () {
            _p.disableAnimation = false;


            if (!_p.$el.hasClass('state-active')) {
                return;
            }
            if (!_p.$el.hasClass('state-inittl-played')) {

                _p.initTl.play().timeScale(1);
//                _p.slider.initTL.play();

                _p.$el.addClass('state-inittl-played');
            }
        });

        _p.$el.on('mousemove', function (e) {
            //console.log(e);
            _p.mouseInfos.x = e.clientX;
            _p.mouseInfos.y = e.clientY;
        });
    },

    buildInitAnimation: function () {
        var _p = this;

        _p.initTl = new TimelineMax({paused: true});
        _p.initTl.add('start');
//        _p.initTl.set($('body'),  {className: '+=state-animation-running'}, 'start');
//            _p.initTl.add(function() {
//               $('body').addClass('state-animation-running');
//            }, 'start');
        _p.initTl.set(_p.$el.find('.logoSvg polyline'), {drawSVG: "0%"}, 'start');

        _p.initTl.set(_p.$el.find('.pageHomeLeft .initText .word'), {opacity: 0}, 'start');

        _p.initTl.set(_p.$el.find('.pageHomeRight .text .stagger1'), {opacity: 0}, 'start');
        _p.initTl.set(_p.$el.find('.pageHomeRight .text .txtSwitchLineLineInnerC'), {opacity: 0}, 'start');
        _p.initTl.set(_p.$el.find('.pageHomeRight .text .txtSwitchLineLineInnerC .textContainer'), {opacity: 1}, 'start');

        _p.initTl.set(_p.$el.find('.pageHomeRight .text .stagger2'), {opacity: 0}, 'start');


        _p.initTl.set(_p.$el.find('.pageHomeLeft .initText'), {opacity: 1}, 'start');
        _p.initTl.set(_p.$el.find('.pageHomeRight .headline'), {opacity: 1}, 'start');
        _p.initTl.from(_p.$el.find('.logoHomeSvg polyline'), 1.5, {drawSVG: "100% 100%", ease: Power2.easeInOut}, 'start+=0.05');

        TweenLite.set(_p.$el.find('.pageHomeLeft .initText, .headline .text'), {
            perspective: 400
        }, 'start');

        _p.initTl.add(function () {
            _p.$el.addClass('state-paralax-enabled');
        }, 'start');

        var cnt = 0;
        _p.$el.find('.pageHomeLeft .initText').each(function () {

            var mySplitText = new SplitText($(this), {type: "chars", charsClass: "char char++"});
            var shuffleCharArray = shuffleArray(mySplitText.chars);

            _p.initTl.staggerFrom(shuffleCharArray, 0.3, {
                autoAlpha: 0,
                rotationY: -90,
                transformOrigin: "0% 50%"
            }, 0.1, 'start+=' + (cnt * 0.3 + 1));
            cnt++;
        });

        _p.$el.find(' .headline .text').each(function () {
            var mySplitText = new SplitText($(this), {type: "chars", charsClass: "char char++"});
            var shuffleCharArray = shuffleArray(mySplitText.chars);

            _p.initTl.staggerFrom(shuffleCharArray, 0.3, {
                autoAlpha: 0,
                rotationY: -90,
                transformOrigin: "0% 50%"
            }, 0.1, 'start+=2.3');
        });

        _p.initTl.to(_p.$el.find('.pageHomeRight .headline .line, .pageHomeLeft .headline .line'), 0.5, {right: 0, ease: Power2.easeOut}, 'start+=3.5');


        _p.initTl.to($('.txtSwitchLine .txtSwitchLineLineInnerC:eq(0) .bg'), 0.5, {width: '100%'}, 'start+=3.7');
        _p.initTl.to($('.txtSwitchLine .txtSwitchLineLineInnerC:eq(1) .bg'), 0.5, {width: '100%'}, 'start+=4');


        var stagger = _p.$el.find('.pageHomeRight .text .stagger1,.txtSwitchLineLineInnerC,.pageHomeRight .text .stagger2');

        _p.initTl.set(stagger, {x: 20}, 0, 'start');
        _p.initTl.staggerTo(stagger, 0.3, {opacity: 1, x: 0}, 0.1, 'start+=3.5');

        _p.initTl.add(function () {
            var tl = new TimelineMax({paused: true});

            _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').each(function () {
                var width = $(this).find('.textHelper').outerWidth();

            });

            tl.play();
        }, 'start+=3');


// _p.initTl.add(function() {
//               $('body').removeClass('state-animation-running');
//            }, 'start+=3');

        _p.initTl.add(function () {
            //_p.playWords();
            _p.sprite_player_display_ready = true;

            if (_p.sprite_player_data_loaded)
                _p.slider.showImage(0);
        }, 'start+=4.5');

        _p.initTl.set($('body'), {className: '-=state-animation-running'});


    },

    buildPage: function () {
        var _p = this;

        var data = [
            {
                src: 'http://www.danielspatzek.com/images/owl_final_super_tiny.png',

                cnt_x: 20,
                cnt_y: 10,
                cnt_images: 200,
                imagesPerSec: 17,
            },
            {
                src: 'http://www.danielspatzek.com/images/experience_engineer_super_tiny.png',
                /*cnt_x:13,
                 cnt_y:20,*/
                cnt_x: 20,
                cnt_y: 10,
                cnt_images: 200,
                imagesPerSec: 17,
            },
            {
                src: 'http://www.danielspatzek.com/images/cssda_judge_super_tiny.png',
                /*cnt_x:13,
                 cnt_y:20,*/
                cnt_x: 20,
                cnt_y: 10,
                cnt_images: 200,
                imagesPerSec: 17,
            },
            {
                src: 'http://www.danielspatzek.com/images/monitorhead_sprite_super_tiny.png',
                /*cnt_x:13,
                 cnt_y:20,*/
                cnt_x: 20,
                cnt_y: 10,
                cnt_images: 200,
                imagesPerSec: 17,
            }
        ];

        if (site.useFallbackVersion() || _p.mobile ||  ($.browser.mac && ( $.browser.mozilla ) ) ) {
            _p.slider = new SpritePlayerFallback(_p.$el.find('.homeStage'), data, 260, 335);
//            _p.playWords(0);
        } else {
            _p.slider = new SpritePlayer(_p.$el.find('.homeStage'), data, 260, 335);
        }
        _p.slider.init();


        $(_p.slider).on('sprites-loaded', function (e, index) {
            _p.sprite_player_data_loaded = true;

            if (_p.sprite_player_display_ready)
                _p.slider.showImage(0);
        });

        $(_p.slider).on('glitch-start', function (e, index) {
            _p.playWords(index);
        });

        _p.$el.addClass('state-builded');

    },

    playOutDesturtion: function () {
        var _p = this;
    },

    playCenterAnimation: function () {
        var _p = this;
        _p.spritePlayers[_p.currentSpritePlayerIndex].play();
    },

    playNextWords: function () {
        var _p = this;
        _p.currentWordIndex++;
        if (_p.currentWordIndex >= _p.spritePlayers.length)
            _p.currentWordIndex = 0;


        _p.playWords();
    },
    playNext: function () {
        var _p = this;

        _p.currentSpritePlayerIndex++;
        if (_p.currentSpritePlayerIndex >= _p.spritePlayers.length)
            _p.currentSpritePlayerIndex = 0;

        _p.playCenterAnimation();

    },
//    createPlayWordsTL : function (){
//           var _p = this;
////        var tl = _p.playWordTL;
//        if (index != undefined) {
//            _p.currentWordIndex = index;
//        }
//
//        var word = _p.words[_p.currentWordIndex];
//        console.log(word);
//        _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(0).find('.txtSwitchLineLineInner .textHelper').html(word[0]);
//        var width = _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(0).find('.txtSwitchLineLineInner .textHelper').outerWidth();
//        _p.playWordTL.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(0) .bg'), 0.5, {width: width}, 0);
//
//
//        _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(1).find('.txtSwitchLineLineInner .textHelper').html(word[1]);
//        width = _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(1).find('.txtSwitchLineLineInner .textHelper').outerWidth();
//        _p.playWordTL.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(1) .bg'), 0.5, {width: width}, 0);
//
//        _p.playWordTL.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC .textContainer'), 0.5, {color: 'white'}, 0);
//        _p.playWordTL.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(0) .textContainer'), 2, {scrambleText: {text: word[0], chars: "lowerCase", revealDelay: 0.5, tweenLength: false, ease: Linear.easeNone}}, 0)
//        _p.playWordTL.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(1) .textContainer'), 2, {scrambleText: {text: word[1], chars: "lowerCase", revealDelay: 0.5, tweenLength: false, ease: Linear.easeNone}}, 0)
//
//    },

    playWords: function (index) {
        var _p = this;
        var tl = new TimelineMax();
        if (index != undefined) {
            _p.currentWordIndex = index;
        }

        var word = _p.words[_p.currentWordIndex];
//        console.log(word);
        _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(0).find('.txtSwitchLineLineInner .textHelper').html(word[0]);
        var width = _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(0).find('.txtSwitchLineLineInner .textHelper').outerWidth();
//        tl.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(0) .bg'), 0.5, {width: width}, 0);


        _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(1).find('.txtSwitchLineLineInner .textHelper').html(word[1]);
        width = _p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC').eq(1).find('.txtSwitchLineLineInner .textHelper').outerWidth();
//       tl.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(1) .bg'), 0.5, {width: width}, 0);

        tl.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC .textContainer'), 0.5, {color: 'white'}, 0);
        tl.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(0) .textContainer'), 2, {scrambleText: {text: word[0], chars: "lowerCase", revealDelay: 0.5, tweenLength: false, ease: Linear.easeNone}}, 0)
        tl.to(_p.$el.find('.txtSwitchLine .txtSwitchLineLineInnerC:eq(1) .textContainer'), 2, {scrambleText: {text: word[1], chars: "lowerCase", revealDelay: 0.5, tweenLength: false, ease: Linear.easeNone}}, 0)
//    _p.playWordTL.play();
    },

    logoParalax: function () {
        var _p = this;

        var mouseToCenterDistance = _p.getMouseToCenterDistance();

        if (_p.mouseInfosChanged() && _p.$el.hasClass('state-paralax-enabled')) {

            var x_null_percent = 0;
            var x_hundred_percent = _p.$el.width();


            var y_null_percent = 0;
            var y_hundred_percent = $(window).height();


            var y_null_percent = $(window).height() / 100 * 15;
            var y_hundred_percent = $(window).height() / 100 * 85;

            /********** */

            var viewport_x_distance = x_hundred_percent - x_null_percent;
            var viewport_y_distance = y_hundred_percent - y_null_percent;


            mouse_x_in_viewport = _p.mouseInfos.x - x_null_percent;
            mouse_y_in_viewport = _p.mouseInfos.y - y_null_percent;


            mouse_x_in_viewport_percent = mouse_x_in_viewport / (viewport_x_distance / 100);
            mouse_y_in_viewport_percent = mouse_y_in_viewport / (viewport_y_distance / 100);


            if (mouse_x_in_viewport_percent < 0)
                mouse_x_in_viewport_percent = 0;
            if (mouse_x_in_viewport_percent > 100)
                mouse_x_in_viewport_percent = 100;


            if (mouse_y_in_viewport_percent < 0)
                mouse_y_in_viewport_percent = 0;
            if (mouse_y_in_viewport_percent > 100)
                mouse_y_in_viewport_percent = 100;



            var opacity = 1 / 100 * (100 - (100 - mouse_y_in_viewport_percent));
            var scale = 0.99 + (0.01 / 100 * (100 - mouse_y_in_viewport_percent));

            var transform_x = (5 / 100 * (100 - mouse_x_in_viewport_percent));

            var logo_transform_x = (20 / 100 * (50 - mouse_x_in_viewport_percent));
            var logo_transform_y = (20 / 100 * mouse_y_in_viewport_percent);
            var logo_transform_z = (15 / 100 * mouse_x_in_viewport_percent);


            var right_to_center = mouseToCenterDistance.percentX;

            if (right_to_center < 0)
                right_to_center = 0;

            var logo_rotate_x = (15 / 100 * (50 - mouse_x_in_viewport_percent));
            var logo_rotate_y = (15 / 100 * (50 - mouse_y_in_viewport_percent));


            _p.$el.find('.logoHomeContainerContainerIndex1').css({
                'display': 'block',
                'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
            });

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex2').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 50);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex3').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 100);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex4').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 150);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex5').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 200);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex6').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 250);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex7').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 300);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex8').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 350);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex9').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 400);

            setTimeout(function () {
                _p.$el.find('.logoHomeContainerContainerIndex10').css({
                    'display': 'block',
                    'transform': ' perspective(500px) translate3d(' + logo_transform_x + 'px, ' + logo_transform_y + 'px, ' + logo_transform_z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y) + 'deg) '
                });
            }, 450);


            _p.oldMouseInfos.x = _p.mouseInfos.x;
            _p.oldMouseInfos.y = _p.mouseInfos.y;
        }



    },

    mouseInfosChanged: function () {
        var _p = this;

        return (_p.oldMouseInfos.x != _p.mouseInfos.x || _p.oldMouseInfos.y != _p.mouseInfos.y);
    },

    getMouseToCenterDistance: function () {
        var _p = this;

        var mouseToCenterDistance = {
            x: (_p.$el.width() / 2) - _p.mouseInfos.x,
            y: (_p.$el.height() / 2) - _p.mouseInfos.y
        };

        mouseToCenterDistance.percentX = mouseToCenterDistance.x / ((_p.$el.width() / 2) / 100);
        mouseToCenterDistance.percentY = mouseToCenterDistance.y / ((_p.$el.height() / 2) / 100);

        return mouseToCenterDistance;
    },

    animate: function () {
        var _p = page_home;
//        if (!_p.mobile && !site.useFallbackVersion() && !_p.disableAnimation) {
        if (!_p.mobile && !site.useFallbackVersion() && !_p.disableAnimation  ) {
            
        if ( $.browser.mac  ) {
            if(  $.browser.mozilla ) {
                                      _p.logoParalax();

            }
            if(  $.browser.safari ) {
                _p.renderer.render(_p.stage);
            }

        } else {
              _p.logoParalax();
            _p.renderer.render(_p.stage);
        }
          
        }


        

//            if ($.browser.mac) {
//                console.log('mac');
//                if ($.browser.mozilla) {
//                    console.log('mozilla');
//                }
//            }

        requestAnimFrame(_p.animate);
    }
}



$(document).ready(function () {
    page_home.init($('.pageHome'));
});
               