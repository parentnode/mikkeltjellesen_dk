<?php
global $IC;
global $action;

$item_id = $action[0];
$item = $IC->getItem(array("sindex" => $item_id, "extend" => array("mediae" => true)));
?>
<div class="scene photos i:photos item_id:<?= $item["item_id"] ?>">

	<div class="carousel">
		<ul class="images">
<?		foreach($item["mediae"] as $media): ?>
			<li class="item format:<?= $media["format"] ?> variant:<?= $media["variant"] ?>">
				<a href="/images/<?= $item["item_id"] ?>/<?= $media["variant"] ?>/x250.<?= $media["format"] ?>"><?= $media["name"] ?></a>
			</li>
<?		endforeach; ?>
		</ul>
	</div>

</div>
