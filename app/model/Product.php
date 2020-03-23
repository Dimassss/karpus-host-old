<?php
class Product extends DB\SQL\Mapper{
	public function __construct(DB\SQL $db){
		parent::__construct($db, 'PRODUCTS');
	}

  public function create($product){
		$this->copyfrom($product);
		$this->save();
		return $this->id;
	}

	public function edit($fields ,$id){
		$this->load(array('id=?', $id));
		$this->copyFrom($fields);
		$this->save();
	}

	public function remove($id){
		$this->load(array('id=?', $id));
    $this->erase();
	}

	public function getBySelector($selector){
    //$selector is an array as - array('userID=? AND password=?','cheetah','ch1mp')
    $this->load($selector);
    return $this->query;
	}
}

?>