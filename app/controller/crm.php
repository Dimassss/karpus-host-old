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

        $msgs = (new Mail($this->db))->getBySelector("1");

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

  /*public function select(){
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

    $pos = strpos($where, "`customerName`");
    if($pos !== false){
      $searchingStr = explode("%", $where)[1];
      $where = str_replace("`customerName`", "", $where, 1);
      $ids = [];
      $customers = $db["CUSTOMERS"]->getBySelector(array("`fullName` = ?", $searchingStr));
      for($customers as $cust) 
        $ids[] = $cust->id;
      
      if(id !== []){
        for($ids as $id) $wherePlus .= $id.", ";
        $wherePlus = "`customerID` IN (".substr($where, 0, -1).")";
      }
    }

    if(array_key_exists($table, $db)) echo json_encode($db[$table]->getBySelector($data));
  }*/

  public function select(){
    /* 
      @where = {
         sqlMain: string,
          sqlData: array,
          count: (int),
          order: INC/DEC,
          haveIDs: Array(),
          searchingStr: String,
          searchCols: arrayOfColsToSearch,
          getCols: arrayOfColsToGet / "*",
          otherTables:{
            tableName: {
              searchCols: arrayOfColsToSearch / "*",
              getCol: ColToGet,
              mapTo: "colNameImCurrentTable
            }
          }
       }
       @currentTableName = string
    */

    $db = array(
      "CUSTOMERS" => new Customer($this->db),
      "CYCLES" => new Cycle($this->db),
      "KITS" => new Kit($this->db),
      "ORDERS" => new Order($this->db),
      "PRODUCTS" => new Product($this->db)
      //"PRODUCTS_LIST" => new ProductsList($this->db)
    );
    $currentTableName = $this->f3->get("POST.currentTableName");
    $where = $this->f3->get("POST.where");
    
    if(!array_key_exists($currentTableName, $db)) return;

    $arr = [""];

    if($where["sqlMain"] && $where["sqlMain"] !== ""){
      $arr[0] .= $where["sqlMain"];
      if($where["sqlData"]) $arr = array_merge($arr, $where["sqlData"]);
    }else{
      $arr[0] = "1=1";
    }

    if($where["haveIDs"]){
      $arr[0] .= " AND ID NOT IN (".implode(",", $where["haveIDs"]).")";
    }

    if($where["searchingStr"] && $where["searchCols"]){
      $searchArr = [];
      foreach($where["searchCols"] as $col => $type){
        switch($type){
          case "number":
            $searchArr[] = "`".$col."` = ?";
            array_push($arr, $where["searchingStr"]);
            break;
          case "string":
            $searchArr[] = "`".$col."` LIKE ?";
            array_push($arr, "%".$where["searchingStr"]."%");
            break;
        }
      }

      $searchStrSQL = implode(" OR ", $searchArr);
      $arr[0] .= (($searchStrSQL == "")?"":(" AND (".$searchStrSQL.")"));
    }

    if($where["order"]){
      $arr[0] .= " ORDER BY ID ".(($where["order" == "ASC"])?"ASC":"DESC");
    }

    if($where["count"]){
      $arr[0] .= " LIMIT ".$where["count"];
    }

    $records = [];
    $r = $db[$currentTableName]->getBySelector($arr);
    if($where["getCols"] && $where["getCols"] !== "*"){
      foreach($r as $rec){
        $records[] = [];
        $len = count($records);
        foreach($where["getCols"] as $col){
          $records[$len - 1][$col] = $rec[$col];
        }
      }
    }else{
      $records = $r;
    } 

    if($where["otherTables"]){
      $ids = [];
      $arr = $records;
      $count = -1;
      
      foreach($where["otherTables"] as $tableName => $options){
        if(!$where["count"] || ($where["count"] && $where["count"] > count($records))){
          foreach($arr as $rec){
            $ids[] = $rec["id"];
          }
          $count = $where["count"] - count($ids);
        }
        
        if(!($count == -1 || $count > 0)) break;

        $arr = ["1=1"];

        if(count($ids) > 0){
          $arr[0] .= " AND ".$options["getCol"]." NOT IN (".implode(",", $ids).")";
        }

        if($where["searchingStr"] && $options["searchCols"]){
          $searchArr = [];
          foreach($options["searchCols"] as $col => $type){
            switch($type){
              case "number":
                $searchArr[] = "`".$col."` = ?";
                array_push($arr, $where["searchingStr"]);
              break;
              case "string":
                $searchArr[] = "`".$col."` LIKE ?";
                array_push($arr, "%".$where["searchingStr"]."%");
              break;
            }
          }
    
          $searchStrSQL = implode(" OR ", $searchArr);
          $arr[0] .= (($searchStrSQL == "")?"":(" AND (".$searchStrSQL.")"));
        }

        if($count > 0){
          $arr[0] .= " LIMIT ".$count;
        }

        $recs = $db[$tableName]->getBySelector($arr);
        $gettedCols = [];
        $strArr = [];
        foreach($recs as $rec){
          $gettedCols[] = $rec[$options["getCol"]];
          $strArr[] = "?";
        }

        $arr = [];
        if($where["sqlMain"] && $where["sqlMain"] !== ""){
          $arr[0] .= $where["sqlMain"];
          if($where["sqlData"]) $arr = array_merge($arr, $where["sqlData"]);
        }else{
          $arr[0] = "1=1";
        }
        $arr[0] .= " AND ".$options["mapTo"]." IN (".implode(",", $strArr).")";
        $arr = array_merge($arr, $gettedCols);

        $recs = $db[$currentTableName]->getBySelector($arr);
        
        if($where["getCols"] !== "*"){
          foreach($recs as $rec){
            $records[] = [];
            $len = count($records);
            foreach($where["getCols"] as $col){
              $records[$len - 1][$col] = $rec[$col];
            }
          }
        }else{
          $records = array_merge($records, $recs);
        }
      }
    }
    
    echo json_encode($records);
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

    echo json_encode($return);
  }

  public function getLeftCountOfProducts(){
    /*
      @cycleID = int
    */

    $cycleID = intval($this->f3->get("POST.cycleID"));
    $counts = ["used" => $this->getArrayOfCountOfOrderedProducts($cycleID), "left" => []];

    $cycle = (new Cycle($this->db))->getBySelector(["`id` = ?", $cycleID])[0];
    $products = json_decode($cycle["products"], true);
    $productsList = (new Product($this->db))->getBySelector(["`id` > -1"]);
    
    foreach($productsList as $pr){
      $id = $pr["id"];
      if(!$counts["used"][$id]) $counts["used"][$id] = 0;
      if(!$products[$id]){
        $counts["left"][$id] = (-$counts["used"][$id]);
      }else{
        $counts["left"][$id] = $products[$id]["count"]["c-st"] - $products[$id]["count"]["c-wh"] - $products[$id]["count"]["c-sh"] - $counts["used"][$id];
      }
    }
    
    echo json_encode($counts["left"]);
  }

  private function getArrayOfCountOfOrderedProducts($cycleID){
    /*
      @cycleID = int
    */
    
    $counts = [];

    $orders = (new Order($this->db))->getBySelector(["`cycleID` = ?", $cycleID]);

    foreach($orders as $order){
      $kits = json_decode($order["kits"], true);
      foreach($kits as $kit){
        foreach($kit["products"] as $id => $pr){
          if($pr["count"]*$kit["count"] == 0) continue;
          if(!$counts[$id]) $counts[$id] = 0;
          $counts[$id] += $pr["count"]*$kit["count"];
        }
      }
    }
    
    return $counts;
  }

  public function getUsedOrderCountOfProducts(){
    /*
      @cycleID = int
    */

    echo json_encode($this->getArrayOfCountOfOrderedProducts(intval($this->f3->get("POST.cycleID"))));
  }

  public function getLeftCountOfProduct(){
    /*
      @cycleID
      @prID
      @orderID
    */

    $cycleID = intval($this->f3->get("POST.cycleID"));
    $prID = intval($this->f3->get("POST.prID"));
    $orderID = intval($this->f3->get("POST.orderID"));

    $cycle = (new Cycle($this->db))->getBySelector(['`id` = ?', $cycleID])[0];
    $productCountInCycle = json_decode($cycle["products"], true)[$prID]["count"];
    $orders = (new Order($this->db))->getBySelector(["`id` != ? AND `cycleID` = ?", $orderID, $cycleID]);
    $countInOrders = 0;

    foreach($orders as $order){
      $kits = json_decode($order["kits"], true);
      foreach($kits as $kit){
        $c = $kit["count"]*$kit["products"][$prID]["count"];
        $countInOrders += $c?$c:0;
      }
    }
    
    echo $productCountInCycle["c-st"] - $productCountInCycle["c-wh"] - $productCountInCycle["c-sh"] - $countInOrders;
  }

  private function getArrayOfCountOfOrderedProductsNotInOrder($cycleID, $orderID){
    /*
      @cycleID = int
    */
    
    $counts = [];

    $orders = (new Order($this->db))->getBySelector(["`cycleID` = ? AND `id` != ?", $cycleID, $orderID]);

    foreach($orders as $order){
      $kits = json_decode($order["kits"], true);
      foreach($kits as $kit){
        foreach($kit["products"] as $id => $pr){
          if($pr["count"]*$kit["count"] == 0) continue;
          if(!$counts[$id]) $counts[$id] = 0;
          $counts[$id] += $pr["count"]*$kit["count"];
        }
      }
    }
    
    return $counts;
  }

  public function getLeftCountOfProductsNotInOrder(){
    /*
      @cycleID = int
      @orderID = int
    */

    $cycleID = intval($this->f3->get("POST.cycleID"));
    $orderID = intval($this->f3->get("POST.orderID"));
    $counts = ["used" => $this->getArrayOfCountOfOrderedProductsNotInOrder($cycleID, $orderID), "left" => []];

    $cycle = (new Cycle($this->db))->getBySelector(["`id` = ?", $cycleID])[0];
    $products = json_decode($cycle["products"], true);
    $productsList = (new Product($this->db))->getBySelector(["`id` > -1"]);

    foreach($productsList as $pr){
      if(!$counts["used"][$pr["id"]]) $counts["used"][$pr["id"]] = 0;
      if(!$products[$pr["id"]]){
        $counts["left"][$pr["id"]] = (-$counts["used"][$pr["id"]]);
      }else{
        $counts["left"][$pr["id"]] = $products[$pr["id"]]["count"]["c-st"] - $products[$pr["id"]]["count"]["c-wh"] - $products[$pr["id"]]["count"]["c-sh"] - $counts["used"][$id];
      }
    }

    echo json_encode($counts["left"]);
  }
}

?>
