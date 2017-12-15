<?php

namespace Drupal\bfc_odl_admin\Utils;



class DataSet{
	
	static function checkConnexion()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$query = Query::callSolrServer($ckan . "/api/action/organization_list");
		$results = json_decode($query);
		
		return $results->success;
	}
	
	
	static function getDataSetByIds($ids, $config)
	{
		//$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		//$ids = $config->get('ids');
		
		$resources = array();
		$names = array();
		$datasets = array();
		
		$file_path = drupal_realpath('public://').'/api/portail_bfc';
		$file_name = "liste_autocomplete.json";
		if(!file_exists("$file_path/$file_name"))
		{
			Dataset::initJsonFile();
		}
		
		$json = $config->get('json');
		
		foreach ($ids as $id)
		{
			$query = Query::callSolrServer("http://www.data.gouv.fr/api/1/datasets/?page_size=10000&organization=" . $id);
			$results = json_decode($query);
					
			$i = 0;
			
			while(true && $i<100){
				if($results->data[$i]->organization->name != null){
					$names[$id] = $results->data[$i]->organization->name;
					break;
				}
				$i++;
			}
			foreach ($results->data as $data){
				
				$n = 0;
				$resources = array();
				
				foreach($data->resources as $resource){
					
					$resources[$n]['url'] = $resource->url;
					
					$resources[$n]['title'] = $resource->title;
					
					$resources[$n]['description'] = $resource->description;
					
					$resources[$n]['format'] = $resource->format;

					$n++;
				}
				
				$spatial = array();				
				$spatial['geom'] = $data->spatial->geom;
				$spatial['granularity'] = $data->spatial->granularity;
				
				//var_dump($spatial);
				
				$reuses = $data->metrics->reuses;
				
				
				$tags = array();		
				foreach($data->tags as $tag)
				{
					array_push($tags, $tag);
				}
				
				if(!in_array($data->title,$json[$names[$id]]))
				{
					$json[$names[$id]][] = $data->title;
				}
				
				$datasets[$id][] = [$data->title,$data->description,$resources,$data->license,$data->last_update,$tags,$spatial,$reuses,$data->id];
				
			}
		}
		
		$config->set('json',$json)->save();

		Dataset::updateJsonFile();
		
		$config->set('names', $names)->save();		
		return $datasets;
	}

	static function getDataSet()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ids = $config->get('ids');
	
		return DataSet::getDataSetByIds($ids, $config);
	}
	
	static function getDataSetCron()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ids = $config->get('ids_cron');
	
		return DataSet::getDataSetByIds($ids, $config);
	}
	
	static function sendDataSet()
	{
		
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		
		if(!DataSet::checkConnexion())
		{
			echo '<p>adresse invalide</p>';
			return false;
		}
		
		
		
		$datasets = DataSet::getDataSet();
		
		//var_dump($datasets);
		foreach($config->get('names') as $id => $name){

			
			if(!DataSet::orgaExist(DataSet::correctName($name)))
			{
				DataSet::createOrganization($id,$name);
				
			}	
			
			foreach ($datasets[$id] as $dataset)
			{	
				
				$name_dataset = DataSet::createPackage($dataset[0],$id,$dataset[1],$dataset[3],$dataset[4],$dataset[5],$dataset[6],$dataset[7],$dataset[8]);
				

				foreach ($dataset[2] as $resource)
				{
					$idResource = DataSet::resourceExist($name_dataset,$resource['title']);
					
					//if(!DataSet::resourceExist($name_dataset,$resource['url']))
					//{
						$query = DataSet::createResource($name_dataset,$resource['url'],$resource['description'],$resource['title'],$resource['format'],$idResource);
					//}
					//else
					//{
						//$query = DataSet::createResource($name_dataset,$resource['url'],$resource['description'],$resource['title'],$resource['format'],true);
					//}
				}
			}
					

		}
	}
	
	static function sendDataSetCron() {
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
	
		if(!DataSet::checkConnexion())
		{
			echo '<p>adresse invalide</p>';
			return false;
		}
	
		$datasets = DataSet::getDataSetCron();
	
		//var_dump($datasets);
		foreach($config->get('names') as $id => $name){
	
				
			if(!DataSet::orgaExist(DataSet::correctName($name)))
			{
				DataSet::createOrganization($id,$name);
	
			}
				
			foreach ($datasets[$id] as $dataset)
			{
	
				$name_dataset = DataSet::createPackage($dataset[0],$id,$dataset[1],$dataset[3],$dataset[4],$dataset[5],$dataset[6],$dataset[7],$dataset[8]);
	
	
				foreach ($dataset[2] as $resource)
				{
					$idResource = DataSet::resourceExist($name_dataset,$resource['title']);
						
					//if(!DataSet::resourceExist($name_dataset,$resource['url']))
					//{
					$query = DataSet::createResource($name_dataset,$resource['url'],$resource['description'],$resource['title'],$resource['format'],$idResource);
					//}
					//else
					//{
					//$query = DataSet::createResource($name_dataset,$resource['url'],$resource['description'],$resource['title'],$resource['format'],true);
					//}
				}
			}
				
	
		}
	}
	
	static function getListOrga()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$query = Query::callSolrServer($ckan . "/api/action/organization_list");
		$results = json_decode($query);
		$list = array();
		
		foreach($results->result as $orga){
			$list[] = $orga;
		}

		return $list;
	}
	
	static function orgaExist($name)
	{
		$list = DataSet::getListOrga();
		return in_array($name, $list);
	}
	
	static function getListPackage()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$query = Query::callSolrServer($ckan . "/api/action/package_list");
		$results = json_decode($query);
		$list = array();
		
		return $results->result ;

		
	}
	
	/*static function packageExist($name)
	{
		$list = DataSet::getListPackage();
		return in_array($name, $list);
	}*/
	
	
	static function packageExist($name)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		
		$binaryData->id = $name;
		$query = Query::putSolrRequest($ckan . '/api/action/package_show', $binaryData, 'POST');
		$results = json_decode($query);
		return $results->success;
			
	}
	
	static function resourceExist($package_name,$name)
	{	
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		
		$binaryData->id = $package_name;
		$query = Query::putSolrRequest($ckan . '/api/action/package_show', $binaryData, 'POST');
		$results = json_decode($query);
		
		
		foreach ($results->result->resources as $resource)
		{
			if($resource->name === $name)
			{
				return $resource->id;
			}
		}
		
		return "false";
		
	}
	
	static function correctName($chaine)
	{
		$chaine = strtolower($chaine);
		$accents = Array("/é/", "/è/", "/ê/","/ë/", "/ç/", "/à/", "/â/","/á/","/ä/","/ã/","/å/", "/î/", "/ï/", "/í/", "/ì/", "/ù/", "/ô/", "/ò/", "/ó/", "/ö/");
		$sans = Array("e", "e", "e", "e", "c", "a", "a","a", "a","a", "a", "i", "i", "i", "i", "u", "o", "o", "o", "o");
		$chaine = preg_replace($accents, $sans,$chaine);
		$chaine = preg_replace('#[^A-Za-z0-9]#','-',$chaine);
		
		return $chaine;
		
	}
	
	static function createOrganization($id,$name)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$binaryData->name = DataSet::correctName($name);
		$binaryData->title = $name;
		$binaryData->id = $id;
		
		$result = Query::putSolrRequest($ckan . '/api/action/organization_create', $binaryData, 'POST');
		//$r = json_decode($result);
		//var_dump($r);
	}
	
	static function createPackage($name,$owner_id,$description,$license,$update,$tags,$spatial,$reuses,$id_dataset)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		
		if(strlen($name) > 99){
			$name = mb_strimwidth($name, 0, 90, "");
		}
		
		$dict = array();
		$last_update->key = 'last_update(data.gouv)';
		$last_update->value = $update;
		$dict[] = $last_update;
		
		$nb_reuses->key = 'utilisations';
		$nb_reuses->value = $reuses;
		$dict[] = $nb_reuses;
		
		$granularity->key = 'granularite';
		$granularity->value = $spatial['granularity'];
		$dict[] = $granularity;
		
		$id->key = 'id_datagouv';
		$id->value = $id_dataset;
		$dict[] = $id;
		
		$geom->key = 'spatial';
		$geom->value = $spatial['geom'];
		$dict[] = $geom;
		
		$listTag = array();
		foreach ($tags as $tag)
		{
			$tagg = new \stdClass();
			$tagg->name = $tag;
			array_push($listTag, $tagg);
		}

		
		$binaryData->name = $id_dataset;
		$binaryData->title = $name;
		$binaryData->owner_org = $owner_id;
		$binaryData->notes = $description;
		$binaryData->license_id = $license;
		$binaryData->extras = $dict;
		$binaryData->tags = $listTag;
		
		$query = Query::putSolrRequest($ckan . '/api/action/package_create', $binaryData, 'POST');
		//$r = json_decode($query);
		//var_dump($r);
		return $binaryData->name;
	}
	
	static function createResource($id_dataSet,$url,$description,$name,$format,$idResource)
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$binaryData->description = $description;
		$binaryData->name = $name;
		$binaryData->format = $format;
		
		if($format == 'JSON' || $format == 'CSV')
		{
// 			try {
// 			unlink("C:/BPM/Workspace/PHP_BFC/bfc/modules/bfc_odl_admin/temp.json");
// 			$file = fopen("C:/BPM/Workspace/PHP_BFC/bfc/modules/bfc_odl_admin/temp.json", 'w');
			
// 			file_put_contents("C:/BPM/Workspace/PHP_BFC/bfc/modules/bfc_odl_admin/temp.json", fopen($url, 'r'));
// 			var_dump($file);
// 			}
// 			catch (\Exception $e)
// 			{
// 				$e->getMessage();
// 			}
			
// 			$cfile = curl_file_create("C:/BPM/Workspace/PHP_BFC/bfc/modules/bfc_odl_admin/temp.json");
// 			var_dump($cfile);
			
// 			$binaryData->upload = $cfile;
			
// 			unlink("C:/BPM/Workspace/PHP_BFC/bfc/modules/bfc_odl_admin/temp.json");

			DataSet::addResource($id_dataSet,$url,$description,$name,$format,$idResource);
		}
		else {
			$binaryData->url = $url;
			if($idResource != "false")
			{
				$binaryData->id = $idResource;
				$query = Query::putSolrRequest($ckan . '/api/action/resource_update', $binaryData, 'POST');
				$r = json_decode($query);
				//var_dump($r);
			}
			else
			{
				$binaryData->package_id = $id_dataSet;
				$query = Query::putSolrRequest($ckan . '/api/action/resource_create', $binaryData, 'POST');
				//$r = json_decode($query);
				//var_dump($r);
			}
			
		}

	}
	
	function addResource($id_dataSet,$url,$description,$name,$format,$idResource)
	{
	
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$clef = $config->get('clef');

		$resource = array();
		
		
		$resource['description'] = $description;
		$resource['name'] = $name;
		$resource['format'] = 'geojson';
		
		// create curl resource
		$cu = curl_init();
		// set url
		curl_setopt($cu, CURLOPT_URL, $url);
		//return the transfer as a string
		curl_setopt($cu, CURLOPT_RETURNTRANSFER, 1);
		//enable headers
		curl_setopt($cu, CURLOPT_HEADER, 1);
		curl_setopt($cu, CURLOPT_STDERR, $out);
		curl_setopt($cu, CURLOPT_SSL_VERIFYPEER, false);
		$output = curl_exec($cu);
		$headersize = curl_getinfo($cu, CURLINFO_HEADER_SIZE);
		// close curl resource to free up system resources
		curl_close($cu);
		$header = substr($output, 0, $headersize);
		$body = substr($output, $headersize);
		$pos = strpos($header, "filename=");
		$file_name = substr($header, $pos+9);
		$file_name = str_replace('"', '', $file_name);
		$file_name = trim($file_name);			
		$file_path = drupal_realpath('public://').'/tmp';
		$file = file_put_contents("$file_path/$file_name", $body);
		$resource['upload'] = curl_file_create("$file_path/$file_name");
		
		if($idResource != "false")
		{
			$ch = curl_init($config->get('ckan') . "/api/action/resource_update");
			$resource['id'] = $idResource;
		}
		else
		{
			$ch = curl_init($config->get('ckan') . "/api/action/resource_create");
			$resource['package_id'] = $id_dataSet;
		}

			
		
		curl_setopt_array($ch,
				array(CURLOPT_HTTPHEADER => array('Authorization: ' . $clef),
						CURLOPT_CUSTOMREQUEST => 'POST',
						CURLOPT_POSTFIELDS => $resource,
						CURLOPT_RETURNTRANSFER => TRUE)
				);
		
		$response = curl_exec($ch);
		//var_dump($response);
		curl_close($ch);
		
		unlink("$file_path/$file_name");
	}
	
	
	static function deleteAll()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$config->set('ids_cron', null)->save();
		
		foreach (DataSet::getListPackage() as $package)
		{
			$binaryData->id = $package; 
			$query = Query::putSolrRequest($ckan . '/api/action/dataset_purge', $binaryData, 'POST');
		}
		
		foreach (DataSet::getListOrga() as $orga)
		{
			$binaryData2->id = $orga;
			$query = Query::putSolrRequest($ckan . '/api/action/organization_purge', $binaryData2, 'POST');

		}
		
		$config->set('json',null)->save();
		$file_path = drupal_realpath('public://').'/api/portail_bfc';
		$file_name = "liste_autocomplete.json";
		$file = file_put_contents("$file_path/$file_name", "");
	}
	
	static function deleteOrgas($ids)
	{	
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$ckan = $config->get('ckan');
		
		$cronids = $config->get('ids_cron');
		
		$json = $config->get('json');
		
		foreach ($ids as $key => $id)
		{
			$binaryData->id = $id;
			$binaryData->include_datasets = true;
			$binaryData->include_extras = false;
			$binaryData->include_users = false;
			$binaryData->include_groups = false;
			$binaryData->include_tags =  false;
			$binaryData->include_followers = false;
			
			$query = Query::putSolrRequest($ckan . '/api/action/organization_show', $binaryData, 'POST');
			$result = json_decode($query);
			
			unset($json[$result->result->title]);
			
			foreach ($result->result->packages as $package)
			{
				$binaryData2->id = $package->name;
				$query = Query::putSolrRequest($ckan . '/api/action/dataset_purge', $binaryData2, 'POST');
			}
			
			$binaryData3->id = $id;
			$query = Query::putSolrRequest($ckan . '/api/action/organization_purge', $binaryData3, 'POST');
			unset($cronids[$id]);
		}
		
		$config->set('json',$json)->save();
		Dataset::updateJsonFile();
		
		$config->set('ids_cron', $cronids)->save();
		
	}
	
	static function updateJsonFile()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		$json = $config->get('json');
		$json_string = json_encode($json);
		$file_path = drupal_realpath('public://').'/api/portail_bfc';
		$file_name = "liste_autocomplete.json";
		$file = file_put_contents("$file_path/$file_name", $json_string);
	}
	
	static function initJsonFile()
	{
		$config = \Drupal::service('config.factory')->getEditable('bfc_odl_admin.organisationForm');
		
		$json = array();
		$ids = $config->get('ids_cron');
		foreach ($ids as $id)
		{
			$query = Query::callSolrServer("http://www.data.gouv.fr/api/1/datasets/?page_size=10000&organization=" . $id);
			$results = json_decode($query);
				
			$i = 0;
			$names = array();
			while(true && $i<100){
				if($results->data[$i]->organization->name != null){
					$names[$id] = $results->data[$i]->organization->name;
					break;
				}
				$i++;
			}
		
			foreach ($results->data as $data){
				if(!in_array($data->title,$json[$names[$id]]))
				{
					$json[$names[$id]][] = $data->title;
				}
			}
		}
		
		$config->set('json',$json);
		$json_string = json_encode($json);
		$file_path = drupal_realpath('public://').'/api/portail_bfc';
		$file_name = "liste_autocomplete.json";
		$file = file_put_contents("$file_path/$file_name", $json_string);
	}
	
	
	
	
	
	
	
}