Util.Objects["carousel"] = new function() {

	this.init = function(e) {
		var i, li, factor, x_pos = 0;

		e.timer = null;
		e.speed = 10;

		e.selected_image_id = Util.getVar("id");
		var hash = u.getHashPath();
		if(hash) {
//			u.bug(hash.length + ":" + hash)
			if(hash.length == 1) {
				e.selected_image_id = Util.getHashPath(0);
//				u.bug("sia:"+e.selected_image_id)
			}
			else if(hash.length == 3) {
				e.selected_image_id = Util.getHashPath(2);
//				u.bug("sib:"+e.selected_image_id)
			}
//			u.bug("si:"+e.selected_image_id)
			
		}
		e.menu_hash = u.ge("menu").menu_hash;
		e.direction = "";

//		u.bug(u.getHashPath(1));
//		u.bug(u.getHashPath(3));
//		e.nav = e.getElementsByTagName("ul")[0];
		e.nav = u.ge("ul", e);

//		e.nav.li = e.nav.getElementsByTagName("li");
		e.nav.li = u.ges("li", e.nav);

		// browse navigation
		var browse = document.createElement("div");
		e.nav.browse_a = e.nav.parentNode.appendChild(browse);
		e.nav.browse_a.e = e;
		e.nav.browse_b = e.nav.parentNode.appendChild(browse.cloneNode(browse));
		e.nav.browse_b.e = e;
		e.nav.browse_a.className = "a";
		e.nav.browse_b.className = "b";
//		u.bug(e.nav.browse_b)
		e.nav.browse_a.onmouseover = function() {
//			Util.debug("over");
			if(this.e.nav.offsetLeft < 0) {
//				Util.debug("over go a");
				this.e.nav.browse = this;
				u.addClass(this, "browse");
				this.e.mover();
			}
			else {
				this.style.display = "none";
			}
		}
		e.nav.browse_a.onmouseout = function() {
			this.e.nav.browse = false;
			clearTimeout(this.e.timer);
			u.removeClass(this, "browse");
		}
		e.nav.browse_b.onmouseover = function() {
//			Util.debug("over");
			if(this.e.nav.offsetLeft > this.e.nav.offsetWidth - this.e.list_w) {
//				Util.debug("over go b");
				this.e.nav.browse = this;
				u.addClass(this, "browse");
				this.e.mover();
			}
			else {
				this.style.display = "none";
			}
		}
		e.nav.browse_b.onmouseout = function() {
			this.e.nav.browse = false;
			clearTimeout(this.e.timer);
			u.removeClass(this, "browse");
		}
		// title element
		e.txt = document.createElement("p");
		e.txt = e.insertBefore(e.txt, e.firstChild);

		// image element
		e.image_div = document.createElement("div");
		e.image_div = e.insertBefore(e.image_div, e.firstChild);
		e.image_div.className = "image";
		e.image = document.createElement("img");
		e.image = e.image_div.appendChild(e.image);

		e.image.className = "image";
		u.unSelectify(e.image);
		e.image_loader = new Image();
		e.image_loader.image = e.image;

		e.selectImage = function(selected_image_id) {

//			u.bug("seli:"+selected_image_id);
//			Util.debug("select");
			if(selected_image_id == "next") {
				if(++this.selected_image_index >= this.nav.li.length) {
					this.selected_image_index = 0;
				}
				selected_image_id = this.nav.li[this.selected_image_index].image_id;
			}
			else if(selected_image_id == "prev") {
				if(--this.selected_image_index < 0) {
					this.selected_image_index = this.nav.li.length-1;
				}
				selected_image_id = this.nav.li[this.selected_image_index].image_id;
			}
			else if(!selected_image_id) {
				selected_image_id = this.nav.li[0].image_id;
			}
//			u.bug("seli:"+selected_image_id);

//			location.hash = "id=" + selected_image_id;
			// set selection class
			for(i = 0; li = this.nav.li[i]; i++) {
				if(li.image_id == selected_image_id) {
					this.selected_image = this.nav.li[i];
					this.selected_image_index = i;
					this.selected_image_id = selected_image_id;

					this.image_loader.onload = function() {
						this.image.src = this.src;
					}

					this.image_loader.src = this.selected_image.image.src.replace("x52", "x700");
					// clear scene while waiting (could be replaced by animation)
					this.image.src = "/img/dot_trans.png";

					this.txt.innerHTML = this.selected_image.image.alt;
					u.addClass(this.selected_image, "sel");
					this.menu_hash = u.setHashPath((this.menu_hash.length > 1 ? ("/"+this.menu_hash[0]+"/"+this.menu_hash[1]) : "")+"/" + li.image_id);
//					location.hash += "/"+li.image_id;
				}
				else {
					u.removeClass(li, "sel");
				}
			}

			e.mover();

		}

		e.mover = function(){

			var sel = this.selected_image;
			var li_wi = this.nav.offsetWidth;
			var li_le = this.nav.offsetLeft;
			var se_wi = sel.offsetWidth;
			var se_le = sel.offsetLeft;
			
			

//			Util.debug("M.r( (" + li_le + " - ( ((" + li_wi + " - " + se_wi + ") / 2) - " + se_le + ") ) / 5)");
//			Util.debug("" + li_wi + " ## " + li_le + " ## " + se_wi + " ## " + se_le + "");
//			Util.debug(Math.sqrt(Math.pow(li_le, 2)) + "<" + se_le);
//			Util.debug(Math.sqrt(Math.pow(li_le, 2)) + (li_wi - se_wi) + " >= " + se_le)
//			Util.debug(this.nav.browse);
			if(this.nav.browse) {

				if(this.nav.browse.className.match(/b\b/) && this.nav.offsetLeft - this.speed < (this.nav.offsetWidth - this.list_w)) {

					this.nav.style.left = this.nav.offsetWidth - this.list_w + "px";
					//Util.debug("end loop - right");
				}
				else if(this.nav.browse.className.match(/a\b/) && this.nav.offsetLeft + this.speed > 0) {
					this.nav.style.left = 0 + "px";
					//Util.debug("end loop - left" + (this.nav.offsetLeft + this.speed));
				}

				// movements
				if(this.nav.browse.className.match(/b\b/) && this.nav.offsetLeft > this.nav.offsetWidth - this.list_w) {
					this.nav.style.left = this.nav.offsetLeft - this.speed + "px";
//					Util.debug("move - right");
					this.timer = setTimeout("moverhandler()", 60);
				}
				else if(this.nav.browse.className.match(/a\b/) && this.nav.offsetLeft < 0) {
					this.nav.style.left = this.nav.offsetLeft + this.speed + "px";
//					Util.debug("move - left");
					this.timer = setTimeout("moverhandler()", 60);
				}

				
			}
			// early exit selected element is fine (left side && right side)
			else if(( Math.sqrt(Math.pow(li_le, 2)) <= se_le && Math.sqrt(Math.pow(li_le, 2)) + (li_wi - se_wi) >= se_le )) {
				//Util.debug("early retimenet");
			}
			// selected off view right, move it into sight
			else if( Math.round(Math.sqrt(Math.pow(li_le, 2))) <= se_le) {

				this.nav.style.left =  ((li_wi - se_wi) - se_le) + "px";
			}
			// selected off view left, move it into sight
			else if( Math.sqrt(Math.pow(li_le, 2)) + (li_wi - se_wi) >= se_le) {

				this.nav.style.left = -(se_le) + "px";
			}

//			Util.debug("w"+this.list_w);
			// toggle scroll elements
			if(this.nav.offsetLeft > this.nav.offsetWidth - this.list_w) {
				this.nav.browse_b.style.display = "block";
			}
			else {
				this.nav.browse_b.style.display = "none";
				this.nav.browse = false;
			}
			if(this.nav.offsetLeft < 0) {
				this.nav.browse_a.style.display = "block";
			}
			else {
				this.nav.browse_a.style.display = "none";
				this.nav.browse = false;
			}
			
		}

/*
		e.image.onmousemove = function(event) {
			event = event ? event : window.event;

			e = document.getElementById("carousel");
			var x = Util.explorer() ? event.clientX + document.body.scrollLeft : event.pageX;;
			var y = Util.explorer() ? event.clientY + document.body.scrollTop : event.pageY;;
			if(x > Util.absoluteLeft(this) && x < Util.absoluteLeft(this) + (this.offsetWidth/2)) {
				this.title = " < ";
			}
			else {
				this.title = " > ";
			}

		}
*/

		e.image_div.onclick = function(event) {
			event = event ? event : window.event;
//			e = document.getElementById("carousel");
//			e.selectImage("next");
			u.ge("carousel").selectImage("next");
		}

		e.image.onclick = function(event) {
			event = event ? event : window.event;
			u.e.kill(event);
			var x = u.explorer() ? event.clientX + document.body.scrollLeft : event.pageX;
			var y = u.explorer() ? event.clientY + document.body.scrollTop : event.pageY;

			if(x > u.absLeft(this) && x < u.absLeft(this) + (this.offsetWidth/2)) {
				u.ge("carousel").selectImage("prev");
			}
			else {
				u.ge("carousel").selectImage("next");
			}
			
		}

		e.list_w = 0;

		// positioning and sizing of images
		for(i = 0; li = e.nav.li[i]; i++) {


			li.image_id = u.getIJ(li, "id");
//			li.image = li.getElementsByTagName("img")[0];
			li.image = u.ge("img", li);

		 	e.list_w += li.image.width;

//			li.a = li.getElementsByTagName("a")[0];
			li.a = u.ge("a", li);
			li.e = e;
			x_pos = x_pos;


			li.onclick = function(){
				this.e.selectImage(this.image_id);
			}
			li.a.removeAttribute("href");

//						for(u = 0; li = this.li.e.nav.li[u]; u++) {
//							li.style.position = "absolute";
							li.style.left = x_pos + "px";
							x_pos = x_pos + li.image.width;
//							this.li.e.list_w += li.offsetWidth;
//						}

/*
			// load image
			li.image_loader = new Image();
			li.image_loader.li = li;
			li.image_loader.onload = function() {
//				alert("li"+this.li.className);
				x_pos = 0;
				for(u = 0; li = this.li.e.nav.li[u]; u++) {
					if(!li.image.offsetWidth) {
//						Util.debug("return");
						
						return;
					}
				}

				this.li.e.list_w = 0;
				for(u = 0; li = this.li.e.nav.li[u]; u++) {
					li.style.position = "absolute";
					li.style.left = x_pos + "px";
					x_pos = x_pos + li.image.offsetWidth;
					this.li.e.list_w += li.offsetWidth;
				}

				Util.debug("rec" + this.li.e.list_w);
				// e.list_w = 0;
				//  for(i = 0; li = e.nav.li[i]; i++) {
				// 	e.list_w += li.offsetWidth;
				// }

//				this.li.style.position = "absolute";
//				this.li.style.opacity = 1;
//				this.li.style.left = li.x_pos + "px";
//				this.li.e.x_pos = x_pos + li.image.offsetWidth;
			}
//			alert(li.image.src);
			li.image_loader.src = li.image.src;
//			li.style.opacity = 1;

//			x_pos = x_pos + li.image.offsetWidth;
			
*/
		}

		e.selectImage(e.selected_image_id);
		e.nav.style.visibility = "visible";

	}
	
}


	document.onkeydown = function(event) {
		event = event ? event : window.event;
		var pressed_key = String.fromCharCode(event.keyCode);
		if(event.keyCode == 37) {

//			var e = document.getElementById("carousel");
			u.ge("carousel").selectImage("prev");
		}
		else if(event.keyCode == 39) {

//			var e = document.getElementById("carousel");
			u.ge("carousel").selectImage("next");
		}
		else if(event.keyCode == 70) {

			//alert("fullscreen");
			//self.moveTo(0,0); 
			//self.resizeTo(screen.availWidth,screen.availHeight);
		}

//		alert("Key: " + pressed_key + "\nKeyCode: " + event.keyCode + "\nCtrl:"  + event.ctrlKey + "\nMeta:"  + event.metaKey);
		
	}

function moverhandler() {
//	var e = document.getElementById("carousel");
	//Util.debug("mover")
	u.ge("carousel").mover();
}