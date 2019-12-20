<?php

class crm extends Controller{
  protected $tables;
  protected $tablesButtons;

  public function __construct(){
    parent::__construct();
	}

  public function beforeRoute(){
    if(!$this->f3->exists("SESSION.username") && $this->f3->get("PATH") !== "/crm/functions/startSession") $this->f3->reroute("/crm");
  }

  public function endSession(){
    $this->f3->clear("SESSION.username");
    $this->f3->reroute("/crm");
  }

  public function startSession(){
    /*$this->f3->set("SESSION.username", $this->f3->get("POST.username")."-".md5($this->f3->get("POST.pass")));
    $this->f3->reroute("/crm/main");*/

    $username = $this->f3->get("POST.username");
    $pass = md5($this->f3->get("POST.pass"));
    $i = 1;

    $this->f3->config('accounts.ini');

    while(@$this->f3->exists("a".$i)){
      echo $this->f3->get("a".$i)." ".$this->f3->get("p".$i);
      if($username == $this->f3->get("a".$i) && $pass == $this->f3->get("p".$i)){
        $this->f3->set("SESSION.username", $username);
        $i = -1;
      }else $i++;
    }

    if($i > 0) $this->f3->reroute("/crm");
    $this->f3->reroute("/crm/main");
  }

  public function showPage(){
    $pageName = $this->f3->get("PARAMS.pageName");
    $fileName = "main.html";
    switch($pageName){
      case "customerProfile":
        $fileName = "customerProfile.html";
        break;
      case "cycles":
        $fileName = "cycles.html";
        break;
    }

    $page = new Template;
    echo $page->render($fileName);
  }
}

?>
