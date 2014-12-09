<?php
global $action;
global $IC;
global $model;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "status DESC, published_at DESC", "extend" => array("mediae" => true)));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Frontpages</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New frontpage image")) ?>
	</ul>

	<div class="all_items i:defaultList taggable filters"<?= $JML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item image item_id:<?= $item["id"] ?> width:160<?= $JML->jsMedia($item) ?>">
				<h3><?= $item["name"] ?></h3>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No frontpage images.</p>
<?		endif; ?>
	</div>

</div>
