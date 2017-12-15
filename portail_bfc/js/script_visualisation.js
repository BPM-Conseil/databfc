$(document).ready(function(){


	var url_string = window.location.href;
	//var url = new URL(url_string);
	//var ckan = url.searchParams.get("serveur");
	//id_dataset = url.searchParams.get("id");

	var ckan = getQueryVariable('serveur');
	id_dataset = getQueryVariable('id');
	
	// var ckan = getUrl("serveur");
	// var id_dataset = getUrl("id");

	features, properties = [], allProperties = [];


	$.ajax(ckan + '/api/action/package_show',
		{
		data : {
			id : id_dataset
		},
		success : function(response){
			getDonnees(response.result);
			var id_datagouv = response.result.extras.find(function(element){
				return element.key == 'id_datagouv';
			}).value;

			$.ajax('http://www.data.gouv.fr/api/1/reuses/?page_size=10000&dataset=' + id_datagouv , {
				success : function(response){
					getReuses(response.data);
				},
				error : function(){
					//console.log('erreur reuses');
				}
			});													   
		},
		error : function(e){
			//console.log('erreur');
		},
		type: 'POST',
    	dataType: 'jsonp'
		});
	$('#resources .titreDepliant').on('click',function(){

		var glyph = $(this).children('.glyphicon');

		if($('#listeFichier').css('display')=='none'){
			glyph.removeClass('glyphicon-chevron-right');
			glyph.addClass('glyphicon-chevron-down');
		}
		else
		{
			glyph.removeClass('glyphicon-chevron-down');
			glyph.addClass('glyphicon-chevron-right');	
		}

		$('#listeFichier').slideToggle();

	});
	
	
	$('#reutilisation .titreDepliant').on('click',function(){
		var glyph = $(this).children('.glyphicon');
		if($('#listeReuses').css('display')=='none'){
			glyph.removeClass('glyphicon-chevron-right');
			glyph.addClass('glyphicon-chevron-down');
		}
		else
		{
			glyph.removeClass('glyphicon-chevron-down');
			glyph.addClass('glyphicon-chevron-right');	
		}
		$('#listeReuses').slideToggle();
	});	
	$('.map-visu .titreDepliant').on('click',function(){
		var glyph = $(this).children('.glyphicon');
		if($('.map-visu>.inner').css('display')=='none'){
			glyph.removeClass('glyphicon-chevron-right');
			glyph.addClass('glyphicon-chevron-down');
		}
		else
		{
			glyph.removeClass('glyphicon-chevron-down');
			glyph.addClass('glyphicon-chevron-right');	
		}
		$('.map-visu>.inner').slideToggle();
		resizeMap();
	});
	$('.chart-visu .titreDepliant').on('click',function(){
		var glyph = $(this).children('.glyphicon');
		if($('.chart-visu>.inner').css('display')=='none'){
			glyph.removeClass('glyphicon-chevron-right');
			glyph.addClass('glyphicon-chevron-down');
		}
		else
		{
			glyph.removeClass('glyphicon-chevron-down');
			glyph.addClass('glyphicon-chevron-right');	
		}
		$('.chart-visu>.inner').slideToggle();
	});
	$('.table-visu .titreDepliant').on('click',function(){
		var glyph = $(this).children('.glyphicon');
		if($('.table-visu>.inner').css('display')=='none'){
			glyph.removeClass('glyphicon-chevron-right');
			glyph.addClass('glyphicon-chevron-down');
		}
		else
		{
			glyph.removeClass('glyphicon-chevron-down');
			glyph.addClass('glyphicon-chevron-right');	
		}
		$('.table-visu>.inner').slideToggle();
	});
												  
	$('#export-widget').on('click',function(){
		dialog('Affichez ce jeu de données dans votre site Web en copiant le code ci-dessous.','<script src="'+ window.location.origin+'/sites/default/files/api/portail_bfc/js/widget-script.js" type="text/javascript"></script><div class="container" data-id="'+ id_dataset +'" data-serveur="'+ ckan +'" id="widget-container" ></div>');
		//alert('<script src="widget-script.js" type="text/javascript"></script><div class="container" data-id="'+ id_dataset +'" data-serveur="'+ ckan +'" id="widget-container"></div>');
	});

	$('.well').on('click','.tag',function(){
		window.location = 'portail?tag=' + $(this).text();
	});
	
	$('.navbar li').on('click',function(){
		
			if($(this).hasClass("disabled"))
			{
				return;
			}
		
			$('.infos').hide();
			$('#resources').hide();
			$('.map-visu').hide();
			$('.chart-visu').hide();
			$('#reutilisation').hide();
			$('.table-visu').hide();

			
			$('.navbar .active').removeClass("active");
			$(this).addClass("active");

		switch($(this).text())
		{
			case "Descriptif" :
				$('.infos').show();
				$('#resources').show();
				break;
			case "Table" : 
				$('.table-visu').show();
				break;
			case "Carte" : 
				$('.map-visu').show();
				resizeMap();
				break;
			case "Réutilisation(s)" :
				$('#reutilisation').show();
				break;
			case "Graphe" : 
				$('.chart-visu').show();
				break;
		}
	});

	$('#admin-preset button').on('click',function(){
		var request = new Object();
		var data = new Object();
		
		request.action = "create";
		data.id = id_dataset;
		data.chart = $("#choice-chart-select").val();
		data.type = $("#choice-type-select").val();
		data.x = $("#choice-x-select").val();
		data.y = $("#choice-y-select").val();
		data.ytype = $("#choice-y-type-select").val();
		data.x2 = $("#choice-x2-select").val();
		data.ylist = JSON.stringify($(".y-list input[name=y-list]:checked").map(function() {  return $( this ).val();  }).get());
		request.data = data;
		
		$.ajax({
			type : "POST",
		    dataType : "json",
		    url : "../Admin_preset.php", 
			data : request,
			success : function(response){
				$('#admin-preset').append('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>Visualisation sauvegardée avec succès !</span></div>');
			},
			error : function(e){
				console.log(e);
				$('#admin-preset').append('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Echec dans la sauvegarde de la visualisation !</span></div>');
			}
		});			
	});											 
});

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



function getDonnees(data)
{
	//console.log(data);
	data2 = data;
	var infos = $('.infos');
	var texte = data.notes;

	var description = texte.substring(0,texte.indexOf("__Origine__"));
	description =  description.replace(/(\r\n|\n|\r)/gm, "<br/>");

	$('#datasetTitle').text(data.title);
	infos.find('#resume').append('<p>' + description + '</p>');

	parseTexte(texte.substring(texte.indexOf("__Origine__")));

	for (var i = 0; i < data.tags.length; i++) {
		$('.well').find('ul').first().next().find('li').first().next().append('<span class="tag">' + data.tags[i].display_name + '</span>');
	}

	$('.well').find('ul').first().find('li').first().next().text(data.organization.title);
	
	var modif = data.extras.filter(function(element){
		return element.key == 'last_update(data.gouv)';
	})[0].value;

	var date = new Date(Date.UTC(modif.substring(0,4),+modif.substring(5,7) - 1,+modif.substring(8,10),+modif.substring(11,13),+modif.substring(14,16)));
	
	$('#date_update').text(date.toLocaleDateString());

	$('#nb_resources').text(data.resources.length);

	var isSpatial = false;
	var urls = [];

	for (var i = 0; i < data.resources.length; i++) {
		var resource = data.resources[i];
		
		var dataformat = 'data-format = "' + resource.format.toLowerCase() +'"';
		
		/*switch(resource.format)
		{
			case 'XLS' : format = 'data-format = "xls"'; break;

			case 'ZIP' : format = 'data-format = "zip"'; break;

			case 'CSV' : format = 'data-format = "csv"'; break;

			case 'JSON' : format = 'data-format = "json"'; break;

			case 'TXT' : format = 'data-format = "txt"'; break;
			
			case 'HTML' : format = 'data-format = "html"' ; break;
			
			case 'WFS' : format = 'data-format = "wfs"' ; break;
			
			case 'GeoJSON' : format = 'data-format = "geojson"' ; break;
			
			case 'XML' : format = 'data-format = "xml"' ; break;
			
			default : format = 'data-format = "default"'; break;
		}*/

		
		$('#listeFichier').append('<ul class="bg-info"><li class="formatFichier"> <div '+ dataformat +'class="format">' +resource.format + '</div> </li><li class="fichier"><a href="'+ resource.url +'" download>'+ resource.name + '</a><p class="description">'+ resource.description +
			'</p></li></ul>');

		urls[resource.format] = resource.url;

		var reg = /format=(\w+)&?/;
		if(resource.url.match(reg)){
			var match = reg.exec(resource.url);
			if(match[1] == "SHP" || match[1] == "GeoJSON"){
				isSpatial = true;
				var url = resource.url;
				var format = match[1];
				urls[format] = url;
			}
		}
	}
	var url, format;
	if(urls["GeoJSON"] != null){
		url = urls["GeoJSON"];
		format = "GeoJSON";
	} else if(urls["XLS"] != null){
		url = urls["XLS"];
		format = "CSV";
	} else if(urls["CSV"] != null){
		url = urls["CSV"];
		format = "CSV";
	} else if(urls["JSON"] != null){
		url = urls["JSON"];
		format = "JSON";
	} else {
		format = Object.keys(urls)[0];
		url = urls[format];
	}

	loadData(url, format);
	if(isSpatial){
		
		$(".map-visu").show();
		//$(".nav-map").show();
	} else {
		$(".map-visu").hide();
		//$(".nav-map").hide();
		$(".nav-map").addClass("disabled");
	}
	if(format != "ZIP" && format != "TXT" && format != "HTML"){

		$(".chart-visu").show();
		$(".table-visu").show();
		$(".nav-chart").show();
		$(".nav-table").show();
	} else {
		$(".chart-visu").hide();
		$(".table-visu").hide();
		//$(".nav-chart").hide();
		//$(".nav-table").hide();
		$(".nav-chart").addClass("disabled");
		$(".nav-table").addClass("disabled");
	}
	
	$('#reutilisation').hide();
	$('.map-visu').hide();
	$('.table-visu').hide();
	$('.chart-visu').hide();
	
}

function getReuses(data)
{
	
	
	for (var i = 0; i < data.length; i++) {
		//console.log(data[i].url);
		$('#reutilisation').append('<div class="reuse col-md-3"><div onclick="window.open(\'' + data[i].page + '\')" class="show"><img src="'+ data[i].image +'"/></a><div class="descriptionImage"><p>'+ data[i].description +
		'</p></div></div><div class="titre">'+ data[i].title +'</div><div class="auteur"><a href="'+
			 data[i].owner.page +'">'+ data[i].owner.first_name + " " + data[i].owner.last_name +'</a></div>');

		$('#nb_reuses').text(+$('#nb_reuses').text() + 1);
	}
	if(data.length == 0)
	{
		$('.nav-reuse').addClass("disabled");
	}

	$('.show').on('mouseenter',function(){
		$(this).children('.descriptionImage').show();
	});
	$('.show').on('mouseleave',function(){
		$(this).children('.descriptionImage').hide();
	});
}

function parseTexte(texte)
{
	texte = texte.replace("__Origine__","<h3>Origine</h3><p>");
	texte = texte.replace("__Liens annexes__","</p><h3>Liens annexes</h3><ul>");
	texte = texte.replace("__Organisations partenaires__","</p><h3>Organisations partenaires</h3><p>");

	index = texte.indexOf("* [");
	var fiche = false;

	while(index != -1)
	{

		var nom="";
		var url = "";
		
		index += 3;
		while(texte.charAt(index) != "]")
		{
			nom += texte.charAt(index);
			index++; 
		}

		index+=2;

		while(texte.charAt(index) != ')')
		{
			url += texte.charAt(index);
			index++;
		}

		var lien = '<li><a onclick="window.open(\'' + url + '\')">➞' + nom + '</a></li>';

		if(!fiche)
		{
			texte = texte.replace(/(\* \[.*?\))/m, lien);
		}
		else
		{
			texte = texte.replace(/(\➞ \[.*?\))/m, lien);
		}
		
		index = texte.indexOf("* [");

		if(index == -1)
		{
			index = texte.indexOf("➞ [");
			fiche = true;
		}
	}
	$('#resume').append(texte + '</ul>');
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

function loadData(url, format){
	//var features;
	
	// if(format == "GeoJSON"){
	// 	d3.json(url, function(error, us) {
	// 		features = us;
	// 		featuresArray = features.features;
	// 		loadMapData();
	// 		loadTabData(format);
	// 		loadChartData(format);
	// 	});
	// } else if(format == "SHP"){
	// 	shp(url+".zip").then(function(geojson){
	// 		features = geojson;
	// 		featuresArray = features.features;
	// 		loadMapData();
	// 		loadTabData(format);
	// 		loadChartData(format);
	// 	});
	// } else if(format == "CSV"){
	// 	d3.csv(url, function(error, us) {
	// 		features = us;
	// 		featuresArray = features;

	// 			loadTabData(format);
	// 			loadChartData(format);
			
			
	// 	});
	// } else if(format == "XLS"){
		
	// 	var req = new XMLHttpRequest();
	// 	req.open("GET", url, true);
	// 	req.responseType = "arraybuffer";

	// 	req.onload = function(e) {
	// 	  var data = new Uint8Array(req.response);
	// 	  var workbook = XLSX.read(data, {type:"array"});
	// 	  features = XLSX.utils.sheet_to_json(workbook.Sheets[Object.keys(workbook.Sheets)[0]]);
	// 	  featuresArray = features;
		
	// 		loadTabData(format);
	// 		loadChartData(format);
	// 	}

	// 	req.send();
						
		
	// } else if(format == "JSON"){
	// 	d3.json(url, function(error, us) {
	// 		features = us;
	// 		featuresArray = features.features;
	// 		loadTabData(format);
	// 		loadChartData(format);
	// 	});
	// }

	if(format == "GeoJSON"){
		d3.request(url)
    .mimeType("application/json; charset=ISO-8859-1")
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(function(error, us) {
			features = us;
			featuresArray = features.features;
			loadMapData();
			loadTabData(format);
			loadChartData(format);
		});
	} else if(format == "SHP"){
		shp(url+".zip").then(function(geojson){
			features = geojson;
			featuresArray = features.features;
			loadMapData();
			loadTabData(format);
			loadChartData(format);
		});
	} else if(format == "CSV"){
		
		d3.request(url)
		    .mimeType("text/csv; charset=ISO-8859-1")
		    .response(function(xhr) { return d3.csvParse(xhr.responseText); })
		    .get( function(error, us) {
					features = us;
					featuresArray = features;
					
						loadTabData(format);
						loadChartData(format);
					
					
				});
	} else if(format == "XLS"){
		/* set up async GET request */
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = "arraybuffer";

		req.onload = function(e) {
		  var data = new Uint8Array(req.response);
		  var workbook = XLSX.read(data, {type:"array"});
		  features = XLSX.utils.sheet_to_json(workbook.Sheets[Object.keys(workbook.Sheets)[0]]);
		  featuresArray = features;
		
			loadTabData(format);
			loadChartData(format);
		}

		req.send();
						
		
	} else if(format == "JSON"){
		d3.request(url)
		    .mimeType("application/json; charset=ISO-8859-1")
		    .response(function(xhr) { return JSON.parse(xhr.responseText); })
		    .get(function(error, us) {
					features = us;
					featuresArray = features.features;
					loadTabData(format);
					loadChartData(format);
				});
	}

	
	
}