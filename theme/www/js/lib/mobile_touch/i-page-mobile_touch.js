u.bug_console_only = true;
u.bug_force = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		if(u.hc(page, "i:page")) {

			u.rc(page, "i:page");

			// header reference
			page.hN = u.qs("#header");
			page.hN = u.ae(page.parentNode, page.hN);

			// content reference
			page.cN = u.qs("#content");

			// navigation reference
			page.nN = u.qs("#navigation");
			page.nN = u.ae(page.parentNode, page.nN);

			// footer reference
			page.fN = u.qs("#footer");

			// initial scene setup
			page.scene = u.qs(".scene", page.cN);

			// disable dragging page
			u.e.drag(page.hN, page.hN);


			// global resize handler 
			page.resized = function() {

				// update content height
				u.as(page.cN, "height", (page.offsetHeight - page.hN.offsetHeight)+"px");


				// TODO: update drag coords

				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

			}


			// global scroll handler 
			page.scrolled = function() {

				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

			}

			// handle orientation change
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
//				u.bug("page.ready")

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {

					window.scrollTo(0, 0);


					// page is ready
					this.is_ready = true;

					// add logo
					this._logo = u.ie(page.hN, "a", {"class":"logo"})

					// make logo clickable
					this._logo.clicked = function(event) {
						location.href = "/";
					}

					// u.bug(this._logo);
					u.e.click(this._logo);

					// set resize handler
					if(u.e.event_pref != "touch") {
						u.e.addEvent(window, "resize", page.resized);
					}
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);
					// set orientation change handler
					u.e.addEvent(window, "orientationchange", page.orientationchanged);


					// create scene reference
					page.cN.scene = u.qs(".scene", page);

					// initialize header
					page.initHeader();

					// initialize navigation
					page.initNavigation();

					// set content height
					u.as(page.cN, "height", (page.offsetHeight - page.hN.offsetHeight)+"px");

					// enable ajax navigation
					u.navigation();
				}
			}

			// page content is ready to be shown
			page.cN.ready = function() {
//				u.bug("page.cN.ready")

				if(!page.cN.is_ready) {
					u.a.transition(page.hN, "all 0.5s ease-in-out");
					u.a.setOpacity(page.hN, 1);

					page.cN.is_ready = true;
				}
			}

			// reverse ready state
			page.cN.unready = function() {
//				u.bug("page.cN.unready")

				if(page.cN.is_ready) {
					u.a.transition(page.hN, "all 0.5s ease-in-out");
					u.a.setOpacity(page.hN, 0);

					page.cN.is_ready = false;
				}
			}


			// navigation order, prepare for loading
			page.cN.navigate = function(url) {
				u.bug("page.cN.navigate:" + url)

				var scene = u.qs(".scene", page.cN);

				// close menu if it is open
				if(page.nN.is_open) {
					page.bn_nav.clicked();
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


			// init header
			page.initHeader = function() {


				this.bn_nav = u.qs(".servicenavigation li.navigation", this.hN);
				u.ae(this.bn_nav, "div");
				u.ae(this.bn_nav, "div");
				u.ae(this.bn_nav, "div");

				u.ce(this.bn_nav);
				this.bn_nav.clicked = function(event) {

					u.e.kill(event);

					if(!page.nN.is_open) {

						u.a.transition(page.nN, "all 0.5s ease-in-out");
						u.a.translate(page.nN, 0, 0);

						page.nN.is_open = true;
						u.ac(this, "open");
					}
					else {

						u.a.transition(page.nN, "all 0.3s ease-in-out");
						u.a.translate(page.nN, 0, -page.nN.offsetHeight);

						page.nN.is_open = false;
						u.rc(this, "open");
					}
				}

			}


			// Init navigation
			page.initNavigation = function() {
	//			u.bug("initNavigation");

				// append servicenavigation nodes to navigation
				var list = u.qs("ul", page.nN);
				page.nodes = u.cn(list);
				page.first_nav_link = false;

				var i, node;
				for(i = 0; node = page.nodes[i]; i++) {

					// Front
					if(u.hc(node, "front")) {
						// maintain oldschool link for hard reloads

						// move to end of list
						u.ae(list, node);
					}

					// Contact
					else if(u.hc(node, "contact")) {

						node.ul = u.qs("ul", node);

						u.a.setOpacity(node.ul, 0);
						u.as(node.ul, "display", "block");
						node.ul.org_height = node.ul.offsetHeight;
						u.as(node.ul, "height", 0);

						u.e.click(node);
						node.clicked = function() {
							if(this.is_open) {

								// update drag coords
								this.ul.transitioned = function() {
									page.nN.start_drag_y = window.innerHeight - page.nN.offsetHeight;
									page.nN.end_drag_y = page.nN.offsetHeight;
								}

								u.a.transition(this.ul, "all 0.5s ease-in-out");
								u.a.setHeight(this.ul, 0);
								u.a.setOpacity(this.ul, 0);

								this.is_open = false;
							}
							else {

								// update drag coords
								this.ul.transitioned = function() {
									page.nN.start_drag_y = window.innerHeight - page.nN.offsetHeight;
									page.nN.end_drag_y = page.nN.offsetHeight;
								}

								u.a.transition(this.ul, "all 0.5s ease-in-out");
								u.a.setHeight(this.ul, this.ul.org_height);
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


				// position navigation
				u.a.transition(page.nN, "none");
				u.as(page.nN, "display", "block");
				u.a.translate(page.nN, 0, -page.nN.offsetHeight);

				// allow dragging
				u.e.drag(this.nN, [0, window.innerHeight - this.nN.offsetHeight, this.hN.offsetWidth, this.nN.offsetHeight], {"strict":false, "elastica":200, "vertical_lock":true});

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
