<?php

// local segmentation
// setup default site runs only on desktop to minimize maintenance
$segments_config["www"] = array(

	"desktop"       => "desktop",

	"smartphone"    => "smartphone",

	"desktop_ie11"  => "unsupported",
	"desktop_ie10"  => "unsupported",
	"desktop_ie9"   => "unsupported",
	"desktop_light" => "unsupported",
	"tv"            => "unsupported",

	"tablet"        => "tablet",
	"tablet_light"  => "unsupported",

	"mobile"        => "unsupported",
	"mobile_light"  => "unsupported",

	"seo"           => "seo"

);

?>