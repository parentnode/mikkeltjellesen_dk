<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();


$page->bodyClass("photos");
$page->pageTitle("Photographer - Teis Bruno");


// Requires exactly two parameters /photos/#sindex#
if(count($action) == 1) {

	$page->page(array(
		"templates" => "pages/photos.php"
	));
	exit();
}

$page->page(array(
	"templates" => "pages/404.php"
));

?>
