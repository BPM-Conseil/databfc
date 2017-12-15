<?php
/**
 * @file
* Contains \Drupal\search_api_solr_admin\Form\QueryForm.
*/

namespace Drupal\bfc_odl_admin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\bfc_odl_admin\Utils\Query;
use Drupal\bfc_odl_admin\Utils\DataSet;

/**
 * Implements an example form.
 */
class selectionForm extends FormBase {


	/**
	 * {@inheritdoc}
	 */
	public function getFormId() {
		return 'selectionForm';
	}

	/**
	 * {@inheritdoc}
	 */
	public function buildForm(array $form, FormStateInterface $form_state) {
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		$config->set('organisations',null)->save();
		$query = Query::callSolrServer($ckan . "/api/action/organization_list?all_fields=true");
		$results = json_decode($query);
		
		$organisations = array();
		
		drupal_get_messages('status');
			
		foreach ($results->result as $orga){
			$organisations[$orga->id]=$orga->title;
		}
		
		
		$form['ids'] = array(
				'#type' => 'checkboxes',
				'#options' => $organisations,
				'#title' => $this->t('Organisations sélectionnées')
		);

		$form['deleteOrgas'] = array(
				'#type' => 'submit',
				'#value' => $this->t('Supprimer'),
				'#submit' => array('::deleteOrgas')
		);

		$form['delete'] = array(
				'#type' => 'submit',
				'#value' => $this->t('Tout supprimer'),
				'#submit' => array('::deleteAll')
		);
		
		
		$form['widget'] = array(
				'#type' => 'submit',
				'#value' => $this->t('Exporter')
		);
		
		if(count(array_filter($form_state->getValue('ids'))) == 1){
			drupal_set_message('Affichez les jeux de données de ce producteur dans votre site Web en copiant le code ci-dessous.', 'status');
			drupal_set_message('<script src="http://51.255.95.107:8090/sites/default/files/api/portail_bfc/js/widget-script2.js" type="text/javascript"></script><div class="container" data-producteur="'.reset(array_filter($form_state->getValue('ids'))).'" data-serveur="'. $config->get('ckan') .'" id="widget-container" style="height: 100%; width:100%"></div>', 'status');
		}
		

		return $form;
	}
	public function submitForm(array &$form, FormStateInterface $form_state)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		//$config->set('ids', array_filter($form_state->getValue('ids')))->save();
		$form_state->setRebuild();

	}

	public function deleteAll()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$config->set('ids', null)->save();
		Dataset::deleteAll();
	}

	public function deleteOrgas($form, &$form_state)
	{
		//$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		//$ids = $config->get('ids');
		//$config->set('ids', null)->save();
		Dataset::deleteOrgas(array_filter($form_state->getValue('ids')));

	}
	

}