function btn($el) {
	
	this.$el = $el;
	
	$el.data('btn',this);
	
	//this.$btn_inner = $('<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="100%" width="100%" /><div class="textContainer"><div class="text"></div><div class="text2"></div></div><div class="hoverBg"></div></svg>');
	
	this.tl = new TimelineLite();
	this.tl_hover = new TimelineLite();
	
	this.init = function() {
		var _btn = this;
		
		
		var btn_text = _btn.$el.html();
		
		_btn.$el.html('');
		_btn.$el.append($('<div />').addClass('text').append('<span />'));
		//_btn.$el.append($('<div />').addClass('text2').append('<span />'));
		
		_btn.$el.find('.text span').html(btn_text);
		
		_btn.$el.append(
			$('<div />')
			.addClass('line-container')
			.append('<div class="line"></div>')
			.append('<div class="line"></div>')
			.append('<div class="line"></div>')
			.append('<div class="line"></div>')
			.append('<div class="line2"></div>')
			.append('<div class="line2"></div>')
			.append('<div class="line2"></div>')
			.append('<div class="line2"></div>')
		);
		
		//_btn.$el.find('.text span.textActive').html('schliessen');
		
		//_btn.$el.find('.text2 span').html(btn_text);
		
		var duration = 0.5;
		var easing = Power3.easeInOut;
		
		/***** INIT ANIMATION ******/
		_btn.tl.set(_btn.$el,{display:'inline-block'},0);
		/*_btn.tl.to(_btn.$el.find('.line').eq(0),duration,{width:'100%',opacity:1,ease:easing },0);
		_btn.tl.to(_btn.$el.find('.line').eq(1),duration,{height:'100%',opacity:1,ease:easing },0);
		_btn.tl.to(_btn.$el.find('.line').eq(2),duration,{width:'100%',opacity:1,ease:easing },0);
		_btn.tl.to(_btn.$el.find('.line').eq(3),duration,{height:'100%',opacity:1,ease:easing },0);*/
		
		_btn.tl.set(_btn.$el,{maxWidth:0});
		_btn.tl.to(_btn.$el,duration,{maxWidth:200,opacity:1});
		
		_btn.tl.to(_btn.$el,duration,{maxWidth:400,opacity:1},'+=2s');
		_btn.tl.to(_btn.$el.find('.text'),duration,{opacity:1},'-0.2s');
		_btn.tl.pause();
		
		_btn.$el.data('btn',_btn);
		_btn.bindEvents();
	};	
	
	this.show = function() {
		var _btn = this;
		_btn.tl.play();
	};
	
	this.hide = function() {
		var _btn = this;
		_btn.tl.reverse();
		TweenLite.set(_btn.$el.find('.line2').eq(0),{width: 0 ,opacity:0 },0);
		TweenLite.set(_btn.$el.find('.line2').eq(1),{height:0,opacity:0 },0);
		TweenLite.set(_btn.$el.find('.line2').eq(2),{width:0,opacity:0 },0);
		TweenLite.set(_btn.$el.find('.line2').eq(3),{height:0,opacity:0 },0);
	};
	
	/* this.onMouseEnter = function() {
		var _btn = this;
		var duration = 0.5;
		var easing = Power3.easeInOut;
		
		/***** HOVER ANIMATION ******/
		//alert(_btn.$el.width());
		//console.log(_btn.$el.outerWidth());
		//_btn.tl_hover = new TimelineLite();
		//_btn.tl_hover.to(_btn.$el.find('.text'),duration,{letterSpacing:'5rem'},0);
		
		//_btn.tl_hover.to(_btn.$el,duration,{background: '3f6b92' },0);

		/*_btn.tl_hover.to(_btn.$el.find('.line2').eq(0),duration,{width: _btn.$el.width()-1 ,opacity:1,ease:easing },0);
		_btn.tl_hover.to(_btn.$el.find('.line2').eq(1),duration,{height:_btn.$el.height()-1,opacity:1,ease:easing },0);
		_btn.tl_hover.to(_btn.$el.find('.line2').eq(2),duration,{width:_btn.$el.width()-1,opacity:1,ease:easing },0);
		_btn.tl_hover.to(_btn.$el.find('.line2').eq(3),duration,{height:_btn.$el.height()-1,opacity:1,ease:easing },0);
		*/
		
		
		
		//_btn.tl_hover.play();
	//};
	
	
	this.onMouseLeave = function() {
		var _btn = this;
		_btn.tl_hover.reverse();
	};
	
	this.bindEvents =function() {
		var _btn = this;
	
		_btn.$el.on('mouseenter', function() {
			//console.log('btn mouseenter');
			
			_btn.onMouseEnter();
		});
		
		_btn.$el.on('mouseleave', function() {
//			console.log('btn mouseleave');
			_btn.onMouseLeave();
		});
	};
	
	this.init();
}