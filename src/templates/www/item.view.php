<?php if($this->getTemplateObject()->item()) {
	$this->getTemplateObject()->getTypeItem();

	$item = $this->getTemplateObject()->item;
?>
<div class="i:carousel carousel">
	<div class="imageNav">
		<ul>
		<? foreach($item["id"] as $key => $id) {
			// get width/height if the file already exists (file will be generated on first request)
			if(file_exists(PUBLIC_FILE_PATH.$id."/x52.jpg")) {
				list($width, $height, $type) = getimagesize(PUBLIC_FILE_PATH.$id."/x52.jpg");
			}
		?>
			<li class="id:<?=$id?>">
				<a href="/view.php?id=<?=$id?>"><img src="/images/<?= $id ?>/x52.jpg" width="<?= $width ?>" height="<?= $height ?>" alt="<?= $item["name"][$key] ?>" /></a>
			</li>
		<? } ?>
		</ul>
	</div>
</div>
<? } else { ?>
	<div class="carousel"></div>
<? } ?>
