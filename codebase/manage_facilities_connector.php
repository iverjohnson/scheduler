<?php
require_once(dirname(__FILE__).'/connector/grid_connector.php');
require_once('config.php'); 


$stateoptions = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

$grid = new GridConnector($res,$dbtype);                     //connector initialization
$grid->set_options("state",$stateoptions);
$grid->render_table("facilities","id","name, street, city, state, zip");      //data configuration
?>