//var filtreLicence = [];
var filtreProducteur = [];
var filtreGranularite = [];
var filtreFormats = [];
var filtreTags = [];
var ckan;
var tag;
var search;
var typeReq;

var finished = false;

$(document).ready(function(){

	var url_string = window.location;
	// var url = new URL(url_string);

	ckan = $('#data').data(ckan);
	if(ckan == undefined)
	{
		ckan = 'http://51.255.95.107:8900';
	}
	else
	{
		ckan = ckan.ckan;
	}
	
	search = getQueryVariable('search');
	tag = getQueryVariable('tag');

	/*if(url.searchParams.has("search")){
		search = url.searchParams.get("search");
	} else { search = "";}
	if(url.searchParams.has("tag")){
		tag = url.searchParams.get("tag");
	} else { search = "";}*/

	if(tag != undefined && tag != "" && tag != null)
	{
		searchDatasets(null, "tags", true,false);
	}
	else if(search != undefined && search != "" && search != null)
	{
		if($('#search-form input').val() == "")
		{
			$('#search-form input').val(search);
		}
		searchDatasets(null,"text",true,true)
		var sleepyAlert = setInterval(function(){
				if(finished){
					clearInterval(sleepyAlert);


					finished = 0;
					filtreTags = $('#input-tag').val().split(";");
					filtreProducteur = $('#input-producteur').val().split(";");
					filtreGranularite = $('#input-granularite').val().split(";");
					filtreFormats = $('#input-format').val().split(";");

					if(filtreTags.length > 0 && filtreTags[0] != ""){
						for (var i = 0; i < filtreTags.length; i++) {
							var tag = filtreTags[i];
							$('#filter').find('.jetons').append('<li data-tag="' + tag + '">'+ tag +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreTags = [];
					}
					if(filtreGranularite.length > 0 && filtreGranularite[0] != ""){
						for (var i = 0; i < filtreGranularite.length; i++) {
							var granularite = filtreGranularite[i];
							$('#filter').find('.jetons').append('<li data-granularite="' + granularite + '">'+ granularite +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreGranularite = [];
					}
					if(filtreFormats.length > 0 && filtreFormats[0] != ""){
						for (var i = 0; i < filtreFormats.length; i++) {
							var format = filtreFormats[i];
							$('#filter').find('.jetons').append('<li data-format="' + format + '">'+ format +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreFormats = [];
					}
					if(filtreProducteur.length > 0 && filtreProducteur[0] != ""){
						for (var i = 0; i < filtreProducteur.length; i++) {
							finished++;
							$.ajax(ckan + '/api/action/organization_show?id=' + filtreProducteur[i] ,
							{
								success : function(response){

									var title = response.result.title;
									$('#filter').find('.jetons').append('<li data-orga="' + response.result.id + '">'+ title.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
									finished--;
								},
								error : function(){
									finished--;
								},
								type: 'POST',
								dataType: 'jsonp',
							});
							
						}
					} else {
						filtreProducteur = [];
					}
					
					var sleepy2 = setInterval(function(){
						if(finished == 0){
							clearInterval(sleepy2);
							filtrer();
							sort();
						}
					}, 100);
					

				}
			}, 100);
	}
	else
	{	if($('#search-form input').val() == "")
		{
			searchDatasets(null,"init",true,false);
			var sleepyAlert = setInterval(function(){
				if(finished){
					clearInterval(sleepyAlert);


					finished = 0;
					filtreTags = $('#input-tag').val().split(";");
					filtreProducteur = $('#input-producteur').val().split(";");
					filtreGranularite = $('#input-granularite').val().split(";");
					filtreFormats = $('#input-format').val().split(";");

					if(filtreTags.length > 0 && filtreTags[0] != ""){
						for (var i = 0; i < filtreTags.length; i++) {
							var tag = filtreTags[i];
							$('#filter').find('.jetons').append('<li data-tag="' + tag + '">'+ tag +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreTags = [];
					}
					if(filtreGranularite.length > 0 && filtreGranularite[0] != ""){
						for (var i = 0; i < filtreGranularite.length; i++) {
							var granularite = filtreGranularite[i];
							$('#filter').find('.jetons').append('<li data-granularite="' + granularite + '">'+ granularite +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreGranularite = [];
					}
					if(filtreFormats.length > 0 && filtreFormats[0] != ""){
						for (var i = 0; i < filtreFormats.length; i++) {
							var format = filtreFormats[i];
							$('#filter').find('.jetons').append('<li data-format="' + format + '">'+ format +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreFormats = [];
					}
					if(filtreProducteur.length > 0 && filtreProducteur[0] != ""){
						for (var i = 0; i < filtreProducteur.length; i++) {
							finished++;
							$.ajax(ckan + '/api/action/organization_show?id=' + filtreProducteur[i] ,
							{
								success : function(response){

									var title = response.result.title;
									$('#filter').find('.jetons').append('<li data-orga="' + response.result.id + '">'+ title.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
									finished--;
								},
								error : function(){
									finished--;
								},
								type: 'POST',
								dataType: 'jsonp',
							});
							
						}
					} else {
						filtreProducteur = [];
					}
					
					var sleepy2 = setInterval(function(){
						if(finished == 0){
							clearInterval(sleepy2);
							filtrer();
							sort();
						}
					}, 100);
					

				}
			}, 100);
		}
		if($('#search-form input').val() != ""){
			finished = false;
			searchDatasets(null, "text", false,false);
			var sleepyAlert = setInterval(function(){
				if(finished){
					clearInterval(sleepyAlert);


					finished = 0;
					filtreTags = $('#input-tag').val().split(";");
					//filtreLicence = $('#input-licence').val().split(";");
					filtreProducteur = $('#input-producteur').val().split(";");
					filtreGranularite = $('#input-granularite').val().split(";");
					filtreFormats = $('#input-format').val().split(";");

					/*if(filtreLicence.length > 0 && filtreLicence[0] != ""){
						finished++;
						$.ajax(ckan + '/api/action/license_list' ,
						{
							success : function(response){

								licences = response.result;
								for (var i = 0; i < filtreLicence.length; i++) {
									for(var j = 0; j < licences.length; j++){
										if(filtreLicence[i] == licences[j].id){
											$('#filter').find('.jetons').append('<li data-licence="' + filtreLicence[i] + '">'+ licences[j].title.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
										}
									}
									
								}
								finished--;
							},
							error : function(){
								//console.log('erreur');
								finished--;
							},
							type: 'POST',
							dataType: 'jsonp',
						});
					} else {
						filtreLicence = [];
					}*/
					if(filtreTags.length > 0 && filtreTags[0] != ""){
						for (var i = 0; i < filtreTags.length; i++) {
							var tag = filtreTags[i];
							$('#filter').find('.jetons').append('<li data-tag="' + tag + '">'+ tag +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreTags = [];
					}
					if(filtreGranularite.length > 0 && filtreGranularite[0] != ""){
						for (var i = 0; i < filtreGranularite.length; i++) {
							var granularite = filtreGranularite[i];
							$('#filter').find('.jetons').append('<li data-granularite="' + granularite + '">'+ granularite +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreGranularite = [];
					}
					if(filtreFormats.length > 0 && filtreFormats[0] != ""){
						for (var i = 0; i < filtreFormats.length; i++) {
							var format = filtreFormats[i];
							$('#filter').find('.jetons').append('<li data-format="' + format + '">'+ format +' <span class="glyphicon glyphicon-remove"></span></li>');
						}
					} else {
						filtreFormats = [];
					}
					if(filtreProducteur.length > 0 && filtreProducteur[0] != ""){
						for (var i = 0; i < filtreProducteur.length; i++) {
							finished++;
							$.ajax(ckan + '/api/action/organization_show?id=' + filtreProducteur[i] ,
							{
								success : function(response){

									var title = response.result.title;
									$('#filter').find('.jetons').append('<li data-orga="' + response.result.id + '">'+ title.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
									finished--;
								},
								error : function(){
									//console.log('erreur');
									finished--;
								},
								type: 'POST',
								dataType: 'jsonp',
							});
							
						}
					} else {
						filtreProducteur = [];
					}
					
					var sleepy2 = setInterval(function(){
						if(finished == 0){
							clearInterval(sleepy2);
							filtrer();
							sort();
						}
					}, 100);
					

				}
			}, 100);

			
		}
		
	}
	
	/* var listeTitres = [];
	var listeProducteur = [];
	var listeIdProducteur= []; */
	/* 

	
	$.ajax(ckan + '/api/action/package_search?q=text:*&rows=1000',{
		success : function(response){
			for (var i = 0; i < response.result.results.length; i++) {

				listeTitres.push(response.result.results[i].title);
				if (listeProducteur.indexOf(response.result.results[i].organization.title) == -1)
				{
					listeProducteur.push(response.result.results[i].organization.title);
					listeIdProducteur.push(response.result.results[i].organization.name);
				}

			}
			
			var listeSource = listeTitres.concat(listeProducteur);
			listeSource.sort(function(a,b)
				{
					if(a > b)
					{
						return 1;
					}
					else if(a < b)
					{
						return -1;
					}
					else
					{
						return 0;
					}

			});
			$("#barreRecherche input").autocomplete({
				source: function(request, response) {
						var results = $.ui.autocomplete.filter(listeSource, request.term); 
						var resultats = results.slice(0,10);
						//console.log(resultats);
						// for (var i = 0; i < resultats.length; i++) {
						// 	resultats[i] = resultats[i].replace(request.term,'<b>'+request.term+'</b>');
						// }

						response(resultats);
					},
				select : function(event,ui){
					$('#search-form input').val(ui.item.value);
					if(listeProducteur.indexOf(ui.item.label) != -1)
					{
						var idProd = listeIdProducteur[listeProducteur.indexOf(ui.item.label)];
						searchDatasets(null, idProd,true,false);
					}
					else
					{
						searchDatasets(null, "text",true,true);
					}
				}
			});
		},
		error : function(){
			alert('erreur_package_search_autocomplete');
		},
		type: 'POST',
		dataType: 'json',
		jsonp : 'json.wrf',

	}); */
	
	autoComplete();
	
	/*$.ajax(ckan + '/api/action/package_search?q=text:*&rows=1000',
	{
		type: 'POST',
		dataType: 'jsonp',
		jsonpCallback: 'autoComplete',
		cache: true,
		error : function(){
			console.log("erreur autocomplete");
		}
	});*/


	$("#search-form").submit(function(e) {
	   searchDatasets(e, "text", true,false);
	});


	$('#datasets').on('click','h2',function(){
		window.location.href = 'visualisation?id=' + $(this).data('id') + '&serveur=' + ckan;
	});
	
	$('#datasets ').on('click','.jetons .tag',function(){
		tag = $(this).text();
		searchDatasets(null, "tags", true,false);
	});


	$('#list-producteur').on('click','li',function(){
		var id = $(this).data('orga');
		filtrerProducteur(id,$(this).text());
	});
	/*$('#list-licence').on('click','li',function(){
		var licence = $(this).data('licence');
		filtrerLicence(licence,$(this).text());
	});*/
	$('#list-granularite').on('click','li',function(){
		var granularite = $(this).data('granularite');
		filtrerGranularite(granularite);
	});
	$('#list-format').on('click','li',function(){
		var format = $(this).data('format');
		filtrerFormat(format);
	});
	$('#list-tag').on('click','li',function(){
		var tag = $(this).data('tag');
		filtrerTag(tag);
	});

	$('#reset-filters').on('click',function(event){			//clic sur Supprimer Tout
		//filtreLicence = [];
		filtreProducteur = [];
		filtreGranularite = [];
		filtreFormats = [];
		filtreTags = [];

		$('.dataset').each(function(){
			$(this).removeClass('hide');
		})
		$('#filter').find('.jetons').children().remove();
		filtrer();
		event.preventDefault;
		return false;
	});

	$('.jetons').on('click','span',function(){
		/*if(typeof $(this).parent().data("licence") != "undefined"){
			for (var i = 0; i < filtreLicence.length; i++) {
				if(filtreLicence[i] == $(this).parent().data('licence')){
					filtreLicence.splice(i,1);
				}
			}
			$('#input-licence').val(filtreLicence.join(";"));
		}*/if(typeof $(this).parent().data("orga") != "undefined"){
			for (var j= 0; j < filtreProducteur.length; j++) {
				if(filtreProducteur[j] == $(this).parent().data('orga')){
					filtreProducteur.splice(j,1);
				}
			}
			$('#input-producteur').val(filtreProducteur.join(";"));
		} else if(typeof $(this).parent().data("granularite") != "undefined"){
			for (var k= 0; k < filtreGranularite.length; k++) {
				if(filtreGranularite[k] == $(this).parent().data('granularite')){
					filtreGranularite.splice(k,1);
				}
			}
			$('#input-granularite').val(filtreGranularite.join(";"));
		} else if(typeof $(this).parent().data("format") != "undefined"){
			for (var l= 0; l < filtreFormats.length; l++) {
				if(filtreFormats[l] == $(this).parent().data('format')){
					filtreFormats.splice(l,1);
				}
			}
			$('#input-format').val(filtreFormats.join(";"));
		} else if(typeof $(this).parent().data("tag") != "undefined"){
			for (var m= 0; m < filtreTags.length; m++) {
				if(filtreTags[m] == $(this).parent().data('tag')){
					filtreTags.splice(m,1);
				}
			}
			$('#input-tag').val(filtreTags.join(";"));
		} 
		
		$(this).parent().remove();
		filtrer();
	});


	$('.list-group').on('mouseenter','li',function(){
		$(this).addClass('active');
		$(this).css({'cursor' : 'pointer'});
	});
	$('.list-group').on('mouseleave','li',function(){
		$(this).removeClass('active');
		$(this).css({'cursor' : 'default'});
	});

	$('#filter select').change(function(){
		sort();
	});	


});

function autoComplete(response)
{
	var listeTitres = [];
	var listeProducteur = [];
	var listeIdProducteur= [];
	
	$.getJSON("/sites/default/files/api/portail_bfc/liste_autocomplete.json", function(json) {
    	console.log(json); // this will show the info it in firebug console
	});

	for (var i = 0; i < response.result.results.length; i++) {

				listeTitres.push(response.result.results[i].title);
				if (listeProducteur.indexOf(response.result.results[i].organization.title) == -1)
				{
					listeProducteur.push(response.result.results[i].organization.title);
					listeIdProducteur.push(response.result.results[i].organization.name);
				}

			}
			
			var listeSource = listeTitres.concat(listeProducteur);
			listeSource.sort(function(a,b)
				{
					if(a > b)
					{
						return 1;
					}
					else if(a < b)
					{
						return -1;
					}
					else
					{
						return 0;
					}

			});
			$("#barreRecherche input").autocomplete({
				source: function(request, response) {
						var results = $.ui.autocomplete.filter(listeSource, request.term); 
						var resultats = results.slice(0,10);
						//console.log(resultats);
						// for (var i = 0; i < resultats.length; i++) {
						// 	resultats[i] = resultats[i].replace(request.term,'<b>'+request.term+'</b>');
						// }

						response(resultats);
					},
				select : function(event,ui){
					$('#search-form input').val(ui.item.value);
					if(listeProducteur.indexOf(ui.item.label) != -1)
					{
						var idProd = listeIdProducteur[listeProducteur.indexOf(ui.item.label)];
						searchDatasets(null, idProd,true,false);
					}
					else
					{
						searchDatasets(null, "text",true,true);
					}
				}
			});
}

function autoComplete()
{
	$.getJSON("/sites/default/files/api/portail_bfc/liste_autocomplete.json", function(json) {

		console.log(json);

	    var listeTitres = [];
		var listeProducteur = [];
		var listeIdProducteur= [];

		for (var prod in json) {

			listeProducteur.push(prod);
			for (var titre in json[prod])
			{
				listeTitres.push(json[prod][titre]);
			}
			// listeTitres.push(json.results[i].title);
			// if (listeProducteur.indexOf(response.result.results[i].organization.title) == -1)
			// {
			// 	listeProducteur.push(response.result.results[i].organization.title);
			// 	listeIdProducteur.push(response.result.results[i].organization.name);
			// }

		}
		
		var listeSource = listeTitres.concat(listeProducteur);
		listeSource.sort(function(a,b)
			{
				if(a > b)
				{
					return 1;
				}
				else if(a < b)
				{
					return -1;
				}
				else
				{
					return 0;
				}

		});
		$("#barreRecherche input").autocomplete({
			source: function(request, response) {
					var results = $.ui.autocomplete.filter(listeSource, request.term); 
					var resultats = results.slice(0,10);
					//console.log(resultats);
					// for (var i = 0; i < resultats.length; i++) {
					// 	resultats[i] = resultats[i].replace(request.term,'<b>'+request.term+'</b>');
					// }

					response(resultats);
				},
			select : function(event,ui){
				$('#search-form input').val(ui.item.value);
				// if(listeProducteur.indexOf(ui.item.label) != -1)
				// {
				// 	var idProd = listeIdProducteur[listeProducteur.indexOf(ui.item.label)];
				// 	searchDatasets(null, idProd,true,false);
				// }
				// else
				// {
				 	searchDatasets(null, "text",true,true);
				// }
			}
		});
	});

	
}


function searchDatasets(event, type, doCLear,auto)
{
	//filtreLicence = [];
	filtreProducteur = [];
	filtreGranularite = [];
	filtreFormats = [];
	filtreTags = [];
	typeReq = type;

	$('#list-producteur').find('li').remove();
	//$('#list-licence').find('li').remove();
	$('#list-granularite').find('li').remove();
	$('#list-format').find('li').remove();
	$('#list-tag').find('li').remove();
	$('.alert-info').remove();
	$('#datasets').find('.dataset').remove();

	$('#filter').find('.jetons').children().remove();
	
	if(doCLear)	$("select").val($("select option:first").val());

	$('#nb_jeux').text(0);

	name = $('#search-form input').val();
	name = name.toLowerCase();

	var package_list;

	var requete = "q=";
	
	var pertinence = "";

	if(type == "tags")
	{
		requete += 'text:*' 
	}
	else if(type == "init")
	{
		requete += 'text:*';
	}
	else if(type == "text")
	{
		if(event != null) event.preventDefault();
		if (name == "") name = "*";
		requete += 'text:' + name
	}
	else
	{
		requete += 'text:'+type;
		pertinence = "&defType=edismax&qf=organization^2.0";
	}
	
	
	if(auto)
	{
		pertinence = "&defType=edismax&qf=title^3.0+notes^1.0";
	}

	/* var n = 0;
	var numDataset = 0; */

	 //requete pour obtenir la liste des packages
	/* $.ajax(ckan + '/api/action/package_search?' + requete + '&rows=1000'  + pertinence,
		{
			success : function(response){

				if(response.result.count == 0){
					$('#datasets').append('<div class="alert alert-info">Aucun jeu de données trouvé</div>');
				}
				numDataset = response.result.count;

				package_list = response.result.results;

				//console.log(response);

				for (var i = package_list.length-1; i >= 0; i--) {

					createDataset(package_list[i]);
					n++;
					if(n == numDataset)
					{
						initPagination();
						if(type == "tags")
						{
							filtrerTag(tag);
						}
						sortProducteur();
					}
				}

				finished = true;
			},
			error : function(){
				//console.log('erreur');
				finished = true;
			},
			type: 'POST',
	    	dataType: 'json',
	    	jsonp : 'json.wrf',
		}); */
		
		$.ajax(ckan + '/api/action/package_search?' + requete + '&rows=1000'  + pertinence,
		{
			type: 'POST',
			dataType: 'jsonp',
			jsonpCallback: 'getDonneesCkan',
			cache : true,
			error : function(){
				console.log("erreur callback");
			}
		});
}
 
function getDonneesCkan(json)
{
	var n = 0;
	var numDataset = 0;
	
	if(json.result.count == 0){
		$('#datasets').append('<div class="alert alert-info">Aucun jeu de données trouvé</div>');
	}
	numDataset = json.result.count;

	package_list = json.result.results;

	//console.log(json);

	for (var i = package_list.length-1; i >= 0; i--) {

		createDataset(package_list[i]);
		n++;
		if(n == numDataset)
		{
			initPagination();
			if(typeReq == "tags")
			{
				filtrerTag(tag);
			}
			sortProducteur();
		}
	}

	finished = true;
} 
 
 
function sort()
{
	if($("select option:selected").val() == "alpha")
	{
		var tri = $('.dataset');

		tri.sort(function(a,b){

			var titreA = $(a).find('h2').text().toLowerCase();
			var titreB = $(b).find('h2').text().toLowerCase();


			if(titreA < titreB){
				return -1;
			}
			else if (titreA > titreB){
				return 1;
			}
			else return 0;
		})
		$('#datasets').find('.dataset').remove();
		$('#datasets').append(tri);
	}
	else if($("select option:selected").val() == "date")
	{
		var tri = $('.dataset');
		tri.sort(function(a,b)
		{
			var timeB = $(b).data('time');
			var timeA = $(a).data('time');

			if(timeA < timeB){
				return 1;
			}
			else if (timeA > timeB){
				return -1;
			}
			else return 0;
		})
		$('#datasets').find('.dataset').remove();
		$('#datasets').append(tri);
	}
	else if($("select option:selected").val() == "producteur")
	{
		var tri = $('.dataset');
		tri.sort(function (a,b) 
		{

			var producteurA = $(a).find('#nomOrga').text().toLowerCase();
			var producteurB = $(b).find('#nomOrga').text().toLowerCase();

			if(producteurA < producteurB){
				return -1;
			}
			else if (producteurA > producteurB){
				return 1;
			}
			else return 0;

		})

		$('#datasets').find('.dataset').remove();
		$('#datasets').append(tri);
	}
	else if($("select option:selected").val() == "granularite")
	{
		var tri = $('.dataset');
		tri.sort(function (a,b) 
		{
			var granulariteA = $(a).data('granularite').toLowerCase();
			var granulariteB = $(b).data('granularite').toLowerCase();

			if(granulariteA < granulariteB){
				return 1;
			}
			else if (granulariteA > granulariteB){
				return -1;
			}
			else return 0;

		})

		$('#datasets').find('.dataset').remove();
		$('#datasets').append(tri);
	}
	else if($("select option:selected").val() == "reutilisation")
	{
		var tri = $('.dataset');
		tri.sort(function (a,b) 
		{
			var reusesA = $(a).data('reuses');
			var reusesB = $(b).data('reuses');

			if(reusesA < reusesB){
				return 1;
			}
			else if (reusesA > reusesB){
				return -1;
			}
			else return 0;

		})

		$('#datasets').find('.dataset').remove();
		$('#datasets').append(tri);
	}
	initPagination();
}

function sortProducteur()
{
	var tri = $('#list-producteur li');

		tri.sort(function(a,b){

			var titreA = $(a).text().toLowerCase();
			var titreB = $(b).text().toLowerCase();


			if(titreA < titreB){
				return -1;
			}
			else if (titreA > titreB){
				return 1;
			}
			else return 0;
		})
		$('#list-producteur').find('li').remove();
		$('#list-producteur').append(tri);
}


function createDataset(data)
{
	
	////////////////////
	var name_orga = data.organization.title;
	var id_orga = data.organization.id;

	$('#nb_jeux').text(+$('#nb_jeux').text() + 1);

	if($('#list-producteur').find("[data-orga='" + id_orga + "']").length == 0)
	{
		$('#list-producteur').append('<li class="list-group-item" data-orga="' + id_orga+'">' + name_orga + 
		'<span class="badge">' + 1 + '</span></li>');
	}
	else
	{
		$('#list-producteur').find("[data-orga='" + id_orga + "']").find('span').text(+$('#list-producteur').find("[data-orga='" + id_orga + "']").find('span').text() + 1);
	}
	//////////////////////

	/*var licence_titre = data.license_title;
	var licence_id = data.license_id;

	if($('#list-licence').find("[data-licence='" + licence_id + "']").length == 0)
	{
		$('#list-licence').append('<li class="list-group-item" data-licence="' + licence_id +'">' + licence_titre + 
		' <span class="badge">' + 1 + '</span></li>');
	}
	else
	{
		$('#list-licence').find("[data-licence='" + licence_id + "']").find('span').text(+$('#list-licence').find("[data-licence='" + licence_id + "']").find('span').text() + 1);
	}*/

	///////////////////

	var granularite = data.extras.filter(function(element){
		return element.key == 'granularite';
	});


	var li_granularite ="";

	if(granularite.length != 0)
	{
		switch(granularite[0].value)
		{
		case 'other' : granularite = 'Autre'; break;
						
		case 'fr:commune' : granularite = 'Commune'; break;
							
		case 'country' : granularite = 'Pays'; break;
						
		case 'fr:region' : granularite = 'Region'; break;

		case 'fr:departement' : granularite = 'Departement'; break;

		case 'fr:epci' : granularite = 'EPCI'; break;

		default : granularite = granularite[0].value;
		}

		li_granularite = '<ul><li class="titre">Echelle territoriale</li><li class="info">' + granularite + '</li></ul>';

		if($('#list-granularite').find("[data-granularite='" + granularite + "']").length == 0)
		{
			$('#list-granularite').append('<li class="list-group-item" data-granularite="' + granularite +'">' + granularite + 
			' <span class="badge">' + 1 + '</span></li>');
		}
		else
		{
			$('#list-granularite').find("[data-granularite='" + granularite + "']").find('span').text(+$('#list-granularite').find("[data-granularite='" + granularite + "']").find('span').text() + 1);
		}
	}

	///////////////

	var reuses = data.extras.filter(function(element){
		return element.key == 'utilisations';
	});

	var li_reuses = "";

	if(reuses != undefined)
	{
		li_reuses = '<ul><li class="titre">Réutilisations</li><li class="info">' + reuses[0].value + '</li></ul>';
	}

	//////////////

	var modif = data.extras.filter(function(element){
		return element.key == 'last_update(data.gouv)';
	})[0].value;

	var date = new Date(Date.UTC(modif.substring(0,4),+modif.substring(5,7) - 1,+modif.substring(8,10),+modif.substring(11,13),+modif.substring(14,16)));
	var heure = (date.toLocaleTimeString()).substring(0,5);

	/////////////
	var tagList = "";

	for (var i = 0; i < data.tags.length; i++) 
	{
		var tag = data.tags[i].name;
		tagList += '<li class="tag">'+ tag +'</li>';		

		if($('#list-tag').find("[data-tag='" + tag + "']").length == 0)
		{
			$('#list-tag').append('<li class="list-group-item" data-tag="' + tag +'">' + tag + 
			' <span class="badge">' + 1 + '</span></li>');
		}
		else
		{
			$('#list-tag').find("[data-tag='" + tag + "']").find('span').text(+$('#list-tag').find("[data-tag='" + tag + "']").find('span').text() + 1);
		}
	}

	////////////
	var id = data.id;

	///////////
	var description = data.notes;

	if(description.indexOf("__Origine__") != -1)
	{
		description = description.substring(0,description.indexOf("__Origine__"));
	}
	description = description.substring(0,150) + "...";

	/////////

	var listeFormat = '<ul class="listeFormat">';
	for (var i = 0; i < data.resources.length; i++)
	{
		var type = data.resources[i].format;

		listeFormat += '<li class="format" data-format="'+ type.toLowerCase() +'">'+ type +'</li>';


		if($('#list-format').find("[data-format='" + type + "']").length == 0)
		{
			$('#list-format').append('<li class="list-group-item" data-format="' + type +'">' + type + 
			' <span class="badge">' + 1 + '</span></li>');
		}
		else
		{
			$('#list-format').find("[data-format='" + type + "']").find('span').text(+$('#list-format').find("[data-format='" + type + "']").find('span').text() + 1);
		}

	}
	listeFormat += '</ul>';


	//<ul><li class="titre">Licence</li><li class="info">'+ licence_titre + '</li></ul>
	//" data-licence="' + licence_id +'

	
	$('#datasets').prepend(
		'<div class="dataset" data-orga="' + id_orga +'" data-reuses="'+ reuses[0].value +'" data-granularite="'+ granularite +'" data-id="' + id +'" data-time="' + date.getTime() +'">'
			
			+'<div class="row">'
				+'<div class="col-md-6 inner">'+'<h2  data-id="' + id +'"> ' + data.title + ' </h2><p>' + description + '</p>'+ listeFormat +'</div>'
				+'<div class="col-md-6 infos inner"><ul><li class="titre">Producteur</li><li class="info" id="nomOrga">'
	+ data.organization.title + '</li></ul><ul><li class="titre">Date modification</li><li class="info">' + date.toLocaleDateString() +
	 '</ul>'+ li_granularite + li_reuses +'<ul class="jetons">' + tagList +'</ul></div>'
	 		+'</div>'
	 	+'</div>');

}


function filtrerProducteur(producteur,name)
{
	if($.inArray(producteur, filtreProducteur) == -1)
	{
	$('#filter').find('.jetons').append('<li data-orga="' + producteur + '">'+ name.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
	filtreProducteur.push(producteur);
	$('#input-producteur').val(filtreProducteur.join(";"));
	filtrer();
	}
}

/*function filtrerLicence(licence,name)
{ 
	if($.inArray(licence, filtreLicence) == -1)
	{
		$('#filter').find('.jetons').append('<li data-licence="' + licence + '">'+ name.replace(/[0-9]/g, '') +' <span class="glyphicon glyphicon-remove"></span></li>');
		filtreLicence.push(licence);
		$('#input-licence').val(filtreLicence.join(";"));
		filtrer();
	}
}*/

function filtrerGranularite(granularite)
{ 
	if($.inArray(granularite, filtreGranularite) == -1)
	{
		$('#filter').find('.jetons').append('<li data-granularite="' + granularite + '">'+ granularite +' <span class="glyphicon glyphicon-remove"></span></li>');
		filtreGranularite.push(granularite)
		$('#input-granularite').val(filtreGranularite.join(";"));;
		filtrer();
	}
}

function filtrerFormat(format)
{
	if($.inArray(format, filtreFormats) == -1)
	{
		$('#filter').find('.jetons').append('<li data-format="' + format + '">'+ format +' <span class="glyphicon glyphicon-remove"></span></li>');
		filtreFormats.push(format);
		$('#input-format').val(filtreFormats.join(";"));
		filtrer();
	}
}

function filtrerTag(tag)
{
	if($.inArray(tag, filtreTags) == -1)
	{
		$('#filter').find('.jetons').append('<li data-tag="' + tag + '">'+ tag +' <span class="glyphicon glyphicon-remove"></span></li>');
		filtreTags.push(tag);
		$('#input-tag').val(filtreTags.join(";"));
		filtrer();
	}
}



function filtrer()
{
//	//console.log(filtreFormats);

	$('#datasets').find('.dataset').each(function(){
		$(this).removeClass('hide');
		

		/*var licenceOk = false;
		if(filtreLicence.length == 0){
			licenceOk = true
		}*/

		var producteurOk = false;
		if(filtreProducteur.length == 0){
			producteurOk = true
		}

		var granulariteOk = false;
		if(filtreGranularite.length == 0){
			granulariteOk = true;
		}

		var formatOk = false;
		if(filtreFormats.length == 0){
			formatOk = true;
		}

		var tagOk = false;
		if(filtreTags.length == 0){
			tagOk = true;
		}

		/*for (var i = 0; i < filtreLicence.length; i++)
		{
			licenceOk = ($(this).data('licence') == filtreLicence[i]) || licenceOk;
		}*/

		for (var j = 0; j < filtreProducteur.length; j++)
		{
			producteurOk = ($(this).data('orga') == filtreProducteur[j]) || producteurOk;
		}

		for (var k = 0; k < filtreGranularite.length; k++)
		{
			granulariteOk = ($(this).data('granularite') == filtreGranularite[k]) || granulariteOk;
		}
		var innerFormatOk;
		for (var l = 0; l < filtreFormats.length; l++)
		{
			innerFormatOk = false;
			$(this).find('.format').each(function(){
				innerFormatOk = ($(this).text() == filtreFormats[l]) || innerFormatOk;
				////console.log($(this).text());
			});
			if(l == 0){
				formatOk = innerFormatOk;
			} else {
				formatOk = formatOk && innerFormatOk;
			}
		}
		////console.log(formatOk);
		var innerTagOk;
		for (var m = 0; m < filtreTags.length; m++)
		{
			innerTagOk = false;
			$(this).find('.tag').each(function(){
				innerTagOk = ($(this).text() == filtreTags[m]) || innerTagOk;
				
			});
			if(m == 0){
				tagOk = innerTagOk;
			} else {
				tagOk = tagOk && innerTagOk;
			}
		}

		if(!(producteurOk && granulariteOk && formatOk && tagOk))
		{
			$(this).addClass('hide');
		}
	});	
	
	$('#nb_jeux').text(0);
	$('#list-format').children().each(function(){
		$(this).find('span').text(0);
	});
	$('#list-producteur').children().each(function(){
		$(this).find('span').text(0);
	});
	/*$('#list-licence').children().each(function(){
		$(this).find('span').text(0);
	});*/
	$('#list-granularite').children().each(function(){
		$(this).find('span').text(0);
	});
	$('#list-tag').children().each(function(){
		$(this).find('span').text(0);
	});

	$('#datasets').find('.dataset').each(function(){
		if(!$(this).hasClass('hide')){
			$('#nb_jeux').text(+ $('#nb_jeux').text() + 1);
			$('#list-granularite').find("[data-granularite='" + $(this).data('granularite') + "']").find('span').text(+$('#list-granularite').find("[data-granularite='" + $(this).data('granularite') + "']").find('span').text()+1);
			$('#list-producteur').find("[data-orga='" + $(this).data('orga') + "']").find('span').text(+$('#list-producteur').find("[data-orga='" + $(this).data('orga') + "']").find('span').text()+1);
			//$('#list-licence').find("[data-licence='" + $(this).data('licence') + "']").find('span').text(+$('#list-licence').find("[data-licence='" + $(this).data('licence') + "']").find('span').text()+1);
			$(this).find('.listeFormat').children().each(function(){
				$('#list-format').find("[data-format='" + $(this).text() + "']").find('span').text(+$('#list-format').find("[data-format='" + $(this).text() + "']").find('span').text()+1);	
			});
			$(this).find('.jetons').children().each(function(){
				$('#list-tag').find("[data-tag='" + $(this).text() + "']").find('span').text(+$('#list-tag').find("[data-tag='" + $(this).text() + "']").find('span').text()+1);
			});
		}
	});

	$('#filter').find('span').each(function(){
		$(this).parent().show();
		if($(this).text() == '0'){
			$(this).parent().hide();
		}
	});
	initPagination();

}

function getUrl(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}


function dialog(titre, message){
	if (!$('#dataConfirmModal').length) {
		$('body').append('<div id="dataConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true">'+
		'<div class="modal-dialog">'+
		'<div class="modal-content">'+
		'<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="dataConfirmLabel">'+ titre +'</h3></div>'+
		'<div class="modal-body"><textarea style="width:100%; height:100px; max-width:100%;min-width:100%;">'+ message +'</textarea></div>'+
		'<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button></div></div></div></div>');
	}
	$('#dataConfirmModal').find('.modal-body').text($(this).attr('data-confirm'));
	$('#dataConfirmModal').modal({show:true});
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return "";
}

/*
	$.ajax(ckan + '/api/action/package_list',
		{
			success : function(response){

				package_list = response.result;


				var n = 0;

				//requetes pour obtenir les packages dont le titre contient le mot de la recherche
				for (var i = 0; i < package_list.length; i++) {
					
					$.ajax(ckan + '/api/action/package_show',
					{
					data : {
						id : package_list[i]
					},
					success : function(response){
						
						if(((response.result.title).toLowerCase()).includes(name))
						{
							createDataset(response.result);
							////console.log(response);
							resultat = true;
						}

						n++;

						if(n == package_list.length && !resultat){
							$('#datasets').append('<div class="alert alert-info">Aucun jeu de donnÃ©es trouvÃ© :(</div>');
						}
						
					},
					error : function(){
						//console.log('erreur');
					},
					type: 'POST',
			    	dataType: 'jsonp'
					});
				}
				
			},
			error : function(){
				//console.log('erreur');
			},
			type: 'POST',
	    	dataType: 'jsonp'
		});*/
