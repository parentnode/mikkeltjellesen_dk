<?php

// local segmentation
// setup default site runs only on desktop to minimize maintenance
$segments_config["www"] = array(

	"desktop"       => "desktop",
	"desktop_ie11"  => "desktop",
	"desktop_ie10"  => "desktop",

	"smartphone"    => "mobile_touch",

	"desktop_ie9"   => "unsupported",
	"desktop_light" => "unsupported",
	"tv"            => "unsupported",

	"tablet"        => "tablet",
	"tablet_light"  => "tablet",

	"mobile"        => "unsupported",
	"mobile_light"  => "unsupported",

	"seo"           => "basic"

);

?>