function initPagination() {
	var listElement = jQuery2('#datasets').children('.dataset').filter(function(){
		return !jQuery2(this).hasClass('hide');
	});
	var perPage = 10;
	var txtFilter = jQuery2("#table-query-search").val();

	var rows = listElement;
	var numItems = rows.length;

	var numPages = Math.floor((numItems-1)/perPage) + 1;
	 
	jQuery2('.pagination').text("");
	jQuery2('.pagination').data("curr",0);

	jQuery2('<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>').appendTo('.pagination');
	var curr = 0;
	while(numPages > curr){
	  jQuery2('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo('.pagination');
	  curr++;
	}
	jQuery2('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>').appendTo('.pagination');

	jQuery2('.pagination li:nth-child(2)').after('<li id="dotsStart" style="display:none;"><a class="disabled">...</a></li>');
	//jQuery2('<li id="dotsStart" style="display:none;"><a disabled>...</a></li>').appendTo('.pagination');

	//jQuery2('<li id="dotsSEnd" style="display:none;"><a disabled>...</a></li>').appendTo('.pagination');
	jQuery2('.pagination li:last').prev().before('<li id="dotsSEnd" style="display:none;"><a class="disabled">...</a></li>');

	
	jQuery2('.pagination li:nth-child(2)').addClass('active');
	jQuery2('.pagination li:first').addClass('disabled');
	jQuery2('.pagination li:first a').addClass('disabled');
	if(numItems <= perPage){
		jQuery2('.pagination li:last').addClass('disabled');
		jQuery2('.pagination li:last a').addClass('disabled');
	}


	listElement.css('display', 'none');
	//listElement.children().removeClass('item-visible');
	rows.slice(0, perPage).css('display', 'inline-block');
	//rows.slice(0, perPage).addClass('item-visible');

	jQuery2('.pagination li a').click(function(){
		if(jQuery2(this).hasClass('disabled') || jQuery2(this).html().valueOf() == "...") {
			return;
		}
		var clickedPage;
		if(jQuery2(this).children().length > 0) {
			clickedPage = jQuery2(this).children().html().valueOf();
			if(clickedPage == "»") {
				next();
			} else if(clickedPage == "«") {
				previous();
			} else {
				clickedPage = 0;
			}
		} else {
			clickedPage = jQuery2(this).html().valueOf() - 1;
			goTo(clickedPage);
		}
		
	});

	 jQuery2('.pagination li').each(function(){
	 	if(jQuery2(this).children().html().valueOf() != "...")
	 	{
	 		jQuery2(this).show();
	 	}
		
		if(!Number.isInteger(jQuery2(this).children().html().valueOf()) && jQuery2(this).children().html().valueOf() != 1 && jQuery2(this).children().html().valueOf() != numPages)
		{
			if(jQuery2(this).children('a').html().valueOf() < parseInt(jQuery2('.pagination').data("curr")) -1 ||  jQuery2(this).children('a').html().valueOf() > parseInt(jQuery2('.pagination').data("curr"))+3)
			{
				console.log('hide');
				jQuery2(this).hide();
			}
		}
	});

	 if(numPages > 6)
	 {
	 	jQuery2('#dotsSEnd').show();
	 }





	function previous(){
	  var goToPage = parseInt(jQuery2('.pagination').data("curr")) - 1;
	  goTo(goToPage);
	}

	function next(){
	  goToPage = parseInt(jQuery2('.pagination').data("curr")) + 1;
	  goTo(goToPage);
	}

	function goTo(page){
	  var startAt = page * perPage,endOn = startAt + perPage;
	  
	 rows.css('display','none').slice(startAt, endOn).css('display','inline-block');
	 //rows.removeClass('item-visible').slice(startAt, endOn).addClass('item-visible');;
      if(page > parseInt(jQuery2('.pagination').data("curr"))){
		  jQuery2('.list-articles').show('slide', {direction: 'right'}, 500);
	  } else {
		  jQuery2('.list-articles').show('slide', {direction: 'left'}, 500);
	  }
		
	  jQuery2('.pagination').data("curr",page);
	  jQuery2('.pagination li').removeClass('active');
	  var res = page + 2;

	  jQuery2('.pagination li').filter(function(){
	  	return jQuery2(this).children().html().valueOf() == page + 1;
	  }).addClass('active')

	  //jQuery2('.pagination li:nth-child('+res+')').addClass('active');
	  jQuery2('.pagination li').removeClass('disabled');
	  jQuery2('.pagination li a').removeClass('disabled');
	  if(page == 0) {
		  jQuery2('.pagination li:first').addClass('disabled');
		  jQuery2('.pagination li:first a').addClass('disabled');
	  } else if(page == numPages -1) {
		  jQuery2('.pagination li:last').addClass('disabled');
		  jQuery2('.pagination li:last a').addClass('disabled');
	  }

		jQuery2('.pagination li').each(function(){
			if(jQuery2(this).children().html().valueOf() != "...")
	 		{
	 		jQuery2(this).show();
	 		}
			if(!Number.isInteger(jQuery2(this).children().html().valueOf()) && jQuery2(this).children().html().valueOf() != 1 && jQuery2(this).children().html().valueOf() != numPages)
			{
				if(jQuery2(this).children('a').html().valueOf() < parseInt(jQuery2('.pagination').data("curr")) -1 ||  jQuery2(this).children('a').html().valueOf() > parseInt(jQuery2('.pagination').data("curr"))+3)
				{
					jQuery2(this).hide();
				}
			}
		});

		if(page < numPages -2){
			jQuery2('#dotsSEnd').show();
		}
		else
		{
			jQuery2('#dotsSEnd').hide();
		}
		if(page > 3)
		{
			jQuery2('#dotsStart').show();
		}
		else
		{
			jQuery2('#dotsStart').hide();
		}
	  
	}

	/*var jQuery2container = jQuery2('.list-articles');
		jQuery2container.imagesLoaded( function () {
			jQuery2container.masonry({
				columnWidth: '.list-articles-item',
				itemSelector: '.item-visible'
			});  
		});*/
	 
}