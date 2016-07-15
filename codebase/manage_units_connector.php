<?php
require_once(dirname(__FILE__).'/connector/grid_connector.php');
require_once('config.php'); 


$typeoptions = new OptionsConnector($res,$dbtype);
$typeoptions->render_table("unit_type","id","id(value),desc(label)");
$dayoptions = ["1","2","3","4","5","6","0"];

$grid = new GridConnector($res,$dbtype);                     //connector initialization
$grid->set_options("type",$typeoptions);
$grid->set_options("work_days",$dayoptions);
$grid->render_table("units","id","name, type, work_days, start_time, off_time");      //data configuration
?>