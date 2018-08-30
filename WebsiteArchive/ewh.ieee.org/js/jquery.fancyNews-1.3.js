/*!
 * Fancy News v1.3
 *
 * Copyright 2011, Rafael Dery
 *
 * Only for sale at the envato marketplaces
 */

;(function($) {
	jQuery.fn.fancyNews = function(arg) {
		var options = $.extend({},$.fn.fancyNews.defaults,arg);
		var $element, conHeight, scrollPaneApi, slideInt, titles = [], dates = [], summaries = [], descriptions = [], links = [], previewCons = [], topConIndex = 0, busy = true, isSliding = false, slideDirection = "next";
		
			function _init(elem) {
				
				$element = $(elem);
				var newsList = $.makeArray($element.find('div').hide());
				
				//add css to the main
				$element.css({
					'overflow': 'hidden',
					'position': 'relative',
					'width': options.width,
					'height': options.height+(options.previewOffset * options.previewsPerPage)
				});
				
				//add preloader
				$element.append("<div id='fn-preloader'></div>");
				$element.find('#fn-preloader').css({
					'top': options.height*0.5-$element.find('#fn-preloader').height()*0.5,
					'left': options.width*0.5-$element.find('#fn-preloader').width()*0.5
				});
				
				//save preview height
				conHeight = options.height / options.previewsPerPage;
				
				//load rss feed if URL is passed
				if(options.feed){
					_loadFromXml();
				}
				else{
					_loadFromDom(newsList);
				}			
			};
			
			function _loadFromDom(domList){
				
				//save content from DOM
				var previews = [];
				for(var i=0; i < domList.length; ++i){
					dates[i] = $(domList[i]).attr('title') ? $(domList[i]).attr('title') : '';
					titles[i] = $(domList[i]).children('span').attr('title').length > 0 ? $(domList[i]).find('span').attr('title') : "";
					summaries[i] = _getWords($(domList[i]).children('span').text(), options.maxWords)+'[....]';
					descriptions[i] = $(domList[i]).children('span').html();
                    
					var thumb = $(domList[i]).children('img').attr('src');
					var imageDom = thumb? '<img class="fn-newsPreviewThumb" src="'+thumb+'" />' : '';
					previews[i] = "<div class='fn-newsPreview' style='width:"+options.width+"px; height:"+conHeight+"px; background:"+options.backgroundColor+";'>"+imageDom+"<span class='fn-newsPreviewText' ><h3>"+titles[i]+"</h3><h4>"+dates[i]+"</h4>"+summaries[i]+"</span></div>";
				};
				
				_createPreviews(previews);
			};
			
			function _loadFromXml(){
				
				//save content from rss feed
				var previews = [];
				
				$.jGFeed(options.feed,function(feeds){
					// Check for errors
					if(!feeds){
					  _errorHandler('No feeds found! Please check your RSS feed!')
					  return false;
					}
					// create preview containers
					for(var i=0; i<feeds.entries.length; i++){
					  var entry = feeds.entries[i];
					  titles[i] = entry.title;
					  dates[i] = String(entry.publishedDate).substr(0,16);
					  summaries[i] = _getWords(entry.contentSnippet.slice(0,entry.contentSnippet.length-3), options.maxWords)+'[....]';
					  descriptions[i] = entry.content;
					  links[i] = entry.link;
					  
					  previews[i] = "<div class='fn-newsPreview' style='width:"+options.width+"px; height:"+conHeight+"px; background:"+options.backgroundColor+";'><span class='fn-newsPreviewText' ><h3>"+titles[i]+"</h3><h4>"+dates[i]+"</h4>"+summaries[i]+"</span></div>";
					}
								
					_createPreviews(previews);
					
				  }, options.numOfEntries);
			};
			
			function _createPreviews(previews){
				//remove preloader
				$element.find('#fn-preloader').remove();
				
				//create all previews		
				for(var i=0; i < previews.length; ++i){	
					$element.append(previews[i]).find('.fn-newsPreview:last').css({
						'top': i*(conHeight+options.previewOffset)
					});	
				}
				
				//put all preview containers in an array
				previewCons = $.makeArray($element.find('.fn-newsPreview'));
				
				//holder for the news view
				$element.append("<div id='fn-newsView' style='width:"+options.width+"px;height:"+$element.height()+"px;'><h3 id='fn-newsViewTitle'></h3><div id='fn-newsViewHtml' style='width:"+(options.width-30)+"px;height:"+($element.height()-50)+"px;'></div></div>");
				
				//init scroller for the news view
				$element.find('#fn-newsViewHtml').jScrollPane();
				var newsScrollPane = $element.find('#fn-newsViewHtml');
				newsScrollPane.jScrollPane();
				scrollPaneApi = newsScrollPane.data('jsp');
				
				//create the footer bar with all buttons
				$element.after("<div id='fn-newsFooterBar' style='width:"+options.width+"px;background:"+options.backgroundColor+"'><span id='newsFooterText'>"+_footerText(topConIndex+1, topConIndex+options.previewsPerPage, previewCons.length)+"</span><span id='fn-previousButton'></span><span id='fn-nextButton'></span><div id='fn-newsViewClose'></div></div>");
				$element.next('#fn-newsFooterBar').hide();
				$element.next('#fn-newsFooterBar').find('#fn-newsViewClose').hide().click(function(){
						_toggleButtons();
						$element.next('#fn-newsFooterBar').find('#newsFooterText').text(_footerText(topConIndex+1, topConIndex+options.previewsPerPage, previewCons.length));
						$element.find('#fn-newsView').stop().fadeTo(500, 0, function(){
							$(this).css('visibility', 'hidden');
					});
				});; 
									
				//fade in previews depending on the previewsPerPage option
				for(var i=0; i<options.previewsPerPage;++i){
					$(previewCons[i]).hide().delay((200+(i*200))).fadeIn(800);
				};
				
				//fade in footer bar
				setTimeout(function(){
					$element.next('#fn-newsFooterBar').fadeIn(800, _addInteractivity);
				  }, 200+options.previewsPerPage*200);				
			};
			
			function _addInteractivity() {
				
				busy = false;
				
				//animate the background of the previews on hover
				$element.find('.fn-newsPreview').hover(
					function(){
						if(busy) return;
						busy = true;
						$(this).stop().animate({ 'backgroundColor': options.backgroundOverColor}, 800);
					},					
					function(){
						if(isSliding) return;
						busy = false;
						$(this).stop().animate({ 'backgroundColor': options.backgroundColor}, 500);	
					}
				).click(function(){
					if(isSliding) return;
					var index = $element.find('.fn-newsPreview').index(this);
					
					if(options.useLinks && options.feed) {
						window.open(links[index], options.targetWindow)
					}
					else {			
						var htmlText = descriptions[index];
						
						//hide next/previous button
						_toggleButtons();
								
						//fade in view box
						$element.find('#fn-newsView').css({visibility: 'visible', opacity: 0}).stop().fadeTo(500, 1);
						
						//update title and footer text
						$element.find('#fn-newsViewTitle').text(titles[index]);
						$element.next('#fn-newsFooterBar').find('#newsFooterText').text(dates[index]);
								
						//add new html text and adjust scroller
						scrollPaneApi.getContentPane().html(htmlText);
						scrollPaneApi.reinitialise({verticalGutter:15});
						scrollPaneApi.scrollToPercentY(0);
						
						//scale images in a post
						$('#fn-newsView img').jScale({ls:options.longestImageSide})
					}	
				});
				
				//event handler for the previous button
				$element.next('#fn-newsFooterBar').find('#fn-previousButton').click(function(){
					if(topConIndex != 0 && !busy) _previousPreviews();
				});
				
				//event handler for the next button
				$element.next('#fn-newsFooterBar').find('#fn-nextButton').click(function(){
					if(topConIndex != previewCons.length-options.previewsPerPage && !busy) _nextPreviews();
				});
				
				if(options.slideTime) slideInt = setInterval(_slide, options.slideTime);
			};
			
			//shows the next previews
			function _nextPreviews(){		
				_movePreviews('-');
				++topConIndex;
				
				$element.next('#fn-newsFooterBar').find('#newsFooterText').text(_footerText(topConIndex+1, topConIndex+options.previewsPerPage, previewCons.length));
				$(previewCons[topConIndex+options.previewsPerPage-1]).css('opacity', 0).animate({opacity:1},300, function(){busy=isSliding=false});		
			};
			
			//shows the previous previews
			function _previousPreviews(){
				--topConIndex;
				_movePreviews('+');
				
				$element.next('#fn-newsFooterBar').find('#newsFooterText').text(_footerText(topConIndex+1, topConIndex+options.previewsPerPage, previewCons.length));
				$(previewCons[topConIndex]).css('opacity', 0).animate({opacity:1}, function(){busy=isSliding=false});
			};
			
			//moves the previews depending on the direction
			function _movePreviews(dir){
				isSliding = busy = true;
				var yMove = conHeight+2;
				
				for(var i=topConIndex; i<previewCons.length;++i){
					$(previewCons[i]).animate({'top': dir+'='+yMove+'px'},300);
				}
			};
			
			//toggles the control buttons
			function _toggleButtons(){
				if($element.next().find('#fn-previousButton').is(':hidden')){
					$element.next().find('#fn-newsViewClose').hide();
				 	$element.next().find('#fn-previousButton, #fn-nextButton').show();
					//set slide interval
					
					if(options.slideTime) slideInt = setInterval(_slide, options.slideTime);
				 }
				else {
					$element.next().find('#fn-newsViewClose').show();
					$element.next().find('#fn-previousButton, #fn-nextButton').hide();
					//clear slide interval
					if(options.slideTime) clearInterval(slideInt);
				}
			};
			
			function _slide() {			
				if(busy) return;
				if(topConIndex != 0 && !busy && slideDirection == "previous") {
					_previousPreviews();
				}
				else slideDirection = "next";
				
				if(topConIndex != previewCons.length-options.previewsPerPage && !busy && slideDirection == "next") {
					_nextPreviews();				
				}
				else slideDirection = "previous";
			};
			
			function _errorHandler(text) {
				//remove preloader
				$element.find('#fn-preloader').remove();			
				$element.append("<span id='fc-error'>"+text+"</span>");
			};
		
		return this.each(function() {_init(this)});
	};
	
	//returns the words for the preview text depending on maxWords options
	function _getWords(text, length){
		var textArray = text.split(" ");
		var shortedText = "";
		if(textArray.length > length){
			for(var i=0; i<length;++i){
				shortedText+= textArray[i]+ " ";
			}
			return shortedText;
		}
		else{
			return text;
		}	
	};
	
	//returns the footer text
	function _footerText(top, bottom, length){
		var text = String(top+'-'+bottom+' of '+length+' posts');
		return text;
	};
	
	$.fn.fancyNews.defaults = {
		width: 500, //the width of the main content area in px(without footer bar)
		height: 420, //the height of the main content area in px(without footer bar)
		previewOffset: 2, //the offset between each preview in px
		maxWords: 60, //the numbers of words for each preview text
		previewsPerPage: 3, //the numbers of previews per page
		numOfEntries: 10, //number of blog entries to load (only for RSS feed)
		slideTime: 0, // set the delay for the slide show
		longestImageSide: 100, // set the length of the longest side of the image in pixels or percentage relative to the native height.
		feed: '', // a URL which refers to a RSS feed
		backgroundColor: '#333230', //the background color
		backgroundOverColor: '#736D61', //the background color when you move your mouse over a preview
		useLinks: false, //enable or disable each preview as referer to the origin blog entry (only for RSS feed)
		targetWindow: '_blank'
	};
})(jQuery);