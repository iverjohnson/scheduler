<?php
	require_once(dirname(__FILE__).'/connector/combo_connector.php');
	require_once('config.php');
	
$combo = new Connector($res, $dbtype);
$combo->event->attach("beforeFilter", "by_id");
    function by_id($filter) {
        if (isset($_GET['id']))
            $filter->add("item_id", $_GET['id'], '=');
    } 
$combo->dynamic_loading(10);	
$combo->render_table("facilities", "id", "name(label), city");

?>