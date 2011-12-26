$(document).ready(function() {
	
	// ====================================
	// = Content showing for main buttons =
	// ====================================
	
	// The function to show the main content by layer
	function showContent(layer, animate) {
		
		$("#background").show();
		$("#footer").hide();
		$("#announcement").hide();

		$("#content").html($("#" + layer + "_html").comments());

		$("#nav").children().each(function() {
			if ($(this).attr("id").search(layer) == -1) {
				$(this).addClass("inactive");
			} else {
				$(this).removeClass("inactive");
			}
		});

		if (animate == true) {
			$('html,body').animate({scrollTop: $("#nav").offset().top - 16}, 200, "swing");
		}
		
		// setUpHover();
		
		setupFullScreen();
		setupImageViewers();
		setupHovers();
		
		// Load analytics tracking
		setTimeout(function() {
			$("#tracker").attr("src", "/track/" + layer + "/")
		}, 500);
		
		window.location.hash = layer;
	}
	
	// Set up the on click functions for the different menus
	$("#nav").children().click(function() {
		showContent($(this).attr("id").split("_")[1], true);
	});
	
	// If there is a location has we open the layer with the content and scroll to it,
	// but only if we're not coming from the same url, because then we'd like to end up
	// at the scroll position we were.
	if (window.location.hash && document.referrer != window.location) {
		showContent(window.location.hash.replace("#", ""), false);
	}
	
	// =========================
	// = Preloading of content =
	// =========================

	preloadContentDelay = 1000;
	
	setTimeout(function() {
		
		preloadNode = $("<div></div>");
		
		preloadNode.css({
			"position": "absolute", 
			"left": "-100000px", 
			"top": "-100000px", 
			"height": "1px", 
			"width": "1px",
			"overflow": "hidden"})
	
		preloadNode.append($("#software_html").comments())
		preloadNode.append($("#design_html").comments())
		preloadNode.append($("#company_html").comments())
		preloadNode.append($("#blog_html").comments())
	
		$("body").append(preloadNode);
		
		// setUpHover();
		
	}, preloadContentDelay);

	// ==================================
	// = Set up hovering for mouseovers =
	// ==================================
	
	// function setUpHover() {
	// 
	//	$(".hover").each(function() {
	//		var parentNode = $(this);
	//		var imageNode = parentNode.children("img");
	// 
	//		if (!imageNode.length) {
	//			imageNode = $("<img>");
	//			imageNode.attr("src", parentNode.css("background-image").replace("off", "on"));
	//			imageNode.css({"position": "relative", "opacity": "0.0"}); 
	//			imageNode.appendTo(parentNode);
	//		}
	//	});
	// 
	//	$(".hover").hover(function() {
	//		$(this).children("img").stop().fadeTo(150, 1.0);
	//	}, function() {
	//		$(this).children("img").stop().fadeTo(150, 0.0);
	//	});
	// 
	// }

	// =========================
	// = Main page menu hovers =
	// =========================
	
	function setupHovers() {	
		$(".hoverable").hover(
			function() {$(this).addClass("hover")},
			function() {$(this).removeClass("hover")}
		);
	
		$(".gallery .thumbnail").hover(
			function() {$(this).children("img.fade").stop().fadeTo(200, 1)},
			function() {$(this).children("img.fade").stop().fadeTo(50, 0)}
		);

		$(".profile").hover(
			function() {$('img.fade', this).stop().fadeTo(200, 1)},
			function() {$('img.fade', this).stop().fadeTo(50, 0)}
		);

	};
	
	setupHovers();
	
});