u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		if(u.hc(page, "i:page")) {

			u.rc(page, "i:page");

			// header reference
			page.hN = u.qs("#header");
			page.hN.service = u.qs(".servicenavigation", page.hN);

			// content reference
			page.cN = u.qs("#content", page);

			// navigation reference
			page.nN = u.qs("#navigation", page);
			// move navigation to header
			page.nN = u.ae(page.hN, page.nN);

			// footer reference
			page.fN = u.qs("#footer");


			// global resize handler 
			page.resized = function() {

				// forward resize event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

			}

			// global scroll handler 
			page.scrolled = function() {

				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

			}

			// global orientation change handler
			page.orientationchanged = function(event) {

				u.rc(document.body, "landscape|portrait");
				if(window.orientation == 90 || window.orientation == -90) {
					u.ac(document.body, "landscape");
				}
				else {
					u.ac(document.body, "portrait");
				}

			}

			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
	//			u.bug("page ready:" + page.is_ready)

				// page is ready to be shown - only initalize if not already shown
				if(!page.is_ready) {

					// page is ready
					page.is_ready = true;

					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// set orientation change handler
					if(u.e.event_pref == "touch") {
						u.e.addEvent(window, "orientationchange", page.orientationchanged);
					}
					// set resize handler
					else {
						u.e.addEvent(window, "resize", page.resized);
					}

					// create scene reference
					page.cN.scene = u.qs(".scene", page);

					// initialize navigation
					page.initNavigation();

					// set navigation state
					page.setNavigationState();

					// enable ajax navigation
					u.navigation();
				}
			}

			// page content is ready to be shown
			page.cN.ready = function() {

				if(!page.cN.is_ready) {
					u.a.transition(page.hN, "all 0.5s ease-in-out");
					u.a.setOpacity(page.hN, 1);

					page.cN.is_ready = true;
				}
			}

			// reverse ready state
			page.cN.unready = function() {
				u.bug("page.cN.unready")

				if(page.cN.is_ready) {
					u.a.transition(page.hN, "all 0.5s ease-in-out");
					u.a.setOpacity(page.hN, 0);

					page.cN.is_ready = false;
				}
			}

			// navigation order, prepare for loading
			page.cN.navigate = function(url) {
				u.bug("page.cN.navigate")


				var scene = u.qs(".scene", page.cN);

				// clean up old events
				if(scene.keys) {
					u.e.removeEvent(document.body, "keyup", scene.keys);
				}

				page.cN.next_url = url;

				// remove existing scene first
				if(scene) {
					scene.transitioned = function() {
						this.parentNode.removeChild(this);

						page.cN.loadContent();
					}
					u.a.transition(scene, "all 0.5s ease-in-out");
					u.a.setOpacity(scene, 0);
				}
				else {
					page.cN.loadContent();
				}
			}

			// load content
			page.cN.loadContent = function() {

				this.response = function(response) {

					var scene = u.qs(".scene", response);
					u.ae(this, scene);
					u.init(this);

					page.setNavigationState();
				}
				u.request(this, this.next_url);
			}

			// initialize navigation elements
			page.initNavigation = function() {
	//			u.bug("initNavigation");

				var list = u.qs("ul.navigation", page.nN);
				page.nodes = u.cn(list);
				page.first_nav_link = false;

				var i, node;
				for(i = 0; node = page.nodes[i]; i++) {

					// Front
					if(u.hc(node, "front")) {
						// maintain oldschool link for hard reloads
					}

					// Contact
					else if(u.hc(node, "contact")) {
						node.ul = u.qs("ul", node);

						u.a.setOpacity(node.ul, 0);
						u.as(node.ul, "display", "block");

						u.e.click(node);
						node.clicked = function() {
							if(this.is_open) {
								u.a.transition(this.ul, "all 0.5s ease-in-out");
								u.a.setOpacity(this.ul, 0);
								this.is_open = false;
							}
							else {
								u.a.transition(this.ul, "all 0.5s ease-in-out");
								u.a.setOpacity(this.ul, 1);
								this.is_open = true;
							}
						}
					}

					// Any other link
					else {

						// remember first nav link (to show after frontpage)
						if(!page.first_nav_link) {
							page.first_nav_link = node;
						}

						u.ce(node, {"type":"link"});
					}

				}
			}

			// apply selected class to navigation
			page.setNavigationState = function() {

				var i, node;
				for(i = 0; node = page.nodes[i]; i++) {
					if(node.url && node.url == location.href) {
						u.ac(node, "selected");
					}
					else {
						u.rc(node, "selected");
					}
				}
			}

			// ready to start page builing process
			page.ready();
		}
	}
}

// Controlled initialization
function static_init() {
	u.o.page.init(u.qs("#page"));
}

u.e.addDOMReadyEvent(static_init);

// u.e.addDOMReadyEvent(u.init);








