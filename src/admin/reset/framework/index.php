<?php
$access_item = false;

if(isset($read_access) && $read_access) {
	return;
}

// this script changes paths in DB to work after changing framework in apache conf

// updates point paths in db to:

$old_framework = "/projects/www/framework/v2/v2/";
$new_framework = "/srv/sites/clients/mikkeltjellesen_dk/wires/";

include_once($_SERVER["FRAMEWORK_PATH"]."/admin/reset/framework/change_framework.php");
