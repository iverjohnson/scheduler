<?php
	
	
	require_once(dirname(__FILE__).'/connector/scheduler_connector.php');
	require_once('config.php');
 
	 
$units = new OptionsConnector($res, $dbtype);



//$units->enable_log("log.txt");
$units->render_table("units","id","id(value),name(label),start_time,off_time,oos");
$facilities = new OptionsConnector($res, $dbtype);
$facilities->render_table("facilities", "name", "id(value), name(label), city");

$scheduler = new SchedulerConnector($res, $dbtype);
$scheduler->set_options("units", $units);
$scheduler->set_options("facilities", $facilities);
$scheduler->enable_log("log.txt");

$scheduler->render_table("events","id","start_date,end_date,text,pickup,destination,type,unit_id,transtime,complete");


?>