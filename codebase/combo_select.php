<?php
	require_once('common/connector/combo_connector.php');
	require_once('config.php');

	$combo = new ComboConnector($res, $dbtype);

	$combo->event->attach("beforeFilter", "by_id");
	function by_id($filter) {
		if (isset($_GET['id']))
			$filter->add("id", $_GET['id'], '=');
	}	

	$combo->dynamic_loading(3);
	$combo->render_table("facilities","id","name");

?>
