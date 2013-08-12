<?php
/**
* This file contains site menu maintenance functionality
*/
include_once("class/sites/navigation.core.class.php");
include_once("class/sites/navigation.view.class.php");
include_once("class/system/validator.class.php");

/**
* DavNavigation, extends DavNavigation views
*
*/
class Navigation extends NavigationView {

	// used as menu structure container
	public $menu_layout;
	public $item_indent;

	public $varnames;
	public $vars;
	private $validator;

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {
		// initiate helpers before calling View construct
		$this->addTranslation(__FILE__);

		$this->validator = new Validator($this);
		parent::__construct();

		$this->varnames["name"] = $this->translate("Item name");
		$this->validator->rule("name", "txt");

		$this->varnames["url"] = $this->translate("External url (optional)");
//		$this->validator->rule("url", "txt");

		$this->varnames["relation"] = "";

//		$this->varnames["tags"] = $this->translate("Tag");
//		$this->varnames["conditions"] = $this->translate("Req/Excl/Incl");

		$this->vars = getVars($this->varnames);
//		$this->checkDav();

//		$this->checkDav();
	}


	/**
	* Get all items by iterating based on relations
	*
	* @param Integer $relation Idetifier for iteration
	* @return array|false Item array or false on error
	*/
	/*
	function getItems($relation = 0, $items = false, $indent = 0) {
//		print "gi<br>";
		if(!$items) {
			$items = array();
		}
		$query = new Query();
//		print $this->db;

		if(!$this->sql("SELECT id FROM ".$this->db." WHERE id = 1")) {
			$this->sql("INSERT INTO ".$this->db." VALUES(1, '/ (frontpage)', 'frontpage', '', 0, 0, 1, 0, 'frontpage', '')");
			$this->sql("INSERT INTO ".UT_TAG." VALUES(1, 'frontpage')");

		}

		$query->sql("SELECT * FROM ".$this->db." WHERE relation = $relation ORDER BY sequence ASC");


		// preliminary sort of menu items
		for($i = 0; $i < $query->getQueryCount(); $i++) {
			$items["id"][] = $query->getQueryResult($i,"id");
			$items["name"][] = $query->getQueryResult($i,"name");
			$items["tags"][] = $query->getQueryResult($i,"tags");
			$items["url"][] = $query->getQueryResult($i,"url");
			$items["values"][] = $this->addNesting($items, $query->getQueryResult($i,"relation"))."/".$query->getQueryResult($i,"name");
			$items["relation"][] = $query->getQueryResult($i,"relation");
			$items["sequence"][] = $query->getQueryResult($i,"sequence");
			$items["hidden"][] = $query->getQueryResult($i,"hidden");
			$items["enabled"][] = $query->getQueryResult($i,"enabled");
			$items["classname"][] = $query->getQueryResult($i,"classname");
			$items["sindex"][] = $query->getQueryResult($i,"sindex");
			$items["indent"][] = $indent;
			$items = NavigationCore::getItems($query->getQueryResult($i,"id"), $items, $indent+1);
		}
		if(isset($items["id"])) {
			return $items;
		}
		return false;
	}
	*/

	/**
	* Save new item, based on submitted values
	*
	* @return bool
	* @uses Message
	*/
	function saveItem() {
		if($this->validator->validateAll()) {
			$query = new Query();

			$query->sql("INSERT INTO ".UT_TAG." VALUES(DEFAULT, '".$this->vars['name']."')");
			$tag_id = $query->getLastInsertId();

			$vars = "'$tag_id'";
			$vars .= ",'".$this->vars['name']."'";
			$vars .= ",'".$tag_id."'";
			$vars .= ",'".$this->vars['url']."'";

			$vars .= ",'0'"; // relation
			$vars .= ",'0'"; // sequence
			$vars .= ",'1'"; // enabled by default
			$vars .= ",'0'"; // hidden
			$vars .= ",''";  // classname
			$vars .= ",'".time()."'";



			if($query->sql("INSERT INTO ".$this->db." VALUES($vars)")) {
				$nav_point = $this->getLastInsertId();

				messageHandler()->addStatusMessage($this->translate("Item saved"));

				$this->makeSitemap();
				$this->makeNavigationForTranslation();
				return $nav_point;
			}
			else {
				messageHandler()->addErrorMessage($this->dbError());
				return false;
			}
		}
		else {
			messageHandler()->addErrorMessage($this->translate("Please complete missing information"));
			return false;
		}
	}


	/**
	* Update edited item
	*
	* @param int $id Item id
	* @return bool
	* @uses Message
	*/
	function updateItem($id) {
		if($this->validator->validateAll()) {
			$vars = "name='".$this->vars['name']."'";
			$vars .= ", url='".$this->vars['url']."'";
//			$vars .= ", sindex='".time()."'";

//			$this->sql("SELECT name FROM ".$this->db." WHERE id = $id");
//			$tag = $this->getQueryResult(0, "name");

			if($this->sql("UPDATE ".$this->db." SET $vars WHERE id = $id")) {

				$this->sql("UPDATE ".UT_TAG." SET $vars WHERE id = $id");


//				$this->updateTags($id);
//				$this->updateDav();
//				$this->checkDav();
				

				messageHandler()->addStatusMessage($this->translate("Item updated"));
				$this->makeSitemap();
				$this->makeNavigationForTranslation();
				return true;
			}
			else {
				messageHandler()->addErrorMessage($this->dbError());
				return false;
			}
		}
		else {
			messageHandler()->addErrorMessage($this->translate("Please complete missing information"));
			return false;
		}
	}

	/**
	* Delete selected item
	*
	* @param int $id Item id
	* @return bool
	* @uses Message
	*/
	function deleteItem($id) {
		$query = new Query();
		if(!$this->checkUsage($id)) {

//			$query->sql("SELECT name FROM ".$this->db." WHERE id = $id");
//			$tag = $this->getQueryResult(0, "name");

			if($query->sql("DELETE FROM ".$this->db." WHERE id = $id")) {
				$query->sql("DELETE FROM ".UT_TAG." WHERE id = $id");


				messageHandler()->addStatusMessage($this->translate("Item deleted"));

				$this->makeSitemap();
				$this->makeNavigationForTranslation();
				return true;
			}
			else {
				messageHandler()->addErrorMessage($this->dbError());
				return false;
			}
		}
	}

	/**
	* Update structure
	*
	* @param int $id Item id
	* @return bool
	* @uses Message
	*/
	function updateStructure($id) {
		$query = new Query();

		$sequence = array();
		$updates = 0;

		for($i = 0; $i < count($id); $i++) {
			$sequence[$this->vars['relation'][$i]] = isset($sequence[$this->vars['relation'][$i]]) ? $sequence[$this->vars['relation'][$i]]+1 : 0;
			if($query->sql("UPDATE ".$this->db." SET relation = ".$this->vars['relation'][$i].", sequence = ".$sequence[$this->vars['relation'][$i]]." WHERE id = ".$id[$i])){
				$updates++;
			}
		}

		if($updates == count($id)) {
			$query->sql("SELECT site_id FROM ".$this->db." WHERE id = ".$id[0]);
			messageHandler()->addStatusMessage($this->translate("Structure updated"));
			$this->makeNavigationForTranslation();
//			$this->updateDav();
//			$this->checkDav();
			return true;
		}
		else {
			messageHandler()->addErrorMessage($this->dbError());
			return false;
		}
	}



}

?>