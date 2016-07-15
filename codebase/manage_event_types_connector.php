<?php
require_once(dirname(__FILE__).'/connector/grid_connector.php');
//require_once(dirname(__FILE__).'/connector/combo_connector.php');
require_once('config.php'); 


$typeoptions = new OptionsConnector($res,$dbtype);
$typeoptions->render_table("unit_type","id","id(value),desc(label)");


$grid = new GridConnector($res,$dbtype);                     //connector initialization
$grid->set_options("unit_type",$typeoptions);
$grid->render_table("event_types","id","name, unit_type");      //data configuration

?>