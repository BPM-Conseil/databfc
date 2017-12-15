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

      // script_tag = document.createElement('script');
      // script_tag.setAttribute("type","text/javascript");
      // script_tag.setAttribute("src",
      //     "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/paginationDataset_widget.js");
      // (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
 	
      
  } else {
      // The jQuery version on the window is the one we want to use
      jQuery2 = window.jQuery;
      main2();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
      // Restore $ and window.jQuery to their previous values and store the
      // new jQuery in our local jQuery variable
      jQuery2 = window.jQuery.noConflict(true);
      // Call our main function
      main2(); 
  }

  /******** Our main function ********/
  function main2() { 

      var filtreTags = [];

      jQuery2(document).ready(function($) { 
          /******* Load CSS *******/
          var css_link = jQuery2("<link>", { 
              rel: "stylesheet", 
              type: "text/css", 
              href: "https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_widget.css" 
          });
          var css_link_visu = jQuery2("<link>", { 
              rel: "stylesheet", 
              type: "text/css", 
              href: "https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_visualisation_widget.css" 
          });
          css_link.appendTo('head');

	if (window.jQuery === undefined) {
		window.jQuery = jQuery2;
		//$ = jQuery2;
	}
          var pagination = jQuery2('<script src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/pagination.js"></script>');
          var paginationDataset_widget = jQuery2('<script src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/paginationDataset_widget.js"></script>');



          var bootstrap_link1 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap-theme.custom.css" rel="stylesheet">';
          var bootstrap_link2 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap.custom.css" rel="stylesheet">';
          var jquery_link1 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css" rel="stylesheet">';
          var jquery_link2 = '<link href="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.min.css" rel="stylesheet">';
          // var bootstrap_js = '<script src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/bootstrap.min.js"></script>';
          // var pagination_js = '<script src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/paginationDataset.js"></script>';
          // var jquery_12_js = '<script src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>';

          jQuery2('head').append(bootstrap_link1);
          jQuery2('head').append(bootstrap_link2);
          jQuery2('head').append(jquery_link1);
          jQuery2('head').append(jquery_link2);
          paginationDataset_widget.appendTo('head');

         // jQuery2('head').append(bootstrap_js);
         // $('head').append(pagination_js);
          //$('head').append(jquery_12_js);

	
          
	var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
           "https://www.databfc.fr/sites/default/files/api/portail_bfc/js/bootstrap.min.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
          

      $('head').append('<script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/ol.js"></script>  <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/d3.min.js"></script>  <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/underscore-min.js"></script>  <script type="text/javascript" src="https://d3js.org/topojson.v1.min.js"></script>  <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/map_bfc_widget.js"></script>    <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/shp.js"></script>  <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/xlsx.full.min.js"></script> <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/canvas-to-blob.min.js"></script> <script type="text/javascript" src="https://www.databfc.fr/sites/default/files/api/portail_bfc/js/FileSaver.min.js"></script>');          /******* Load HTML *******/
          // var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";
          // $.getJSON(jsonp_url, function(data) {
          //   $('#example-widget-container').html("This data comes from another server: " + data.html);
          //  });

          

      jQuery2('#widget-container').append('<div id="main" class="widget-opendata"><h1 id="jeuxDeDonnes"><span id="nb_jeux"></span> JEUX DE DONNEES</h1><ul id="tags" class="col-md-12" style="margin-bottom: 30px;"></ul><div id="datasets" class="col-md-12" ></div><div class="row"><nav id="pagination"><ul class="pagination"></ul></nav></div></div><!--<script src="https://www.databfc.fr/portail_bfc/js/paginationDataset.js"></script>-->');

      var ckan =  jQuery2('#widget-container').data('serveur');
      var producteur =  jQuery2('#widget-container').data('producteur');  


      jQuery2.ajax(ckan + '/api/action/organization_list?all_fields=true',
      {
      success : function(response){

        for (var i = 0; i < response.result.length; i++) {
          if(response.result[i].id == producteur)
          {
            producteur = response.result[i].name;
          }
        }

        searchDatasets(ckan,producteur);

      },
      error : function(){
        console.log('erreur');
      },
        type: 'POST',
        dataType: 'jsonp',
      });


      jQuery2('#datasets').on('click','h2',function(){
	
       paginationDataset_widget.remove();
       pagination.appendTo('head');
       css_link.remove();
       css_link_visu.appendTo('head');

       //jQuery2('#widget-container').data('id', jQuery2(this).data('id'));

       jQuery2('#widget-container').children().remove();
       jQuery2('#widget-container').append('<div id="main" class="widget-opendata"><div class="container"><nav class="navbar dataset-navbar"><div class="container-fluid"><ul class="nav navbar-nav"><li class="active nav-info"><a>Descriptif</a></li><li class="nav-table"><a>Table</a></li><li class="nav-map"><a>Carte</a></li><li class="nav-reuse"><a>Réutilisation(s)</a></li><li class="nav-chart"><a>Graphe</a></li></ul></div></nav><h1 id ="datasetTitle">Titre</h1><button id= "prev" class="btn btn-info">Précédent</button><div class="infos"><div class="row well"><ul><li class="col-md-2">Producteur</li><li class="col-md-10"></li></ul><ul><li class="col-md-2">Mots clés</li><li class="col-md-10"></li></ul><ul><li class="col-md-2">Mise à jour</li><li class="col-md-10" id="date_update"></li></ul></div><button id= "share" class="btn btn-info">Partager sur votre site</button><div id="resume"></div></div><div id="resources"><h3 class="titreDepliant">Téléchargement (<span id="nb_resources">0</span>) <span class="glyphicon glyphicon-chevron-down"></span></h3><div id="listeFichier"></div> </div><div id="reutilisation"></div>  </div><div class="visualisation"><div class="map-visu"><div class="inner"><div id="mapPanel" class="main"><div id="map" class="map"><div class="mapInfo" ></div></div><div id="info" class="info"></div><div class="bckPanel"><img class="btnBackground" src="/sites/default/files/api/portail_bfc/img/ic_map_layers_64.png" alt="Fond de Carte" onclick="$(\'#layers-panel\').show();"/></div><div id="layers-panel" class="layersMenu" style="display:none" onmouseleave="$(this).hide()"><ul class="layersList"><li onclick="changeTile(\'none\')">Pas de fond de carte</li><li onclick="changeTile(\'local-tile\')">OpenStreetMap</li><li onclick="changeTile(\'toner\')">Noir et Blanc</li><li onclick="changeTile(\'toner-lite\')">Niveaux de Gris</li></ul></div><div class=float-panel><img class="imgExpand" src="/sites/default/files/api/portail_bfc/img/ic_expand.png" alt="Développer"/><img class="imgCollapse" src="/sites/default/files/api/portail_bfc/img/ic_collapse.png" alt="Réduire"/><p class="lblDatas">Données</p><div class=float-panel-content><div class="caption-panel"><ul class="caption-list"></ul></div><div class="data-panel"><ul class="data-list"></ul></div></div></div><div class="attributePanel"><div class="attr-osm"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | ©<a href="http://openstreetmap.org/copyright">OpenStreetMap</a></div><div class="attr-stamen"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.</div></div></div></div></div><div class="chart-visu"><div class="inner"><div class="choice"><img id="saveButton" src="/sites/default/files/api/portail_bfc/img/ic_download_chart.png" title="Exporter votre graphe"></img><div id="chart-type"><span class="chart-select-label">Représentation</span><select id="choice-chart-select" class="table-per-page-select" onchange="onChangeChart()"><option value="bar">Diagramme en barres</option><option value="stack">Barres empilées</option><option value="pie">Graphe en secteur</option><option value="line">Courbes</option></select></div><div id="choice-type"><span class="chart-select-label">Affichage</span><select id="choice-type-select" class="table-per-page-select" onchange="onChangeType()"><option value="repartition">Répartition</option><option value="valeurs">Valeurs</option></select></div><div id="choice-x"><span class="chart-select-label">Axe X</span><select id="choice-x-select" class="table-per-page-select" onchange="onChangeX()"></select></div><div id="choice-x2"><span class="chart-select-label">Axe X</span><select id="choice-x2-select" class="table-per-page-select" onchange="onChangeX2()"></select></div><div id="choice-y-type"><span class="chart-select-label">Aggrégation</span><select id="choice-y-type-select" class="table-per-page-select" onchange="onChangeYType()"><option value="count">Compte</option><option value="sum">Somme</option></select></div><div id="choice-y"><span class="chart-select-label">Axe Y</span><select id="choice-y-select" class="table-per-page-select" onchange="onChangeY()"></select></div><div id="check-y"><span class="chart-select-label">Catégories</span><ul class="y-list"><li class="y-item"><input type="checkbox" class="choice-cb" style="margin-bottom: 10px;" value="all" onclick="onCheckAll(this.checked)"><span class="choice-label">Sélectionner tous</span></li></ul></div></div><div class="graph"><svg class="chart" width="800" height="500"></svg></div></div></div><div class="table-visu"><div class="inner"><div class="row"><div class="table-per-page"><span class="table-per-page-label">Nombre de lignes visibles </span><select id="table-per-page" class="table-per-page-select" onchange="initPagination()"><option value="10">10</option><option value="20">20</option><option value="50" selected="selected">50</option><option value="100">100</option><option value="500">500</option></select></div><div class="table-filter"><span id="table-filter" class="table-search">Filtre: <input type="search" id="table-query-search" onkeyup="initPagination()"></span></div></div><div class="row"><div class="table-responsive"><table id="table" class="table table-bordered table-striped table-hover"></table> </div></div><div class="row"><nav id="pagination"><ul class="pagination"> </ul></nav></div></div></div></div></div> '+    
          '  <script> jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap-theme.custom.css\" rel=\"stylesheet\">\');      jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/bootstrap.custom.css\" rel=\"stylesheet\">\');      jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_visualisation.css\" rel=\"stylesheet\">\');  jQuery2("head").append(\'<link href=\"/sites/default/files/api/portail_bfc/css/ol.css\" rel=\"stylesheet\">\');   jQuery2("head").append(\'<link href=\"https://www.databfc.fr/sites/default/files/api/portail_bfc/css/map_bfc.css\" rel=\"stylesheet\">\');  </script>');

        id_dataset = jQuery2(this).data('id');
        visu();
      });

      jQuery2('#tags').on('click','li',function(){
        if(jQuery2(this).hasClass('clicked'))
        {
          for (var m= 0; m < filtreTags.length; m++) {
            if(filtreTags[m] == jQuery2(this).data('tag')){
              filtreTags.splice(m,1);
            }
          }
          filtrer();
          jQuery2(this).removeClass('clicked');
        }
        else
        {
          var tag = jQuery2(this).data('tag');
          filtrerTag(tag);
          jQuery2(this).addClass('clicked');
        }

      });





      // $('#tags').on('click','span',function(){
      //   $(this).parent().remove();
      //   for (var m= 0; m < filtreTags.length; m++) {
      //     if(filtreTags[m] == $(this).parent().data('tag')){
      //       filtreTags.splice(m,1);
      //     }
      //   }
      //   filtrer();
      // }); 


    });

    function searchDatasets(ckan,producteur)
    {

      filtreTags = [];

      jQuery2('#tags').find('li').remove();

      jQuery2('#datasets').find('div').remove();

      jQuery2('#nb_jeux').text(0);

      
      // producteur = producteur.toLowerCase();
      // producteur = producteur.replace(' ','-');

      var package_list;
      var resultat = false;
      var n = 0;

       //requete pour obtenir la liste des packages


      jQuery2.ajax(ckan + '/api/action/package_search?q=organization:' + producteur + '&rows=1000',
      {
      success : function(response){

          if(response.success == false){
            jQuery2('#datasets').append('<div class="alert alert-info">Aucun jeu de données trouvé</div>');
          }

          package_list = response.result.results;
          var numDataset = package_list.length;


          for (var i = 0; i < package_list.length; i++) {
                createDataset(package_list[i]);
                n++;
                if(n == numDataset)
                {
                  initPagination();
                }
          }
          
          
        },
        error : function(){
          console.log('erreur package search');
        },
        type: 'POST',
        dataType: 'json',
        jsonp : 'json.wrf',
    });

    }
     


    function createDataset(data)
    {

      jQuery2('#nb_jeux').text(+jQuery2('#nb_jeux').text() + 1);
      
      ////////////////////
      var name_orga = data.organization.title;
      var id_orga = data.organization.id;

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

        li_granularite = '<ul><li class="titre">Granularité</li><li class="info">' + granularite + '</li></ul>';

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

        if(jQuery2('#tags').find("[data-tag='" + tag + "']").length == 0)
        {
          jQuery2('#tags').append('<li class="tag" data-tag="' + tag +'">' + tag + 
          ' <span class="badge">' + 1 + '</span></li>');
        }
        else
        {
          jQuery2('#tags').find("[data-tag='" + tag + "']").find('span').text(+jQuery2('#tags').find("[data-tag='" + tag + "']").find('span').text() + 1);
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
      description = description.substring(0,300) + "...";

      /////////

      var listeFormat = '<ul class="listeFormat">';
      for (var i = 0; i < data.resources.length; i++)
      {
        var type = data.resources[i].format;

        listeFormat += '<li class="format" data-format="'+ type.toLowerCase() +'">'+ type +'</li>';

      }
      listeFormat += '</ul>';




      
     jQuery2('#datasets').append(
        '<div class="dataset" data-orga="' + id_orga +'" data-reuses="'+ reuses[0].value +'" data-granularite="'+ granularite +'" data-id="' + id +'" data-time="' + date.getTime()  +'">'  
          +'<div class="row">'
            +'<div class="col-md-6 inner">'+'<h2  data-id="' + id +'"> ' + data.title + ' </h2><p>' + description + '</p>'+ listeFormat +'</div>'
            +'<div class="col-md-6 infos inner"><ul><li class="titre">Producteur</li><li class="info">'
      + data.organization.title + '</li></ul><ul><li class="titre">Date modification</li><li class="info">' + date.toLocaleDateString() +
       '</ul>'+ li_granularite + li_reuses +'<ul class="jetons">' + tagList +'</ul></div>'
          +'</div>'
        +'</div>');
    }


    function filtrerTag(tag)
    {
      if(jQuery2.inArray(tag, filtreTags) == -1)
      {
        filtreTags.push(tag);
        filtrer();
      }
    }

    function filtrer()
    {

      jQuery2('#datasets').find('.dataset').each(function(){
        jQuery2(this).removeClass('hide');
        
        

        var tagOk =true;



        var tagsOk = [];

        for (var m = 0; m < filtreTags.length; m++)
        {
          tagsOk.push(false);
          jQuery2(this).find('.tag').each(function(){
            if((jQuery2(this).text() == filtreTags[m]))
            {
              tagsOk[m] = true;
            }
          });

        }

        for (var i = 0; i < tagsOk.length; i++) {
          if(!tagsOk[i])
          {
            tagOk = false;
          }
        }



        if(filtreTags.length == 0){
          tagOk = true;
        }

        if(!tagOk)
        {
          jQuery2(this).addClass('hide');
        }
      }); 
      
      jQuery2('#nb_jeux').text(0);

      jQuery2('#tags').children().each(function(){
        jQuery2(this).find('span').text(0);
      });

      jQuery2('#datasets').find('.dataset').each(function(){
        if(!jQuery2(this).hasClass('hide')){
          jQuery2('#nb_jeux').text(+ jQuery2('#nb_jeux').text() + 1);
          jQuery2(this).find('.jetons').children().each(function(){
            jQuery2('#tags').find("[data-tag='" + jQuery2(this).text() + "']").find('span').text(+jQuery2('#tags').find("[data-tag='" + jQuery2(this).text() + "']").find('span').text()+1);
          });
        }
      });

      jQuery2('#tags').find('span').each(function(){
        jQuery2(this).parent().show();
        if(jQuery2(this).text() == '0'){
          jQuery2(this).parent().hide();
        }
      });

      initPagination();

    }

    function getUrl(name){
       if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
          return decodeURIComponent(name[1]);
    }

    } 


  function visu(){


    var ckan = jQuery2('#widget-container').data('serveur');

    var features;
  properties = [];
  //var allProperties = [];

    var css_link = jQuery2("<link>", { 
        rel: "stylesheet", 
        type: "text/css", 
        href: "https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style.css" 
    });
    var css_link_visu = jQuery2("<link>", { 
        rel: "stylesheet", 
        type: "text/css", 
        href: "https://www.databfc.fr/sites/default/files/api/portail_bfc/css/style_visualisation.css" 
    });

    //features, properties = [], allProperties = [];


    jQuery2.ajax(ckan + '/api/action/package_show',
      {
      data : {
        id : id_dataset
      },
      success : function(response){
        getDonnees(response.result);
        var id_datagouv = response.result.extras.find(function(element){
          return element.key == 'id_datagouv';
        }).value;

        jQuery2.ajax('https://www.data.gouv.fr/api/1/reuses/?page_size=10000&dataset=' + id_datagouv , {
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

    jQuery2('#resources .glyphicon').on('click',function(){
      if(jQuery2('#listeFichier').css('display')=='none'){
        jQuery2(this).removeClass('glyphicon-chevron-right');
        jQuery2(this).addClass('glyphicon-chevron-down');
      }
      else
      {
        jQuery2(this).removeClass('glyphicon-chevron-down');
        jQuery2(this).addClass('glyphicon-chevron-right');  
      }

      jQuery2('#listeFichier').slideToggle();

    });
    jQuery2('#reutilisation .glyphicon').on('click',function(){
      if(jQuery2('#listeReuses').css('display')=='none'){
        jQuery2(this).removeClass('glyphicon-chevron-right');
        jQuery2(this).addClass('glyphicon-chevron-down');
      }
      else
      {
        jQuery2(this).removeClass('glyphicon-chevron-down');
        jQuery2(this).addClass('glyphicon-chevron-right');  
      }
      jQuery2('#listeReuses').slideToggle();
    }); 
    jQuery2('.map-visu .glyphicon').on('click',function(){
      if(jQuery2('.map-visu>.inner').css('display')=='none'){
        jQuery2(this).removeClass('glyphicon-chevron-right');
        jQuery2(this).addClass('glyphicon-chevron-down');
      }
      else
      {
        jQuery2(this).removeClass('glyphicon-chevron-down');
        jQuery2(this).addClass('glyphicon-chevron-right');  
      }
      jQuery2('.map-visu>.inner').slideToggle();
      resizeMap();
    });
    jQuery2('.chart-visu .glyphicon').on('click',function(){
      if(jQuery2('.chart-visu>.inner').css('display')=='none'){
        jQuery2(this).removeClass('glyphicon-chevron-right');
        jQuery2(this).addClass('glyphicon-chevron-down');
      }
      else
      {
        jQuery2(this).removeClass('glyphicon-chevron-down');
        jQuery2(this).addClass('glyphicon-chevron-right');  
      }
      jQuery2('.chart-visu>.inner').slideToggle();
    });
    jQuery2('.table-visu .glyphicon').on('click',function(){
      if(jQuery2('.table-visu>.inner').css('display')=='none'){
        jQuery2(this).removeClass('glyphicon-chevron-right');
        jQuery2(this).addClass('glyphicon-chevron-down');
      }
      else
      {
        jQuery2(this).removeClass('glyphicon-chevron-down');
        jQuery2(this).addClass('glyphicon-chevron-right');  
      }
      jQuery2('.table-visu>.inner').slideToggle();
    });
                            
    jQuery2('#prev').on('click',function(){
      jQuery2('#widget-container').children().remove();
      jQuery2('head').children('link').remove();
      jQuery2('head').children('script').remove();
      main2();
    });
	
	
	jQuery2('#share').on('click',function(){
    dialog('Affichez ce jeu de données dans votre site Web en copiant le code ci-dessous.','<script src="'+ window.location.origin+'/sites/default/files/api/portail_bfc/js/widget-script.js" type="text/javascript"></script><div class="container" data-id="'+ id_dataset +'" data-serveur="'+ ckan +'" id="widget-container" ></div>');
  });

    jQuery2('.navbar li').on('click',function(){
		
		if(jQuery2(this).hasClass("disabled"))
		{
			return;
		}
	
	  jQuery2('.infos').hide();
	  jQuery2('#resources').hide();
	  jQuery2('.map-visu').hide();
	  jQuery2('.chart-visu').hide();
	  jQuery2('#reutilisation').hide();
	  jQuery2('.table-visu').hide();

	  
	  jQuery2('.navbar .active').removeClass("active");
	  jQuery2(this).addClass("active");

    switch(jQuery2(this).text())
    {
      case "Descriptif" :
        jQuery2('.infos').show();
        jQuery2('#resources').show();
        break;
      case "Table" : 
        jQuery2('.table-visu').show();
        break;
      case "Carte" : 
        jQuery2('.map-visu').show();
        resizeMap();
        break;
      case "Réutilisation(s)" :
        jQuery2('#reutilisation').show();
        break;
      case "Graphe" : 
        jQuery2('.chart-visu').show();
        break;
    }
  });
  }

function dialog(titre, message){
  if (!jQuery2('#dataConfirmModal').length) {
    jQuery2('#main').append('<div id="dataConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true">'+
    '<div class="modal-dialog">'+
    '<div class="modal-content">'+
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="dataConfirmLabel">'+ titre +'</h3></div>'+
    '<div class="modal-body"><textarea style="width:100%; height:100px; max-width:100%;min-width:100%;">'+ message +'</textarea></div>'+
    '<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button></div></div></div></div>');
  }
  jQuery2('#dataConfirmModal').find('.modal-body').text(jQuery2(this).attr('data-confirm'));
  jQuery2('#dataConfirmModal').modal({show:true});
}

function getDonnees(data)
{
  //console.log(data);
  data2 = data;
  var infos = jQuery2('.infos');
  var texte = data.notes;

  var description = texte.substring(0,texte.indexOf("__Origine__"));
  description =  description.replace(/(\r\n|\n|\r)/gm, "<br/>");

  jQuery2('#datasetTitle').text(data.title);
  infos.find('#resume').append('<p>' + description + '</p>');

  parseTexte(texte.substring(texte.indexOf("__Origine__")));

  for (var i = 0; i < data.tags.length; i++) {
    jQuery2('.well').find('ul').first().next().find('li').first().next().append('<span class="tag">' + data.tags[i].display_name + '</span>');
  }
  
  jQuery2('.well').find('ul').first().find('li').first().next().text(data.organization.title);

	var modif = data.extras.filter(function(element){
		return element.key == 'last_update(data.gouv)';
	})[0].value;

	var date = new Date(Date.UTC(modif.substring(0,4),+modif.substring(5,7) - 1,+modif.substring(8,10),+modif.substring(11,13),+modif.substring(14,16)));

	jQuery2('#date_update').text(date.toLocaleDateString());
  
  jQuery2('#nb_resources').text(data.resources.length);

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

    
    jQuery2('#listeFichier').append('<ul class="bg-info"><li class="formatFichier"> <div '+ dataformat +'class="format">' +resource.format + '</div> </li><li class="fichier"><a href="'+ resource.url +'" download>'+ resource.name + '</a><p class="description">'+ resource.description +
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
 
    jQuery2(".map-visu").show();
    jQuery2(".nav-map").show();
  } else {
    jQuery2(".map-visu").hide();
    jQuery2(".nav-map").addClass("disabled");
  }
  if(format != "ZIP" && format != "TXT" && format != "HTML"){

    jQuery2(".chart-visu").show();
    jQuery2(".table-visu").show();
    jQuery2(".nav-chart").show();
    jQuery2(".nav-table").show();
  } else {
    jQuery2(".chart-visu").hide();
    jQuery2(".table-visu").hide();
    jQuery2(".nav-chart").addClass("disabled");
    jQuery2(".nav-table").addClass("disabled");
  }
  
  jQuery2('#reutilisation').hide();
  jQuery2('.map-visu').hide();
  jQuery2('.table-visu').hide();
  jQuery2('.chart-visu').hide();
  
}

function getReuses(data)
{
  
  for (var i = 0; i < data.length; i++) {
    //console.log(data[i].url);
	
	if(data[i].owner != null)
	{
		var auteur = '<div class="auteur"><a href="'+ data[i].owner.page +'">'+ data[i].owner.first_name + " " + data[i].owner.last_name +'</a></div>';
	}
	else
	{
		var auteur = '<div class="auteur">auteur inconnu</div>';
	}
	
	
    jQuery2('#reutilisation').append('<div class="reuse col-md-3"><div onclick="window.open(\'' + data[i].page + '\')" class="show"><img src="'+ data[i].image +'"/></a><div class="descriptionImage"><p>'+ data[i].description +
    '</p></div></div><div class="titre">'+ data[i].title +'</div>' + auteur);

    jQuery2('#nb_reuses').text(+jQuery2('#nb_reuses').text() + 1);
  }
  if(data.length == 0)
	{
		jQuery2('.nav-reuse').addClass("disabled");
	}

  jQuery2('.show').on('mouseenter',function(){
    jQuery2(this).children('.descriptionImage').show();
  });
  jQuery2('.show').on('mouseleave',function(){
    jQuery2(this).children('.descriptionImage').hide();
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
  jQuery2('#resume').append(texte + '</ul>');
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




})();

