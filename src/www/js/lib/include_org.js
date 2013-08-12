var Util = new function() {
	this.Objects = new Array();
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
Util.otliam = function(name, dom){
	document.write('<a onclick="Util.otliamNoise(\''+name+'\', \''+dom+'\')">'+name+'<span>@</span>'+dom+'</a>');
}
Util.otliamNoise = function(name, dom){
	location.href = "ma"+"ilto:"+name+"@"+dom;
}
Util.saveCookie = function(name, value) {
	document.cookie = name + "=" + value +";"
}
Util.getCookie = function(name){
	var cookie_id, cookie_position, cookie_value, cookie_value_start, cookie_value_end;
	cookie_id = name + "=";
	cookie_position = document.cookie.indexOf(cookie_id);
	if(cookie_position != -1) {
		cookie_value_start = cookie_position + cookie_id.length;
		cookie_value_end = document.cookie.indexOf(';', cookie_value_start);
		cookie_value_end = cookie_value_end > 0 ? cookie_value_end : document.cookie.length;
		cookie_value = document.cookie.substring(cookie_value_start, cookie_value_end);
		return unescape(cookie_value);
	}
	return false;
}
Util.delCookie = function(name) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.popUp = function(url, name, w, h, extra) {
	var p;
	name = name ? name : "POPUP_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	w = w ? w : 330;
	h = h ? h : 150;
	p = "width=" + w + ",height=" + h;
	p += ",left=" + (screen.width-w)/2;
	p += ",top=" + ((screen.height-h)-20)/2;
	p += extra ? "," + extra : ",scrollbars";
	document[name] = window.open(url, name, p);
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
Util.flash = function(url, w, h, background, name, id, print) {
	var s;
	background = background ? background : "#FFFFFF";
	name = name ? name : "flash_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	id = id ? id : name;
	s = '<object id="'+name+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+w+'" height="'+h+'" name="'+name+'" align="middle">';
	s += '<param name="allowScriptAccess" value="always" />';
	s += '<param name="movie" value="'+url+'" />';
	s += '<param name="quality" value="high" />';
	s += '<param name="bgcolor" value="'+background+'" />';
	s += '<param name="wmode" value="transparent" />';
	s += '<param name="menu" value="false" />';
	s += '<param name="scale" value="noscale" />';
	s += '<embed id="'+name+'" src="'+url+'" menu="false" scale="noscale" quality="high" bgcolor="'+background+'" wmode="transparent" width="'+w+'" height="'+h+'" name="'+name+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	s += '</object>';
	if(print) {
		document.write(s);
		return "";
	}
	return s;
}
Util.Mem = new Object();
Util.Mem.set = function(key, value) {
	var page = location.href.substring(location.href.lastIndexOf("/")).split("#")[0];
	Util.debug(page);
	var memories = eval(Util.getCookie("memories"));
	if(!memories) {
		memories = new Object();
	}
	if(!memories[page]) {
		memories[page] = new Object();
	}
	memories[page][key] = value;
	document.cookie = "memories=" + memories.toSource() +";"
}
Util.Mem.get = function(key) {
	var page = location.href.substring(location.href.lastIndexOf("/")).split("#")[0];
	var memories = eval(Util.getCookie("memories"));
	if(memories && memories[page]) {
		return memories[page][key];
	}
	return false;
}
Util.activate = function(e) {
	e.onmouseover = function() {
		Util.over(this);
	}
	e.onmouseout = function() {
		Util.out(this);
	}
}
Util.over = function(e) {
	this.addClass(e, "over");
}
Util.out = function(e) {
	this.removeClass(e, "over");
}
Util.unSelectify = function(e) {
	if(Util.explorer()) {
		e.onselectstart = function() {return false;}
	}
	else {
		e.onmousedown = function() {return false;}
	}
}
Util.selectify = function(e) {
	if(Util.explorer()) {
	}
	else {
		e.onmousedown = function() {return true;}
	}
}
Util.focusOnFirstInput = function(container) {
	var e, elements, i;
	elements = container.getElementsByTagName("*");
	for(i = 0; e = elements[i]; i++) {
		if(e.nodeName.match(/INPUT|SELECT|TEXTAREA/g) && !e.disabled && e.type != "hidden") {
			e.focus();
			return;
		}
	}
}
Util.addMessageBoard = function(message, classname) {
	if(document.getElementById("message")) {
		var message_board, new_message, undefined;
		message_board = document.getElementById("message");
		new_message = document.createElement("p");
		new_message.innerHTML = message;
		Util.addClass(new_message, classname);
		message_board.appendChild(new_message);
	}
}
Util.clearMessageBoard = function() {
	if(document.getElementById("message")) {
		document.getElementById("message").innerHTML = '';
	}
}
Util.setLoadStatus = function(message, classname) {
	if(document.getElementById("progress")) {
		Util.removeClass(document.getElementById("progress"), "init|done|load");
		Util.addClass(document.getElementById("progress"), classname);
		document.getElementById("progress").innerHTML = message;
	}
}
Util.IEsucks = function(e) {
	border_elements = Util.getElementsByClass("border", e);
	for(i = 0; border_element = border_elements[i]; i++) {
		border_element.className = Util.removeClass(border_element, "border");
		div = document.createElement("div");
		div.className = "border";
		while(border_element.childNodes.length) {
			div.appendChild(border_element.childNodes[0]);
		}
		border_element.appendChild(div);
	}
}
Util.submitOnEnter = function(event, form) {
	event = event ? event : window.event;
	if(event.keyCode == 13) {
		Util.nonClick(event);
		Util.Ajax.submitContainer(form);
	}
}
Util.defaultInputValue = function(e) {
	e.default_value = e.value;
	e.onfocus = function() {
		if(this.value == this.default_value) {
			this.value = "";
		}
	}
	e.onblur = function() {
		if(this.value == "") {
			this.value = this.default_value;
		}
	}
}
Util.selectEnabling = function(e, state) {
	e.disabled = state ? false : true;
}
Util.enableButton = function(e) {
	Util.removeClass(e, "disabled");
	e.disabled = false;
	Util.Objects["button"].init(e);
}
Util.disableButton = function(e) {
	Util.removeClass(e, "over");
	Util.addClass(e, "disabled");
	e.disabled = "disabled";
}
Util.textCounter = function(max_length, e) {
	if(e.value.length >= max_length) {
		e.value = e.value.substring(0, max_length);
	}
	document.getElementById("counter:" + e.name).innerHTML = "(" + (max_length - e.value.length) + ")";
}
Util.confirmAction = function(s, action) {
	var confirmation = confirm(s);
	if(confirmation) {
		location.href = action;
	}
}
Util.setValue = function(e_id, v) {
	document.getElementById(e_id).value = v;
}
Util.nonClick = function(event) {
	event = event ? event : window.event;
	if(event.preventDefault) {event.preventDefault();}
	if(event.stopPropagation) {event.stopPropagation();}
	event.returnValue = false;
	event.cancelBubble = true;
}
Util.addEventHandler = function(e, type, action) {
	if(Util.explorer()) {
		e.attachEvent("on" + type, action);
	}
	else {
		e.addEventListener(type, action, false);
	}
}
Util.removeEventHandler = function(e, type, action) {
	if(Util.explorer()) {
		e.detachEvent("on" + type, action);
	}
	else {
		e.removeEventListener(type, action, false);
	}
}
Util.Onload = new function() {
	this.actions = new Array();
	this.onloadCatcher = function(event) {
		Util.Onload.execute(event);
	}
	this.addAction = function(action) {
		if(!this.actions.length) {
			Util.addEventHandler(window, "load", this.onloadCatcher);
		}
		this.actions[this.actions.length] = action;
	}
	this.execute = function() {
		var i, action;
		Util.initElements(document.getElementById('page'));
		for(i = 0; action = this.actions[i]; i++) {
			if(typeof(action) == "function") {
				action();
			}
			else {
				eval(action);
			}
		}
	}
}
Util.addEventHandler(window, "load", Util.Onload.onloadCatcher);
Util.Ontimeout = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("Util.Ontimeout.execute("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
	}
	this.execute = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = null;
		this.timers[id] = null;
	}
}
Util.Onkeydown = new function() {
	this.shortcuts = new Array();
	this.onkeydownCatcher = function(event) {
		Util.Onkeydown.catchKey(event);
	}
	this.addShortcut = function(key, action) {
		if(!this.shortcuts.length) {
			Util.addEventHandler(document, "keydown", this.onkeydownCatcher);
		}
		this.shortcuts[key.toString().toUpperCase()] = action;
	}
	this.catchKey = function(event) {
		var action, i, key;
		event = event ? event : window.event;
		key = String.fromCharCode(event.keyCode);
		if((event.ctrlKey || event.metaKey) && this.shortcuts[key]) {
			Util.nonClick(event);
			action = this.shortcuts[key];
				Util.debug(key+":"+action + "::" + action.parentNode);
				if(typeof(action) == "object") {
					action.click();
				}
				else if(typeof(action) == "function") {
					action();
				}
				else {
					eval(action);
				}
		}
		if(event.keyCode == 27 && this.shortcuts["ESC"]) {
			Util.nonClick(event);
			action = this.shortcuts["ESC"];
				Util.debug("esc:"+action + "::" + action.parentNode);
				if(typeof(action) == "object") {
					action.click();
				}
				else if(typeof(action) == "function") {
					action();
				}
				else {
					eval(action);
				}
		}
	}
}
Util.getParentTag = function(tag, e) {
	if(element.nodeName != tag && e.nodeName != "BODY") {
		e = Util.getParentTag(tag, e.parentNode);
	} 
	return element;
}
Util.wrapElement = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}
Util.getElementsByClass = function(classname, content) {
	var e, i, elements, regexp, return_array = new Array();
	elements = content ? (typeof(content) == "string" ? document.getElementById(content).getElementsByTagName("*") : content.getElementsByTagName("*")) : document.getElementById("content").getElementsByTagName("*");
	elements = elements.length ? elements : (Util.explorer() ? document.all : elements);
	regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
	for(i = 0; e = elements[i]; i++) {
		if(regexp.test(e.className)) {
			return_array[return_array.length] = e;
		}
	}
	return return_array;
}
Util.previousRealSibling = function(e, exclude) {
	var regexp, previous, undefined;
	exclude = exclude ? exclude : false;
	regexp = new RegExp("(^|\\s)" + exclude + "(\\s|$)");
	previous = e.previousSibling;
	if(exclude) {
		while(previous && (previous.nodeType == 3 || previous.className.match(regexp) || previous.nodeName == exclude)) {
			previous = previous.previousSibling;
		}
	}
	else {
		while(previous && previous.nodeType == 3) {
			previous = previous.previousSibling;
		}
	}
	return previous;
}
Util.nextRealSibling = function(e, exclude) {
	var regexp, next, undefined;
	exclude = exclude ? exclude : false;
	regexp = new RegExp("(^|\\s)" + exclude + "(\\s|$)");
	next = e.nextSibling;
	if(exclude) {
		while(next && (next.nodeType == 3 || next.className.match(regexp) || next.nodeName == exclude)) {
			next = next.nextSibling;
		}
	}
	else {
		while(next && next.nodeType == 3) {
			next = next.nextSibling;
		}
	}
	return next;
}
Util.getIJ = function(id, e) {
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
Util.absoluteLeft = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + Util.absoluteLeft(e.offsetParent);
	}
	return e.offsetLeft;
} 
Util.absoluteTop = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + Util.absoluteTop(e.offsetParent);
	}
	return e.offsetTop;
}
Util.docWidth = function() {
	var w;
	if(self.innerHeight) {
		w = self.innerWidth;
	}
	else if(document.documentElement && document.documentElement.clientHeight) {
		w = document.documentElement.clientWidth;
	}
	else if(document.body) {
		w = document.body.clientWidth;
	}
	return w;
}
Util.docHeight = function() {
	var h;
	if(self.innerHeight) {
		h = self.innerHeight;
	}
	else if(document.documentElement && document.documentElement.clientHeight) {
		h = document.documentElement.clientHeight;
	}
	else if(document.body) {
		h = document.body.clientHeight;
	}
	return h;
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
Util.debug = function(output) {
	var element, br;
	if(location.href.indexOf("http://mkn.") != -1 || location.href.indexOf("http://w.") != -1) {
		if(Util.debugWindow) {
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
Util.initElements = function(container) {
	var i, e, elements, ij_value, scripts;
	this.setLoadStatus("Initiating", "init");
	if(Util.explorer(6, "<=")) {
		this.IEsucks(container);
	}
	scripts = container.getElementsByTagName("script");
	if(container.id != "page" && scripts.length) {
		if(scripts[0].firstChild && scripts[0].firstChild.nodeValue) {
			script = eval(scripts[0].firstChild.nodeValue);
		}
		else if(Util.explorer() && scripts[0].text) {
			script = eval(scripts[0].text);
		}
		scripts[0].parentNode.innerHTML = script;
	}
	elements = this.getElementsByClass("init([:a-zA-Z])+", container);
	if(this.getIJ("init", container)){
		elements[elements.length] = container;
	}
	for(i = 0; e = elements[i]; i++) {
		ij_value = this.getIJ("init", e);
		if(ij_value && typeof(this.Objects[ij_value]) == "object") {
			this.Objects[ij_value].init(e);
		}
	}
	this.focusOnFirstInput(container);
	this.setLoadStatus("Done", "done");
	if(location.href.indexOf("http://mkn.") != -1 || location.href.indexOf("http://w.") != -1) {
		Util.addClass(document.body, "dev");
	}
}
Util.Ajax = new Object();
Util.Ajax.requests = new Array();
Util.Ajax.send = function(url, notify, object, parameters, async, type) {
	Util.setLoadStatus("Loading", "load");
	var id = this.requests.length;
	this.requests[id] = new Object();
	this.requests[id].url = url;
	this.requests[id].notifier = notify;
	this.requests[id].object = (typeof(object) != "undefined" ? object : window);
	this.requests[id].parameters = (typeof(parameters) != "undefined" ? parameters : "");
	this.requests[id].async = (typeof(async) != "undefined" ? async : true);
	this.requests[id].type = (typeof(type) == "string" ? type : "POST");
	this.requests[id].xmlHttp = this.createRequestObject();
	if(!this.requests[id].xmlHttp || typeof(this.requests[id].xmlHttp.send) == 'undefined') {
		this.responder(id, false);
		return;
	}
	this.requests[id].xmlHttp.open(this.requests[id].type, this.requests[id].url, this.requests[id].async);
	this.requests[id].xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	try {
		this.requests[id].xmlHttp.send(parameters);
	}
	catch(e) {
		this.responder(id, false);
		return;
	}
	if(this.requests[id].async) {
		this.requests[id].xmlHttp.onreadystatechange = function() {
			if(Util.Ajax.requests[id].xmlHttp.readyState == 4) {
				Util.Ajax.responder(id, true);
			}
		}
	}
	else {
		Util.Ajax.responder(id, true);
	}
	return;
}
Util.Ajax.createRequestObject = function() {
	var request_object = false;
	if(Util.explorer() && typeof(window.ActiveXObject) == "function") {
		try {
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e) {
			return false;
		}
	}
	else if(window.XMLHttpRequest) {
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e) {
			return false;
		}
	}
	return request_object;
}
Util.Ajax.responder = function(id, state) {
	var response_object, response;
	response_object = this.requests[id].object;
	response_object.exe = this.requests[id].notifier;
	this.requests[id].object = null;
	this.requests[id].notifier = null;
	if(!state) {
		response_object.exe(false);
	}
	else {
		try {
			this.requests[id].xmlHttp.status;
			if(this.requests[id].xmlHttp.status == 200) {
				this.requests[id].status = this.requests[id].xmlHttp.status;
				this.requests[id].statusText = this.requests[id].xmlHttp.statusText;
				this.requests[id].result = this.requests[id].xmlHttp.responseXML;
				Util.debug("responseText:"+this.requests[id].xmlHttp.responseText);
				Util.debug("###");
				this.requests[id].resultText = this.requests[id].xmlHttp.responseText;
				this.requests[id].xmlHttp = null;
				response = this.requests[id];
				response_object.exe(response);
			}
			else {
				response_object.exe(false);
			}
		}
		catch(e) {
			Util.debug("faila:" + e)
			if(this.requests[id]) {
				response_object.exe(false);
			}
		}
	}
	Util.Ajax.requests[id] = null;
}
Util.Ajax.loader = function(container) {
	var height = container.offsetHeight;
	var width = container.offsetWidth;
	var loader = document.createElement("div");
	loader.className = "loader";
	container.style.position = "relative";
	container.appendChild(loader);
	loader.style.height = height + "px";
	loader.style.width = width + "px";
}
Util.Ajax.deleteConfirm = function(container) {
	container.style.position = "relative";
	var confirm = Util.getElementsByClass("deleteConfirm", container)[0];
	confirm.style.display = "block";
}
Util.Ajax.deleteCancel = function(container) {
	var confirm = Util.getElementsByClass("deleteConfirm", container)[0];
	confirm.style.display = "none";
}
Util.Ajax.loadContainer = function(url, target_id, parameters) {
	var target = document.getElementById(target_id);
	parameters = (typeof(parameters) != "undefined" ? parameters + "&" : "") + "response_column=" + this.getResponseColumn(target);
	this.send(url, this.replaceElement, target, parameters);
}
Util.Ajax.submitContainer = function(container_id) {
	var elements, proporties, element, target, i;
	var form = document.getElementById(container_id);
	var parameters = "";
	if(form) {
		proporties = this.getFormProporties(form);
		elements = this.getAllFormElements(form);
		parameters = "response_column=" + (proporties.classname ? proporties.classname : "");
		if(proporties.action) {
			if(proporties.target) {
				Util.Ajax.loader(proporties.target);
			}
			for(i = 0; element = elements[i]; i++) {
				parameters += "&"+element.name+"="+encodeURIComponent(element.value);
			}
			Util.debug("Send:" + parameters);
			this.send(proporties.action, this.replaceElement, proporties.target, parameters, true, proporties.method);
			return true;
		}
		Util.debug("No form action!!!")
		return false;
	}
	Util.debug("Something is all wrong with the form identification!!!");
	return false;
}
Util.Ajax.submitElement = function(e) {
	var proporties = this.getFormProporties(e.submit_form);
	Util.debug("submit:" + e +"&&"+ proporties.action +"&&"+ e.html_input);
	if(e && e.html_input && e.page_status && e.item_id) {
		var params = "page_status=" + e.page_status;
		params += "&id=" + e.item_id;
		params += "&atr=" + e.html_input.name;
		params += "&" + e.html_input.name + "=" + e.html_input.value;
		Util.debug(params);
		this.send(proporties.action, this.replaceElement, e.submit_form, params);
		return true;
	}
	Util.debug("Something is all wrong with the form identification!!!");
	return false;
}
Util.Ajax.setUrlMarker = function(marker) {
	location.href = "#page_status=page,"+marker;
}
Util.Ajax.resetUrlMarker = function(marker) {
	location.href = "#";
}
Util.Ajax.replaceElementChild = function(response, child) {
	var component;
	if(response) {
		component = Util.Ajax.validateResult(response.resultText);
		if(typeof(component) == "object") {
			this.replaceChild(component, child);
			Util.initElements(component);
			return true;
		}
		else {
			Util.debug("Something is all wrong with the response!!!");
			Util.debug("Response:"+response.resultText);
			Util.debug("###")
			return false;
		}
	}
	else {
		Util.debug("No response!!!");
		return false;
	}
}
Util.Ajax.replaceElement = function(response) {
	Util.setLoadStatus("Initiating", "init");
	this.parentNode.replaceElementChild = Util.Ajax.replaceElementChild;
	this.parentNode.replaceElementChild(response, this);
}
Util.Ajax.resetContainer = function(target_id) {
	document.getElementById(target_id).innerHTML = "";
	document.getElementById(target_id).className += " targetContainer";
}
Util.Ajax.updateSelect = function(e, url, target) {
	var adjust_target_name = e.id.indexOf("[");
	if(adjust_target_name != -1) {
		target = target + e.id.substring(adjust_target_name);
	}
	target.length = 0;
	this.send(url, Util.Ajax.insertNewSelectValues, document.getElementById(target), 'id=' + e.options[e.selectedIndex].value);
}
Util.Ajax.insertNewSelectValues = function(response) {
	var elements, i, e, values;
	this.length = 0;
	elements = response.resultText.split("#");
	this.length = elements.length;
	for(i = 0; e = elements[i]; i++) {
		values = e.split(",");
		this.options[i].value = values[0];
		this.options[i].text = values[1];
	}
}
Util.Ajax.validateResult = function(result){
	var valid, content_element, script_elements, child, i;
	this.validateElement = typeof(this.validateElement) == "object" ? this.validateElement : document.createElement("div");
	if(Util.explorer()) {
		this.validateElement.innerHTML = "&nbsp;"+result;
	}
	else {
		this.validateElement.innerHTML = result;
	}
	content_element = this.validateElement.getElementsByTagName("div").length ? this.validateElement.getElementsByTagName("div")[0] : false;
	script_elements = new Array();
	for(i = 0; child = this.validateElement.childNodes[i]; i++) {
		if(child.nodeName.toLowerCase() == "script") {
			script_elements.unshift(child);
		}
	}
	this.executeScript(script_elements);
	return content_element;
}
Util.Ajax.executeScript = function(script_elements) {
	var i;
	if(script_elements.length) {
		for(i = script_elements.length-1; i >= 0; i--) {
			if(script_elements[i].firstChild && script_elements[i].firstChild.nodeValue) {
				eval(script_elements[i].firstChild.nodeValue);
			}
			else if(Util.explorer() && script_elements[i].text) {
				eval(script_elements[i].text);
			}
		}
	}
}
Util.Ajax.getAllFormElements = function(container) {
	var input, inputs, select, selects, textarea, textareas, i;
	var elements = new Array();
	inputs = container.getElementsByTagName("input");
	for(i = 0; input = inputs[i]; i++) {
		if(!input.disabled) {
			if(input.type == "text" || input.type == "password" || input.type == "hidden" && input.name != "list:search") {
				elements[elements.length] = {name:input.name, value:input.value};
			}
			else if((input.type == "checkbox" || input.type == "radio") && input.checked && input.name != "list:selectall") {
				elements[elements.length] = {name:input.name, value:input.value};
			}
		}
	}
	selects = container.getElementsByTagName("select");
	for(i = 0; select = selects[i]; i++) {
		if(!select.disabled && select.options.length) {
			elements[elements.length] = {name:select.name, value:select.options[select.selectedIndex].value};
		}
	}
	textareas = container.getElementsByTagName("textarea");
	for(i = 0; textarea = textareas[i]; i++) {
		if(!textarea.disabled) {
			elements[elements.length] = {name:textarea.name, value:textarea.value};
		}
	}
	return elements;
}
Util.Ajax.getFormProporties = function(container) {
	var regexp;
	var proporties = new Object();
	regexp = new RegExp("form:action:[?=\\w/\\#~:.?+=?&%@!\\-]*");
	if(container.className.match(regexp)) {
		proporties.action = container.className.match(regexp)[0].replace(/form:action:/g, "");
	}
	regexp = new RegExp(/form:method:[?=\w]*/);
	if(container.className.match(regexp)) {
		proporties.method = container.className.match(regexp)[0].replace(/form:method:/g, "");
	}
	else {
		proporties.method = "POST";
	}
	regexp = new RegExp(/form:target:[?=\w\_:-\\]*/);
	if(container.className.match(regexp)) {
		proporties.target = container.className.match(regexp)[0].replace(/form:target:/g, "");
		proporties.target = document.getElementById(proporties.target);
	}
	else {
		proporties.target = container;
	}
	proporties.classname = this.getResponseColumn(proporties.target);
	return proporties;
}
Util.Ajax.getResponseColumn = function(target) {
	var regexp, classname;
	regexp = new RegExp(/c[?=\w]*/);
	if(target.className.match(regexp)) {
		classname = target.className.match(regexp)[0].replace(/c/g, "");
	}
	return classname;
}
Util.Ajax.check = function(response) {
	if(response) {
		Util.debug(response.status+","+response.resultText+","+response.result);
	}
	else {
		alert("failed");
	}
}
Util.Objects["contact"] = new function() {
	this.init = function(e) {
		Util.removeClass(e, "init:contact");
		Util.addClass(e, "contact");
		e.onclick = function() {
			Util.toggleClass(e, "open");
		}
	}
}
Util.Objects["menu"] = new function() {
	this.init = function(e) {
		var i, a;
		Util.removeClass(e, "init:menu");
		Util.addClass(e, "menu");
		for(i = 0; a = e.getElementsByTagName("a")[i]; i++) {
			if(!a.parentNode.className.match(/otliam|access/)) {
				a.url = a.href.split("?")[0];
				a.e = e;
				a.onclick = function() {
					Util.Ajax.loadContainer(this.url, "carousel", "page_status=list");
					this.e.reSelect(this.e);
					Util.addClass(this.parentNode, "sel");
				}
				a.removeAttribute("href");
				Util.unSelectify(a);
			}
		}
		e.reSelect = function(e) {
			var i, li;
			for(i = 0; li = e.getElementsByTagName("li")[i]; i++) {
				Util.removeClass(li, "sel");
				Util.removeClass(li, "open");
			}
			Util.debug("resat");
		}
	}
}
Util.Objects["home"] = new function() {
	this.init = function(e) {
		Util.removeClass(e, "init:home");
		Util.unSelectify(e);
	}
}
Util.Objects["carousel"] = new function() {
	this.init = function(e) {
		var i, li, factor, x_pos = 0;
		Util.removeClass(e, "init:carousel");
		e.timer = null;
		e.speed = 10;
		e.selected_image_id = Util.getVar("id") ? Util.getVar("id") : Util.getHashVar("id");
		e.direction = "";
		e.nav = e.getElementsByTagName("ul")[0];
		e.nav.li = e.nav.getElementsByTagName("li");
		var browse = document.createElement("div");
		e.nav.browse_a = e.nav.parentNode.appendChild(browse);
		e.nav.browse_a.e = e;
		e.nav.browse_b = e.nav.parentNode.appendChild(browse.cloneNode(browse));
		e.nav.browse_b.e = e;
		e.nav.browse_a.className = "a";
		e.nav.browse_b.className = "b";
		e.nav.browse_a.onmouseover = function() {
			Util.debug("over");
			if(this.e.nav.offsetLeft < 0) {
				this.e.nav.browse = this;
				Util.addClass(this, "browse");
				this.e.mover();
			}
			else {
				this.style.display = "none";
			}
		}
		e.nav.browse_a.onmouseout = function() {
			this.e.nav.browse = false;
			clearTimeout(this.e.timer);
			Util.removeClass(this, "browse");
		}
		e.nav.browse_b.onmouseover = function() {
			if(this.e.nav.offsetLeft > this.e.nav.offsetWidth - this.e.list_w) {
				this.e.nav.browse = this;
				Util.addClass(this, "browse");
				this.e.mover();
			}
			else {
				this.style.display = "none";
			}
		}
		e.nav.browse_b.onmouseout = function() {
			this.e.nav.browse = false;
			clearTimeout(this.e.timer);
			Util.removeClass(this, "browse");
		}
		e.txt = document.createElement("p");
		e.txt = e.insertBefore(e.txt, e.firstChild);
		e.image_div = document.createElement("div");
		e.image_div = e.insertBefore(e.image_div, e.firstChild);
		e.image_div.className = "image";
		e.image = document.createElement("img");
		e.image = e.image_div.appendChild(e.image);
		e.image.className = "image";
		Util.unSelectify(e.image);
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
					Util.addClass(this.selected_image, "sel");
				}
				else {
					Util.removeClass(li, "sel");
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
			e = document.getElementById("carousel");
			e.selectImage("next");
		}

		e.image.onclick = function(event) {
			event = event ? event : window.event;
			Util.nonClick(event);
			e = document.getElementById("carousel");
			var x = Util.explorer() ? event.clientX + document.body.scrollLeft : event.pageX;;
			var y = Util.explorer() ? event.clientY + document.body.scrollTop : event.pageY;;
			if(x > Util.absoluteLeft(this) && x < Util.absoluteLeft(this) + (this.offsetWidth/2)) {
				e.selectImage("prev");
			}
			else {
				e.selectImage("next");
			}
		}
		e.list_w = 0;
		for(i = 0; li = e.nav.li[i]; i++) {
			li.image_id = Util.getIJ("id", li);
			li.image = li.getElementsByTagName("img")[0];
		 	e.list_w += li.image.width;
			li.a = li.getElementsByTagName("a")[0];
			li.e = e;
			x_pos = x_pos;
			li.onclick = function(){
				this.e.selectImage(this.image_id);
			}
			li.a.removeAttribute("href");
							li.style.left = x_pos + "px";
							x_pos = x_pos + li.image.width;
/*
			li.image_loader = new Image();
			li.image_loader.li = li;
			li.image_loader.onload = function() {
				x_pos = 0;
				for(u = 0; li = this.li.e.nav.li[u]; u++) {
					if(!li.image.offsetWidth) {
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
			}
			li.image_loader.src = li.image.src;
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
			var e = document.getElementById("carousel");
			e.selectImage("prev");
		}
		else if(event.keyCode == 39) {
			var e = document.getElementById("carousel");
			e.selectImage("next");
		}
		else if(event.keyCode == 70) {
		}
	}
function moverhandler() {
	var e = document.getElementById("carousel");
	e.mover();
}