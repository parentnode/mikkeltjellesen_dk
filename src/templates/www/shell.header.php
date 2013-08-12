<!DOCTYPE html>
<html>
<head>
	<!-- (c) & (p) think.dk / wires.dk 2009 //-->
	<!-- All material protected by copyrightlaws //-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="fotograf" />
	<meta name="language" content="da" />
	<meta name="description" content="Foto portfolio for Mikkel Tjellesen" />
	<meta name="verify-v1" content="lhuJDs46hKAOKwh3AUDH5/7YVt4yhEKR/Q88bD4wfQI=" />
	<title><?= $this->getTitle() ?></title>
	<style type="text/css">@import url(/css/seg_desktop.css);</style>
	<script type="text/javascript" src="/js/seg_desktop.js"></script>
	<!--script type="text/javascript" src="/js/lib/seg_desktop_include.js"></script-->
</head>

<body>

<div id="page">

	<div id="nav">
		<ul class="i:menu menu">
			<li class="access"><a href="#content" name="header"><?= $this->translate("To content") ?></a></li>
			<li class="access"><a href="#footer"><?= $this->translate("To footer of page") ?></a></li>

			<li class="contact">
				<h3>CONTACT</h3>
				<span>Nørrebrogade 7A st.tv.</span>
				<span>DK-2200 Copenhagen N</span>
				<span><script type="text/javascript">Util.otliam('mail', 'mikkeltjellesen.dk');</script></span>
				<span class="tel"><span class="value">+45 26 370 270</span></span>
			</li>

			<?php
				global $level;
				$level = 0;

				function createMenu($items){
					global $page;
					global $HTML;
					global $level;
					$_ = '';

					if($items["id"]) {
						foreach($items["id"] as $key => $value) {

							$selected = $value == Session::getValue("tags") ? "sel" : "";

//							$selected = $items["url"][$key] == $page->url ? "selected" : "";
//							$selected = $page->trail && count($page->trail) > $level && $value === $page->trail[$level]->id ? 'selected' : false;


							$name = $items["name"][$key];
							$url = $items["url"][$key];
							$children = $items["children"][$key];

							if($children || $url) {
								$_ .= '<li'.$HTML->makeAttribute("class", $selected).'>';

								$_ .= $url ? '<a href="'.$url.'">' : '<h3>';
								$_ .= $name;
								$_ .= $url ? '</a>' : '</h3>';

								if($children) {
									$level++;
									$_ .= '<ul>';
									$_ .= createMenu($children);
									$_ .= '</ul>';
									$level--;
								}
								$_ .= '</li>';
							}
							else if($name == "----") {
								$_ .= '<li'.$HTML->makeAttribute("class", "separator").'></li>';
							}
						}

					}
					return $_;
				}
				print createMenu(Session::getNavigation());
			?>
		</ul>
		<ul>
			<li class="frontpage i:home"><a href="/index.php"><?= $this->translate("To frontpage") ?></a></li>
		</ul>
	</div>

	<div class="access"><a href="#header" name="content"><?= $this->translate("To menu") ?></a></div>
	<div id="content">
