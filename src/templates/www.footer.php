<?
$IC = new Items();
$collections = $IC->getItems(array("itemtype" => "photocollection", "status" => 1, "order" => "position"));
?>
	</div>

	<div id="navigation">
		<ul class="navigation">
			<li class="front"><a href="/">Frontpage</a></li>
			<li class="contact" itemscope itemtype="http://schema.org/Organization">
				<h3>Contact</h3>
				<ul itemscope itemtype="http://schema.org/PostalAddress">
					<li class="name" itemprop="name">Mikkel Tjellesen</li>
					<li class="role" itemprop="role">Photographer</li>
					<li class="street" itemprop="streetAddress">N&oslash;rrebrogade 7A st.tv.</li>
					<li class="postalcity">DK-<span itemprop="postalCode">2200</span> <span itemprop="addressLocality">Copenhagen N</span></li>
					<li class="phone" itemprop="telephone">+45 26 370 270</li>
					<li class="email" itemprop="email"><a href="mailto:mail@mikkeltjellesen.dk">mail@mikkeltjellesen.dk</a></li>
				</ul>
			</li>
<?		foreach($collections as $collection):
	 		$collection = $IC->extendItem($collection); ?>
			<li<?= $HTML->attribute("class", $collection["classname"]) ?>><a href="/photos/<?= $collection["sindex"] ?>"><?= $collection["name"] ?></a></li>
<?		endforeach; ?>
		</ul>
	</div>

	<div id="footer"></div>

</div>

</body>
</html>