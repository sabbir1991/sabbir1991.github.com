/*javascript code */

var thumbnailSpacing = 15;

$(document).ready(function(){

   $("a.sortLink").click(function(e){
      $("a.sortLink.selected").removeClass("selected");
      $(this).addClass("selected");
   });	

   $(".thumbnail_container a.thumbnail").addClass("showMe");	
   positioningThumbnail()
});



function positioningThumbnail(){
  $('#debug').html();
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
     
      $(this).css('display','block').animate({
          'opacity' : 1,
          'top': thumbnail_R + 'px',
          'left': thumbnail_C + 'px',
      },2000);

      var newWidth = Max_C*thumbnailWidth;
      var newHeight = thumbnail_R + thumbnailHeight;

      $(".gallery .photos .thumbnail_container").css({'width': newWidth + 'px','height':newHeight + 'px' });
    
  }); 

  
}