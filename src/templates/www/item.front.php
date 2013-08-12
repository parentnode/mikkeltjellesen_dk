<?php if($this->getTemplateObject()->item()) {

	$random_image = rand(0, count($this->getTemplateObject()->item["id"])-1);

	$item_id = $this->getTemplateObject()->item["id"][$random_image];
	
//	list($width, $height, $type) = getimagesize(PUBLIC_FILE_PATH.$item_id."/700x.jpg");
	print '<div class="layover" style="background-image: url(/images/'.$item_id.'/1000x.jpg);" onclick="this.className = \'hidden\'"></div>';
	

} ?>
<div class="carousel"></div>	
