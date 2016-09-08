<?php

	require_once(dirname(__FILE__).'/connector/scheduler_connector.php');
	require_once(dirname(__FILE__).'/connector/combo_connector.php');
	require_once('config.php');
 
	 
$units = new OptionsConnector($res, $dbtype);
$units->render_table("units","id","id(value),name(label),work_days,start_time,off_time,oos");

$facilities = new OptionsConnector($res, $dbtype);
$facilities->render_table("facilities", "name", "id(value), name(label), city");

$oos = new OptionsConnector($res, $dbtype);
$oos->render_table("oos","id","id(value),unit_id(label),oos_date");

$appointments = new OptionsConnector($res, $dbtype);
$appointments->render_table("event_types", "id", "id(value), name(label)");

$scheduler = new SchedulerConnector($res, $dbtype);
//$scheduler->enable_live_update('actions_table');
$scheduler->set_options("units", $units);
$scheduler->set_options("facilities", $facilities);
$scheduler->set_options("oos", $oos);
$scheduler->set_options("appointments", $appointments);
$scheduler->enable_log("log.txt");

$scheduler->render_table("events","id","start_date,end_date,text,pickup,destination,type,unit_id,transtime,complete");	
?>