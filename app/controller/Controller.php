<?php
class Controller{

	protected $f3;
	protected $db;

	public function __construct(){
		$f3 = Base::instance();
		$this->f3 = $f3;

		try{
			$db = new DB\SQL(
					$f3->get('devdb'),
					$f3->get('devdbusername'),
					$f3->get('devdbpassword'),
					array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION)
			);

			$this->db = $db;
		}catch(Exception $e){
			$logger = new Log('error.log');
			$logger->write(json_encode($e));

			$this->db = false;
		}
	}

	public function errorMessage(){
		$view = new Template;
    echo $view->render("error.htm", "text/html");
	}

	public function convertMD5(){
		echo md5($this->f3->get("GET.q"));
	}
}

?>
