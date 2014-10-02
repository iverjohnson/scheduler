<?php
	
	
	require_once(dirname(__FILE__).'/connector/scheduler_connector.php');
	require_once('config.php');
	
	//Mysql
	// $dbtype = "MySQL";
	 //$res=mysql_connect("127.0.0.1", "root", "");
	 //mysql_select_db("schedule");

$scheduler = new SchedulerConnector($res, $dbtype);

$scheduler->render_table("events","id","start_date,end_date,description,ptname,pickup,destination,type,unit_id");

?>