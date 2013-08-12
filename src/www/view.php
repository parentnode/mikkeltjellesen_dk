<?php
$access_item = array();
$access_default = "page,list";

$access_item = false;

if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["PAGE_PATH"]."/page.class.php");
$object = $page->addObject("www/item.class.php");

getVar("tags") !== false ? Session::setValue("tags", getVar("tags")) : "";

// default view
if(!$page->getStatus()) {$page->setStatus($access_default);}

// header
if($page->getStatus("page")) {
	$page->header();

}

// views
// excluding each other
if($page->getStatus("list")) {

//	$page->setUrlMarker("list");
	$page->getObject($object)->getSearchItems();
	$page->getTemplate("item.view.php", $object);
}

// footer
if($page->getStatus("page")) {
	$page->footer();
	exit();
}

// actions

?>
