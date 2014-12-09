<?php
global $IC;
global $action;

$items = $IC->getItems(array("itemtype" => "frontpage", "status" => 1));
if($items) {
	$item = $IC->extendItem($items[rand(0, count($items)-1)], array("mediae" => true));
}
else {
	$item = false;
}
?>
<div class="scene front i:front<?= $item ? " item_id:".$item["id"]." format:".$item["mediae"]["main"]["format"] : "" ?>"></div>
