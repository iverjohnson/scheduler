<?php
	require_once('common/connector/combo_connector.php');
	require_once('config.php');

	$combo = new ComboConnector($res, $dbtype);

	$combo->event->attach("beforeFilter", "by_id");
	function by_id($filter) {
		if (isset($_GET['id']))
			$filter->add("id", $_GET['id'], '=');
	}	
	$combo->enable_log("log.txt");
	$combo->dynamic_loading(6);
	$combo->render_table("facilities","id","name(label), city");
	//$combo->render_sql("Select *,CONCAT(name,'-',city) as label FROM facilities", "name", "name(label)")

?>
