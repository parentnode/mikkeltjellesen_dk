<?php
/**
* This file contains menu views functionality
* Extended by the menu class
*/
class NavigationView extends NavigationCore {

	/**
	* Get translation for file
	*/
	function __construct() {
		$this->addTranslation(__FILE__);
		parent::__construct();
	}

	/**
	* View item with item id
	* Item held in query result
	*
	* @return string HTML view
	*/
	function viewItem() {
		global $HTML;
		$id = $this->getQueryResult(0, "id");
		$name = $this->getQueryResult(0, "name");
		$url = $this->getQueryResult(0, "url");

		if($name == "----") {
			$_ = $HTML->head($this->translate("Separator"));
		}
		else {
			$_ = '';
			$_ .= $HTML->head($this->translate("Viewing: ###$name###"));
			$_ .= $HTML->block($this->varnames["name"], $name);
			$_ .= $url ? $HTML->block($this->varnames["url"], $this->getQueryResult(0, "url")) : "";
		}

		return $_;
	}

	/**
	* Edit item
	* Item held in query result
	*
	* @return string HTML view
	*/
	function editItem() {
		global $HTML;
		
		$id = $this->getQueryResult(0, "id");
		$name = $this->getQueryResult(0, "name");

		$HTML->details(1);
		$_ = '';
		$_ .= $HTML->head($this->translate("Edit navigation item"));
		$_ .= $HTML->input($this->varnames["name"], "name", $this->vars["name"] ? $this->vars["name"] : $name);
		$_ .= $HTML->input($this->varnames["url"], "url", $this->vars["url"] ? $this->vars["url"] : $this->getQueryResult(0, "url"), false, "item_url");

		return $_;
	}

	/**
	* New item form
	*
	* @return string HTML view
	*/
	function newItem() {
		global $HTML;

		$HTML->details(1);
		$_ = '';
		$_ .= $HTML->head($this->translate("New navigation item"));
		$_ .= $HTML->input($this->varnames["name"], "name", $this->vars["name"]);

		$_ .= $HTML->input($this->varnames["url"], "url", $this->vars["url"], false, "item_url");

		return $_;
	}

	/**
	* make table listing of items
	* row link if link is passed
	*
	* @param string $link Item link (function will append item id to link)
	* @return string HTML view
	*/
	function listItems($link, $validate) {
		global $HTML;

		$_ = '';
		$_ .= $HTML->head(SITE_NAME);

		// get items
		$items = $this->getItems();

		// no items
		if(!$items) {
			$_ .= $HTML->p($this->translate("Add your first navigation folder"), "hint status:new");
		}
		// items
		else {
			if(count($items["id"]) < 2) {
				$_ .= $HTML->p($this->translate("Add another folder"), "hint status:new");
			}
			else {
				$_ .= $HTML->p($this->translate("Drag and drop folders to reorder."), "info");
			}

			$table = $HTML->table("arrange");
			$table->setHeader(0, $this->translate("Site navigation"));
			foreach($items["id"] as $key) { //} => $value) {
//				$status[] = $key != 1 ? $link : false;
//				$classes[] = $key == 1 ? "disabled" : false;
				$status[] = $link;
			}

			if(!$validate || Session::getLogin()->validatePage($validate)) {
				$table->setRowStatus($status);
			}
//			$table->setRowClasses($classes);
			$table->setRowId($items["id"]);

			$table->setColumnType(0, "indent");
			$table->setColumnIndent(0, $items["indent"]);
			$table->setColumnValues($items["name"]);

			$_ .= $table->build();
		}
		return $_;
	}

	function listMatchingItems() {
		global $page;
		global $id;
		
		$item = $page->getObject("Item");

		$query = new Query();
//		$query->sql("SELECT tags FROM ".UT_NAV." WHERE id = $id");
//		$tags = $query->getQueryResult(0, "tags");
		$item->getItems(false, $id);
		$_ = '';
		$_ .= $item->listItems(false, false, "init:lisort");

		/*
		$item->getItems("photo", $id);
		
		$_ = '';
		
		if($item->item()) {
			$_ .= '<ul class="init:lisort">';

			foreach($item->item["id"] as $key => $id) {
				$it = new Item();
				$it->getItem($id);
				$it = $it->getTypeObject()->getItem($it);

				$_ .= '<li class="id:'.$id.'">'.$it->item["thumb"][0].'</li>';
			}

			$_ .= '</ul>';
		}
		else {
			$_ .= $this->p("No macthing items");
		}
		*/

		return $_;

	}

}

?>