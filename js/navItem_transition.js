var navItem_transition = {
	/*fromTop:new TimelineMax(),
	fromBottom:new TimelineMax(),
	fromLeft:new TimelineMax(),
	fromRight:new TimelineMax(),*/
	ease:Power2.easeInOut,
	duration:0.3,
	staggerInt:0.08,
		
	init: function() {
		var _nt = this;
		
		/*_nt._fromTop();
		_nt._fromBottom();
		_nt._fromLeft();
		_nt._fromRight();*/
	},
	
	_fromTop: function() {
		var _nt = this;
		
		
		var $page = $('.page[data-page-transtion=fromTop]');
		var $currentPage = $('.page.pageHome');
		
		var $pageTransitionHelper = $('.pageTransitionHelper.fromTop');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		_nt.fromTop = _nt._generateTimeLine('Top',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromBottom: function() {
		
		
		var _nt = this;
		
		_nt.fromBottom = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromBottom]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromBottom');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		_nt.fromBottom = _nt._generateTimeLine('Bottom',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromRight: function() {
		var _nt = this;
		
		_nt.fromRight = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromRight]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromRight');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		
		_nt.fromRight = _nt._generateTimeLine('Right',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromLeft: function() {
		var _nt = this;
		//alert("fromLeft");
		
		_nt.fromLeft = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromLeft]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromLeft');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		_nt.fromLeft = _nt._generateTimeLine('Left',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	
	
	_generateTimeLine: function(from,$navItem,$pageTransitionHelper,$page,$currentPage) {
		var tl = new TimelineMax({paused:true});
		
		tl.addLabel('hover-start');
		tl.set($navItem.find('span.text .char'),{clearProps:'width'});

		/* ADD STAGERED ANIMATION FOR HOVER */
		
		var stagger = [];
		for (var i = 0; i < Math.ceil($navItem.find('span.text .char').length/2); i++ ) {
			var items = [];
			
			items.push($navItem.find('span.text .char').eq(i));
			
			$navItem.find('span.text .char').eq(i).data('original-width',$navItem.find('span.text .char').eq(i).width());
			items.push($navItem.find('span.text .char').eq( ( $navItem.find('span.text .char').length-1 )-i));
			
			stagger.push(items);
		}
		
		tl.staggerTo(
				stagger,
				navItem_transition.duration,
				{
					width:(100/($navItem.find('span.text .char').length+1))+'%',
					letterSpacing:0,
					ease:navItem_transition.ease
				} ,
				navItem_transition.staggerInt
		);
		
		tl.addLabel('hover-end');
		
		
		
		
		
		
		// char animation throw the screen
		tl.addLabel('page-transition-chars-start');
		
		var delays = [];
		var value = $(window).height()-$navItem.height();
		
		if (from == "Left" || from == "Right") {
			value = $(window).width()-$navItem.width();
		}
		
		var elements=$navItem.find('span.text .char').toArray();
		elements.sort(function(){return 0.5-Math.random()}); // order elements randomly
		
		//tl.staggerTo(elements,0.5,{y:value},0.1,'-=1.5');
		
		var max_duration = 0.8;
		var min_duration = 0.4;
		var max_delay = 0.2;
		var min_delay = 0;
		
		var tl_chars = new TimelineMax({paused:true});
		
		/*switch (from) {
		
			case "Top":
				tl_chars.to($navItem,0.6,{yPercent: -100 ,ease:Power2.easeInOut },0);
				break;
				
			case "Bottom":
				tl_chars.to($navItem,0.6,{yPercent: 100 ,ease:Power2.easeInOut },0);
				break;
		
			case "Right":
				tl_chars.to($navItem,0.6,{xPercent: 100 ,ease:Power2.easeInOut },0);
				break;
				
			case "Left":
				tl_chars.to($navItem,0.6,{xPercent: -100 ,ease:Power2.easeInOut },0);
				break;
				
		} */
		
		
		
		//tl.set($navItem,{width:"100%"});
		$navItem.find('span.text .char .char-inner').each(function() {
			var duration = Math.random()*(max_duration-min_duration+1)+min_duration;
			var delay = Math.random()*(max_delay-min_delay+1)+min_delay;

			var winH = $(window).height();
			var winW = $(window).width();

			winH -= $navItem.height();
			winW -= $navItem.width();

			switch (from) {
				case "Top":
					tl_chars.to($(this),duration,{transform: "translate3d(0, "+(winH+'px')+", 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Bottom":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -"+(winH+'px')+", 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Left":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -"+(winW+'px')+", 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Right":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -"+(winW+'px')+", 0)" ,ease:Power2.easeInOut },0);
					break;
			}
			/*			
			switch (from) {
				case "Top":
					tl_chars.to($(this),duration,{transform: "translate3d(0, 100vh, 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Bottom":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -100vh, 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Left":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -100vw, 0)" ,ease:Power2.easeInOut },0);
					break;
				case "Right":
					tl_chars.to($(this),duration,{transform: "translate3d(0, -100vw, 0)" ,ease:Power2.easeInOut },0);
					break;
			} */
			
		});
		tl.add(tl_chars.play(),'page-transition-chars-start');
		
		
		tl.addLabel('page-transition-chars-end');
		
		tl.addLabel('page-transition-collapse-start');
		switch (from) {
			case "Top":
				tl.set($navItem,{bottom:"0", top:"auto",transform:'none'});
				tl.set($navItem.find('span.text .char .char-inner'),{transform:'none'});
				break;
			case "Bottom":
				tl.set($navItem,{top:"0", bottom:"auto",transform:'none'});
				tl.set($navItem.find('span.text .char .char-inner'),{transform:'none'});
				break;
			case "Left":
				tl.set($navItem,{right:"0", left:"auto",transform:'none'});
				tl.set($navItem.find('span.text .char .char-inner'),{transform:'none'});
				break;
			case "Right":
				tl.set($navItem,{left:"0", right:"auto",transform:'none'});
				tl.set($navItem.find('span.text .char .char-inner'),{transform:'none'});
				break;
		}
		
		
		tl.addLabel('hover-active-end');
		
		var charWidth = 30;
		
		if ($(window).width() < 990)
			charWidth = 26;
		else if ($(window).width() < 760)
			charWidth = 22;
			
		
		tl.staggerTo(
				stagger,
				navItem_transition.duration,
				{
					width:charWidth,
					letterSpacing:0,
					ease:navItem_transition.ease
				} ,
				navItem_transition.staggerInt
		); 
		
		
		tl.set($navItem.find('span.text .char'),{clearProps:'all'});
		tl.addLabel('hover-active-start');
		tl.addLabel('page-transition-collapse-end');
		
		return tl;
		
		
		
		
		
		
		
		
		
		// collaps timeline for close
		var tl_collapschars = new TimelineMax({paused:true});
		var stagger = [];
		for (var i = Math.ceil($navItem.find('span.text .char').length/2)-1; i >= 0 ; i-- ) {
			var items = [];
			
			items.push($navItem.find('span.text .char').eq(i));
			
			$navItem.find('span.text .char').eq(i).data('original-width',$navItem.find('span.text .char').eq(i).width());
			items.push($navItem.find('span.text .char').eq( ( $navItem.find('span.text .char').length-1 )-i));
			
			stagger.push(items);
		}
		
		tl_collapschars.staggerTo(
				stagger,
				navItem_transition.duration,
				{
					width:$navItem.find('span.text .char').eq(i).width(),
					letterSpacing:0,
					ease:navItem_transition.ease
				} ,
				navItem_transition.staggerInt
		); 
		
		
		// ad it to master timeline
		
		
		
		//return tl;

		
		
		
		
		
		
		/* PAGE TRANSITION */
		tl.addLabel('page-transition-start');
		
		

		var winW = $(window).width();
		var winH = $(window).height();
		$pageTransitionHelper.children().remove();
		
		
		
		/*  balkenanimation */
		var _w = 0;
		var cnt_sprites = 10;
		var spriteMax = 120;
		var spriteMin = 20;
		
		
		
		var spriteMaxOffset = ( (winW*2)+(winW/3)) * (-1);
		var spriteMinOffset = (winW*2) * (-1);
		
		var max = winH;
		alert(window.screen.availWidth);
		
		if (from == "Top" || from == "Bottom") {
			max = winW;
			
			spriteMaxOffset = ( (winH*2)+(winH/2)) * (-1);
			spriteMinOffset = (winH*2) * (-1);
		}
		
		var sizes = [110,110,100,80,70,60,50,30,20,20];
		//var sizes = [8,8,7,6,5,4,3,2,1,1];
		
		
		// generate random green divs
		do {
			//var size = Math.floor(Math.random()*(spriteMax-spriteMin+1)+spriteMin);
			
			var rand = Math.floor(Math.random()*10);
			var size = sizes[rand];
			
			if (size > (max - _w))
				size = max - _w;
			
			
			$div = $('<div class="sprite" />');
			$pageTransitionHelper.append($div);
			
			var offset = Math.floor(Math.random()*(spriteMaxOffset-spriteMinOffset+1)+spriteMinOffset);
			
			var myOffset = spriteMinOffset-offset;
			
			$div.data('offset',myOffset);
			
			if (from == "Top" || from == "Bottom") {
				$div.css({
					'width':(size+1)+"px",
					'height':(winH+(myOffset*2))+"px",
					'left':_w+'px'
				});
				
				var _y = spriteMaxOffset;
				
				if (from == "Bottom") {
					_y *= -1;
				}
				
				TweenLite.set($div,{y:_y});
			} else {
				$div.css({
					'height':(size+1)+"px",
					'width':(winW+(myOffset*2))+"px",
					'top':_w+'px'
				});
				
				var _x = spriteMaxOffset;
				
				if (from == "Right") {
					//offset *= -1;
					
					_x *= -1;
				}
				
				
				// set a random offset
				TweenLite.set($div,{x:_x});
			}
			
			_w += size;
			
		} while (_w < max);
		
		
		var elements=$pageTransitionHelper.find('.sprite').toArray();
		elements.sort(function(){return 0.5-Math.random()}); // order elements randomly
		
		
		tl.addLabel('page-transition-sprite-start');
		
		tl.call(function() {
			
			//alert($page.hasClass('state-active'));
			
			if (!$currentPage.hasClass('state-active')) {
				$currentPage.addClass('state-active');
				
				$currentPage.trigger('page-before-active');
				$page.trigger('page-before-inactive');
			} else {
				$currentPage.removeClass('state-active');
				$currentPage.trigger('page-active');
				
				$page.trigger('page-inactive');
			}
				
			
			$page.trigger('page-active');
			
		});
		tl.set($pageTransitionHelper,{overflow:'visible'});
		
		var tl_sprites_in = new TimelineMax();
		var tl_sprites_out = new TimelineMax({paused:true});
		
		tl.addLabel('page-transition-sprite-start');
		tl.add(tl_sprites_in,'page-transition-sprite-start');
		tl.addLabel('page-transition-sprite-out');
		tl.addLabel('page-transition-sprite-end');
		
		$pageTransitionHelper.find('.sprite').each(function() {
			
			var maxOffset = 150;
			var minOffset = 100;
			
			//var offset = Math.floor(Math.random()*(minOffset-maxOffset+1)+minOffset);
			
			var offset = parseInt($(this).data('offset'));
			offset *= -1;
			
			var duration = Math.random()*(1-0.75)+1;
			
			
			var top = ($(this).height()-winH)/2*(-1);
			var top2 = (winH*2)+(offset*2);
			
			var bottom = ($(this).height()-winH)/2*(-1)-winH;
			var bottom2 = ((winH*3)) * (-1) + (offset*2);
			
			var left = ($(this).width()-winW)/2*(-1);
			var left2 = (winW*2)+(offset*2);
			
			
			var right = ($(this).width()-winW)/2*(-1)-winW;
			var right2 = ((winW*2)+(offset*2)) * (-1);
			
			switch (from) {
				case "Top":
					tl_sprites_in.to($(this),duration,{y:top,ease:Power2.easeInOut},0);
					tl_sprites_out.to($(this),duration,{y:top2,ease:Power2.easeInOut},0);
					break;
				case "Bottom":
					tl_sprites_in.to($(this),duration,{y:bottom,ease:Power2.easeInOut},0);
					tl_sprites_out.to($(this),duration,{y:bottom2,ease:Power2.easeInOut},0);
					break;
					
				case "Left":
					tl_sprites_in.to($(this),duration,{x:left,ease:Power2.easeInOut},0);
					tl_sprites_out.to($(this),duration,{x:left2,ease:Power2.easeInOut},0);
					break;
					
				case "Right":
					tl_sprites_in.to($(this),duration,{x:right,ease:Power2.easeInOut},0);
					tl_sprites_out.to($(this),duration,{x:right2,ease:Power2.easeInOut},0);
					break;
			}
			
			
		});
		
		
		
		
		// char animation throw the screen
		
		var delays = [];
		var value = $(window).height()-$navItem.height();
		
		if (from == "Left" || from == "Right") {
			value = $(window).width()-$navItem.width();
		}
		
		var elements=$navItem.find('span.text .char').toArray();
		elements.sort(function(){return 0.5-Math.random()}); // order elements randomly
		
		//tl.staggerTo(elements,0.5,{y:value},0.1,'-=1.5');
		
		var max_duration = 3;
		var min_duration = 0.5;
		var max_delay = 0.5;
		
		tl.addLabel('page-transition-chars-start');
		
		$navItem.find('span.text .char').each(function() {
			var duration = Math.random()*(max_duration-min_duration+1)+min_duration;
//			console.log('duration',duration);
			var delay = Math.random()/2;
			
			switch (from) {
				case "Top":
					tl.to($(this),duration,{y:value},'page-transition-chars-start');
					break;
				case "Bottom":
					tl.to($(this),duration,{y:(value*-1)},'page-transition-chars-start');
					break;
				case "Left":
					tl.to($(this),duration,{y:(value*-1)},'page-transition-chars-start');
					break;
				case "Right":
					tl.to($(this),duration,{y:(value)},'page-transition-chars-start');
					break;
			}
			
		});
		
		
		tl.addLabel('page-transition-button-fadeout','-=1.6');
		
		
		//alert($('.navItem').not($navItem).length);
		tl.to($('.navItem').not($navItem),0.3,{opacity:0},'page-transition-button-fadeout');
		
		tl.set($('.navItem').not($navItem),{display:'none'});
		
		tl.addLabel('page-transition-chars-end');
		
		tl.addLabel('page-transition-pages-start','-=1.6');
		/* PAGE ANIMATION */
		
		
		switch (from) {
			case 'Top':
				tl.to($page,1,{y:0, ease: Power1.easeInOut},'page-transition-pages-start');
				tl.to($currentPage,1,{y:'100%', ease: Power1.easeInOut},'page-transition-pages-start');
				break;
			case 'Bottom':
				tl.to($page,1,{y:0, ease: Power1.easeInOut},'page-transition-pages-start');
				tl.to($currentPage,1,{y:'-100%', ease: Power1.easeInOut},'page-transition-pages-start');
				break;
			case 'Left':
				tl.to($page,1,{x:0, ease: Power1.easeInOut},'page-transition-pages-start');
				tl.to($currentPage,1,{x:'100%', ease: Power1.easeInOut},'page-transition-pages-start');
				break;
			case 'Right':
				tl.to($page,1,{x:0, ease: Power1.easeInOut},'page-transition-pages-start');
				tl.to($currentPage,1,{x:'-100%', ease: Power1.easeInOut},'page-transition-pages-start');
				break;
		}
		

		tl.add(tl_collapschars.play());
		
		tl.add(tl_sprites_out.play);
		
		// clear props when the animation reverse is finished
		tl.reverse().eventCallback("onReverseComplete", function() {
			TweenLite.set($navItem.find('span.text .char'), {
				//clearProps : 'width'
			});
			
			$pageTransitionHelper.find('.sprite').remove();
		});
		
		tl.call(function() {
			
			if (!$page.hasClass('state-ative')) {
				$page.addClass('state-active');
				$page.trigger('page-active');
				$currentPage.trigger('page-inactive');
			} else {
				$page.removeClass('state-active');
				$currentPage.trigger('page-before-active');
			}
			
		});
		tl.addLabel('page-transition-end');
		
		
		
		// ad it to master timeline
		tl.addLabel('hover-start-active');
		tl.add(tl_expandchars2.play());
		tl.addLabel('hover-end-active');
		
		tl.pause();
		
		return tl;
	}
}

$(document).ready(function() {
	navItem_transition.init();
});
		
		