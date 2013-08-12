// extenders
Util.Objects["devicepresets"] = new function() {
	this.init = function(e) {
		var i, preset;

		var presets = u.ges("li", e);
		for(i = 0; preset = presets[i]; i++) {
			
			preset.onclick = function() {
				document.getElementById('pattern').value = this.innerHTML;
				Util.selectValue('brand_id', Util.getIJ("brand", this));
				Util.Ajax.submitContainer("container:item");
			}
		}
	}
}
