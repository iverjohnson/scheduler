<?php
	require_once(dirname(__FILE__).'/connector/scheduler_connector.php');
	require_once('config.php');

	$list = new Connector($res, $dbtype);
	
		if (isset ($_POST['id'])){$id=$_POST['id'];}	
		if (isset ($_POST['oos'])){$oos=$_POST['oos'];}	
	$sql = "UPDATE units SET oos = '".$oos."' WHERE id = ".$id;
	$list->sql->attach("Update","UPDATE units SET oos='{oos}' WHERE id={id}");
	$list->enable_log("log.txt",true);
	$list->render_sql($sql,"id","name,oos");
?>