<?php
namespace Drupal\bfc_odl_admin\Utils;

   class ChartPreset{
	
	static function insertPreset($data)
	{
		$row = ChartPreset::getPresetbyID($data["id"]);
        if(empty($row)){
            //echo "insert";
            $query = \Drupal::database()->insert('bfc_chart_preset');
            $query->fields([
                'idDataset',
                'chart',
                'type',
                'x',
                'x2',
                'y',
                'yType',
                'yList'
            ]);
            $query->values([
                $data["id"],
                $data["chart"],
                $data["type"],
                $data["x"],
                $data["x2"],
                $data["y"],
                $data["ytype"],
                $data["ylist"]
            ]);

            $query->execute();
        } else {
            //echo "update";
            $query = \Drupal::database()->update('bfc_chart_preset');
            $query->fields([
                'chart' => $data["chart"],
                'type' => $data["type"],
                'x' => $data["x"],
                'x2' => $data["x2"],
                'y' => $data["y"],
                'yType' => $data["ytype"],
                'yList' => $data["ylist"]
            ]);
            $query->condition('idDataset', $data["id"]);
            $query->execute();
        }
        

	    return "ok";	
	}

	static function getPresetbyID($data)
	{
		
		$query = \Drupal::database()->select('bfc_chart_preset', 'bcp');

        $query->fields('bcp', [
            'id',
            'idDataset',
            'chart',
            'type',
            'x',
            'x2',
            'y',
            'yType',
            'yList'
        ]);
		/*$query->addField('bfc_chart_preset', 'id');
        $query->addField('bfc_chart_preset', 'idDataset');
        $query->addField('bfc_chart_preset', 'type');
        $query->addField('bfc_chart_preset', 'x');
        $query->addField('bfc_chart_preset', 'x2');
        $query->addField('bfc_chart_preset', 'y');
        $query->addField('bfc_chart_preset', 'yType');
        $query->addField('bfc_chart_preset', 'yList');*/


        $query->condition('idDataset',$data);

        $res = $query->execute()->fetchAssoc();
			
		return $res;
	}

}