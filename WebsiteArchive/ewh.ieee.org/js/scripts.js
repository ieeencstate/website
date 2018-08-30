jQuery(function(){

/*-----------------------------------------------------------------------------------*/
/*	Slider - http://slidesjs.com/
/*-----------------------------------------------------------------------------------*/
				if (jQuery().slides) {
			
					jQuery('#slider').css({ display : 'block' });
						
					jQuery("#slider").slides({
						preload: true,
						preloadImage: 'images/slider/loading.gif',
						play: 0, //Auto play time. Set to 0 to stop auto rotate. 6000
						width: 960,
						pause: 4500,
						slideSpeed: 1000, //Slide rotation speed.
						generatePagination: true,
						hoverPause: true,
						autoHeight: true
					});	
					
				}
				
/*-----------------------------------------------------------------------------------*/
/*	Fading Buttons - http://greg-j.com/2008/07/21/hover-fading-transition-with-jquery/
/*-----------------------------------------------------------------------------------*/		

	jQuery('.fadeThis').append('<span class="hover"></span>').each(function () {
	  var $span = $('> span.hover', this).css('opacity', 0);
	  jQuery(this).hover(function () {
	    $span.stop().fadeTo(500, 1);
	  }, function () {
	    $span.stop().fadeTo(500, 0);
	  });
	});
	
	
/*-----------------------------------------------------------------------------------*/
/*	Show/Hide Content - http://rpardz.com/blog/show-hide-content-jquery-tutorial/
/*-----------------------------------------------------------------------------------*/	
	
    jQuery('.open-content').hide().before('<div class="container_12"><a href="#" id="toggle-content" class="button"><div id="expand-button" ></div></a></div><div id="toggle-top" style="width:100%"></div>');
	jQuery('a#toggle-content').click(function() {
		jQuery('.open-content').slideToggle(1000);
		return false;
	});
	
	
/*-----------------------------------------------------------------------------------*/
/*	FancyBox  - http://fancybox.net/
/*-----------------------------------------------------------------------------------
			jQuery("#various1").fancybox({
				'titlePosition'		: 'inside',
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic'
			});
			
			jQuery("a.portfolio").fancybox();
			
*/	
			
/*-----------------------------------------------------------------------------------*/
/*	Mosaic Image Hover   - http://buildinternet.com/project/mosaic/1.0/
/*-----------------------------------------------------------------------------------*/	
				jQuery('.circle').mosaic({
					opacity : 0.8	//Opacity for overlay (0-1)
				});
				
				jQuery('.fade').mosaic();
				
/*-----------------------------------------------------------------------------------*/
/*	Add Class to Tag Cloud (WP prep work) - http://www.simplethemes.com/blog/entry/style-wordpress-tags/
/*-----------------------------------------------------------------------------------*/					
		jQuery('p.tags a').wrap('<span class="jg-tags" />');
		
		
/*-----------------------------------------------------------------------------------*/
/*	Navigation -  http://users.tpg.com.au/j_birch/plugins/superfish/
/*-----------------------------------------------------------------------------------	
		jQuery("ul.sf-menu").superfish(); 
   
/*-----------------------------------------------------------------------------------*/
/*	MagicLine Navigation Effect  - http://css-tricks.com/jquery-magicline-navigation/
/*-----------------------------------------------------------------------------------
	
    var $el, leftPos, newWidth;
        $mainNav = jQuery("#main-nav");
 	$mainNav.append('<li id="magic-line" style="z-index:10;"></li>');
    
    var $magicLine = jQuery("#magic-line");
    
    $magicLine
        .width(jQuery(".current").width())
        .height($mainNav.height())
        .css("left", jQuery(".current a").position().left)
        .data("origLeft", jQuery(".current").position().left)
        .data("origWidth", $magicLine.width())
        .data("origColor", jQuery(".current").attr("title"));
            
    jQuery("#main-nav>li").hover(function() {
        $el = jQuery(this);
        leftPos = $el.position().left;
        newWidth = $el./*parent()width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth,
            backgroundColor: $el.attr("title")
        })
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth"),
            backgroundColor: $magicLine.data("origColor")
        });    
    });
    
    /* Kick IE into gear 
    jQuery(".current a").mouseenter();


	
/*-----------------------------------------------------------------------------------*/
/*	Tooltip  - http://craigsworks.com/projects/qtip/
/*-----------------------------------------------------------------------------------*/	
   jQuery('a.slider-qtip').qtip({
      position: {
         corner: {
            target: 'bottomMiddle',
            tooltip: 'topMiddle'
         }
      },
      style: {
         name: 'cream',
         padding: '7px 13px',
         width: {
            max: 220,
            min: 0
         },
         tip: true
      }
   });
   
/*-----------------------------------------------------------------------------------*/
/*	Twitter - http://codecanyon.net/item/twitter-updates-widget/120228
/*-----------------------------------------------------------------------------------*/	
/*
			settings = {
				'username' : ['NCSU_IEEE'],
				'updates' : 5,
				'loadingText' : "Loading tweets..."		
			}
			jQuery('#tuw_div').tuw(settings);
			
/*-----------------------------------------------------------------------------------*/
/*	Testimonial  - http://coryschires.com/jquery-quote-rotator-plugin/
/*-----------------------------------------------------------------------------------*/	
	jQuery('ul#quotes').quote_rotator({
		rotation_speed: 7000,           // defaults to 5000
		pause_on_hover: true,         // defaults to true
		randomize_first_quote: true    // defaults to false
	});
	
/*-----------------------------------------------------------------------------------*/
/*	Nivo Slider - http://nivo.dev7studios.com/
/*-----------------------------------------------------------------------------------*/	
    jQuery('#nivo-slider').nivoSlider({
        effect:'fade', // Specify sets like: 'fold,fade,sliceDown'
        animSpeed:500, // Slide transition speed
        pauseTime:3000, // How long each slide will show
        startSlide:0, // Set starting Slide (0 index)
        directionNav:false, // Next & Prev navigation
        directionNavHide:false // Only show on hover
    });
	
/*-----------------------------------------------------------------------------------*/
/*	Pricing Plan Tooltip  - http://craigsworks.com/projects/qtip/
/*-----------------------------------------------------------------------------------*/	
   jQuery('.pricing a.qtip').qtip({
      position: {
         corner: {
            target: 'topRight',
            tooltip: 'bottomLeft'
         }
      },
      style: {
         name: 'green',
         padding: '7px 13px',
         width: {
            max: 210,
            min: 0
         },
         tip: true
      }
   });
   
   
});
