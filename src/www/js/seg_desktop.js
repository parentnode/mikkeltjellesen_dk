var u, Util = u = new function() {}
Util.createRequestObject = function() {
	var request_object = false;
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e){
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
	return typeof(request_object.send) == 'undefined' ? false : request_object;
}
Util.XMLRequest = function(url, node, parameters, async, method) {
	parameters = parameters ? parameters : "";
	async = async ? async : true;
	method = method ? method : "POST";
	var XMLRequest = new Object();
	XMLRequest.Http = this.createRequestObject();
	if(!XMLRequest.Http) {
		node.XMLResponse(u.validateResponse(false, false));
		return;
	}
	if(async) {
		XMLRequest.Http.node = node ? node : Util;
		XMLRequest.Http.onreadystatechange = function() {
			if(XMLRequest.Http.readyState == 4) {
				if(!this.node) {
					u.bug("Lost track of node: " + XMLRequest.Http.statusText);
				}
				else {
					this.node.XMLResponse(u.validateResponse(this, true));
				}
			}
		}
	}
	try {
		XMLRequest.Http.open(method, url, async);
		XMLRequest.Http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		XMLRequest.Http.send(parameters);
	}
	catch(e) {
		node.XMLResponse(u.validateResponse(XMLRequest, false));
		return;
	}
	if(!async) {
		node.XMLResponse(u.validateResponse(XMLRequest, true));
	}
}
Util.XMLResponse = function(response) {
	alert("base responder")
}
Util.validateResponse = function(request, state){
	var e = document.createElement("div");
	if(state) {
		try {
			request.status;
			if(request.status == 200) {
				e.innerHTML = request.responseText;
			}
			else {
				e.innerHTML = '<div class="error">Response error:'+request.status+ ':'+request.url + request.parameters +'</div>';
				u.bug("status NOT 200:" + request.status);
				u.bug(request.statusText);
			}
		}
		catch(e) {
			e.innerHTML = '<div class="error">Response error: no status</div>';
			u.bug("NO status exceptions:" + e);
			u.bug(request.statusText);
		}
	}
	else {
		e.innerHTML = '<div class="error">Request error:'+request.url + request.parameters + '</div>';
		u.bug("Request error:" + request.url + request.parameters);
	}
	return e;
}
Util.getVar = function(s) {
	var p = location.search;
	var start_index = (p.indexOf("&" + s + "=") > -1) ? p.indexOf("&" + s + "=") + s.length + 2 : ((p.indexOf("?" + s + "=") > -1) ? p.indexOf("?" + s + "=") + s.length + 2 : false);
	var end_index = (p.substring(start_index).indexOf("&") > -1) ? p.substring(start_index).indexOf("&") + start_index : false;
	var return_string = start_index ? p.substring(start_index,(end_index ? end_index : p.length)): "";
	return return_string;
}
Util.getHashVar = function(s) {
	var h = location.hash;
	var values, index, list;
	values = h.substring(1).split("&");
	for(index in values) {
		list = values[index].split("=");
		if(list[0] == s) {
			return list[1];
		}
	}
	return false;
}
Util.getUniqueId = function() {
	return ("id" + Math.random() * Math.pow(10, 17) + Math.random());
}
Util.getHashPath = function(n) {
	var h = location.hash;
	var values;
	if(h.length) {
		values = h.substring(2).split("/");
		if(n && values[n]) {
			return values[n];
		}
	}
	return values ? values : false;
}
Util.setHashPath = function(path) {
	location.hash = path;
	return Util.getHashPath();
}
Util.explorer = function(version, scope) {
	if(document.all) {
		var undefined;
		var current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.safari = function(version, scope) {
	if(navigator.userAgent.indexOf("Safari") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Safari\/)(\d+)(.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.firefox = function(version, scope) {
	if(navigator.userAgent.indexOf("Firefox") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)(\.\d+)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}
Util.absLeft = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + Util.absLeft(e.offsetParent);
	}
	return e.offsetLeft;
} 
Util.absTop = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + Util.absTop(e.offsetParent);
	}
	return e.offsetTop;
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.cancelBubble = true;
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);			
		}
		catch(exception) {
			if(document.all) {
			}
			else {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
		}
	}
	this.onStart = this.onDown = function(e, action) {
		u.e.addEvent(e, this.event_pref == "touch" ? "touchstart" : "mousedown", action);
	}
	this.onMove = function(e, action) {
		u.e.addEvent(e, this.event_pref == "touch" ? "touchmove" : "mousemove", action);
	}
	this.onEnd = this.onUp = function(e, action) {
		u.e.addEvent(e, this.event_pref == "touch" ? "touchend" : "mouseup", action);
	}
	this.onTransitionEnd = function(e, action) {
		u.e.addEvent(e, "webkitTransitionEnd", action);
		u.e.addEvent(e, "transitionend", action);
	}
	this.transform = function(e, x, y) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransform = "translate("+x+"px, "+y+"px)";
			e.style.webkitTransform = "translate3d("+x+"px, "+y+"px, 0)";
			e.element_x = x;
			e.element_y = y;
		}
		else {
			e.style.position = "absolute";
			if(!e.duration) {
				e.style.left = x+"px";
				e.style.top = y+"px";
				e.element_x = x;
				e.element_y = y;
			}
			else {
				e.transitions = 15;
				e.transition_progress = 0;
				e.element_x = e.element_x ? e.element_x : 0;
				e.element_y = e.element_y ? e.element_y : 0;
				e.transitionTo = function() {
						++this.transition_progress;
						this.style.left =  this.end_x-(this.distance_x - (this.interval_x*this.transition_progress))+"px";
						this.style.top =  this.end_y-this.distance_y - this.interval_y*this.transition_progress+"px";
						this.element_x = this.end_x-(this.distance_x - (this.interval_x*this.transition_progress));
						this.element_y = this.end_y-(this.distance_y - (this.interval_y*this.transition_progress));
				}
				e.end_x = x;
				e.end_y = y;
				if(e.end_x > e.element_x) {
					if(e.end_x > 0 && e.element_x >= 0 || e.end_x >= 0 && e.element_x < 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else if(e.end_x < e.element_x) {
					if(e.end_x <= 0 && e.element_x > 0 || e.end_x < 0 && e.element_x <= 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else {
					e.distance_x = 0;
				}
				if(e.end_y > e.element_y) {
					if(e.end_y > 0 && e.element_y >= 0 || e.end_y >= 0 && e.element_y < 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else if(e.end_y < e.element_y) {
					if(e.end_y <= 0 && e.element_y > 0 || e.end_y < 0 && e.element_y <= 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else {
					e.distance_y = 0;
				}
				e.interval_x = e.distance_x/e.transitions;
				e.interval_y = e.distance_y/e.transitions;
				for(var i = 0; i < e.transitions; i++) {
					u.t.setTimer(e, e.transitionTo, (e.duration/e.transitions)*i);
				}
				if(typeof(e.transitioned) == "function") {
					u.t.setTimer(e, e.transitioned, e.duration);
				}
			}
		}
	}
	this.transition = function(e, transition) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransition = transition;
			e.style.webkitTransition = transition;
			if(typeof(e.transitioned) == "function") {
				this.onTransitionEnd(e, e.transitioned);
			}
		}
		else {
			var duration = transition.match(/[0-9.]+[ms]/g) ? transition.match(/[0-9.]+[ms]/g).toString() : false;
			e.duration = duration ? (duration.match("ms") ? parseFloat(duration) : parseFloat(duration) * 1000) : false;
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetEvents = function(e) {
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._inputClickMove);
		this.removeEvent(e, "touchmove", this._inputClickMove);
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.click || this.dblclick || this.hold) {
			u.e.onMove(this, u.e._inputClickMove);
			u.e.onEnd(this, u.e._dblclicked);
		}
		if(this.hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.drag || this.swipe) {
			u.e.onMove(this, u.e._pick);
			u.e.onEnd(this, u.e._drop);
		}
	}
	this._inputClickMove = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clickMoved) == "function") {
			this.clickMoved(event);
		}
	}
	this.hold = function(e) {
		e.hold = true;
		u.e.onStart(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.click = true;
		u.e.onStart(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.dblclick = true;
		u.e.onStart(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		u.t.resetTimer(this.t_held);
		if(u.t.valid(this.t_clicked)) {
			u.t.resetTimer(this.t_clicked);
			u.e.resetEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.dblclick && !this.hold) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else {
			this.t_clicked = u.t.setTimer(this, u.e._clicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback, process_time) {
		e.drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		e.process_time = process_time ? process_time : 0;
		e.mtm_avg = new Array();
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		u.e.addEvent(e, "mousedown", this._inputStart);
		u.e.addEvent(e, "touchstart", this._inputStart);
	}
	this._pick = function(event) {
	    u.e.kill(event);
		u.t.resetTimer(this.t_held);
		u.t.resetTimer(this.t_clicked);
		this.move_timestamp = new Date().getTime();
		this.vertical = (this.end_drag_x - this.start_drag_x == this.offsetWidth);
		this.horisontal = (this.end_drag_y - this.start_drag_y == this.offsetHeight);
		this.offset_x = this.element_x = this.element_x ? this.element_x : 0;
		this.offset_y = this.element_y = this.element_y ? this.element_y : 0;
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
		this.start_input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
		u.e.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.resetEvents(this);
		u.e.onMove(this, u.e._drag);
		u.e.onEnd(this, u.e._drop);
		if(this.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(this, "mouseout", u.e._snapback);
		}
	}
	this._drag = function(event) {
		u.e.kill(event);
		if(this.start_input_x && this.start_input_y) {
			this.new_move_timestamp = new Date().getTime();
			if(this.new_move_timestamp - this.move_timestamp > this.process_time) {
				var offset = false;
				var speed_ex, speed_ey, speed_mtm;
				this.current_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
				this.current_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
				speed_ex = this.element_x;
				speed_ey = this.element_y;
				speed_mtm = this.new_move_timestamp - this.move_timestamp;
				this.mtm_avg[this.mtm_avg.length] = speed_mtm; 
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y - this.start_input_y + this.offset_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x - this.start_input_x + this.offset_x;
				}
				else {
					this.element_x = this.current_x - this.start_input_x + this.offset_x;
					this.element_y = this.current_y - this.start_input_y + this.offset_y;
				}
	 			if(!this.strict) {
					this.current_xps = Math.round(((this.element_x - speed_ex) / speed_mtm)*1000);
					this.current_yps = Math.round(((this.element_y - speed_ey) / speed_mtm)*1000);
				}
				if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
					if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
						if(this.current_xps < 0) {
							this.swiped = "left";
						}
						else {
							this.swiped = "right";
						}
					}
					else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
						if(this.current_yps < 0) {
							this.swiped = "up";
						}
						else {
							this.swiped = "down";
						}
					}
					u.e.transform(this, this.element_x, this.element_y);
				}
				else {
					this.swiped = false;
					this.current_xps = 0;
					this.current_yps = 0;
					if(this.element_x < this.start_drag_x) {
						offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
						this.element_x = this.start_drag_x;
						this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
					}
					else if(this.element_x + this.offsetWidth > this.end_drag_x) {
						offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
						this.element_x = this.end_drag_x - this.offsetWidth;
						this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
					}
					else {
						this.current_x = this.element_x;
					}
					if(this.element_y < this.start_drag_y) {
						offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
						this.element_y = this.start_drag_y;
						this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
					}
					else if(this.element_y + this.offsetHeight > this.end_drag_y) {
						offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
						this.element_y = this.end_drag_y - this.offsetHeight;
						this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
					}
					else {
						this.current_y = this.element_y;
					}
					if(offset) {
						u.e.transform(this, this.current_x, this.current_y);
					}
				}
				if(typeof(this.moved) == "function") {
					this.moved(event);
				}
			}
		}
	}
	this._drop = function(event) {
	    u.e.kill(event);
		var sum = 0;
		for(var i = 0; i < this.mtm_avg.length; i++) {
			sum += this.mtm_avg[i];
		}
		u.e.resetEvents(this);
		if(this.swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(this.current_xps || this.current_yps) {
				u.e.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
				this.element_x = this.current_x;
				this.element_y = this.current_y;
			}
			else {
				u.e.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.e.transform(this, this.current_x, this.current_y);
			if(typeof(this.dropped) == "function") {
				this.dropped(event);
			}
		}
	}
	this.swipe = function(e, target, strict) {
		e.swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.e.transform(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}
Util.ge = function(id, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(id)) {
		return document.getElementById(id);
	}
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(id).length ? t.getElementsByTagName(id)[0] : false;
}
Util.ges = function(id, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(id);
}
Util.gs = function(e, direction) {
	var node_type = e.nodeType;
	var ready = false;
	for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
		if(node.nodeType == node_type) {
			if(ready) {
				return node;
			}
			if(node == e) {
				if(direction == "next") {
					ready = true;
				}
				else {
					return prev_node;
				}
			}
			else {
				prev_node = node;
			}
		}
	}
	return false;
}
Util.getIJ = function(e, id) {
	var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
	if(e.className.match(regexp)) {
		return e.className.match(regexp)[0].replace(id + ":", "");
	}
	return false;
}
Util.addClass = function(e, classname) {
	if(classname) {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(!regexp.test(e.className)) {
			e.className += e.className ? " " + classname : classname;
		}
	}
}
Util.removeClass = function(e, classname) {
	if(classname) {
		var regexp = new RegExp(classname + " | " + classname + "|" + classname);
		e.className = e.className.replace(regexp, "");
	}
}
Util.toggleClass = function(e, classname) {
	var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
	if(regexp.test(e.className)) {
		Util.removeClass(e, classname);
	}
	else {
		Util.addClass(e, classname);
	}
}
Util.wrapElement = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}
Util.testURL = function(url) {
	return true;
	return url.match(/http\:\/\/mkn\.|http\:\/\/w\.|\.local/i);
}
Util.debug = function(output) {
	if(Util.testURL(location.href)) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL(location.href)) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message) {
	if(Util.testURL(location.href)) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if(!message) {
			message = target;
			target = options[0];
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ge("debug_"+target).innerHTML += message+"<br>";
	}
}
Util.otliam = function(name, dom){
	document.write('<a onclick="Util.otliamNoise(\''+name+'\', \''+dom+'\')">'+name+'<span>@</span>'+dom+'</a>');
}
Util.otliamNoise = function(name, dom){
	location.href = "ma"+"ilto:"+name+"@"+dom;
}
Util.unSelectify = function(e) {
	e.onmousedown = function() {return false;}
}
Util.selectify = function(e) {
	e.onmousedown = function() {return true;}
}
Util.Objects = u.o = new Array();
Util.init = function() {
	var i, e, elements, ij_value;
	elements = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.Objects[ij_value]) == "object") {
				u.Objects[ij_value].init(e);
			}
		}
	}
}
window.onload = u.init;
Util.Objects["menu"] = new function() {
	this.init = function(e) {
		var i, nodes, node;	
		e.menu_hash = u.getHashPath();
		nodes = u.ges("li", e);
		for(i = 0; node = nodes[i]; i++) {
			u.addClass(node, "n"+i);
			if(!node.className.match(/contact|access/)) {
				u.unSelectify(node);
				a = u.ge("a", node);
				a.url = a.href.split("?")[0];
				a.removeAttribute("href");
				a.e = e;
				if(e.menu_hash && e.menu_hash.length >= 2) {
					var hash = "/"+e.menu_hash[0]+"/"+e.menu_hash[1];
					if(hash == a.url.replace(location.protocol+"//"+location.host, "")) {
						u.XMLRequest(hash, e, "page_status=list");
						u.addClass(node, "sel");
						e.menu_hash = u.setHashPath(hash + (e.menu_hash.length == 3 ? "/"+e.menu_hash[2] : ""));
					}
				}
				a.onclick = function() {
					this.e.reset();
					u.addClass(this.parentNode, "sel");
					u.XMLRequest(this.url, this.e, "page_status=list");
					this.e.menu_hash = u.setHashPath(this.url.replace(location.protocol+"//"+location.host, ""));
				}
			}
			else if(node.className.match(/contact/)) {
				u.unSelectify(u.ge("h3", node));
				node.onclick = function() {
					u.toggleClass(this, "open");
				}
			}
		}
		e.XMLResponse = function(response) {
			u.ge("carousel").parentNode.replaceChild(u.ge("carousel", response), u.ge("carousel"))
			u.init(u.ge("carousel"));
		}
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
Util.Objects["home"] = new function() {
	this.init = function(e) {
		u.unSelectify(e);
	}
}
Util.Objects["carousel"] = new function() {
	this.init = function(e) {
		var i, li, factor, x_pos = 0;
		e.timer = null;
		e.speed = 10;
		e.selected_image_id = Util.getVar("id");
		var hash = u.getHashPath();
		if(hash) {
			if(hash.length == 1) {
				e.selected_image_id = Util.getHashPath(0);
			}
			else if(hash.length == 3) {
				e.selected_image_id = Util.getHashPath(2);
			}
		}
		e.menu_hash = u.ge("menu").menu_hash;
		e.direction = "";
		e.nav = u.ge("ul", e);
		e.nav.li = u.ges("li", e.nav);
		var browse = document.createElement("div");
		e.nav.browse_a = e.nav.parentNode.appendChild(browse);
		e.nav.browse_a.e = e;
		e.nav.browse_b = e.nav.parentNode.appendChild(browse.cloneNode(browse));
		e.nav.browse_b.e = e;
		e.nav.browse_a.className = "a";
		e.nav.browse_b.className = "b";
		e.nav.browse_a.onmouseover = function() {
			if(this.e.nav.offsetLeft < 0) {
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
			if(this.e.nav.offsetLeft > this.e.nav.offsetWidth - this.e.list_w) {
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
		e.txt = document.createElement("p");
		e.txt = e.insertBefore(e.txt, e.firstChild);
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
			for(i = 0; li = this.nav.li[i]; i++) {
				if(li.image_id == selected_image_id) {
					this.selected_image = this.nav.li[i];
					this.selected_image_index = i;
					this.selected_image_id = selected_image_id;
					this.image_loader.onload = function() {
						this.image.src = this.src;
					}
					this.image_loader.src = this.selected_image.image.src.replace("x52", "x700");
					this.image.src = "/img/dot_trans.png";
					this.txt.innerHTML = this.selected_image.image.alt;
					u.addClass(this.selected_image, "sel");
					this.menu_hash = u.setHashPath((this.menu_hash.length > 1 ? ("/"+this.menu_hash[0]+"/"+this.menu_hash[1]) : "")+"/" + li.image_id);
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
			if(this.nav.browse) {
				if(this.nav.browse.className.match(/b\b/) && this.nav.offsetLeft - this.speed < (this.nav.offsetWidth - this.list_w)) {
					this.nav.style.left = this.nav.offsetWidth - this.list_w + "px";
				}
				else if(this.nav.browse.className.match(/a\b/) && this.nav.offsetLeft + this.speed > 0) {
					this.nav.style.left = 0 + "px";
				}
				if(this.nav.browse.className.match(/b\b/) && this.nav.offsetLeft > this.nav.offsetWidth - this.list_w) {
					this.nav.style.left = this.nav.offsetLeft - this.speed + "px";
					this.timer = setTimeout("moverhandler()", 60);
				}
				else if(this.nav.browse.className.match(/a\b/) && this.nav.offsetLeft < 0) {
					this.nav.style.left = this.nav.offsetLeft + this.speed + "px";
					this.timer = setTimeout("moverhandler()", 60);
				}
			}
			else if(( Math.sqrt(Math.pow(li_le, 2)) <= se_le && Math.sqrt(Math.pow(li_le, 2)) + (li_wi - se_wi) >= se_le )) {
			}
			else if( Math.round(Math.sqrt(Math.pow(li_le, 2))) <= se_le) {
				this.nav.style.left =  ((li_wi - se_wi) - se_le) + "px";
			}
			else if( Math.sqrt(Math.pow(li_le, 2)) + (li_wi - se_wi) >= se_le) {
				this.nav.style.left = -(se_le) + "px";
			}
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
		e.image_div.onclick = function(event) {
			event = event ? event : window.event;
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
		for(i = 0; li = e.nav.li[i]; i++) {
			li.image_id = u.getIJ(li, "id");
			li.image = u.ge("img", li);
		 	e.list_w += li.image.width;
			li.a = u.ge("a", li);
			li.e = e;
			x_pos = x_pos;
			li.onclick = function(){
				this.e.selectImage(this.image_id);
			}
			li.a.removeAttribute("href");
							li.style.left = x_pos + "px";
							x_pos = x_pos + li.image.width;
		}
		e.selectImage(e.selected_image_id);
		e.nav.style.visibility = "visible";
	}
}
	document.onkeydown = function(event) {
		event = event ? event : window.event;
		var pressed_key = String.fromCharCode(event.keyCode);
		if(event.keyCode == 37) {
			u.ge("carousel").selectImage("prev");
		}
		else if(event.keyCode == 39) {
			u.ge("carousel").selectImage("next");
		}
		else if(event.keyCode == 70) {
		}
	}
function moverhandler() {
	u.ge("carousel").mover();
}