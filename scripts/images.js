


// ========================
// = Image Viewer Builder =
// ========================

var maskNextBackgoundClick = 0;
var imageViewerVisible = false;


function buildImageViewer(selectedImage, imageList) {
	
	$("#image_popup_container_image").attr("src", selectedImage);
	
	$("#image_popup_navigation").html("");
	
	$.each(imageList, function(index) {
		
		imagePath = imageList[index][1];
		
		var navigationDot = $("<img src=\"/media/img/navigation_dot.gif\" width=\"8\" height=\"8\">");
		
		
		navigationDot.attr("id", imagePath);
		
		if (selectedImage == imagePath) {
			navigationDot.addClass("active");
		}
		
		navigationDot.click(function() {
			maskNextBackgoundClick = 1;
			buildImageViewer($(this).attr("id"), imageList);
		});
		
		$("#image_popup_navigation").append(navigationDot);
		
		// Determine what the next image in the list would be
		if (selectedImage == imagePath) {
			nextImagePathIndex = index + 1;
			
			if (nextImagePathIndex >= imageList.length) {
				nextImagePathIndex = 0;
			}
			
		}
		
	});

	$("#image_popup_overlay").show();
	$("#image_popup").show();
	
	
	$("#image_popup_container_image").unbind();
	$("#image_popup_navigation").unbind();
	$("#image_popup").unbind();
	
	$("#image_popup_navigation").click(function() {
		maskNextBackgoundClick = 1;
	});
	
	$("#image_popup_container_image").click(function() {
		// window.console.log("Image popup container image");
		// window.console.log("maskNextBackgoundClick", maskNextBackgoundClick);
		maskNextBackgoundClick = 1;
		
		// window.console.log("Next image index " + nextImagePathIndex);
		// window.console.log("Next image path " + imageList[nextImagePathIndex][1]);
		
		buildImageViewer(imageList[nextImagePathIndex][1], imageList);
		
	});
	
	// Make the overlay go away on clicking outside image container
	$("#image_popup").click(function() {
		
		// window.console.log("Image popup click");
		// window.console.log("maskNextBackgoundClick", maskNextBackgoundClick);
		
		// if (!$.browser.msie) {
		if (maskNextBackgoundClick > 0) {
			maskNextBackgoundClick = 0;
			return;
		}
		// }
		
		$("#image_popup_overlay").hide();
		$("#image_popup").hide();
	});

}

function buildImageViewers(list) {
	$.each(list, function(index) {
		$(list[index][0]).click(function() {
			buildImageViewer(list[index][1], list);
		});
	});
}

function setupImageViewers() {

	buildImageViewers([
		[".kaleidoscope-1", "/media/img/software/kaleidoscope/1-big.jpg"],
		[".kaleidoscope-2", "/media/img/software/kaleidoscope/2-big.jpg"],
		[".kaleidoscope-3", "/media/img/software/kaleidoscope/3-big.jpg"],
		[".kaleidoscope-4", "/media/img/software/kaleidoscope/4-big.jpg"]]);

	buildImageViewers([
		[".versions-1", "/media/img/software/versions/1-big.jpg"],
		[".versions-2", "/media/img/software/versions/2-big.jpg"],
		[".versions-3", "/media/img/software/versions/3-big.jpg"],
		[".versions-4", "/media/img/software/versions/4-big.jpg"]]);

	buildImageViewers([
		[".checkout-1", "/media/img/software/checkout/1-big.jpg"],
		[".checkout-2", "/media/img/software/checkout/2-big.jpg"],
		[".checkout-3", "/media/img/software/checkout/3-big.jpg"],
		[".checkout-4", "/media/img/software/checkout/4-big.jpg"]]);

	buildImageViewers([
		[".enstore-1", "/media/img/software/enstore/1-big.jpg"],
		[".enstore-2", "/media/img/software/enstore/2-big.jpg"],
		[".enstore-3", "/media/img/software/enstore/3-big.jpg"],
		[".enstore-4", "/media/img/software/enstore/4-big.jpg"]]);
	
};

function setupFullScreen() {
	
	$(".fullscreen").each(function() {
		
		node = $(this);
		
		node.css({
			"position":"absolute",
			"top": "0px",
			"left": "0px",
			"right": "0px",
			"bottom": "0px"
		});
		
		
		$(node).css("height", $(document).height());
		
		if ($.browser.msie) {
			
			function resize() {
				$(node).css("width", $(window).width());
			}
			
			resize();

			$(window).scroll(resize);
			$(window).bind('resize', resize);
				
		} 
		
	});
}