<?php
global $action;
global $IC;
global $model;
global $itemtype;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("tags" => true, "mediae" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit frontpage image</h1>

	<?= $JML->editGlobalActions($item) ?>

	<?= $JML->editSingleMedia($item, array("label" => "Frontpage image", "variant" => "main")) ?>


	<div class="item i:defaultEdit">
		<h2>Frontpage</h2>
		<?= $model->formStart("update/".$item["item_id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
