Util.Objects["menu"] = new function() {

	this.init = function(e) {
		var i, nodes, node;	
//		u.bug("menu")
	
		// check hash and load list
//		e.menu_hash = "";
		e.menu_hash = u.getHashPath();
//		e.menu_hash = location.href.replace(location.protocol+"//"+location.host, "")
//		if(location.hash && e.menu_hash.length >= 2) {

//			u.XMLRequest(e.menu_hash[0], e, "page_status=list");
//			u.bug("mh"+e.menu_hash);
//		}


		// get menu nodes
		nodes = u.ges("li", e);

		for(i = 0; node = nodes[i]; i++) {

			u.addClass(node, "n"+i);

			if(!node.className.match(/contact|access/)) {
				u.unSelectify(node);

//			if(!a.parentNode.className.match(/otliam|access/)) {
				a = u.ge("a", node);

//				u.bug("menu:" + node.className + ":" + a.innerHTML + "::" + node.parentNode.parentNode.className)

//				a.tag_id  = a.href.split("?tags=")[1];
				a.url = a.href.split("?")[0];
				a.removeAttribute("href");
				a.e = e;
//				Util.debug(a.tag_id + "::" + a.url);

				// Do we have a hash value, must be at least two parameters to be a valid menu path
				// Paths can be 
				// /list/list_id
				// /list/list_id/id
				// /id
				if(e.menu_hash && e.menu_hash.length >= 2) {
					// Look for menu item in hash
					var hash = "/"+e.menu_hash[0]+"/"+e.menu_hash[1];
					if(hash == a.url.replace(location.protocol+"//"+location.host, "")) {
//						u.bug("url/"+e.menu_hash[0]+"/"+e.menu_hash[1] +"=" + a.url.replace(location.protocol+"//"+location.host, ""));
						u.XMLRequest(hash, e, "page_status=list");
						u.addClass(node, "sel");
						e.menu_hash = u.setHashPath(hash + (e.menu_hash.length == 3 ? "/"+e.menu_hash[2] : ""));
					}
					
//					u.bug("mh"+e.menu_hash);
				}

//				u.bug(a.innerHTML + ":" + a.parentNode)

				a.onclick = function() {
					this.e.reset();
					u.addClass(this.parentNode, "sel");

					u.XMLRequest(this.url, this.e, "page_status=list");

//					Util.Ajax.loadContainer(this.url, "carousel", "page_status=list");

//					Util.debug(this.parentNode);

//					location.hash = "list,tags=" + this.tag_id;
					this.e.menu_hash = u.setHashPath(this.url.replace(location.protocol+"//"+location.host, ""));
//					this.e.menu_hash = this.url.replace(location.protocol+"//"+location.host, "");
//					location.hash = this.e.menu_hash;
				}

			}
			// set contact link
			else if(node.className.match(/contact/)) {

				u.unSelectify(u.ge("h3", node));
				node.onclick = function() {
					u.toggleClass(this, "open");
				}

			}

		}

		// responder to menu link ajax calls
		e.XMLResponse = function(response) {
			// replace carousel with response 
			u.ge("carousel").parentNode.replaceChild(u.ge("carousel", response), u.ge("carousel"))
			u.init(u.ge("carousel"));
		}

		// reset menu
		e.reset = function() {
			var i, nodes, node;

			nodes = u.ges("li", this);
			for(i = 0; node = nodes[i]; i++) {
				u.removeClass(node, "sel");
				u.removeClass(node, "open");
			}
		}

	}

}
