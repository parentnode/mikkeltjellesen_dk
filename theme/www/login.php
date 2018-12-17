<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$model = new User();

$page->bodyClass("login");
$page->pageTitle("Login");


$page->page(array(
	"type" => "login",
	"templates" => "pages/login.php"
));

?>
