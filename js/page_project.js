var pageProjects = {
	$el: null,
	pageTl:null,
	slider:undefined,

	data :[
		   {
			   id:1,
			   name:'Vitalmonitor',
			   image: 'http://www.danielspatzek.com/images/vitalmonitor_mainpic_tiny.jpg',

			   detail: {
				   rows: [{
					   
					   type:'text',
					   
					   
					   text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				   },
				   {
					   type:'imageSmal',
					   image:'http://www.danielspatzek.com/images/trial.png'
				   },
				   {
					   type:'text',
					   headline: 'eine überschrift',
					   text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				   },{
					   type:'imageLarge',
					   barAnimation:true,
					   image:'http://www.danielspatzek.com/images/trieal2.png'
				   }]
			   }
		   },
		   {
			   id:2,
			   name:'Renate Rechner',
			   image: 'http://www.danielspatzek.com/images/renaterechner_mainpic_tiny.jpg',
		   
			   detail: {
				   rows: [{
					   type:'text',
					   text: 'Text über die Renade'
				   }]
			   }
		   },
		   {
			   id:3,
			   name:'Kleebauer',
			   image: 'http://www.danielspatzek.com/images/kleebauer_mainpic_tiny.jpg',
			   detail: {
				   rows: [{
					   type:'text',
					   text: 'Text übern Kleebauer'
				   }]
			   }
		   }
		   
       ],
    init: function($el) {
		var _p = this;
		
		_p.$el = $el;
		
		

		/*var $detailNav = $('<div class="projectDetailNav" />')
			.append($('<div class="prev" />'))
			.append($('<div class="next" />')); */

		var arrowSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 407.436 407.436" style="enable-background:new 0 0 407.436 407.436;" xml:space="preserve"><polygon points="112.814,0 91.566,21.178 273.512,203.718 91.566,386.258 112.814,407.436 315.869,203.718 "/></svg>';

		var $projectDetailNext = $('<div class="projectDetailNextProject arrowNext" />').append(arrowSVG);
		var $projectDetailPrev = $('<div class="projectDetailPrevProject arrowPrev" />').append(arrowSVG);

		$projectDetailNext.append('<div class="title">Next Project</div>');
		$projectDetailPrev.append('<div class="title">Previous Project</div>');

		_p.$el.append($projectDetailNext);
		_p.$el.append($projectDetailPrev);
		
		_p.bindEvents();

		
	},

	route: function(routeData) {

	},
	
	bindEvents:function() {
		var _p = this;

		$(site).on('assets-loaded', function() {
			_p.data = [];

			$(site.resources['data_projects']).each(function() {
				var project = {
					id:this.ID,
					//image:this.resources['project_image'].MyImage
					name: this.Name,
					detail: {
						rows:[]
					}
				}

				$(this.ProjectRows).each(function () {
					var row = {
						type: this.type,
						id:this.ID,
						name: this.Name,
						text: this.text,
						headline: this.headline,
						barAnimation: this.barAnimation,
						logoColor:this.logoColor,
						navColor:this.navColor,/*
						image: (site.resources['project_row_image_'+this.ID]?site.resources['project_row_image_'+this.ID].url:''),
						imageMd: (site.resources['project_row_imagemd_'+this.ID]?site.resources['project_row_imagemd_'+this.ID].url:''),
						imageSd: (site.resources['project_row_imagesd_'+this.ID]?site.resources['project_row_imagesd_'+this.ID].url:''),
						animatedGif: (site.resources['project_row_animatedgif_'+this.ID]?site.resources['project_row_animatedgif_'+this.ID].url:'') */
						image: (this.MyImage?site.apiBaseUrl+this.MyImage.Filename:''),
						imageMd: (this.ImageMd?site.apiBaseUrl+this.ImageMd.Filename:''),
						imageSm: (this.ImageSm?site.apiBaseUrl+this.ImageSm.Filename:''),
						videoWebm: (this.videoWebm?site.apiBaseUrl+this.videoWebm.Filename:''),
						videoMp4: (this.videoMp4?site.apiBaseUrl+this.videoMp4.Filename:''),
						animatedGif: (this.AnimatedGif?this.AnimatedGif.Filename:''),
						linkText:this.linkText,
						service:(this.service?this.service.split('\n').join('<br />'):''),
						year:this.year,
						rowLink:this.rowLink,
					};

					if (typeof this.MyImage != "undefined") {
						/*var ressource = site.resources['project_row_image_'+this.ID];

						row.imageData = {
							height: ressource.data.height,
							width: ressource.data.width,
						}

						console.log(row); */
					}
					
					project.detail.rows.push(row);
				});

				_p.data.push(project);
			});

			
		});

		_p.$el.on('page-active', function() {
			if (!_p.slider) {

				//alert("tst");

				if (site.locationInfo[1]) {
					var projectID = site.locationInfo[1][0];
					site.currentPageName = site.locationInfo[0];
					var showDetail = (site.locationInfo[2] == "Detail");
					//alert(projectID);

					if (site.useFallbackVersion()) {
						_p.slider = new ProjectOverviewSliderFallback(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height(),projectID,showDetail);
					} else { 
						_p.slider = new ProjectOverviewSlider(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height(),projectID,showDetail);
					}

					
					
				} else {
					//alert("test");
					if (site.useFallbackVersion()) {
						_p.slider = new ProjectOverviewSliderFallback(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height());
					} else { 
						_p.slider = new ProjectOverviewSlider(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height());
					}
				}

				_p.slider.init();
			}
		});

		/*_p.$el.on('page-active', function() {
			if (!_p.slider) {

				//alert("tst");

				if (site.locationInfo[1]) {
					var projectID = site.locationInfo[1][0];
					//alert(projectID);
					_p.slider = new ProjectOverviewSlider(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height(),projectID);
				} else {
					_p.slider = new ProjectOverviewSlider(_p.$el.find('.pageInner'),_p.data,_p.$el.width(),_p.$el.height());
				}
			}
				
		}); */

		/*$(_p.slider).on('select-element', function(element,params) {
			console.log('select-element');

			_p.showDetail(params.index);
		}); */

		$(site).on('assets-loaded', function() {
			
		});

		_p.$el.find('.projectDetailPrevProject').on('click', function() {
			_p.slider.showPrevElement();
		});
		
		_p.$el.find('.projectDetailNextProject').on('click', function() {
			_p.slider.showNextElement();
		});



		/*_p.$el.on('page-active', function() {
			_p.slider.showElement(0);
		}); */

		_p.$el.find('.logoSvg').on('click', function() {

			if (_p.slider.timeLineRunning())
				return;

			var index = _p.slider.getIndexFromId(site.locationInfo[1][0]);

			//alert(site.locationInfo[1][0]);
			site.setLocation([
				null,
				[_p.data[index].id,_p.data[index].name]
			],
				false,
				{},
				true);
			//_p.slider.hideDetail();
		});
		
		_p.$el.on('mousewheel', function(e) {
//			console.log(e);
			

			if (_p.slider.$el.hasClass('state-detail-open') || _p.slider.$el.hasClass('state-detail-opening'))
				return;

			if (e.deltaY < 0) {
				// down 
				_p.slider.showNextElement();
			} else {
				// up
				_p.slider.showPrevElement();
			}
		});
		
		_p.$el.on('page-inactive', function() {
			
		});
		
		$(site).on('resize', function() {
			/*_p.slider = new ProjectOverviewSlider(_p.$el.find('.pageInner'),[
   		   {
   			   name:'Vitalmonitor',
   			   image: 'http://www.danielspatzek.com/images/vitalmonitor_mainpic_tiny.jpg'
   		   },
   		   {
   			   name:'Renate Rechner',
   			   image: 'http://www.danielspatzek.com/images/renaterechner_mainpic_tiny.jpg'
   		   },
   		   {
   			   name:'Kleebauer',
   			   image: 'http://www.danielspatzek.com/images/kleebauer_mainpic_tiny.jpg'
   		   }
   		   
          ],_p.$el.width(),_p.$el.height()); */
			
			//_p.slider
		});
		
		$(_p.slider).on('detail-shown', function(e,params) {
			var index = params.index;
			
//			console.log('detail-shown',_p.$el.find('.projectName'+index).data());
			_p.$el.find('.projectName').eq(index).hide();
			
			var hlTl = new TimelineMax({paused:true});
			hlTl.add('splitChars');
			hlTl.set(_p.$el.find('.projectName'+index+' .text > div'),{overflow:'visible'});
			
			var $chars = _p.$el.find('.projectName'+index).find('.char');
			
			for (var i = 0; i < $chars.length;i++) {
				var $char = $chars[i];
				
				var offset = Math.floor(Math.random()*400-100);
				hlTl.to($char,1,{y:offset,ease:Power2.easeInOut},'splitChars');
			}
			
			hlTl.play();
		});
	},

	showDetail: function(index) {
		var _p = this;
		var pd = new ProjectDetail(_p,_p.data[index]);
	},
}

$(document).ready(function() {
	pageProjects.init($('.pageProjects'));
});