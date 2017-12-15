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
class ckanForm extends FormBase {


	/**
	 * {@inheritdoc}
	 */
	public function getFormId() {
		return 'ckanForm';
	}

	/**
	 * {@inheritdoc}
	 */
	public function buildForm(array $form, FormStateInterface $form_state) {
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$config->set('organisations',null)->save();
		
		//drupal_get_messages('error');
		
		$form['recherche'] = array(
				'#type' => 'search',
				'#title' => $this->t('Adresse du serveur'),
				 '#attributes' => array(
   					'placeholder' => $config->get('ckan'),
  				),
		);
		
		$form['clef'] = array(
				'#type' => 'search',
				'#title' => $this->t('Clé d\'authentification'),
		);
		
		$form['valider'] = array(
				'#type' => 'submit',
				'#value' => $this->t('Valider'),
		);
		
		
		

		return $form;
	}
	public function submitForm(array &$form, FormStateInterface $form_state)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$config->set('ckan',$form_state->getValue('recherche'))->save();
		$config->set('clef',$form_state->getValue('clef'))->save();
		
		if(DataSet::checkConnexion()!='true')
		{
			//echo '<p style="font-size:20px">Adresse invalide</p>';
			drupal_set_message('adresse invalide','error',false);
			// $config->set('ckan',null)->save();
		}
	}

}