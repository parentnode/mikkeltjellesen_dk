Util.Objects["photos"] = new function() {
	this.init = function(scene) {

		// make room for carousel
		scene.bottom_offset = 172;


		// resize handler 
		scene.resized = function() {
			//u.bug("scene.resized:" + u.nodeId(this))

			// set height of image mask
			this.image_height = this.offsetHeight - this.bottom_offset;
			u.as(this.image_mask, "height", this.image_height + "px");

			this.updateCarouselButtonState();

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


			// insert large image viewer + image name
			this.image_name = u.ie(this, "p", {"class":"image"});
			this.image_mask = u.ie(this, "div", {"class":"image"});
			this.image_mask.scene = this;
			u.ce(this.image_mask);
			this.image_mask.clicked = function(event) {
				this.scene.showNext();
			}

			this.image = u.ae(this.image_mask, "img", {"class":"image"});
			this.image.scene = this;

			// next/prev clicks
			u.ce(this.image);
			this.image.clicked = function(event) {
				u.e.kill(event);

				var x = u.eventX(event);
				var img_x = u.absX(this);
				var img_w = this.offsetWidth;

				if((img_w/2) + img_x > x) {
					this.scene.showPrev();
				}
				else {
					this.scene.showNext();
				}
			}


			// set height of image mask
			this.image_height = this.offsetHeight - this.bottom_offset;
			u.as(this.image_mask, "height", this.image_height + "px");


			// carousel div
			this.carousel = u.qs("div.carousel", this);


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

						this.image.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
						}

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

		// enable scrolling/swiping in carousel
		scene.setUpScroll = function() {

			// image list should be scrollable
			if(this.image_list.offsetWidth > this.carousel.offsetWidth) {

				// not activated yet
				if(!this.carousel.active) {

					this.carousel.active = true;

					// touch device
					if(u.e.event_pref == "touch") {

						// add drag
						u.e.drag(this.image_list, [this.carousel.offsetWidth - this.image_list.offsetWidth, 0, this.image_list.offsetWidth, this.image_list.offsetHeight], {"strict":false, "elastica":200});

					}
					// mouse device
					else {

						u.a.translate(this.image_list, 0, 0);
						u.a.transition(this.image_list, "all 0.1s linear");

						// carousel navigation
						this.carousel.bn_left = u.ae(this.carousel, "div", {"class":"left"});
						this.carousel.bn_left.scene = this;
						this.carousel.bn_right = u.ae(this.carousel, "div", {"class":"right"});
						this.carousel.bn_right.scene = this;


						this.carousel.bn_right.out = this.carousel.bn_left.out = function() {
							u.t.resetTimer(this.t_mover);
						}
						this.carousel.bn_right.over = this.carousel.bn_left.over = function() {
							this.mover();
						}

						this.carousel.bn_left.mover = function() {

							if(this.scene.image_list._x < 0 ) {

								u.a.translate(this.scene.image_list, this.scene.image_list._x + 5, 0);
								this.t_mover = u.t.setTimer(this, this.mover, 50);
							}
							else {

								u.a.translate(this.scene.image_list, 0, 0);
							}

							this.scene.updateCarouselButtonState();
						}

						this.carousel.bn_right.mover = function() {

							if(this.scene.image_list._x > (this.scene.carousel.offsetWidth - this.scene.image_list.offsetWidth)) {

								u.a.translate(this.scene.image_list, this.scene.image_list._x - 5, 0);
								this.t_mover = u.t.setTimer(this, this.mover, 50);
							}
							else {

								u.a.translate(this.scene.image_list, (this.scene.carousel.offsetWidth - this.scene.image_list.offsetWidth), 0);
							}

							this.scene.updateCarouselButtonState();
						}

						u.e.addEvent(this.carousel.bn_right, "mouseover", this.carousel.bn_right.over);
						u.e.addEvent(this.carousel.bn_right, "mouseout", this.carousel.bn_right.out);

						u.e.addEvent(this.carousel.bn_left, "mouseover", this.carousel.bn_left.over);
						u.e.addEvent(this.carousel.bn_left, "mouseout", this.carousel.bn_left.out);


						this.updateCarouselButtonState();
					}

				}
				// primary activation has already been performed
				else {

					// update drag boundaries
					if(u.e.event_pref == "touch") {
						this.image_list.start_drag_x = this.carousel.offsetWidth - this.image_list.offsetWidth;
						this.image_list.end_drag_x = this.image_list.offsetWidth;

						u.bug(this.carousel.offsetWidth - this.image_list.offsetWidth)
					}
				}

			}

		}

		// set correct state on image list buttons
		scene.updateCarouselButtonState = function() {

			if(this.carousel.bn_right && this.carousel.bn_left) {

				if(this.image_list._x < 0 ) {
					u.as(this.carousel.bn_left, "display", "block", false);
				}
				else {
					u.as(this.carousel.bn_left, "display", "none", false);
				}

				if(this.image_list._x > (this.carousel.offsetWidth - this.image_list.offsetWidth)) {
					u.as(this.carousel.bn_right, "display", "block", false);
				}
				else {
					u.as(this.carousel.bn_right, "display", "none", false);
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

			this.image.transitioned = function() {

				this.transitioned = null;
				u.a.transition(this, "none");

				this.loaded = function(queue) {
					this.src = queue[0].image.src;

					this.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
					}

					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.setOpacity(this, 1);
				}
				u.preloader(this, ["/images/"+this.scene.item_id+"/"+this.scene.next_node.variant+"/x"+(this.scene.image_height - this.scene.image_height%100 + 100) + "." + this.scene.next_node.format]);

				this.scene.image_name.innerHTML = u.text(this.scene.next_node);
			}

			if(u.gcs(this.image, "opacity") != 0) {
				u.a.transition(this.image, "all 0.3s ease-in-out");
				u.a.setOpacity(this.image, 0);
			}
			else {
				this.image.transitioned();
			}

			// update button states
			this.updateCarouselButtonState();
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

		// enable keyboard shortcuts
		scene.keys = function(event) {
			if(event.keyCode == 37) {

				u.qs(".scene", page.cN).showPrev();
			}
			else if(event.keyCode == 39) {

				u.qs(".scene", page.cN).showNext();
			}
		}
		u.e.addEvent(document.body, "keyup", scene.keys);
		
		// are you ready?
		scene.ready();
	}

}
