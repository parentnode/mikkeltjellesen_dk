<?php
global $action;
global $IC;
global $model;
global $itemtype;
?>
<div class="scene defaultNew">
	<h1>New frontpage image</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save/".$itemtype, array("class" => "i:defaultNew labelstyle:inject")) ?>
		<p>You always have to start with a name. You can add your frontpage photo in the next step.</p>
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>
</div>
