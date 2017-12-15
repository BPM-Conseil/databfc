function initPagination() {
	
	if($ === undefined)
	{
		$ = jQuery2;
	}
	
	var listElement = $('table tbody');
	var perPage = Number.parseInt($("#table-per-page").val());
	var txtFilter = $("#table-query-search").val();

	var rows = listElement.children().filter(function(d, i){ return i.innerText.match(txtFilter) != null;});
	var numItems = rows.length;
	var numPages = Math.floor((numItems-1)/perPage) + 1;
	 
	$('.pagination').text("");
	$('.pagination').data("curr",0);

	$('<li><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>').appendTo('.pagination');
	var curr = 0;
	while(numPages > curr){
	  $('<li><a class="page_link">'+(curr+1)+'</a></li>').appendTo('.pagination');
	  curr++;
	}
	$('<li><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>').appendTo('.pagination');
	
	$('.pagination li:nth-child(2)').addClass('active');
	$('.pagination li:first').addClass('disabled');
	$('.pagination li:first a').addClass('disabled');
	if(numItems <= perPage){
		$('.pagination li:last').addClass('disabled');
		$('.pagination li:last a').addClass('disabled');
	}

	listElement.children().css('display', 'none');
	listElement.children().removeClass('item-visible');
	rows.slice(0, perPage).css('display', 'table-row');
	rows.slice(0, perPage).addClass('item-visible');

	$('.pagination li a').click(function(){
		if($(this).hasClass('disabled')) {
			return;
		}
		var clickedPage;
		if($(this).children().length > 0) {
			clickedPage = $(this).children().html().valueOf();
			if(clickedPage == "»") {
				next();
			} else if(clickedPage == "«") {
				previous();
			} else {
				clickedPage = 0;
			}
		} else {
			clickedPage = $(this).html().valueOf() - 1;
			goTo(clickedPage);
		}
		
	});



	function previous(){
	  var goToPage = parseInt($('.pagination').data("curr")) - 1;
	  goTo(goToPage);
	}

	function next(){
	  goToPage = parseInt($('.pagination').data("curr")) + 1;
	  goTo(goToPage);
	}

	function goTo(page){
	  var startAt = page * perPage,endOn = startAt + perPage;
	  
	  rows.css('display','none').slice(startAt, endOn).css('display','table-row');
	 rows.removeClass('item-visible').slice(startAt, endOn).addClass('item-visible');;
      if(page > parseInt($('.pagination').data("curr"))){
		  $('.list-articles').show('slide', {direction: 'right'}, 500);
	  } else {
		  $('.list-articles').show('slide', {direction: 'left'}, 500);
	  }
		
	  $('.pagination').data("curr",page);
	  $('.pagination li').removeClass('active');
	  var res = page + 2;
	  $('.pagination li:nth-child('+res+')').addClass('active');
	  $('.pagination li').removeClass('disabled');
	  $('.pagination li a').removeClass('disabled');
	  if(page == 0) {
		  $('.pagination li:first').addClass('disabled');
		  $('.pagination li:first a').addClass('disabled');
	  } else if(page == numPages -1) {
		  $('.pagination li:last').addClass('disabled');
		  $('.pagination li:last a').addClass('disabled');
	  }
	  
	}
	/*var $container = $('.list-articles');
		$container.imagesLoaded( function () {
			$container.masonry({
				columnWidth: '.list-articles-item',
				itemSelector: '.item-visible'
			});  
		});*/
	 
}