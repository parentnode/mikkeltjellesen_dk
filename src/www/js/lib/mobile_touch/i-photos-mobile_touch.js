Util.Objects["photos"] = new function() {
	this.init = function(scene) {

		// resize handler 
		scene.resized = function() {
			//u.bug("scene.resized:" + u.nodeId(this))

			// set height of image mask
			u.as(this.image_mask, "height", (this.offsetHeight - this.carousel.offsetHeight)+"px");

			// update drag coords
			this.setUpScroll();

			// refresh dom
			this.offsetHeight;
		}

		// scroll handler 
		scene.scrolled = function() {
			//u.bug("scene.scrolled:" + u.nodeId(this))

		}

		// GO GO!
		scene.ready = function() {
			//u.bug("scene.ready:" + u.nodeId(this))

			page.cN.scene = this;

			// tell page 
			page.cN.ready();

			this.item_id = u.cv(this, "item_id");


			// insert large image viewer
			this.image_mask = u.ie(this, "div", {"class":"image"});
			this.image_mask.scene = this;
			u.ce(this.image_mask);
			this.image_mask.clicked = function(event) {
				u.e.kill(event);
				
				var x = this.start_event_x;
				var img_x = u.absX(this);
				var img_w = this.offsetWidth;

				if((img_w/2) + img_x > x) {
					this.scene.showPrev();
				}
				else {
					this.scene.showNext();
				}
			}

			// carousel div
			this.carousel = u.qs("div.carousel", this);

			// set height of image mask
			u.as(this.image_mask, "height", (this.offsetHeight - this.carousel.offsetHeight)+"px");


			// prepare and load images
			this.image_list = u.qs("ul.images", this);
			this.image_list_width = 0;
			this.images = u.qsa("li.item", this.image_list);
			if(this.images) {
				scene.showImage(this.images[0]);

				var i, node;
				for(i = 0; node = this.images[i]; i++) {

					node.format = u.cv(node, "format");
					node.variant = u.cv(node, "variant");

					node.image = u.ae(node, "img");

					node.scene = this;

					u.ce(node);
					node.clicked = function() {
						this.scene.showImage(this);
					}

					// load image
					node.loaded = function(queue) {
						this.image.src = queue[0].image.src;

						// update list width
						this.scene.image_list_width = this.scene.image_list_width + this.image.offsetWidth;
						u.as(this.scene.image_list, "width", this.scene.image_list_width + "px");

						// update scroll settings
						this.scene.setUpScroll();

						// this.image.transitioned = function() {
						// 	this.transitioned = null;
						// 	u.a.transition(this, "none");
						// }

						// prepare to show image
						u.a.transition(this.image, "none");
						u.a.setOpacity(this.image, 0);

						// show image
						u.a.transition(this.image, "all .3s ease-in-out");
						u.a.setOpacity(this.image, 1);
					}
					u.preloader(node, ["/images/"+this.item_id+"/"+node.variant+"/x52."+node.format]);

				}
			}

		}


		// enable swiping in carousel
		scene.setUpScroll = function() {

			// image list should be scrollable
			if(this.image_list.offsetWidth > this.carousel.offsetWidth) {

				// not activated yet
				if(!this.carousel.active) {

					this.carousel.active = true;

					// add drag
					u.e.drag(this.image_list, [this.carousel.offsetWidth - this.image_list.offsetWidth, 0, this.image_list.offsetWidth, this.image_list.offsetHeight], {"strict":false, "elastica":200});

				}
				// primary activation has already been performed
				else {

					// update drag boundaries
					this.image_list.start_drag_x = this.carousel.offsetWidth - this.image_list.offsetWidth;
					this.image_list.end_drag_x = this.image_list.offsetWidth;
				}

			}

		}

		// show image related to node
		scene.showImage = function(node) {

			if(this.next_node) {
				u.rc(this.next_node, "selected");
			}

			this.next_node = node;
			u.ac(this.next_node, "selected");


			this.image_mask.transitioned = function() {

				// this.transitioned = null;
				// u.a.transition(this, "none");

				this.loaded = function(queue) {
					u.as(this, "backgroundImage", "url("+queue[0].image.src+")")

					// this.transitioned = function() {
					// 	this.transitioned = null;
					// 	u.a.transition(this, "none");
					// }

					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.setOpacity(this, 1);
				}
				u.preloader(this, ["/images/"+this.scene.item_id+"/"+this.scene.next_node.variant+"/480x." + this.scene.next_node.format]);
			}

			if(u.gcs(this.image_mask, "opacity") != 0) {
				u.a.transition(this.image_mask, "all 0.3s ease-in-out");
				u.a.setOpacity(this.image_mask, 0);
			}
			else {
				this.image_mask.transitioned();
			}

		}

		// show next image, if next is available
		scene.showNext = function() {
			if(this.next_node) {
				var next = u.ns(this.next_node);
				if(next) {

					// make sure image is within viewable area 
					if(next.offsetLeft+next.offsetWidth > this.carousel.offsetWidth + this.image_list._x) {
						u.a.translate(this.image_list, this.carousel.offsetWidth - (next.offsetLeft+next.offsetWidth), 0);
					}
					this.showImage(next);
				}
			}
		}

		// show previous image, if previous is available
		scene.showPrev = function() {
			if(this.next_node) {
				var prev = u.ps(this.next_node);
				if(prev) {

					// make sure image is within viewable area 
					if(this.image_list._x + prev.offsetLeft < 0) {
						u.a.translate(this.image_list, -(prev.offsetLeft), 0);
					}
					this.showImage(prev);
				}
			}
		}

		// are you ready?
		scene.ready();
	}

}
