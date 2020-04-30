<?php
//7023467386910531779
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__."../model/Customer.php");
require_once(__ROOT__."../model/Cycle.php");
require_once(__ROOT__."../model/Kit.php");
require_once(__ROOT__."../model/Order.php");
require_once(__ROOT__."../model/Product.php");
require_once(__ROOT__."../model/Product.LIST.php");

class crm extends Controller{
  protected $tables;
  protected $tablesButtons;

  public function __construct(){
    parent::__construct();
    $this->cache = \Cache::instance();
	}

  public function beforeRoute(){
    if(!$this->cache->exists("username") && $this->f3->get("PATH") !== "/crm/functions/startSession") $this->f3->reroute("/crm");
    //if(!$this->f3->exists("SESSION.username") && $this->f3->get("PATH") !== "/crm/functions/startSession") $this->f3->reroute("/crm");
  }

  public function endSession(){
    //$this->f3->clear("SESSION.username");
    $this->cache->clear("username");
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
        //$this->f3->set("SESSION.username", $username);
        $this->cache->set("username", $username);
        $i = -1;
      }else $i++;
    }

    if($i > 0) $this->f3->reroute("/crm");
    $this->f3->reroute("/crm/main");
  }

  public function showPage(){
    $pageName = $this->f3->get("PARAMS.pageName");
    $fileName = "main.html";
    $this->f3->set("username", $this->cache->get("username"));

    switch($pageName){
      case "customerProfile":
        $fileName = "customerProfile.html";
        break;
      case "cycles":
        $fileName = "cycles.html";
        break;
      case "products":
        $fileName = "products.htm";
        break;
      case "msg":
        $html = "<table><thead><tr><th>name<th>telephone</th><th>email</th><th>message</th><th>date</th></tr></thead><tbody>";

        $msgs = (new Mail($this->db))->getBySelector("1=1");

        foreach($msgs as $msg){
          $html .= "<tr>";
          $html .= "<td>".$msg->name."</td>";
          $html .= "<td>".$msg->telephone."</td>";
          $html .= "<td>".$msg->email."</td>";
          $html .= "<td>".$msg->message."</td>";
          $html .= "<td>".$msg->date."</td>";
          $html .= "</tr>";
        }

        $html .= "</tbody></table>";

        echo $html;
        return 0;
        break;
    }

    $page = new Template;
    echo $page->render($fileName);
  }


  public function load(){
    function toNum($n){
      return (int)$n;
    }
    $keys = array_map('toNum', $this->f3->get("POST.keys")?$this->f3->get("POST.keys"):[]);
    $table = $this->f3->get("POST.table");
    $k = $this->f3->get("POST.k");

    /*echo json_encode($this->f3->get("POST"));
    return;*/
    $selector = "";
    $db = array(
            "CUSTOMERS" => new Customer($this->db),
            "CYCLES" => new Cycle($this->db),
            "KITS" => new Kit($this->db),
            "ORDERS" => new Order($this->db),
            "PRODUCTS" => new Product($this->db),
            //"PRODUCTS_LIST" => new ProductsList($this->db)
          );

    foreach($keys as $p){
      $selector.="?,";
    }

    if(array_key_exists($table, $db) && sizeof($keys) > 0) echo json_encode($db[$table]->getBySelector(array($k.' IN ('.rtrim($selector, ",").')', $keys)));
    else echo "[]";
  }

  public function select(){
    function toNum($n){
      return (int)$n;
    }
    //if('["0","40"]' != json_encode($this->f3->get("POST.data"))) echo json_encode($this->f3->get("POST.data"));
    $data = array_map('toNum', $this->f3->get("POST.data")?$this->f3->get("POST.data"):[]);
    $table = $this->f3->get("POST.table");
    $where = $this->f3->get("POST.where");
    $db = array(
            "CUSTOMERS" => new Customer($this->db),
            "CYCLES" => new Cycle($this->db),
            "KITS" => new Kit($this->db),
            "ORDERS" => new Order($this->db),
            "PRODUCTS" => new Product($this->db),
            //"PRODUCTS_LIST" => new ProductsList($this->db)
          );

    array_unshift($data, $where);

    /*if($table == "ORDERS"){
      echo json_encode($data);
      return;
    }*/

    if(array_key_exists($table, $db)) echo json_encode($db[$table]->getBySelector($data));
  }

  public function del(){
    function toNum($n){
      return (int)$n;
    }
    $keys = array_map('toNum', $this->f3->get("POST.keys")?$this->f3->get("POST.keys"):[]);
    $table = $this->f3->get("POST.table");
    $k = $this->f3->get("POST.k");
    $selector = "";
    $db = array(
            "CUSTOMERS" => new Customer($this->db),
            "CYCLES" => new Cycle($this->db),
            "KITS" => new Kit($this->db),
            "ORDERS" => new Order($this->db),
            "PRODUCTS" => new Product($this->db),
            //"PRODUCTS_LIST" => new ProductsList($this->db)
          );

    foreach($keys as $k) $selector.="?,";

    if(array_key_exists($table, $db)) foreach($keys as $key) $db[$table]->remove($key);
  }

  public function save(){
    $records = $this->f3->get("POST.records");
    $table = $this->f3->get("POST.table");
    $k = $this->f3->get("POST.k");
    $return = array();

    foreach($records as $rec){
      $db = array(
                "CUSTOMERS" => new Customer($this->db),
                "CYCLES" => new Cycle($this->db),
                "KITS" => new Kit($this->db),
                "ORDERS" => new Order($this->db),
                "PRODUCTS" => new Product($this->db),
                //"PRODUCTS_LIST" => new ProductsList($this->db)
              );
      if(isset($rec[$k])){
        $rec['id'] = (int) $rec['id'];
        $db[$table]->edit($rec, $rec['id']);
        $return[] = $rec;
      }else{
        $rec["id"] = $db[$table]->create($rec);
        $return[] = $rec;
      }
    }
/*
    if($table !== "PRODUCTS")
      foreach($records as $rec){
        $db = array(
                  "CUSTOMERS" => new Customer($this->db),
                  "CYCLES" => new Cycle($this->db),
                  "KITS" => new Kit($this->db),
                  "ORDERS" => new Order($this->db),
                  "PRODUCTS" =>
                );
        if(isset($rec[$k])){
          $rec['id'] = (int) $rec['id'];
          $db[$table]->edit($rec, $rec['id']);
          $return[] = $rec;
        }else{
          $rec["id"] = $db[$table]->create($rec);
          $return[] = $rec;
        }
      }
    else {
      $db1 = new Product($this->db);
      $db2 = new ProductsList($this->db);
      foreach($records as $rec){
        if(isset($rec['id'])){
          if(isset($rec["productID"])){
            $rec['id'] = (int) $rec['productID'];
            $db1->edit($rec, $rec['productID']);
            $return[] = $rec;
          }else{
            $rec["id"] = $db1->create($rec);
            $return[] = $rec;
          }
        }else{
          $rec["id"] = $db2->create($rec);
          $return[] = $rec;
        }
      }
    }*/

    echo json_encode($return);
  }
}

?>
