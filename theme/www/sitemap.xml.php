<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");
$IC = new Items();

print '<?xml version="1.0" encoding="UTF-8"?>';
?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>http://mikkeltjellesen.dk/</loc>
		<lastmod><?= date("Y-m-d", filemtime(LOCAL_PATH."/templates/pages/front.php")) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>1</priority>
	</url>
<?


	// LOG ITEMS
	$items = $IC->getItems(array("itemtype" => "photocollection", "status" => 1));
	foreach($items as $item): ?>
	<url>
		<loc>http://mikkeltjellesen.dk/photos/<?= $item["sindex"] ?></loc>
		<lastmod><?= date("Y-m-d", strtotime($item["modified_at"])) ?></lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>

<? endforeach; ?>

</urlset>