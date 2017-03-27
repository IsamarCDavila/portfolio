var DRIFT_RANGE = 1;
var cOutput;
var ctxSource;
var ctxOutput;
var cSource;
var cMap;
var ctxMap;
var images;
// Create/cache canvases and contexts for source image, 
// displacement map, and output
//var 

var cw;
var ch;
var sourceData, mapData, outputData;


var pageContact = {

    $el: null,
    initTl: null,
    displace: false,
    displaceTransitionBlock: false,
    oldMouseInfos: {x: 0, y: 0},
    mouseInfos: {x: 0, y: 0},
    mobile: false,
    transformicon: null,
    disableAnimation: true,
    mappingInitialised: false,

    init: function ($el) {
        var _p = this;
        _p.$el = $el;

        $('.contactImageContainer').css('width', $('.contactImageContainer').height());

        _p.bindEvents();
        _p.buildInitAnimation();
        requestAnimFrame(_p.animate);


    },

    bindEvents: function () {
        var _p = this;
        _p.$el.on('page-active', function () {


            _p.initTl.play().timeScale(1);


        });





        enquire.register("screen and (max-width: " + site.config.screen_sm + "px)", {
            //one row
            match: function () {
                _p.mobile = true;
                _p.disableAnimation = true;

            },

        });
        enquire.register("screen and (min-width: " + site.config.screen_sm + "px)", {
            //one row
            match: function () {
                _p.mobile = false;
                if (!site.useFallbackVersion()) {

                    _p.disableAnimation = false;
                } else {
                    $('#aniImage').css('opacity', 1);
                    $('#displacementOutput').hide();
                }

            },

        });

//            _p.transformicon = transformicons.add('.contact_closeLogo .tcon').add('.tcon-menu--xcross', {
//                transform: "mouseover",
//                revert: "mouseout"
//            });

        // wenn seite aktiv
//            alert("page contact active");
        $('.contact_dummy').on('click', function (e) {
            e.preventDefault();
            showDummyGif();
        });
        $('.button').on('click', function (e) {
//                setTimeout(function() {
            $(this).trigger('mouseleave');

//                }, 500);
        });


        $('.navItemContact').on('click', function () {
            $('.contact_spatzekLogo').hide();

        });
        $('.contact_spatzekLogo').on('click', function () {
            $('.navItemContact').click();


        });

        _p.$el.on('mousemove', function (e) {
            _p.mouseInfos.x = e.clientX;
            _p.mouseInfos.y = e.clientY;
//                console.log(_p.mouseInfos);
        });

        _p.$el.on('mouseenter', '.button', function (e) {
            if (!_p.mobile) {


                TweenMax.to($(this).find('.hoverText'), 0.3, {y: -54});
                TweenMax.to($(this).find('.buttonText'), 0.3, {y: -54});
                TweenMax.to($(this).find('.hoverBG'), 0.3, {top: 0});

            }
        });
        _p.$el.on('mouseleave', '.button', function (e) {
            if (!_p.mobile) {

                TweenMax.to($(this).find('.hoverText'), 0.3, {y: 0});
                TweenMax.to($(this).find('.buttonText'), 0.3, {y: 0});
                TweenMax.to($(this).find('.hoverBG'), 0.3, {top: '-55px'});
            }
        });

        _p.$el.on('mouseenter', '.addressEmailBg', function (e) {
            TweenMax.to($(this), 0.3, {scaleX: 1.05});
        });
        _p.$el.on('mouseleave', '.addressEmailBg', function (e) {
            TweenMax.to($(this), 0.3, {scaleX: 1});
        });
        _p.$el.on('click', '.addressEmailBg', function (e) {
            TweenMax.to($(this), 0.3, {scaleX: 1});
        });
        _p.$el.on('mouseenter', '.fb', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#c5ff00'});
        });
        _p.$el.on('mouseleave', '.fb', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });
        _p.$el.on('click', '.fb', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });


        _p.$el.on('mouseenter', '.be', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#c5ff00'});
        });
        _p.$el.on('mouseleave', '.be', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });
        _p.$el.on('click', '.be', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });

        _p.$el.on('mouseenter', '.tw', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#c5ff00'});
        });
        _p.$el.on('mouseleave', '.tw', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });
        _p.$el.on('click', '.tw', function (e) {
            TweenMax.to($(this), 0.3, {fill: '#3c3c3e'});
        });

        $(site).on('location-changed', function (params) {
        });


        _p.$el.on('page-inactive', function () {
            _p.initTl.progress(0);
            _p.initTl.pause();
//            console.log('inactice');
        });

        $(site).on('resize', function () {

        });
    },

    buildInitAnimation: function () {
        var _p = this;
        _p.initTl = new TimelineMax({paused: true});

//        _p.initTl.set($('body'),  {className: '+=state-animation-running'}, 'start');

        //BGBox


        _p.initTl.to(_p.$el.find('.bgBoxTop '), 0.3, {width: "100%", ease: Power1.easeInOut}, 'start');
        _p.initTl.to(_p.$el.find('.bgBoxRight '), 0.3, {height: "100%", ease: Power1.easeInOut}, 'start+=0.3');
        _p.initTl.to(_p.$el.find('.bgBoxBottom '), 0.3, {width: "100%", ease: Power1.easeInOut}, 'start+=0.6');
        _p.initTl.to(_p.$el.find('.bgBoxLeft '), 0.3, {height: "100%", ease: Power1.easeInOut}, 'start+=0.9');

        _p.initTl.add('contactstart', 'start+=0.8');



        //ContactButtonBox 

        _p.initTl.to(_p.$el.find('.buttonLineTop'), 0.3, {width: "100%", ease: Power1.easeInOut}, 'contactstart+=0');
        _p.initTl.to(_p.$el.find('.buttonLineRight'), 0.3, {height: "100%", ease: Power1.easeInOut}, 'contactstart+=0.3');
        _p.initTl.to(_p.$el.find('.buttonLineBottom'), 0.3, {width: "100%", ease: Power1.easeInOut}, 'contactstart+=0.6');
        _p.initTl.to(_p.$el.find('.buttonLineLeft'), 0.3, {height: "100%", ease: Power1.easeInOut}, 'contactstart+=0.9');
        _p.initTl.to(_p.$el.find('.buttonText'), 0.3, {opacity: "1", y: '0', ease: Power1.easeOut}, 'contactstart+=0.9');



        _p.initTl.add('start');

        _p.initTl.add(function () {
            if (!_p.mappingInitialised) {
                var width = $('#aniImage').height();
                var height = $('#aniImage').height();

                cOutput = document.getElementById('displacementOutput');
                ctxOutput = cOutput.getContext('2d');
                cSource = document.createElement('canvas');
                ctxSource = cSource.getContext('2d');
                cMap = document.createElement('canvas');
                ctxMap = cMap.getContext('2d');
                images = document.querySelectorAll('#displacementInput img');



// Ensure all canvases are the same size
                cw = cSource.width = cMap.width = cOutput.height;
                ch = cSource.height = cMap.height = cOutput.height;


                outputData = ctxOutput.createImageData(cw, ch);
//                    outputData = ctxOutput.createImageData(cw, ch);

                _p.initMapping();
                $('#displacementOutput').css('visibility', 'visible');
                _p.mappingInitialised = true;
            }
        }, 'start+=0');

        _p.initTl.add(function () {

            $('#displacementOutput').css('visibility', 'visible');
        }, 'imagestart+=0.7');


        _p.initTl.add('imagestart', 'contactstart+=0.96');
        _p.initTl.set(_p.$el.find('.contactImageBg'), {right: "0", left: 'initial', width: 0}, 'imagestart+=0');
        _p.initTl.to(_p.$el.find('.contactImageBg'), 0.7, {width: "100%", height: "100%", ease: Power3.easeInOut}, 'imagestart+=0.01');
        _p.initTl.set(_p.$el.find('.contactImage'), {opacity: 1, ease: Power3.easeInOut, onComplete: function () {
                _p.displaceTransitionBlock = true;
            }
        }, 'imagestart+=0.71');

        _p.initTl.set(_p.$el.find('.contactImageBg'), {right: "initial", left: 0, ease: Power3.easeInOut}, 'imagestart+=0.71');
        _p.initTl.to(_p.$el.find('.contactImageBg'), 0.7, {width: "0%", ease: Power3.easeInOut}, 'imagestart+=0.71');

        _p.initTl.add('addressstart', 'contactstart+=0.25');

        //AddressAnimation
        //desktopRows
        _p.initTl.to(_p.$el.find('.addressLine1'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0');
        _p.initTl.to(_p.$el.find('.addressLine2'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0.2');
        _p.initTl.to(_p.$el.find('.addressLine3'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0.4');
        //mobile Rows
        _p.initTl.to(_p.$el.find('.addressLine4'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0.2');
        _p.initTl.to(_p.$el.find('.addressLine5'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0.4');
        _p.initTl.to(_p.$el.find('.addressLine6'), 0.4, {opacity: "1", y: "0", ease: Power2.easeOut}, 'addressstart+=0.6');
        _p.initTl.to(_p.$el.find('.addressEmailBg'), 0.4, {width: '100%', ease: Power2.easeInOut}, 'addressstart+=1');

        _p.initTl.to(_p.$el.find('.contactDiagonalWhite '), 0.7, {height: "100%", ease: Power3.easeInOut}, 'addressstart+=0.6');

        _p.initTl.add('finalstart', 'addressstart+=1.2');
        _p.initTl.to(_p.$el.find('.fb'), 0.3, {y: 0, opacity: 1, ease: Power2.easeOut}, 'finalstart+=0');
        _p.initTl.to(_p.$el.find('.tw'), 0.3, {y: 0, opacity: 1, ease: Power2.easeOut}, 'finalstart+=.1');
        _p.initTl.to(_p.$el.find('.be'), 0.3, {y: 0, opacity: 1, ease: Power2.easeOut}, 'finalstart+=.2');

        _p.initTl.to(_p.$el.find('.socialSeperator'), 0.4, {opacity: 1, ease: Power3.easeOut}, 'finalstart+=0.2');





        _p.$el.find('.text').each(function () {
            var mySplitText = new SplitText($(this), {type: "chars, lines", charsClass: "char char++"});
            var shuffleCharArray = shuffleArray(mySplitText.chars);

            _p.initTl.staggerFrom(shuffleCharArray, 0.3, {
                autoAlpha: 0,
                rotationY: -90,
                transformOrigin: "0% 50%"
            }, 0.05, 'start-=0');
        });


//        _p.initTl.set($('body'),  {className: '-=state-animation-running'});

        //DummyContactAnimation

    },
    diagonalParalax: function () {
        var _p = this;

        var mouseToCenterDistance = _p.getMouseToCenterDistance();

//        if (_p.mouseInfosChanged() && _p.$el.hasClass('state-paralax-enabled')) {
        if (_p.mouseInfosChanged()) {


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


            /* var opacity = 1 / 100 * (100-mouse_x_in_viewport_percent);
             var scale = 0.99 + (0.01 / 100 * (mouse_x_in_viewport_percent)); */

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

            //logo_transform_z = 0;
            //logo_transform_y = 0;
            //logo_transform_x = 0;

            var multiplierDiagonal_X = 3;
            var multiplierDiagonal_Y = 3;
            var multiplierDiagonal_Z = 3;
            var multiplierDiagonal_rotX = 1;
            var multiplierDiagonal_rotY = 1;

            var multiplierImg_X = 0.8;
            var multiplierImg_Y = 0.8;
            var multiplierImg_Z = 0.8;
//            var multiplierImg_rotX = 0.3;
//            var multiplierImg_rotY = 0.3;
            var multiplierImg_rotX = 0.24;
            var multiplierImg_rotY = 0.24;
//            var multiplierImg_rotZ = 1.6;


            var multiplierBgBox_X = 0.6;
            var multiplierBgBox_Y = 0.6;
            var multiplierBgBox_Z = 0.6;
            var multiplierBgBox_rotX = 0.24;
            var multiplierBgBox_rotY = 0.24;
//            var multiplierBgBox_rotZ = 1.6;


//            var multiplierBgBox_rotX = 0.3;
//            var multiplierBgBox_rotY = 0.3;

//                  var multiplierBgBox_X = 1;
//            var multiplierBgBox_Y = 1;
//            var multiplierBgBox_Z = 0.6;
//            var multiplierBgBox_rotX = 0.2;
//            var multiplierBgBox_rotY = 0.2;



//            _p.$el.find('.contactDiagonal').css({
//                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierDiagonal_X + 'px, ' + logo_transform_y * multiplierDiagonal_Y + 'px, ' + logo_transform_z * multiplierDiagonal_Z + 'px) rotate(15deg) '
//            });

//            _p.$el.find('.contactImageContainer').css({
//                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierImg_X + 'px, ' + logo_transform_y * multiplierImg_Y + 'px, ' + logo_transform_z * multiplierImg_Z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * multiplierImg_rotX * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y * multiplierImg_rotY) + 'deg) '
//            });
//            ,rotationY: logo_rotate_z * multiplierImg_rotZ 
//            console.log(logo_rotate_x * multiplierImg_rotX * (-1));
//            console.log(logo_transform_z * multiplierImg_Z); 
            TweenMax.to($('.contactImageContainer'), .1, {perspective: '500px', x: logo_transform_x * multiplierImg_X, y: logo_transform_y * multiplierImg_Y, z: logo_transform_z * multiplierImg_Z, rotationY: logo_rotate_x * multiplierImg_rotX * (-1), rotationX: logo_rotate_y * multiplierImg_rotY});

//            _p.$el.find('.contactBgBoxContainer').css({
//                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierBgBox_X + 'px, ' + logo_transform_y * multiplierBgBox_Y + 'px, ' + logo_transform_z * multiplierBgBox_Z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * multiplierBgBox_rotX * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y * multiplierBgBox_rotY) + 'deg) '
//            });
            TweenMax.to($('.contactBgBoxContainer'), .2, {perspective: '500px', x: logo_transform_x * multiplierBgBox_X, y: logo_transform_y * multiplierBgBox_Y, z: logo_transform_z * multiplierBgBox_Z, rotationY: logo_rotate_x * multiplierBgBox_rotX * (-1), rotationX: logo_rotate_y * multiplierBgBox_rotY});

            _p.oldMouseInfos.x = _p.mouseInfos.x;
            _p.oldMouseInfos.y = _p.mouseInfos.y;
        }



    },

    diagonalParalaxFallback: function () {
        var _p = this;
//        console.log('fallback');
//        console.log('fallbackparalax');
        var mouseToCenterDistance = _p.getMouseToCenterDistance();

//        if (_p.mouseInfosChanged() && _p.$el.hasClass('state-paralax-enabled')) {
        if (_p.mouseInfosChanged()) {


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


            /* var opacity = 1 / 100 * (100-mouse_x_in_viewport_percent);
             var scale = 0.99 + (0.01 / 100 * (mouse_x_in_viewport_percent)); */

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

            //logo_transform_z = 0;
            //logo_transform_y = 0;
            //logo_transform_x = 0;

     var multiplierImg_X = 1;
            var multiplierImg_Y = 1;
            var multiplierImg_Z = 0.7;
            var multiplierImg_rotX = 0.3;
            var multiplierImg_rotY = 0.3;


            var multiplierBgBox_X = 1;
            var multiplierBgBox_Y = 1;
            var multiplierBgBox_Z = 0.7;
            var multiplierBgBox_rotX = 0.3;
            var multiplierBgBox_rotY = 0.3;


//            _p.$el.find('.contactDiagonal').css({
//                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierDiagonal_X + 'px, ' + logo_transform_y * multiplierDiagonal_Y + 'px, ' + logo_transform_z * multiplierDiagonal_Z + 'px) rotate(15deg) '
//            });

            _p.$el.find('.contactImageContainer').css({
                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierImg_X + 'px, ' + logo_transform_y * multiplierImg_Y + 'px, ' + logo_transform_z * multiplierImg_Z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * multiplierImg_rotX * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y * multiplierImg_rotY) + 'deg) '
            });
//            ,rotationY: logo_rotate_z * multiplierImg_rotZ 
//            console.log(logo_rotate_x * multiplierImg_rotX * (-1));
//            console.log(logo_transform_z * multiplierImg_Z); 
//            TweenMax.to($('.contactImageContainer'), .1, {perspective: '500px', x: logo_transform_x * multiplierImg_X, y: logo_transform_y * multiplierImg_Y, z: logo_transform_z * multiplierImg_Z, rotationY: logo_rotate_x * multiplierImg_rotX * (-1), rotationX: logo_rotate_y * multiplierImg_rotY});

            _p.$el.find('.contactBgBoxContainer').css({
                'transform': ' perspective(500px) translate3d(' + logo_transform_x * multiplierBgBox_X + 'px, ' + logo_transform_y * multiplierBgBox_Y + 'px, ' + logo_transform_z * multiplierBgBox_Z + 'px) rotate3d(0,1,0,' + (logo_rotate_x * multiplierBgBox_rotX * (-1)) + 'deg) rotate3d(1,0,0,' + (logo_rotate_y * multiplierBgBox_rotY) + 'deg) '
            });
//            TweenMax.to($('.contactBgBoxContainer'), .2, {perspective: '500px', x: logo_transform_x * multiplierBgBox_X, y: logo_transform_y * multiplierBgBox_Y, z: logo_transform_z * multiplierBgBox_Z, rotationY: logo_rotate_x * multiplierBgBox_rotX * (-1), rotationX: logo_rotate_y * multiplierBgBox_rotY});

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
        var _p = pageContact;
//        console.log($.browser);
        if (!_p.disableAnimation) {

            if (($.browser.mac && $.browser.safari ) || site.useFallbackVersion()) {
//console.log('safari mac');
//                _p.diagonalParalaxFallback()
            } else {
                _p.diagonalParalax();
            }

//        _p.renderer.render(_p.stage);
//            console.log(_p.displaceTransitionBlock);
            if (_p.displace && _p.displaceTransitionBlock) {
//        console.log('displace');
                _p.update();
                _p.render();


            }
        }
        requestAnimFrame(_p.animate);
    },
    update: function () {
        var _p = this;
        // Calculate the xy drift based on the current time.
        // y drift is half-speed
        // TODO: make interactive (mouse, gyro, etc)
//    var t = 0.002 * Date.now(),
//        dx = Math.sin(t) * DRIFT_RANGE,
//        dy = Math.cos(t * 0.5) * DRIFT_RANGE;

//        console.log(_p.getMouseToCenterDistance());
        var t = 0.002 * Date.now(),
                dx = _p.getMouseToCenterDistance().x * DRIFT_RANGE * 0.05,
                dy = _p.getMouseToCenterDistance().y * DRIFT_RANGE * 0.05;

//                console.log(dx);

        // Iterate the xy grid
        // TODO: optimize this!
        for (var y = 0; y < ch; y++) {
            for (var x = 0; x < cw; x++) {

                // Get the greyscale value from the displacement map as a value between 0 and 1
                // 0 = black (farthest), 1 = white (nearest)
                // Higher values will be more displaced
                var pix = y * cw + x,
                        arrayPos = pix * 4,
                        depth = mapData[arrayPos] / 255;

                // Use the greyscale value as a percentage of our current drift,
                // and calculate an xy pixel offset based on that
                var ofs_x = Math.round(x + (dx * depth)),
                        ofs_y = Math.round(y + (dy * depth));

                // Clamp the offset to the canvas dimensions
                if (ofs_x < 0)
                    ofs_x = 0;
                if (ofs_x > cw - 1)
                    ofs_x = cw - 1;
                if (ofs_y < 0)
                    ofs_y = 0;
                if (ofs_y > ch - 1)
                    ofs_y = ch - 1;

                // Get the colour from the source image at the offset xy position,
                // and transfer it to our output at the original xy position
                var targetPix = ofs_y * cw + ofs_x,
                        targetPos = targetPix * 4;
                outputData.data[arrayPos] = sourceData[targetPos];
                outputData.data[arrayPos + 1] = sourceData[targetPos + 1];
                outputData.data[arrayPos + 2] = sourceData[targetPos + 2];
                outputData.data[arrayPos + 3] = sourceData[targetPos + 3];
            }
        }
    },
    render: function () {
        ctxOutput.putImageData(outputData, 0, 0);
    },

    initMapping: function () {
        var _p = this;
        // Write our source image and displacement map to in-memory
        // canvases and cache the data (it never gets directly manipulated)
//        console.log('initmapping');
        var sourceImg = images[0],
                mapImg = images[1];

//        console.log(images);

        ctxSource.drawImage(sourceImg, 0, 0);
        sourceData = ctxSource.getImageData(0, 0, cw, ch).data;

        ctxMap.drawImage(mapImg, 0, 0);
        mapData = ctxMap.getImageData(0, 0, cw, ch).data;

//        console.log('Source and map data cached');

        // Kick off the update-render loop
//        loop();
        _p.displace = true;
    },

}



function loop() {
    var _p = pageContact;
    requestAnimationFrame(loop);
    _p.update();
    _p.render();
//        console.log();
}


function showDummyGif() {
    var gifContainer = $('.dummyGifContainer');
    var gif = $('.gifImage');

//    gif.css('background-image', "url( '../images/gif/giphy_1.gif');");

    switch (gif.data('imgcnt')) {

        case 0:
            gif.css('background-image', "url( 'images/gif/giphy_3.gif')");
            gif.data('imgcnt', 1);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 1700);
            break;

        case 1:
            gif.css('background-image', "url( 'images/gif/giphy_5.gif')");
            gif.data('imgcnt', 2);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 4000);
            break;
        case 2:
            gif.css('background-image', "url( 'images/gif/giphy_4.gif')");
            gif.data('imgcnt', 3);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 2500);
            break;
        case 3:
            gif.css('background-image', "url( 'images/gif/giphy_1.gif')");
            gif.data('imgcnt', 4);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 3900);
            break;
//        case 1:
//            gif.css('background-image', "url( 'images/gif/giphy_2.gif')");
//            gif.data('imgcnt', 2);
//            gifContainer.show();
//
//            setTimeout(function () {
//                gifContainer.hide();
//            }, 8700);
//            break;





        case 4:
            gif.css('background-image', "url( 'images/gif/giphy_6.gif')");
            gif.data('imgcnt', 5);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 1500);
            break;

        case 5:
            gif.css('background-image', "url( 'images/gif/giphy_3.gif')");
            gif.data('imgcnt', 1);
            gifContainer.show();

            setTimeout(function () {
                gifContainer.hide();
            }, 1700);
            break;

    }
    ;



}

$(document).ready(function () {
    pageContact.init($('.pageContact'));
});







!function (n, r) {
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r() : n.transformicons = r()
}(this || window, function () {
    "use strict";
    var n = {}, r = "tcon-transform", t = {transform: ["click"], revert: ["click"]}, e = function (n) {
        return"string" == typeof n ? Array.prototype.slice.call(document.querySelectorAll(n)) : "undefined" == typeof n || n instanceof Array ? n : [n]
    }, o = function (n) {
        return"string" == typeof n ? n.toLowerCase().split(" ") : n
    }, f = function (n, r, f) {
        var c = (f ? "remove" : "add") + "EventListener", u = e(n), s = u.length, a = {};
        for (var l in t)
            a[l] = r && r[l] ? o(r[l]) : t[l];
        for (; s--; )
            for (var d in a)
                for (var v = a[d].length; v--; )
                    u[s][c](a[d][v], i)
    }, i = function (r) {
        n.toggle(r.currentTarget)
    };
    return n.add = function (r, t) {
        return f(r, t), n
    }, n.remove = function (r, t) {
        return f(r, t, !0), n
    }, n.transform = function (t) {
        return e(t).forEach(function (n) {
            n.classList.add(r)
        }), n
    }, n.revert = function (t) {
        return e(t).forEach(function (n) {
            n.classList.remove(r)
        }), n
    }, n.toggle = function (t) {
        return e(t).forEach(function (t) {
            n[t.classList.contains(r) ? "revert" : "transform"](t)
        }), n
    }, n
});

//
//window.requestAnimFrame = (function () {
//    return  window.requestAnimationFrame ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame ||
//            function (callback) {
//                window.setTimeout(callback, 1000 / 60);
//            };
//})();