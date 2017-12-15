<?php
namespace Drupal\bfc_odl_admin\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the Example module.
 */
class portailController extends ControllerBase {

	/**
	 * Returns a simple page.
	 *
	 * @return array
	 *   A simple renderable array.
	 */
	public function myPage() {
		
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		
		$element = array(
				'example one' => [
					'#type' => 'inline_template',
					'#template' => '<div id ="main" class="widget-opendata">
						
		<button id="data" data-ckan="'. $config->get('ckan') .'" style="display : none;"></button> 

        <div id="search" class="row" >
            <div class="container">
                <form id="search-form">
                    <div class="input-group" id="barreRecherche">
                        <input type="text"  class="form-control" aria-label="recherche" placeholder="Rechercher un jeu de données...">
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                    
                </form> 
            </div>
            

        </div>

        <div id="filter" class="col-md-4" >
            <h1> <span id="nb_jeux">0</span> Jeux de données</h1>
            <form>
                
               

                <h2>Filtrer <a id="reset-filters" href="#">Supprimer filtres </a></h2>
                
                <ul class="jetons">
                            

                </ul>
		<h3> Producteur</h3>
                <ul id="list-producteur" class="list-group">
                

                </ul>
                <input id="input-producteur" type="text" class="hidden-filter">
                
                <h3>Echelle territoriale</h3>
                <ul id="list-granularite" class="list-group">
                </ul>
                <input id="input-granularite" type="text" class="hidden-filter">

                <h3>Formats ressources</h3>
                <ul id="list-format" class="list-group">

                </ul>
                <input id="input-format" type="text" class="hidden-filter">

                <h3>Mots Clés</h3>
                <ul id="list-tag" class="list-group">

                </ul>
                <input id="input-tag" type="text" class="hidden-filter">
                                						
				 <div class="form-group">
                    <h2>Trier </h2>
                    <label for="sel1">Trier par:</label>
                    <select class="form-control" id="sel1">
                        <option value="null" selected></option>
                        <option value="date">Date modification</option>
                        <option value="alpha">Ordre alphabétique</option>
                        <option value="producteur">Producteur</option>
                        <option value="granularite">Echelle territoriale</option>
                        <option value="reutilisation">Réutilisations</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="col-md-8" >
            <div id="datasets" >
                
            </div>
			<div class="row-md-12">
                <nav id="pagination">
                    <ul class="pagination">
                    </ul>
                </nav>
            </div>
        </div>

        

    </div>
    <script src="/sites/default/files/api/portail_bfc/js/jquery-3.2.1.js"></script>
	<script src="/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    <script src="/sites/default/files/api/portail_bfc/js/script_portail.js"></script>
    <script src="/sites/default/files/api/portail_bfc/js/bootstrap.min.js"></script>
	<script src="/sites/default/files/api/portail_bfc/js/paginationDataset.js"></script>
	<script>
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/bootstrap.custom.min.css\" rel=\"stylesheet\">");
			$("head").append("<link href=\"/sites/default/files/api/portail_bfc/css/style.css\" rel=\"stylesheet\">");
			$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css\">");
    		$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/sites/default/files/api/portail_bfc/js/jquery-ui-1.12.1.custom/jquery-ui.min.css\">");

	</script>
						
						'
					
				],
		);
		return $element;
		
	}

}

