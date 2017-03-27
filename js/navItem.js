function navItem($el) {
	
	this.$el = $el;
	this.type = "";
	
	
	$el.data('navItem',this);

	this.setHeight = function() {
		var _ni = this;

		if (_ni.$el.hasClass('navItemAbout') || _ni.$el.hasClass('navItemContact')) {
			_ni.$el.find('.text').width(_ni.$el.height());
		}
	},
	
	this.init = function() {
		var _ni = this;

		_ni.setHeight();
		
		//alert(_ni.$el.attr('rel'));
		_ni.page = $('.page[rel='+_ni.$el.attr('rel')+']');
		_ni.pageTransitionHelper = $('.page[rel='+_ni.$el.attr('rel')+']');
		
		_ni.type = this.page.data('page-transtion');
		
		
		
		var mySplitText = new SplitText(_ni.$el.find('.text'), {type:"chars", charsClass:"char chars++"});
		
		_ni.$el.find('.text .char').wrapInner($('<div class="char-inner" />'));
		_ni.bindEvents();
		
		
		/*setTimeout(function() {
			navItem_transition['_'+_ni.type]();
			page_transition['_'+_ni.type]();
		},2000); */
		
		
		/*$(window).on('resize', function() {
			
			$('.overlay-resize').addClass('state-visible');
			//return;
			
		});*/
		
		
		$(site).on('resize', function() {

				_ni.setHeight();
				
				if (navItem_transition[_ni.type] == undefined || page_transition[_ni.type] == undefined)
					return;
				
				//navItem_transition["_"+_ni.type]();
				
				// resized
				var tl_chars = navItem_transition[_ni.type];
				var tl_pages = page_transition[_ni.type];
				
				var progress_tl_pages = tl_pages.progress();
				var progress_tl_chars = tl_chars.progress();
				
				
				tl_pages.progress(0);
				tl_chars.progress(0);
				
				navItem_transition['_'+_ni.type]();
				page_transition['_'+_ni.type]();
				
				navItem_transition[_ni.type].progress(progress_tl_chars);
				page_transition[_ni.type].progress(progress_tl_pages);
		});
		
		setInterval(function() {
			// check if any timeline is running
			
			
			var navitem_tl_active = (navItem_transition['fromBottom_tween'] != undefined && navItem_transition['fromBottom_tween'].isActive()) 
					|| (navItem_transition['fromTop_tween'] != undefined && navItem_transition['fromTop_tween'].isActive())
					|| (navItem_transition['fromLeft_tween'] != undefined && navItem_transition['fromLeft_tween'].isActive())
					|| (navItem_transition['fromRight_tween'] != undefined && navItem_transition['fromRight_tween'].isActive());
					
			var page_tl_active = (page_transition['fromBottom_tween'] != undefined && page_transition['fromBottom_tween'].isActive())
					|| (page_transition['fromTop_tween'] != undefined && page_transition['fromTop_tween'].isActive())
					|| (page_transition['fromLeft_tween'] != undefined && page_transition['fromLeft_tween'].isActive())
					|| (page_transition['fromRight_tween'] != undefined && page_transition['fromRight_tween'].isActive());
			
			
			
			if(!navitem_tl_active && !page_tl_active) {
				//$('body').removeClass('state-animating');
				$('.navItem').removeClass('state-animating');
				$('.navItem').removeClass('state-animation-hover-in');
				$('.navItem').removeClass('state-animation-hover-out');
				$('.navItem').removeClass('state-hover-active');
				
				//alert("test");
				
			} 
			
		},200);
		
	};
    
    
    this.jumpToPage = function() {
		var _ni = this;
		/*
		switch(_ni.type) {
			case "fromBottom":
				page_transition['fromTop'].progress(0);
				page_transition['fromLeft'].progress(0);
				page_transition['fromRight'].progress(0);
				break;
			case "fromTop":
				page_transition['fromBottom'].progress(0);
				page_transition['fromLeft'].progress(0);
				page_transition['fromRight'].progress(0);
				break;
			case "fromLeft":
				page_transition['fromBottom'].progress(0);
				page_transition['fromTop'].progress(0);
				page_transition['fromRight'].progress(0);
				break;
			case "fromRight":
				page_transition['fromBottom'].progress(0);
				page_transition['fromTop'].progress(0);
				page_transition['fromLeft'].progress(0);
				break;
		}*/

		/*navItem_transition['_fromTop']();
		navItem_transition['_fromBottom']();
		navItem_transition['_fromRight']();
		navItem_transition['_fromLeft']();
		page_transition['_fromTop']();
		page_transition['_fromBottom']();
		page_transition['_fromRight']();
		page_transition['_fromLeft'](); */
		//alert('redirekt');

		page_transition["_"+_ni.type]();
		navItem_transition["_"+_ni.type]();

		//_ni.$el.trigger('click');
		//return;

		//alert(_ni.type);
		//page_transition["_"+_ni.type]();
		//navItem_transition["_"+_ni.type]();

		var tlNav = navItem_transition[_ni.type];
		//alert(tlNav);
		var tl = page_transition[_ni.type];
		//tl.progress(1);
		//tlNav.progress(1);

		tl.seek('page-transition-end');
		tlNav.seek('page-transition-collapse-end');
		_ni.$el.addClass('state-active');
		_ni.page.addClass('state-active');
		//_ni.page.trigger('page-active');
		

		TweenMax.set($('.pageHome'),{display:'none'});
		

		setTimeout(function() {
			$('.pageHome').removeClass('state-active');
			$('.pageHome').addClass('state-hidden');
			//_ni.page.trigger('page-active');
		},10);
		
	},
	
	this.bindEvents = function() {
		var _ni = this;
		
		/*_ni.$el.on('touchstart', function(e) {
			
			
			
			e.stopPropagation();
			e.preventDefault();
			
			if (_ni.$el.hasClass('state-touched')) {
				_ni.$el.click();
				_ni.$el.removeClass('state-touched');
			} else {
				
				if (_ni.$el.hasClass('state-active')) {
					_ni.$el.click();
				} else {
					_ni.$el.mouseenter();
					_ni.$el.addClass('state-touched');
					
					$('.navItem').not(_ni.$el).mouseleave();
				}
				
				
			}
			
			return false;
		}); */
		
		_ni.$el.on('mouseenter', function() {

			
			
			_ni.$el.addClass('state-hovered');
			
			if ($('.state-animating').length || $('body').hasClass('state-animating') || $('.state-animation-hover-in').length  ) 
				return;
			
			_ni.$el.addClass('state-hover-active');
			
			//if (_ni.$el.hasClass('state-animation-hover-in') || _ni.$el.hasClass('state-animation-hover-out')) 
			//	return;
			
			
			if (!_ni.$el.hasClass('state-active')) {
				//alert(navItem_transition[_ni.type]);
				if (typeof navItem_transition[_ni.type] == "undefined")
					navItem_transition['_'+_ni.type]();
				
				_ni.$el.addClass('state-hover-active');
				var tl = navItem_transition[_ni.type];
				
				_ni.$el.addClass('state-animation-hover-in');
				
				navItem_transition[_ni.type+"_tween"] = tl.tweenTo('hover-end', { onComplete:function() {
					_ni.$el.removeClass('state-animation-hover-in');
					
					
					
					if (_ni.$el.hasClass('state-clicked')) {
						_ni.$el.removeClass('state-clicked');
						//alert("test");
						_ni.$el.click();
					}
				}});
				
			} else {
				var tl = navItem_transition[_ni.type];
				
				_ni.$el.addClass('state-animation-hover-in');
				
				navItem_transition[_ni.type+"_tween"] = tl.tweenTo('hover-active-end', { onComplete:function() {
					
					_ni.$el.removeClass('state-animation-hover-in');
					
					if (_ni.$el.hasClass('state-clicked')) {
						_ni.$el.removeClass('state-clicked');
						_ni.$el.click();
					}
				}}); 
			}
			
			//tl.play();
		});
		
		/* _ni.$el.on('mousemove', function() {
			if (!_ni.$el.hasClass('state-hover-active'))
				_ni.$el.mouseenter();
		});*/
		
		_ni.$el.on('mouseleave', function() {
			
			_ni.$el.removeClass('state-hovered');
			
			if ($('.state-animating').length || $('body').hasClass('state-animating')) 
				return;
			
			if (_ni.$el.hasClass('state-clicked')) {
				return;
			}
			
			
			var tl = navItem_transition[_ni.type];
			
			if (!_ni.$el.hasClass('state-active')) {
				
				_ni.$el.removeClass('state-animation-hover-in');
				_ni.$el.addClass('state-animation-hover-out');
				
				navItem_transition[_ni.type+"_tween"] = tl.tweenTo('hover-start', { onComplete:function() {
					_ni.$el.removeClass('state-animation-hover-out');
					_ni.$el.removeClass('state-hover-active');
				}});
			} else {
				_ni.$el.addClass('state-animation-hover-out');
				_ni.$el.removeClass('state-animation-hover-in');
				
				navItem_transition[_ni.type+"_tween"] = tl.tweenTo('hover-active-start', { onComplete:function() {
					_ni.$el.removeClass('state-animation-hover-out');
					_ni.$el.removeClass('state-hover-active');
				}});
				
				
			}
			
		});
		
		_ni.$el.on('click', function(event, params) {
			
			var preventLocationPush = false;

			if (typeof params != "undefined") {
				if (typeof params.preventLocationPush != "undefined") {
					preventLocationPush = params.preventLocationPush;
				}
					
			}
			
			
			if ($('.navItem.state-animating').not(_ni.$el).length  || $('body').hasClass('state-animating')) {
				
				return;
			}
			
			if (_ni.$el.hasClass('state-animation-hover-out') || _ni.$el.hasClass('state-animation-hover-in')) {
				_ni.$el.addClass('state-clicked');
				return;
			}
				

				
			
			/*switch(_ni.type) {
				case "fromBottom":
					page_transition['fromTop'].progress(0);
					page_transition['fromLeft'].progress(0);
					page_transition['fromRight'].progress(0);
					break;
				case "fromTop":
					page_transition['fromBottom'].progress(0);
					page_transition['fromLeft'].progress(0);
					page_transition['fromRight'].progress(0);
					break;
				case "fromLeft":
					page_transition['fromBottom'].progress(0);
					page_transition['fromTop'].progress(0);
					page_transition['fromRight'].progress(0);
					break;
				case "fromRight":
					page_transition['fromBottom'].progress(0);
					page_transition['fromTop'].progress(0);
					page_transition['fromLeft'].progress(0);
					break;
			} */

			if (typeof page_transition[_ni.type] == "undefined")
				page_transition['_'+_ni.type]();
			
			var tl_chars = navItem_transition[_ni.type];

			if (!_ni.$el.hasClass('state-active')) {

				
				var tl = page_transition[_ni.type];
				
				_ni.$el.addClass('state-active');
				_ni.$el.addClass('state-animating');
				$('body').addClass('state-animating');
				
				page_transition[_ni.type+"_tween"] = tl.tweenTo('page-transition-sprite-end',{ onComplete:function() {
					
				}});
				
				setTimeout(function() {
					
					
					navItem_transition[_ni.type+"_tween"] = tl_chars.tweenTo('page-transition-collapse-start',{ onComplete:function() {
						//alert("test");
						setTimeout(function() {
							// todo: collapse if init animation is done

							setTimeout(function() {
								$('body').removeClass('state-animating');
							},200);

							_ni.page.addClass('state-active');
							
							navItem_transition[_ni.type+"_tween"] = tl_chars.tweenTo('page-transition-collapse-end',{ onComplete:function() {
								
								//setTimeout(function() {
									
								//},500);
								
							}});
						},1000);
						
						
					}});
					
					
					
					setTimeout(function() {
						page_transition[_ni.type+"_tween"] = tl.tweenTo('page-transition-end', { onComplete:function() {
							_ni.page.trigger('page-active',{
								preventLocationPush:preventLocationPush
							});
							//_ni.$el.removeClass('state-animating');
							
						} });
					},800);
					
					
				},800);
				
				
			}
			else {
				var tl = page_transition[_ni.type];
				//tl.reverse();
				
				var tl_chars = navItem_transition[_ni.type];
				
				//var toLabel = 'hover-start';
				
				if (_ni.$el.hasClass('state-hovered')) {
					toLabel = 'hover-end';
				}
				_ni.$el.addClass('state-animating');
				$('body').addClass('state-animating');
				
				page_transition[_ni.type+"_tween"] = tl.tweenTo('page-transition-sprite-end',{ onComplete:function() {
					
				}});
				
				//alert(preventLocationPush);
				
				setTimeout(function() {
					//setTimeout(function() {
						navItem_transition[_ni.type+"_tween"] = tl_chars.tweenTo('hover-end',{ onComplete:function() {
							_ni.$el.removeClass('state-active');
							
							
							setTimeout(function() {
								// todo: collapse if init animation is done
								setTimeout(function() {
									$('body').removeClass('state-animating');
								},200);

								_ni.page.addClass('state-active');

								navItem_transition[_ni.type+"_tween"] = tl_chars.tweenTo('hover-start',{ onComplete:function() {
									
									//setTimeout(function() {
										//$('body').removeClass('state-animating');
									//},1000);
									
								}});
							},1000);
							
						}});
					//alert('test');
					//},1000);
					
					setTimeout(function() {
						page_transition[_ni.type+"_tween"] = tl.tweenTo('page-transition-start',{ onComplete:function() {
							//_ni.$el.removeClass('state-animating');
							//alert('page home active');
							//alert('test')

							page_home.$el.trigger('page-active',{
								preventLocationPush:preventLocationPush
							});

							setTimeout(function() {
								
							},1000);
							
						}});
					},800);
					
				},300);
				
			}
				
			
			
		});
	};
	
	this.init();
}