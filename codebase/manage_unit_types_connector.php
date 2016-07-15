<?php
require_once(dirname(__FILE__).'/connector/grid_connector.php');
require_once('config.php'); 


$grid = new GridConnector($res,$dbtype);                     //connector initialization
$grid->render_table("unit_type","id","desc");      //data configuration

?>