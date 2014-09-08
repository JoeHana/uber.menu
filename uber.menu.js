
/*
 * Project:		uber.menu
 *
 * Version: 	0.1.0
 *
 * Autor:		UberPress
 * Autor URL:	http://uberpress.io/scripts/uber.menu
 *
 * Date:		2012-09-16
 *
 * License:		MIT
 *
 */
 
 
/*
 * Note: This Version currently is a mashup of 'slidemenu' from dynamicdrive and a snippet from smashingmagazine for transforming menus automatically to selects by a given screen size. THIS NEEDS TO BE STREAMLINED !!!
 */
 
(function($){

	$.fn.infuseMenu = function(options){
		
		options = $.extend({
			animationOver: 200,
			animationOut: 200,
			responsive: true
		},options);
		
		return this.each(function(){
			

			var infuseMenu = {
				
				buildmenu: function(menuid) {
						
					var menu = $("#" + menuid + " > ul");
					var headers = menu.find("ul").parent();
					
					headers.each(function(i){
						
						var currentObject = $(this);
						var subMenu=$(this).find('ul:eq(0)');
						
						this._dimensions = {
							w:this.offsetWidth, 
							h:this.offsetHeight, 
							subMenuWidth:subMenu.outerWidth(), 
							subMenuHeight:subMenu.outerHeight()
						}
						
						this.istopheader = currentObject.parents("ul").length==1? true : false
						
						subMenu.css({top:this.istopheader? this._dimensions.h+"px" : 0})
						
						currentObject.hover(
							function(e){
								
								var targetElem = $(this).children("ul:eq(0)")
								
								this._offsets = {
									left: $(this).offset().left,
									top: $(this).offset().top
								}
								
								var menuleft = this.istopheader? 0 : this._dimensions.w
								menuleft = (this._offsets.left + menuleft + this._dimensions.subMenuWidth>$(window).width())? (this.istopheader? -this._dimensions.subMenuWidth+this._dimensions.w : -this._dimensions.subMenuWidth) : menuleft
		
								if (targetElem.queue().length<=1)
								
									targetElem.css({
										left: menuleft+"px",
										width: this._dimensions.subMenuWidth+'px'
									}).slideDown(options.animationOver)
									
							},
							function(e){
								var targetElem = $(this).children("ul:eq(0)")
								targetElem.slideUp(options.animationOut)
							}
						)
						currentObject.click(function(){
							$(this).children("ul:eq(0)").hide()
						})
					})
					menu.find("ul").css({display:'none', visibility:'visible'})
					
				}
			}
			
			infuseMenu.buildmenu("main-menu");



			
			
			<!-- MENU TRANSFORMER >> START -->
			
			/* transforms the menu into a select for mobile devices */
			if(options.responsive == true) {
				
				/* Get the window's width, and check whether it is narrower than 480 pixels */
				var windowWidth = $(window).width();
				if (windowWidth <= 480) {
				
				  /* Clone our navigation */
				  var menu = (this);
				  var mainNavigation = $(menu).clone();
				
				  /* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
				  $(menu).html('<select class="menu"></select>');
				  var selectMenu = $('select.menu');
				
				  /* Navigate our nav clone for information needed to populate options */
				  $(mainNavigation).children('ul').children('li').each(function() {
				
					 /* Get top-level link and text */
					 var href = $(this).children('a').attr('href');
					 var text = $(this).children('a').text();
				
					 /* Append this option to our "select" */
					 $(selectMenu).append('<option value="'+href+'">'+text+'</option>');
				
					 /* Check for "children" and navigate for more options if they exist */
					 if ($(this).children('ul').length > 0) {
						$(this).children('ul').children('li').each(function() {
				
						   /* Get child-level link and text */
						   var href2 = $(this).children('a').attr('href');
						   var text2 = $(this).children('a').text();
				
						   /* Append this option to our "select" */
						   $(selectMenu).append('<option value="'+href2+'">--- '+text2+'</option>');
						});
					 }
				  });
				
				}
				
				/* When our select menu is changed, change the window location to match the value of the selected option. */
				$(selectMenu).change(function() {
				  location = this.options[this.selectedIndex].value;
				});
			
			};
			
			<!-- MENU TRANSFORMER >> END -->
				
		});

	}
	
})(jQuery);


	
