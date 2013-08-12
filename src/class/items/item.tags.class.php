<?php
include_once("class/items/item.core.class.php");


/**
* This class holds Item functionallity.
*
*/
class ItemTags extends ItemCore {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {
		// initiate helpers before calling View construct
		$this->addTranslation(__FILE__);
		parent::__construct();

	}


	function getTags() {
		$query = new Query();
//		$items = $this->navigationClass->getItems();
//		$items = Page::getItems(false, UT_NAV);

		if($this->item()) {

			foreach($this->item["id"] as $key => $value) {
				if($query->sql("SELECT nav.id, nav.name, nav.relation FROM ".UT_ITE_TAG." AS item_tags, ".UT_NAV." AS nav WHERE nav.id = item_tags.tag_id AND item_tags.item_id = '".$value."'")) {
					for($i = 0; $i < $query->getQueryCount(); $i++) {
						$this->item["tags_id"][$key][] = $query->getQueryResult($i, "id");
						$this->item["tags"][$key][] = $query->getQueryResult($i, "name");
	//					$this->item["tags"][$key][] = $this->addNesting($items, $query->getQueryResult($i, "relation")) ."/". $query->getQueryResult($i, "name");
					}
				}
				else {
					$this->item["tags"][$key] = false;
				}
			}
		}
	}

	/**
	* List dav options
	* 
	* @return string HTML-view
	*/
	function listTags() {
		global $HTML;
		global $page;
		global $id;
		$this->getTags();

//		print_r($this->navigationClass->getItems());

		$_ = '';
		$_ .= '<div class="init:form form:action:'.$page->url.'" id="container:tags">';
		$_ .= $HTML->inputHidden("id", $id);
		$_ .= $HTML->inputHidden("item_id", $id);

		$_ .= $HTML->head($this->translate("Navigation"), "2");

		if(Session::getLogin()->validatePage("tags_add")) {
//			$items = $this->navigationClass->getItems();
			$items = Page::getItems(UT_NAV);
			if(!$items) {
				$_ .= $HTML->p($this->translate("You haven't created navigation folders yet. Add your first by clicking here!"), "hint status:link:/sites/navigation.php");
			}

			$_ .= $HTML->inputHidden("page_status", "tags_add");
			$_ .= $HTML->select($this->translate("Add to folder"), "tag", $items, false, array("", "-"));
			$_ .= $HTML->smartButton($this->translate("Add"), false, "tags_add", "fright");
			$_ .= $HTML->separator();
		}

		// tags
		$table = $HTML->table();
		$table->setHeader(0, $this->varnames["tags"], "");
		$column = false;
		$ids = false;
		$status = false;

		foreach($this->item["tags"] as $item_key => $value) {
			if($value) {
				foreach($value as $tag_key => $tag) {
					$column[] = $tag;
					$ids[] = $this->item["tags_id"][$item_key][$tag_key];
					$status[] = "tags_a_delete";
				}
			}
		}
		if(!$column) {
			$column[] = $this->translate("No folders");
			$table->setColumnValues($column);
		}
		else {
			$table->setRowId($ids);
			$table->setColumnValues($column);
			if(Session::getLogin()->validatePage("tags_a_delete")) {
				$table->setRowStatus($status);
				$table->setRowClass("delete");
			}
		}
		$_ .= $table->build();

		$_ .= '</div>';
		return $_;
	}

	/**
	* Get tags
	* Goes through $this->item and adds tags to any indexes found
	* Taglist indexes,
	* - ["tag_list"][$index]
	*
	*/
	function getTagList() {
		$query = new Query();
		$this->getTags();
		
		if($this->item()) {
		
			foreach($this->item["id"] as $key => $value) {
				$this->item["tag_list"][$key] = false;

				if($this->item["tags"][$key]) {
				
					foreach($this->item["tags"][$key] as $tag) {
						$this->item["tag_list"][$key][] = $tag; //$query->getQueryResult($i, "name");
					}
					$this->item["tag_list"][$key] = array_list($this->item["tag_list"][$key]);
				}
			}
		}
	}

	/**
	* Add a new tag to item
	* If tag exist, it is added to tags, else added as b-tag
	*
	* @param int $item_id Item id
	* @param string $tag Tag name
	*/
	function addTag($item_id, $tag_id) {
		if($tag_id) {

			$query = new Query();
			// if tag exists save its id
//			if($query->sql("SELECT id FROM ".UT_TAG." WHERE name = '$tag'")) {
				$vars = "''";
				$vars .= ",'$item_id'";
				$vars .= ",'$tag_id'";

				$query->sql("INSERT INTO ".UT_ITE_TAG." VALUES($vars)");

				// add to navigation_items to avoid empty table issue
/*
				$vars = "''";
				$vars .= ",0";
				$vars .= ",0";
				$vars .= ",'$tag_id'";
				$vars .= ",'$item_id'";

				$query->sql("INSERT INTO ".UT_NAV_ITE." VALUES($vars)", true);
*/
/*
			}
			// create new b-tag
			else {
				$vars = "''";
				$vars .= ",'$tag'";
				$vars .= ", CURRENT_TIMESTAMP";
				$vars .= ",'$item_id'";
				$vars .= ",'".Session::getLogin()->getUserId()."'";
				$vars .= ", NULL";

				$query->sql("INSERT INTO ".UT_TAG_BLI." VALUES($vars)");
			}
			*/
			messageHandler()->addStatusMessage("Tag added");
		}
	}

	function deleteATag($tag_id, $item_id) {
		$query = new Query();
		$query->sql("DELETE FROM ".UT_ITE_TAG." WHERE tag_id = $tag_id AND item_id = $item_id", true);
		$query->sql("DELETE FROM ".UT_NAV_ITE." WHERE navigation_tags = '$tag_id' AND item_id = $item_id", true);
		messageHandler()->addStatusMessage("Tag deleted");
	}


	
	/**
	* Get search items
	*
	* @uses Item::getItems()
	*/
	function getSearchItems() {
		$itemtype = Session::getSearch("itemtype_id");
		$tags = Session::getSearch("tags");
		$sindex = Session::getSearch("sindex");
		$order = Session::getSearch("order");
		$this->getItems($itemtype, false, $tags, $sindex, $order);
	}
	/**
	* Search
	* Sets search values in session
	*/
	function search() {
		Session::setSearch("itemtype_id", getVar("itemtype_id"));
		Session::setSearch("tags", getVar("tags"));
	}
	
	/**
	* Reset Search 
	* Resets search values in session
	*/
	function searchReset() {
		Session::resetSearch("itemtype_id");
	}

	/**
	* Search form
	*
	* @return string HTML view
	*/
	function searchOptions() {
		global $HTML;

		$_ = '';
		$_ .= $HTML->head($this->translate("Search items").Session::getSearch("dav"));
		$_ .= $HTML->select($this->translate("Select itemtype"), "itemtype_id", $this->itemtypes, stringOr(Session::getSearch("itemtype_id")), array("", "-"), "Util.Ajax.submitContainer('container:item_search');");
		$_ .= $HTML->select($this->translate("Select folder"), "tags", Page::getItems(UT_NAV), stringOr(Session::getSearch("tags")), array("", "-"), "Util.Ajax.submitContainer('container:item_search');");

		return $_;
	}




	/**
	* Get all items by iterating based on relations
	*
	* @param Integer $relation Idetifier for iteration
	* @return array|false Item array or false on error
	*/
	function addNesting($items, $relation) {
		if($relation == 0) {
			return "";
		}
		foreach($items["id"] as $key => $value) {
			if($value == $relation) {
				return $this->addNesting($items, $items["relation"][$key]) . "/" . $items["name"][$key];
			}
		}
		return "";
	}


}

?>
