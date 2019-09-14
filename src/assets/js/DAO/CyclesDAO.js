/**
@class CustomerProfileDAO
@desc give method to easy moderate page and data on this page

@methods
  @method dispalyCycles
    @param {String} where
    @param {Array} data
    @do display selected cycles to footer menu of cycles and to select list in footer
  @method fillCycleWindows
    @param {Intager} cycleID
    @do get orders, kits and products from db of selected cycle and fill that data to windows Orders, Kits and Products
  @method fillOrdersWin
    @param {Array<Intager>} keys
    @do display all orders to the order table in orders window
  @method fillKitsWin
    @param {Array<Intager} keys
    @do display all kits to the kits nav table in Kits Window
  @method fillProductsWin
    @param {Array<Intager} keys
    @do display all products to the kits nav table in Products Window
  @method fillOrderCreatingWindow
    @param {Intager} orderID
    @do get customer and order from db and then fill all needed fields in order creating window
  @method fillKitProfile
    @param {Intager} kitID
    @do get kit from db and fill all fields of kit profile in Kits Window
  @method fillProductProfile
    @param {Intager} kitID
    @do get product from db and fill all fields of product profile in Products Window
  @method createCycle
    @param {Intager} id
    @param {String} name
    @do update cycle name or create new if %id = -1
*/
class CyclesDAO extends DAO{
  constructor(){}

  dispalyCycles(where, data){
    var dbCycle = new CycleTableSQL();
    var cycles = dbCycle.select(where, data);
    var out = new CycleOutput();
    var cyclesData = {};

    for(var i = 0; i < cycles.length; i++) html[cycles[i]["id"]] = cycles[i]["name"];

    out.insertData("C_CL1", html);
    out.insertData("C_CL2", html);
  }

  fillCycleWindows(cycleID){
    var db = new CycleTableSQL();
    var cycle = db.load([cycleID])[0];

    (new CyclesOutput()).insertData("C_ID", cycleID);
    this.fillOrdersWin(cycle["ordersID"]);
    this.fillKitsWin(cycle["kitsID"]);
    this.fillProductsWin(cycle["productsID"])
  }

  cleanCycleWindows(cycleID){
    var db = new CycleTableSQL();
    var cycle = db.load([cycleID])[0];

    (new CyclesOutput()).insertData("C_ID", "-1");
    this.cleanOrdersWin(cycle["ordersID"]);
    this.cleanKitsWin(cycle["kitsID"]);
    this.cleanProductsWin(cycle["productsID"])
  }

  fillOrdersWin(keys){
    var db = new OrderTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var orders = db.load(keys);

    for(var i = 0; i < orders.length; i++){
      var row = [{id: orders[i]["id"], cycleID: orders[i]["cycleID"], customerID: orders[i]["customerID"]}];
      for(var col in db.v) if(col != "id" && col != "cycleID" && col != "customerID") row[row.length] = orders[i][col];
      tableObject.body[tableObject.body.length] = Array.from(row);
    }
    tableObject.head = tableObject.foot = Object.keys(db.v);

    out.insertData("O_Tbl", tableObject);
  }

  cleanOrdersWin(keys){
    var db = new OrderTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var orders = db.load(keys);

    for(var i = 0; i < orders.length; i++){
      tableObject.body[tableObject.body.length] = [{id: orders[i]["id"], cycleID: orders[i]["cycleID"], customerID: orders[i]["customerID"]}];
    }
    tableObject.head = tableObject.foot = Object.keys(db.v);

    out.insertData("O_Tbl", tableObject);
  }

  fillKitsWin(keys){
    var db = new KitTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var kits = db.load(keys);

    for(var i = 0; i < kits.length; i++){
      var row = [{id: kits[i]["id"], cycleID: kits[i]["cycleID"]}];
      for(var col in db.v) if(col != "id" && col != "cycleID") row[row.length] = kits[i][col];
      tableObject.body[tableObject.body.length] = Array.from(row);
    }

    out.insertData("K_Tbl", tableObject);
  }

  cleanKitsWin(keys){
    var db = new KitTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var kits = db.load(keys);

    for(var i = 0; i < kits.length; i++){
      tableObject.body[tableObject.body.length] = [{id: kits[i]["id"], cycleID: kits[i]["cycleID"]}];
    }

    out.insertData("K_Tbl", tableObject);
  }

  fillProductsWin(keys){
    var db = new KitTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var products = db.load(keys);

    for(var i = 0; i < products.length; i++){
      var row = [{id: products[i]["id"], cycleID: products[i]["cycleID"]}];
      for(var col in db.v) if(col != "id" && col != "cycleID") row[row.length] = products[i][col];
      tableObject.body[tableObject.body.length] = Array.from(row);
    }

    out.insertData("K_Tbl", tableObject);
  }

  cleanProductsWin(keys){
    var db = new KitTableSQL();
    var out = new CycleOutput();
    var tableObject = {body:[]};
    var products = db.load(keys);

    for(var i = 0; i < products.length; i++){
      tableObject.body[tableObject.body.length] = [{id: products[i]["id"], cycleID: products[i]["cycleID"]}];
    }

    out.insertData("K_Tbl", tableObject);
  }

  fillOrderCreatingWindow(orderID){
    var dbOrder = new OrderTableSQL();
    var dbCustomer = new CustomerTableSQL();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var out = new CycleOutput();
    var order = dbOrder.load([orderID])[0];
    var customer = dbCustomer.load([order["customerID"]])[0] | {fullName:"", telephones: [], adresses: [], email: "", notes: "", preferences: "", socialMedias: [], activity: "", isNotEmpty: false};

    //fill fields from customer object
    out.insertData("AW_Nm", customer["fullName"]);
    out.insertData("AW_Pr", customer["Preferences"]);
    //fill fields from customer and order objects
    out.insertData("AW_Tel", [order["telephone"], ...customer["telephones"]].filter(tel => tel != order["telephone"]));
    out.insertData("AW_SM", [order["socialMedia"], ...customer["socialMedias"]].filter(media => media != order["socialMedia"]));
    out.insertData("AW_Adr", [order["adress"], ...customer["adresses"]].filter(adress => adress != order["adress"]));
    //fill fields from order object
    out.insertData("AW_ON", order["orderNotes"]);
    out.insertData("AW_Sum", order["summary"]);
    out.insertData("AW_Bill", order["billed"]);
    out.insertData("AW_n_ths", order["isNotThis"]);
    out.insertData("AW_an_FN", order["isNotThis"]?order["anotherFullName"]:"");
    out.insertData("AW_an_Tel", order["isNotThis"]?order["anotherTelephone"]:"");
    out.insertData("AW_P", order["payDates"].map((d, i) => [d, order["pays"][i]]));
    out.insertData("AW_c_id",
                  [
                    order["cycleID"] != -1?[
                      order["cycleID"],
                      dbCycle.load([order["cycleID"]])[0]["name"]
                    ]: [-1, "Select Cycle"],
                    ...dbCycle.select("TRUE")
                              .map(cycle => [cycle["id"], cycle["name"]])
                              .filter(cycle => order["cycleID"] != -1 || cycle[0] != order["cycleID"])
                  ]);

    var kits = {...dbKit.load(dbCycle.load([cycleID])[0]["kitsID"])} | {};
    var kitsData = {};
    for(var k in kits){
      kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
    }
    if(order["cycleID"] != -1){
      kits = order["kits"].map(kit => kit.products.sort((p1, p2) => p2.count - p1.count));
      var kitsData = {};
      var kitsFromDB = Object.assign({}, dbKit.load(dbCycle.load([order["cycleID"]])[0]["kitsID"]));
      for(var k in kits){
        kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
        delete kits[k];
      }
      for(var k in kitsFromDB) if(!kitsData[kitsFromDB[k]["name"]]) kitsData[kitsFromDB[k]["name"]] = Object.assign({}, kitsFromDB[k]);
      out.insertData("AW_kits", kitsData);
    }
  }

  fillKitProfile(kitID, cycleID){
    var db = new KitTableSQL();
    var out = new CycleOutput();
    var kit = db.load([kitID])[0] | {name: "", price: 0, pcPrice: 0, type: "", size: "", dimensions: [0,0,0], weight: 0, pcWeight: 0, description: "", products: (new ProductTableSQL()).load((new CycleTableSQL).load([cycleID])[0]["productsID"])};

    out.insertData("K_Nm", kit["name"]);
    out.insertData("K_Pr", kit["price"]);
    out.insertData("K_PcPr", kit["pcPrice"]);
    out.insertData("K_Tp", kit["type"]);
    out.insertData("K_Sz", kit["size"]);
    out.insertData("K_Dm", kit["dimensions"]);
    out.insertData("K_W", kit["weight"]);
    out.insertData("K_PcW", kit["pcWeight"]);
    out.insertData("K_D", kit["description"]);
    out.insertData("K_Cr", kit["products"]);
  }

  cleanKitProfile(cycleID){
    var out = new CycleOutput();

    out.insertData("K_Nm", "");
    out.insertData("K_Pr", 0);
    out.insertData("K_PcPr", 0);
    out.insertData("K_Tp", "");
    out.insertData("K_Sz", "");
    out.insertData("K_Dm", [0, 0, 0]);
    out.insertData("K_W", 0);
    out.insertData("K_PcW", 0);
    out.insertData("K_D", "");
    out.insertData("K_Cr", (new ProductTableSQL()).load((new CycleTableSQL).load([cycleID])[0]["productsID"]));
  }

  fillProductProfile(productID){
    var db = new ProductTableSQL();
    var out = new CycleOutput();
    var product = db.load([productID])[0] | {name: "", unit: "", count: {}, price: {}, dimensions: [0,0,0], weight: 0, description: ""};

    out.insertData("P_Nm", product["name"]);
    out.insertData("P_Unt", product["unit"]);
    out.insertData("P_C", product["count"]);
    out.insertData("P_Pr", product["price"]);
    out.insertData("P_Dm", product["dimensions"]);
    out.insertData("P_W", product["weight"]);
    out.insertData("P_D", product["description"]);
  }

  cleanProductProfile(){
    var out = new CycleOutput();
    var product = {name: "", unit: "", count: {}, price: {}, dimensions: [0,0,0], weight: 0, description: ""};

    out.insertData("P_Nm", product["name"]);
    out.insertData("P_Unt", product["unit"]);
    out.insertData("P_C", product["count"]);
    out.insertData("P_Pr", product["price"]);
    out.insertData("P_Dm", product["dimensions"]);
    out.insertData("P_W", product["weight"]);
    out.insertData("P_D", product["description"]);
  }

  createCycle(id, name){
    var db = new CycleTableSQL();
    let cycle = id != -1?db.load([id])[0]:new CycleModel({name: "", kitsID: [], ordersID: [], productsID: []});
    id = cycle.id
    cycle.name = name;
    cycle = db.save([cycle])[0];
    id = (id == -1)?cycle.id:id;
    (new CyclesOutput()).insertData("C_ID", id);
  }

  closeOrderCreatingWindow(){
    document.querySelector(".alertWindow").style.display = "none";
  }

  openOrderCreatingWindow(){
    document.querySelector(".alertWindow").style.display = "block;";
  }

  getOrderFromPage(){
    var inp = new CyclesInput();
    return [new OrderModel({
      id: inp.takeData("AW_ID"),
      cycleID: inp.takeData("AW_c_id"),
      telephone: inp.takeData("AW_Tel"),
      socialMedia: inp.takeData("AW_SM"),
      adress: inp.takeData("AW_Adr"),
      orderNotes: inp.takeData("AW_ON"),
      summary: inp.takeData("AW_Sum"),
      billed: inp.takeData("AW_Bill"),
      isNotThis: inp.takeData("AW_n_ths"),
      payDates: inp.takeData("AW_PD"),
      pays: inp.takeData("AW_Pay"),
      customerID: inp.takeData("WP_ID"),
      anotherFullName: inp.takeData("AW_an_FN"),
      anotherTelephone: inp.takeData("AW_an_Tel"),
      kits: inp.takeData("AW_kits")
    }), {...this.getCustomerFromPage(), preferences: inp.takeData("AW_Pr")}];
  }

  saveOrder(order){
    let db = OrderTableSQL();

    if(cycleID != order["cycleID"]){
      let dbCycle = CycleTableSQL();
      let cycleID = (new CyclesInput()).takeData("C_ID");
      let cyclesToUpdate = dbCycle.load([cycleID])
      let cycleUpdated1 = cyclesToUpdate[0];
      let cycleUpdated2 = cyclesToUpdate[1];
      const orderID = cycleUpdated1.ordersID.indexOf(order["id"]);
      if(orderID > -1){
        cycleUpdated1.ordersID.splice(orderID, 1);
        cycleUpdated2.ordersID[cycleUpdated2.ordersID.length] = order["id"];
      }
      dbCycle.save(cyclesToUpdate);
      (new CycleOutput).insertData("O_Tbl", {body:[[{id: order["id"]}]]});
    }else{
      this.fillOrdersWin(order["id"]);
    }
    order = db.save([order])[0];
  }

  displayKits(cycleID){
    var out = new CustomerProfileOutput();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var kits = {...dbKit.load(dbCycle.load([cycleID])[0]["kitsID"])} | {};
    var kitsData = {};
    if(!kits[Obj])
    for(var k in kits){
      kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
    }
    out.insertData("AW_kits", kitsData);
  }

  deleteCycle(cycleID){
    (new CycleTableSQL()).del([cycleID]);
  }

  addToArray(inpName, emp){
    if(!inpName) return false;
    let inp = new CustomerProfileInput();
    let out = new CustomerProfileOutput();
    let vals = inp.takeData(inpName);
    out.insertData(inpName, [emp, ...vals]);
  }

  takeProductFromPage(){
    var inp = new CyclesInput();
    let id = inp.takeData("Tbl_Slct")[1]
    return new ProductModel({
          id: id?id:undefined,
          cycleID: inp.takeData("C_ID"),
          name: inp.takeData("pr_Nm"),
          unit: inp.takeData("pr_Unt"),
          price: inp.takeData("pr_p"),
          count: inp.takeData("pr_c"),
          dimensions: inp.takeData("pr_Dm"),
          weight: inp.takeData("pr_w"),
          description:  inp.takeData("pr_d")
        });
  }

  takeKitFromPage(){
    var inp = new CyclesInput();
    let id = inp.takeData("Tbl_Slct")[1];
    return new KitModel({
      id: id?id:undefined,
      cycleID: inp.takeData("C_ID"),
      name: inp.takeData("kt_Nm"),
      price: inp.takeData("kt_Pr"),
      weight: inp.takeData("kt_w"),
      description: inp.takeData("kt_d"),
      size: inp.takeData("kt_Sz"),
      type: inp.takeData("kt_Tp"),
      dimensions: inp.takeData("kt_Dm"),
      ...inp.takeData("kt_prs"),
    });
  }
}
