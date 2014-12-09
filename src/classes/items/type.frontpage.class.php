<?php
/**
* @package janitor.items
* This file contains item type functionality
*/

class TypeFrontpage extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_frontpage";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"hint_message" => "Name your frontpage entry", 
			"error_message" => "Name must be filled out."
		));

		// Media
		$this->addToModel("main", array(
			"type" => "files",
			"label" => "Drag image here",
			"allowed_sizes" => "1600x900",
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add image here. Use png or jpg in 1600x900.",
			"error_message" => "Media does not fit requirements."
		));

	}

}

?>