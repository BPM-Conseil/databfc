<?php
namespace Drupal\bfc_odl_admin\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the Example module.
 */
class VisualisationController extends ControllerBase {

	/**
	 * Returns a simple page.
	 *
	 * @return array
	 *   A simple renderable array.
	 */
	public function myPage() {

		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$admin_preset = "";
		
		if(\Drupal::currentUser()->isAuthenticated()){
			$admin_preset ='<div id="admin-preset">
				<button class="btn">Enregistrer comme visualisation par défaut</button>
			</div>';
		}

		$element = array(
				'example one' => [
						'#type' => 'inline_template',
						'#template' => '<body class="container-fluid">
<div id="main" class="widget-opendata">
	<div class="container">
		<nav class="navbar dataset-navbar">
		  <div class="container-fluid">
		    <ul class="nav navbar-nav">
		      <li class="active nav-info"><a>Descriptif</a></li>
		      <li class="nav-table"><a>Table</a></li>
		      <li class="nav-map"><a>Carte</a></li>
		      <li class="nav-reuse"><a>Réutilisation(s)</a></li>
		      <li class="nav-chart"><a>Graphe</a></li>
		    </ul>
		  </div>
		</nav>
		<h1 id ="datasetTitle">Titre</h1>
		<div class="infos">
			
			
			<div class="row well">
				<ul>
					<li class="col-md-2">Producteur</li>
					<li class="col-md-10"></li>
				</ul>
				<ul>
					<li class="col-md-2">Mots clés</li>
					<li class="col-md-10"></li>
				</ul>
				<ul>
					<li class="col-md-2">Mise à jour</li>
					<li class="col-md-10" id="date_update"></li>
				</ul>
			</div>
			<button id="export-widget" class="btn btn-info">Partager sur votre site</button>
			<div id="resume">
				
			</div>
			
			
		</div>
		<div id="resources">
			<h3 class="titreDepliant">Téléchargement (<span id="nb_resources">0</span>) <span class="glyphicon glyphicon-chevron-down"></span></h3>
			<div id="listeFichier">

			</div>	
		</div>
		<div id="reutilisation">

		</div>	
	</div>
	<div class="visualisation">
		<div class="map-visu">
			<div class="inner">
				<div id="mapPanel" class="main">

					<div id="map" class="map">
						<div class="mapInfo" ></div>
					</div>

					<div id="info" class="info"></div>
					<div class="bckPanel">
						<img class="btnBackground" src="/sites/default/files/api/portail_bfc/img/ic_map_layers_64.png" alt="Fond de Carte" onclick="$(\'#layers-panel\').show();"/>
					</div>
					<div id="layers-panel" class="layersMenu" style="display:none" onmouseleave="$(this).hide()">
						<ul class="layersList">
							<li onclick="changeTile(\'none\')">Pas de fond de carte</li>
							<li onclick="changeTile(\'local-tile\')">OpenStreetMap</li>
							<li onclick="changeTile(\'toner\')">Noir et Blanc</li>
							<li onclick="changeTile(\'toner-lite\')">Niveaux de Gris</li>
						</ul>
					</div>
					<div class=float-panel>
						<img class="imgExpand" src="/sites/default/files/api/portail_bfc/img/ic_expand.png" alt="Développer"/>
						<img class="imgCollapse" src="/sites/default/files/api/portail_bfc/img/ic_collapse.png" alt="Réduire"/>
						<p class="lblDatas">Données</p>
						<div class=float-panel-content>
							<div class="caption-panel">
								<ul class="caption-list"></ul>
									
							</div>

							<div class="data-panel">
								<ul class="data-list">
								</ul>
							</div>
						</div>
					</div>
					<div class="attributePanel">
							<div class="attr-osm"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | ©<a href="http://openstreetmap.org/copyright">OpenStreetMap</a></div>
							<div class="attr-stamen"><a href="http://openlayers.org/" title="OpenLayer">OpenLayer</a> | Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.</div>
					</div>
				</div>
			
			</div>
		</div>
		<div class="chart-visu">
			<div class="inner">
				<div class="choice">
					<img id="saveButton" src="/sites/default/files/api/portail_bfc/img/ic_download_chart.png" title="Exporter votre graphe"></img>
					<div id="chart-type">
						<span class="chart-select-label">Représentation</span>
						<select id="choice-chart-select" class="table-per-page-select" onchange="onChangeChart()">
							<option value="bar">Diagramme en barres</option>
							<option value="stack">Barres empilées</option>
							<option value="pie">Graphe en secteur</option>
							<option value="line">Courbes</option>
						</select>
					</div>
					<div id="choice-type">
						<span class="chart-select-label">Affichage</span>
						<select id="choice-type-select" class="table-per-page-select" onchange="onChangeType()">
							<option value="repartition">Répartition</option>
							<option value="valeurs">Valeurs</option>
						</select>
					</div>
					<div id="choice-x">
						<span class="chart-select-label">Axe X</span>
						<select id="choice-x-select" class="table-per-page-select" onchange="onChangeX()">

						</select>
					</div>
					<div id="choice-x2">
						<span class="chart-select-label">Axe X</span>
						<select id="choice-x2-select" class="table-per-page-select" onchange="onChangeX2()">

						</select>
					</div>
					<div id="choice-y-type">
						<span class="chart-select-label">Aggrégation</span>
						<select id="choice-y-type-select" class="table-per-page-select" onchange="onChangeYType()">
							<option value="count">Compte</option>
							<option value="sum">Somme</option>
						</select>
					</div>
					<div id="choice-y">
						<span class="chart-select-label">Axe Y</span>
						<select id="choice-y-select" class="table-per-page-select" onchange="onChangeY()">

						</select>
					</div>
					<div id="check-y">
						<span class="chart-select-label">Catégories</span>
						<ul class="y-list">
							<li class="y-item">
								<input type="checkbox" class="choice-cb" style="margin-bottom: 10px;" value="all" onclick="onCheckAll(this.checked)">
								<span class="choice-label">Sélectionner tous</span>
							</li>
						</ul>
					</div>'. $admin_preset .'
	 			</div>
				<div class="graph">
					 <svg class="chart" width="800" height="500"></svg>
		 		</div>
			</div>
			
		</div>
		<div class="table-visu">
			<div class="inner">
				<div class="row">
					<div class="table-per-page">
						<span class="table-per-page-label">Nombre de lignes visibles </span>
						<select id="table-per-page" class="table-per-page-select" onchange="initPagination()">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50" selected="selected">50</option>
							<option value="100">100</option>
							<option value="500">500</option>
						</select>
					</div>
					<div class="table-filter">
						<span id="table-filter" class="table-search">Filtre: 
							<input type="search" id="table-query-search" onkeyup="initPagination()">
						</span>
					</div>
		 		</div>
				<div class="row">
					<div class="table-responsive">
						<table id="table" class="table table-bordered table-striped table-hover">

						</table> 
					</div>
		 		</div>
				
				
				<div class="row">
			        <nav id="pagination">
			            <ul class="pagination"> </ul>
			        </nav>
			    </div>
			</div>
			
		</div>
	</div>
</div>				
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/jquery-3.2.1.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/ol.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/d3.min.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/underscore-min.js"></script>
	<script type="text/javascript" src="https://d3js.org/topojson.v1.min.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/map_bfc.js"></script>	
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/pagination.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/shp.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/xlsx.full.min.js"></script>  
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/canvas-to-blob.min.js"></script>
	<script type="text/javascript" src="/sites/default/files/api/portail_bfc/js/FileSaver.min.js"></script>
	
    <script src="/sites/default/files/api/portail_bfc/js/script_visualisation.js"></script>
    <script src="/sites/default/files/api/portail_bfc/js/bootstrap.min.js"></script>
	
	<script>
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/bootstrap-theme.custom.css\" rel=\"stylesheet\">");
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/bootstrap.custom.css\" rel=\"stylesheet\">");
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/style_visualisation.css\" rel=\"stylesheet\">");
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/ol.css\" rel=\"stylesheet\">");
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/map_bfc.css\" rel=\"stylesheet\">");

	</script>
						
</body>',
						
				],
		);
		return $element;
	}

}

