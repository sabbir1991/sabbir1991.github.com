/*javascript code */

var thumbnailSpacing = 15;

$(document).ready(function(){
  $('#debug').html();
   $(".thumbnail_container a.thumbnail").addClass("showMe").addClass("fancybox").attr("rel","group");

   $("a.sortLink").click(function(e){
      $("a.sortLink.selected").removeClass("selected");
      $(this).addClass("selected");
      
      var keyword = $(this).attr("data-keyword"); 
      
      sortingThumbnail(keyword);
    
      e.preventDefault();
   });	
   
   setInterval('resizeGallery()',750);
  	
   positioningThumbnail()
});


function sortingThumbnail(keyword){ 
   	 $(".thumbnail_container a.thumbnail").each(function(){
        var thumbnailKeywords = $(this).attr('data-keywords');

        if(keyword == 'all'){
        	$(this).addClass("showMe").removeClass("hideMe").attr("rel","group");	
        }else{

	        if(thumbnailKeywords.indexOf(keyword) != -1){
               $(this).addClass("showMe").removeClass("hideMe").attr("rel","group");
	        }else{
			   $(this).addClass("hideMe").removeClass("showMe").attr("rel","none");
	        }
       }  
   	 });
   	positioningThumbnail(); 
}


function resizeGallery(){

	var photoWidth = $(".photos").width();
	var thumbnailContainerWidth = $(".thumbnail_container").width();
	var thumbnaiagainwidth = $(".thumbnail_container a.thumbnail img:first-child").outerWidth();
    
    if(photoWidth < thumbnailContainerWidth){
    	positioningThumbnail();
    }

    if((photoWidth - thumbnaiagainwidth) > thumbnailContainerWidth)
    {
    	positioningThumbnail();
    }

}


function positioningThumbnail(){


  $(".thumbnail_container a.thumbnail.hideMe").transition({ opacity: 0, scale: 0 }, 500, 'in', function() {
     $(this).css({'display': 'none' ,'top': '50%', 'left': '50%'});
  });

  var thumbContainer = $('.photos').width();
  var thumbnail_C = 0;
  var thumbnail_R = 0;
  var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing;
  var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing;
  var Max_C = Math.floor(thumbContainer/thumbnailWidth);
  
  $(".thumbnail_container a.thumbnail.showMe").each(function(index){
      
      var remainder = (index%Max_C);

      if(remainder==0){
      	thumbnail_C = 0;
      	if(index != 0){
      		thumbnail_R += thumbnailHeight; 
      	}
      }else{
      	  thumbnail_C +=thumbnailWidth;
      }
     
      $(this).css('display','block').transition({
          'opacity' : 1,
          'scale' : 1,
          'top': thumbnail_R + 'px',
          'left': thumbnail_C + 'px',
      },700);

      var newWidth = Max_C*thumbnailWidth;
      var newHeight = thumbnail_R + thumbnailHeight;

      $(".gallery .photos .thumbnail_container").css({'width': newWidth + 'px','height':newHeight + 'px' });
    
  }); 

  applyFancybox();

   var newsortingdivwidth = $('.thumbnail_container').width()/thumbnailWidth;
   var newWidth = newsortingdivwidth * thumbnailWidth - window.thumbnailSpacing 

   $(".sorting").css({'width':newWidth+'px'});
}

function applyFancybox(){
	$("a.fancybox[rel='group']").fancybox({
		'transitionIn' : 'elastic',
		'transitionOut' : 'elastic',
		'titlePosition' : 'over',
		'speedIn' : 500,
		'overlayColor' : '#000',
		'padding' : 0,
		'overlayOpacity' : .75
	});
}