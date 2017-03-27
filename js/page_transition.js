var page_transition = {
	/*fromLeft: function() {
		var tl = new TimelineLight();
		
		
		return tl;
	},
	fromRight: function() {
		var tl = new TimelineLight();
		
		return tl;
	},
	fromTop: function() {
		var tl = new TimelineLight();
		
		return tl;
	},
	fromBottom: function() {
		var tl = new TimelineLight();
		
		return tl;
	},*/
	
	
	_fromTop: function() {
		var _pt = this;
		
		
		var $page = $('.page[data-page-transtion=fromTop]');
		var $currentPage = $('.page.pageHome');
		
		var $pageTransitionHelper = $('.pageTransitionHelper.fromTop');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		_pt.fromTop = _pt._generateTimeLine('Top',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromBottom: function() {
		
		
		var _pt = this;
		
		_pt.fromBottom = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromBottom]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromBottom');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		_pt.fromBottom = _pt._generateTimeLine('Bottom',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromRight: function() {
		var _pt = this;
		
		_pt.fromRight = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromRight]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromRight');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		
		_pt.fromRight = _pt._generateTimeLine('Right',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_fromLeft: function() {
		var _pt = this;
		//alert("fromLeft");
		
		_pt.fromLeft = new TimelineMax();
		
		var $page = $('.page[data-page-transtion=fromLeft]');
		var $currentPage = $('.page.pageHome');
		var $pageTransitionHelper = $('.pageTransitionHelper.fromLeft');
		var $navItem = $('.navItem[rel='+$page.attr('rel')+']');
		
		
		_pt.fromLeft = _pt._generateTimeLine('Left',$navItem,$pageTransitionHelper,$page,$currentPage);
	},
	
	_generateTimeLine: function(from,$navItem,$pageTransitionHelper,$page,$currentPage) {
		
		var tl = new TimelineMax({paused:true});
		
		
		
		
		/* PAGE TRANSITION */
		tl.addLabel('page-transition-start');
		
		

		var maxWinW = window.screen.availWidth;
		var maxWinH = window.screen.availHeight;
		
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
		
		
		
		
		
		if (from == "Top" || from == "Bottom") {
			max = winW;
			
			spriteMaxOffset = ( (winH*2)+(winH/2)) * (-1);
			spriteMinOffset = (winH*2) * (-1);
		}
		
		/* if (winW > winH) {
			max = winW;
		} else {
			max = winH;
		} */
		
		//alert(window.screen.availWidth);
		
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
					'left':(_w)+'px'
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
				//TweenLite.set($div,{x:_x});
			}
			
			_w += size;
			
		} while (_w < max);
		
		var maxWidth = 0;
		var maxHeight = 0;
		
		$pageTransitionHelper.find('.sprite').each(function() {
			if (maxWidth < $(this).width()) {
				maxWidth = $(this).width();
			}
			
			if (maxHeight < $(this).height()) {
				maxHeight = $(this).height();
			}
		});
		
		
		$pageTransitionHelper.find('.sprite').each(function() {
			
			if (from == "Right" || from == "Left") {
				var _x = maxWidth*-1;
				
				if (from == "Right") {
					_x = winW+maxWidth;
				}
				
				TweenLite.set($(this),{x:_x});
				
			} else if (from == "Top" || from == "Bottom") {
				var _y = maxHeight*-1;
				
				if (from == "Bottom") {
					_y = winH+maxHeight;
				}
				
				TweenLite.set($(this),{y:_y});
				
			}
			
		});
		
		var elements=$pageTransitionHelper.find('.sprite').toArray();
		elements.sort(function(){return 0.5-Math.random()}); // order elements randomly
		
		
		tl.addLabel('page-transition-sprite-start');
		
		tl.add(function() {
			
			if (!$('body').hasClass('state-resizing')) {
				if (!$currentPage.hasClass('state-active')) {
					$currentPage.addClass('state-active');
					
					$currentPage.trigger('page-before-active');
					$page.trigger('page-before-inactive');
					TweenMax.set($page,{display:'none'});
				} else {
					$currentPage.removeClass('state-active');
					//$currentPage.trigger('page-active');
					TweenMax.set($page,{display:'block'});
					$page.trigger('page-inactive');
				}
			}
				
			
			//$page.trigger('page-active');
			
		});
		tl.set($pageTransitionHelper,{overflow:'visible'});
		
		var tl_sprites_in = new TimelineMax();
		var tl_sprites_out = new TimelineMax({paused:true});
		
		tl.addLabel('page-transition-sprite-start');
		tl.add(tl_sprites_in,'page-transition-sprite-start');
		tl.addLabel('page-transition-sprite-out');
		tl.addLabel('page-transition-sprite-end');
		tl.to($pageTransitionHelper,0.1,{display:'block'});
		
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
			var bottom2 = ( ($(this).height()+winH) * -1) + (offset*2);
			
			var left = ($(this).width()-winW)/2*(-1);
			var left2 = (winW*2)+(offset*2);
			
			
			var right = ($(this).width()-winW)/2*(-1)-winW;
			var right2 = ( ($(this).width()+winW) * -1) + (offset*2);
			
			
			switch (from) {
				case "Top":
					tl_sprites_in.to($(this),duration,{y:top,display:'block',ease:Power2.easeOut},0);
					tl_sprites_out.to($(this),duration,{y:top2,display:'block',ease:Power2.easeIn},0);
					break;
				case "Bottom":
					tl_sprites_in.to($(this),duration,{y:bottom,display:'block',ease:Power2.easeOut},0);
					tl_sprites_out.to($(this),duration,{y:bottom2,display:'block',ease:Power2.easeIn},0);
					break;
					
				case "Left":
					tl_sprites_in.to($(this),duration,{x:left,display:'block',ease:Power2.easeOut},0);
					tl_sprites_out.to($(this),duration,{x:left2,display:'block',ease:Power2.easeIn},0);
					break;
					
				case "Right":
					tl_sprites_in.to($(this),duration,{x:right,display:'block',ease:Power2.easeOut},0);
					tl_sprites_out.to($(this),duration,{x:right2,display:'block',ease:Power2.easeIn},0);
					break;
			}
			
		});
		
		

		tl.addLabel('page-transition-page-out','-=1');
		
		tl.addLabel('page-transition-button-fadeout','-=1.6');
		
		
		//alert($('.navItem').not($navItem).length);
		tl.to($('.navItem.navItemNewsBlog').not($navItem),0.3,{opacity:0, y:-100},'page-transition-button-fadeout');
		tl.to($('.navItem.navItemProjects').not($navItem),0.3,{opacity:0, y:100},'page-transition-button-fadeout');
		tl.to($('.navItem.navItemAbout').not($navItem),0.3,{opacity:0, x:-100},'page-transition-button-fadeout');
		tl.to($('.navItem.navItemContact').not($navItem),0.3,{opacity:0, x:100},'page-transition-button-fadeout');
		
		
		tl.set($('.navItem').not($navItem),{display:'none'});
		
		
		tl.addLabel('page-transition-sprite-end');
		
		
		tl.add(tl_sprites_out.play());
		tl.addLabel('page-transition-page-in','-=1.35');
		tl.to($pageTransitionHelper,0.01,{display:'none'});
		/* PAGE ANIMATION */
		switch (from) {
			case 'Top':
				tl.to($page,1,{top:'0%', ease: Power1.easeInOut},'page-transition-page-in');
				tl.to($currentPage,1.5,{top:'100%', ease: Power1.easeInOut},'page-transition-page-out');
				break;
			case 'Bottom':
				tl.to($page,1,{top:"0%", ease: Power1.easeInOut},'page-transition-page-in');
				tl.to($currentPage,1.5,{top:"-100%", ease: Power1.easeInOut},'page-transition-page-out');
				break;
			case 'Left':
				tl.to($page,1,{left:"0%", ease: Power1.easeInOut},'page-transition-page-in');
				tl.to($currentPage,1.5,{left:"100%", ease: Power1.easeInOut},'page-transition-page-out');
				break;
			case 'Right':
				tl.to($page,1,{left:"0%", ease: Power1.easeInOut},'page-transition-page-in');
				tl.to($currentPage,1.5,{left:"-100%", ease: Power1.easeInOut},'page-transition-page-out');
				break;
		}
		
		tl.add(function() {
			if (!$('body').hasClass('state-resizing')) {
				//console.log('$currentPage',$currentPage);
				//alert($currentPage.hasClass('state-hidden'));
				if (!$currentPage.hasClass('state-hidden')) {
					TweenMax.set($currentPage,{display:'none'});
					$currentPage.addClass('state-hidden');
					
				} else {
					TweenMax.set($currentPage,{display:'block'});
					$currentPage.removeClass('state-hidden');
				}
			}
			
			
		},'page-transition-page-out+=1');
		
		
		
		
		// collapse chars
		/*
		var tl_collapschars = new TimelineMax();
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
		
		
		
		tl.add(tl_collapschars); */
		
		
		
		// clear props when the animation reverse is finished
		tl.reverse().eventCallback("onReverseComplete", function() {
			/*TweenLite.set($navItem.find('span.text .char'), {
				clearProps : 'width'
			});*/
			
			//$pageTransitionHelper.find('.sprite').remove();
		});
		
		tl.add(function() {
			
			if (!$('body').hasClass('state-resizing')) {
				if (!$page.hasClass('state-active')) {
					//alert("test");
					$page.addClass('state-active');
					//$page.trigger('page-active');
					$currentPage.trigger('page-inactive');
					TweenMax.set($currentPage,{display:'none'});
				} else {
					$page.removeClass('state-active');
					$currentPage.trigger('page-before-active');
				}
			}
		});
		
		tl.addLabel('page-transition-end');
		
		
		
		
		tl.pause();
		
		return tl;
	}
}