<?php
	require_once(dirname(__FILE__).'/connector/scheduler_connector.php');
	require_once('config.php');

	$list = new Connector($res, $dbtype);
	
		if (isset ($_POST['action'])){$action=$_POST['action'];}
		if (isset ($_POST['id'])){$id=$_POST['id'];}	
		if (isset ($_POST['oos'])){$oos=$_POST['oos'];}
		if (isset ($_POST['oos_date'])){$oos_date=$_POST['oos_date'];}
		
	if($action=='Insert'){
		$sql = "INSERT INTO oos (unit_id, oos_date) VALUES (".$id.",STR_TO_DATE('".$oos_date."','%Y-%m-%d'))";
		$otherfields = "unit_id,oos_date";
		$list->sql->attach("Insert","INSERT INTO oos (unit_id,oos_date) VALUES ({id},STR_TO_DATE('{oos_date}', '%Y-%m-%d'))");
	}
	elseif($action=='Update'){
		$sql = "UPDATE units SET oos = '".$oos."' WHERE id = ".$id;
		$otherfields = "name,oos";
		//$list->sql->attach("Update","UPDATE units SET oos='{oos}' WHERE id={id}");
	} 
	elseif ($action=='Delete'){
		$sql = "DELETE from oos WHERE unit_id=".$id." AND oos_date=STR_TO_DATE('".$oos_date."','%Y-%m-%d')";
		$otherfields = "unit_id,oos_date";
		//$list->sql->attach("Delete", "DELETE FROM oos WHERE unit_id = {id} AND oos_date = {oos_date}");
	}
	
	$list->enable_log("log1.txt",true);
	$list->render_complex_sql($sql,"id",$otherfields);
?>