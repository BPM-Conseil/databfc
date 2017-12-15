(function() {

  // Localize jQuery variable
  var jQuery;

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {

      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/jquery-3.2.1.js");
      if (script_tag.readyState) {
        script_tag.onreadystatechange = function () { // For old versions of IE
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                scriptLoadHandler();
            }
        };
      } else {
        script_tag.onload = scriptLoadHandler;
      }
      // Try to find the head, otherwise default to the documentElement
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
     
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/ol.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/d3.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/underscore-min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/map_bfc_widget.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/pagination.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/shp.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/xlsx.full.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/canvas-to-blob.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
      script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/FileSaver.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag); 


  } else {
      // The jQuery version on the window is the one we want to use
      jQuery2 = window.jQuery;
      main();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
      // Restore $ and window.jQuery to their previous values and store the
      // new jQuery in our local jQuery variable
      jQuery2 = window.jQuery.noConflict();
      // Call our main function
      main(); 
  }

  /******** Our main function ********/
  function main() { 
      jQuery2(document).ready(function($) { 
          /******* Load CSS *******/
          var css_link = $("<link>", { 
              rel: "stylesheet", 
              type: "text/css", 
              href: "https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_visualisation_widget.css" 
          });
          css_link.appendTo('head');

          var bootstrap_link1 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap-theme.custom.css" rel="stylesheet">';
          var bootstrap_link2 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap.custom.css" rel="stylesheet">';

          $('head').append(bootstrap_link1);
          $('head').append(bootstrap_link2);

         var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
           "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/bootstrap.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
          
          /******* Load HTML *******/
          // var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";
          // $.getJSON(jsonp_url, function(data) {
          //   $('#example-widget-container').html("This data comes from another server: " + data.html);
          //  });

          $('#widget-container').append('<div id="main" class="widget-opendata"><div class="container"><nav class="navbar dataset-navbar"><div class="container-fluid"><ul class="nav navbar-nav"><li class="active nav-info"><a>Descriptif</a></li><li class="nav-table"><a>Table</a></li><li class="nav-map"><a>Carte</a></li><li class="nav-reuse"><a>Réutilisation(s)</a></li><li class="nav-chart"><a>Graphe</a></li></ul></div></nav><h1 id ="datasetTitle">Titre</h1><div class="infos"><div class="row well"><ul><li class="col-md-2">Producteur</li><li class="col-md-10"></li></ul><ul><li class="col-md-2">Mots clés</li><li class="col-md-10"></li></ul><ul><li class="col-md-2">Mise à jour</li><li class="col-md-10" id="date_update"></li></ul></div><button class="btn btn-info">Partager sur votre site</button><div id="resume"></div></div><div id="resources"><h3 class="titreDepliant">Téléchargement (<span id="nb_resources">0</span>) <span class="glyphicon glyphicon-chevron-down"></span></h3><div id="listeFichier"></div>  </div><div id="reutilisation"></div>  </div><div class="visualisation"><div class="map-visu"><div class="inner"><div id="mapPanel" class="main"><div id="map" class="map"><div class="mapInfo" ></div></div><div id="info" class="info"></div><div class="bckPanel"><img class="btnBackground" src="/sites/default/files/api/portail_bfc/img/ic_map_layers_64.png" alt="Fond de Carte" onclick="$(\'#layers-panel\').show();"/></div><div id="layers-panel" class="layersMenu" style="display:none" onmouseleave="$(this).hide()"><ul class="layersList"><li onclick="changeTile(\'none\')">Pas de fond de carte</li><li onclick="changeTile(\'local-tile\')">OpenStreetMap</li><li onclick="changeTile(\'toner\')">Noir et Blanc</li><li onclick="changeTile(\'toner-lite\')">Niveaux de Gris</li></ul></div><div class=float-panel><img class="imgExpand" src="/sites/default/files/api/portail_bfc/img/ic_expand.png" alt="Développer"/><img class="imgCollapse" src="/sites/default/files/api/portail_bfc/img/ic_collapse.png" alt="Réduire"/><p class="lblDatas">Données</p><div class=float-panel-content><div class="caption-panel"><ul class="caption-list"></ul></div><div class="data-panel"><ul class="data-list"></ul></div></div></div><div class="attributePanel"><div class="attr-osm"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | ©<a href="http://openstreetmap.org/copyright">OpenStreetMap</a></div><div class="attr-stamen"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.</div></div></div></div></div><div class="chart-visu"><div class="inner"><div class="choice"><img id="saveButton" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/img/ic_download_chart.png" title="Exporter votre graphe"></img><div id="chart-type"><span class="chart-select-label">Représentation</span><select id="choice-chart-select" class="table-per-page-select" onchange="onChangeChart()"><option value="bar">Diagramme en barres</option><option value="stack">Barres empilées</option><option value="pie">Graphe en secteur</option><option value="line">Courbes</option></select></div><div id="choice-type"><span class="chart-select-label">Affichage</span><select id="choice-type-select" class="table-per-page-select" onchange="onChangeType()"><option value="repartition">Répartition</option><option value="valeurs">Valeurs</option></select></div><div id="choice-x"><span class="chart-select-label">Axe X</span><select id="choice-x-select" class="table-per-page-select" onchange="onChangeX()"></select></div><div id="choice-x2"><span class="chart-select-label">Axe X</span><select id="choice-x2-select" class="table-per-page-select" onchange="onChangeX2()"></select></div><div id="choice-y-type"><span class="chart-select-label">Aggrégation</span><select id="choice-y-type-select" class="table-per-page-select" onchange="onChangeYType()"><option value="count">Compte</option><option value="sum">Somme</option></select></div><div id="choice-y"><span class="chart-select-label">Axe Y</span><select id="choice-y-select" class="table-per-page-select" onchange="onChangeY()"></select></div><div id="check-y"><span class="chart-select-label">Catégories</span><ul class="y-list"><li class="y-item"><input type="checkbox" class="choice-cb" style="margin-bottom: 10px;" value="all" onclick="onCheckAll(this.checked)"><span class="choice-label">Sélectionner tous</span></li></ul></div></div><div class="graph"><svg class="chart" width="800" height="500"></svg></div></div></div><div class="table-visu"><div class="inner"><div class="row"><div class="table-per-page"><span class="table-per-page-label">Nombre de lignes visibles </span><select id="table-per-page" class="table-per-page-select" onchange="initPagination()"><option value="10">10</option><option value="20">20</option><option value="50" selected="selected">50</option><option value="100">100</option><option value="500">500</option></select></div><div class="table-filter"><span id="table-filter" class="table-search">Filtre: <input type="search" id="table-query-search" onkeyup="initPagination()"></span></div></div><div class="row"><div class="table-responsive"><table id="table" class="table table-bordered table-striped table-hover"></table> </div></div><div class="row"><nav id="pagination"><ul class="pagination"> </ul></nav></div></div></div></div></div> '+    
          '  <script> jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap-theme.custom.css\" rel=\"stylesheet\">\');      jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap.custom.css\" rel=\"stylesheet\">\');      jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_visualisation.css\" rel=\"stylesheet\">\');  jQuery2("head").append(\'<link href=\"/sites/default/files/api/portail_bfc/css/ol.css\" rel=\"stylesheet\">\');   jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/map_bfc.css\" rel=\"stylesheet\">\');  </script>');

         
          id_dataset = $('#widget-container').data('id');
          var ckan = $('#widget-container').data('serveur');

          

  // var ckan = getUrl("serveur");
  // var id_dataset = getUrl("id");
  //console.log(window.location.href);
  //console.log(ckan);
  //console.log(id_dataset);

  var features;
  properties = [];
  //var allProperties = [];


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

      $.ajax('https://www.data.gouv.fr/api/1/reuses/?page_size=10000&dataset=' + id_datagouv , {
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
                          
  $('button').on('click',function(){
    dialog('Affichez ce jeu de données dans votre site Web en copiant le code ci-dessous.','<script src="'+ window.location.origin+'/sites/default/files/api/portail_bfc/js/widget-script.js" type="text/javascript"></script><div class="container" data-id="'+ id_dataset +'" data-serveur="'+ ckan +'" id="widget-container" ></div>');
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


function dialog(titre, message){
  if (!$('#dataConfirmModal').length) {
    $('#main.widget-opendata').append('<div id="dataConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true">'+
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
    
    /*$(".visualisation")
      .append($("<div class=''>")
        .append('<div class="container"><h3>Représentation spatiale <span class="glyphicon glyphicon-chevron-down"></span></h3></div>')
        .append("<iframe src='map_bfc.html?url="+ encodeURIComponent(url) +"&format="+ format +"'>"));
    ////console.log("<frame src='map_bfc.html?url="+ spatialUrl +"&format="+ spatialFormat +"'>");
    $('.map .glyphicon').on('click',function(){
      $('.map>iframe').slideToggle();
    }); */  
    $(".map-visu").show();
    $(".nav-map").show();
  } else {
    $(".map-visu").hide();
    $(".nav-map").addClass("disabled");
  }
  if(format != "ZIP" && format != "TXT" && format != "HTML"){
  /*  $(".visualisation")
      .append($("<div class='chart'>")
        .append('<div class="container"><h3>Représentation graphique <span class="glyphicon glyphicon-chevron-down"></span></h3></div>')
        .append("<iframe src='chart_bfc.html?url="+ encodeURIComponent(url) +"&format="+ format +"'>"));
      $('.chart .glyphicon').on('click',function(){
        $('.chart iframe').slideToggle();
      });
    $(".visualisation")
      .append($("<div class='table'>")
        .append('<div class="container"><h3>Table de données <span class="glyphicon glyphicon-chevron-down"></span></h3></div>')
        .append("<iframe src='table_bfc.html?url="+ encodeURIComponent(url) +"&format="+ format +"'>"));
      $('.table .glyphicon').on('click',function(){
        $('.table>iframe').slideToggle();
      }); */  
    $(".chart-visu").show();
    $(".table-visu").show();
    $(".nav-chart").show();
    $(".nav-table").show();
  } else {
    $(".chart-visu").hide();
    $(".table-visu").hide();
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

function loadData(url, format){
  //var features;
  
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



      });
  } 

})(); // We call our anonymous function immediately