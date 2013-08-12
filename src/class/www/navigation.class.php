<?php
/**
* This file contains site menu maintenance functionality
*/
include_once("class/sites/navigation.core.class.php");

/**
* DavNavigation, extends DavNavigation views
*
*/
class Navigation extends NavigationCore {

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
		$this->translater = new Translation(__FILE__);
		$this->addTranslation(__FILE__);
		$this->addTranslation(LOCAL_PATH."/templates/www/navigation.summary.php");

//		$this->translater->__construct();
		parent::__construct();

	}

	/**
	* Get menu items by iterating based on relations
	*
	* @param Integer $relation Idetifier for iteration (default to 0 = baselevel)
	* @return array Item array
	*/
	function getItems($relation = 0) {
//		print "da ww";
		$query = new Query();
		// not id = 1 (frontpage item)
		$query->sql("SELECT * FROM ".$this->db." WHERE relation = $relation AND id != 1 ORDER BY sequence ASC");

		$items = array();
		for($i = 0; $i < $query->getQueryCount(); $i++) {
			$id = $query->getQueryResult($i,"id");
			$name = $query->getQueryResult($i, "name");
			$url = $query->getQueryResult($i, "url");
			$tags = $query->getQueryResult($i, "tags");
			$sindex = $query->getQueryResult($i, "sindex");

			// separator
			if($name == "----") {
				$items["id"][] = $id;
				$items["name"][] = $name;
				$items["values"][] = "";
				$items["url"][] = false;
				$items["children"][] = false;
			}
			else {
				$items["id"][] = $id;
				$items["name"][] = $this->translate($name);
				$items["values"][] = $this->addNesting($items, $relation)."/".$name;
//				$items["url"][] = $url ? $url : "/view.php?tags=".$tags;
				$items["url"][] = $url ? $url : "/list/".$sindex;
//				$items["url"][] = $url;
				//$items["url"][] = "view.php?tags=" . $id;
				$items["children"][] = $this->getItems($id);
			}

		}
		return count($items) ? $items : false;
	}

}

?>