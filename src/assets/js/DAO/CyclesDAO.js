/**
@class CyclesDAO
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
  constructor(){
    super();
  }

  dispalyCycles(where, data, cb){
    var dbCycle = new CycleTableSQL();
    var out = new CyclesOutput();

    dbCycle.select(where, data, cycles => {
      let html = {};
      for(var i = 0; i < cycles.length; i++) html[cycles[i]["id"]] = cycles[i]["name"];

      out.insertData("C_CL1", html);
      out.insertData("C_CL2", html);

      if(cb) cb();
    });
  }

  fillCycleWindows(cycleID, cb){
    var db = new CycleTableSQL();
    var _this = this;
    _this.cleanCycleWindows();

    db.load([cycleID], cycles => {
      let cycle = cycles[0];
      (new CyclesOutput()).insertData("C_ID", cycleID);

      (new OrderTableSQL()).select(`cycleID LIKE ?`, [JSON.stringify(cycleID)], orders => {
        _this.fillOrdersWin(orders.map(o => o.id));

        (new KitTableSQL()).select(`cycleID = ?`, [cycleID], kits => {
          _this.fillKitsWin(kits.map(o => o.id));

          (new ProductTableSQL()).select(`cycleID = ?`, [cycleID], products => {

            _this.fillProductsWin(products.map(o => o.id), cb);
          });
        });
      });
    });
  }

  cleanCycleWindows(){
    (new CyclesOutput()).insertData("C_ID", "-1");
    this.cleanOrdersWin();
    this.cleanKitsWin();
    this.cleanProductsWin()
  }

  fillOrdersWin(keys, cb){
    var db = new OrderTableSQL();
    var out = new CyclesOutput();
    var tableObject = {body:[]};

    db.load(keys, orders => {
      for(var i = 0; i < orders.length; i++){
        var row = [{id: orders[i]["id"], cycleID: orders[i]["cycleID"], customerID: orders[i]["customerID"]}];
        for(var col in db.v) if(col != "id" && col != "cycleID" && col != "customerID") row[row.length] = orders[i][col];
        tableObject.body[tableObject.body.length] = Array.from(row);
      }
      //tableObject.head = tableObject.foot = [Object.keys(db.v).map(col => [col, 1, 1])];

      out.insertData("O_Tbl", tableObject);

      if(cb) cb();
    });
  }

  cleanOrdersWin(){
    var out = new CyclesOutput();

    out.insertData("O_Tbl", {body: -1});
  }

  fillKitsWin(keys, cb){
    var db = new KitTableSQL();
    var out = new CyclesOutput();
    var tableObject = {body:[]};

    db.load(keys, kits => {
      for(var i = 0; i < kits.length; i++){
        var row = [{id: kits[i]["id"], cycleID: kits[i]["cycleID"]}];
        for(var col in db.v) if(col != "id" && col != "cycleID") if(col == "name" || col == "type" || col == "price") row[row.length] = [kits[i][col], 1, 1];
        tableObject.body[tableObject.body.length] = Array.from(row);
      }

      out.insertData("K_Tbl", tableObject);

      if(cb) cb();
    });
  }

  cleanKitsWin(){
    var out = new CyclesOutput();

    out.insertData("K_Tbl", {body: -1});
  }

  fillProductsWin(keys, cb){
    var db = new ProductTableSQL();
    var out = new CyclesOutput();
    var tableObject = {body:[]};

    db.load(keys, products => {
      for(var i = 0; i < products.length; i++){
        var row = [{id: products[i]["id"], cycleID: products[i]["cycleID"]}];
        for(var col in db.v) if(col != "id" && col != "cycleID"){
          if(col == "count" || col == "price") for(var c in products[i][col]) row[row.length] = [products[i][col][c], 1, 1];
          else if(products[i][col] == null) row[row.length] = ["", 1, 1];
          else if(typeof products[i][col] == "object") row[row.length] = [products[i][col].join(" * "), 1, 1];
          else row[row.length] = [products[i][col], 1, 1];
        }
        tableObject.body[tableObject.body.length] = Array.from(row);
      }

      out.insertData("P_Tbl", tableObject);

      if(cb) cb();
    });
  }

  cleanProductsWin(){
    var out = new CyclesOutput();

    out.insertData("P_Tbl", {body: -1});
  }

  fillOrderCreatingWindow(orderID){
    var dbOrder = new OrderTableSQL();
    var dbCustomer = new CustomerTableSQL();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var out = new CyclesOutput();
    var customersF = order => {
      dbCustomer.load([order.customerID], customers => {
        let customer = customers[0];

        //fill fields from customer object
        out.insertData("AW_Nm", customer["fullName"]);
        out.insertData("AW_Pr", customer["preferences"]);
        //fill fields from customer and order objects
        out.insertData("AW_Tel", [order["telephone"], ...customer["telephones"][1].filter(tel => tel != order["telephone"])]);
        out.insertData("AW_SM", [order["socialMedia"], ...customer["socialMedia"][1].filter(media => media != order["socialMedia"])]);
        out.insertData("AW_Adr", [order["adress"], ...customer["adresses"][1].filter(adress => adress != order["adress"])]);
        //fill fields from order object
        out.insertData("AW_ID", order["id"]);
        out.insertData("AW_ON", order["orderNotes"]);
        out.insertData("AW_Sum", order["summary"]);
        out.insertData("AW_Bill", order["billed"]);
        out.insertData("AW_n_ths", order["isNotThis"]);
        out.insertData("AW_an_FN", order["isNotThis"]?order["anotherFullName"]:"");
        out.insertData("AW_an_Tel", order["isNotThis"]?order["anotherTelephone"]:"");
        out.insertData("AW_P", order["payDates"].map((d, i) => i==0?[d, order["pays"][i]]:[d[0], order["pays"][1][i]]));
        order["payDates"] = ["", []];
        order["pays"] = ["", []];
        out.insertData("AW_P", order["payDates"].map((d, i) => i==0?[d, order["pays"][i]]:[d[0], order["pays"][1][i]]));
        if(order["cycleID"] == -1){
          dbCycle.select("TRUE", [], cycles => {
            out.insertData("AW_c_id", [[-1, "Select Cycle"], cycles.map(cycle => [cycle["id"], cycle["name"]]) ]);
          });
        }else{
          dbCycle.select("TRUE", [], cycles => {
            var selectedCycle = cycles.filter(cycle => cycle.id == order.cycleID)[0];
            var restCycles = cycles.filter(cycle => cycle.id != order.cycleID);
            out.insertData("AW_c_id", [ [selectedCycle.id, selectedCycle.name], restCycles.map(cycle => [cycle.id, cycle.name]) ]);

            var kits = dbKit.load(selectedCycle["kitsID"], kitsFromDB => {
              var kitsData = {};
              for(var k in kits){
                kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
              }

              kits = order["kits"].map(kit => kit.products.sort((p1, p2) => p2.count - p1.count));
              var kitsData = {};
              for(var k in kits){
                kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
                delete kits[k];
              }
              for(var k in kitsFromDB) if(!kitsData[kitsFromDB[k]["name"]]) kitsData[kitsFromDB[k]["name"]] = Object.assign({}, kitsFromDB[k]);
              out.insertData("AW_kits", kitsData);
            });
          });
        }
      });
    };

    dbOrder.load([orderID], orders => {
      customersF(orders[0]);
    });
  }

  fillKitProfile(kitID, cycleID){
    var db = new KitTableSQL();
    var out = new CyclesOutput();
    var fillProfile = kit => {
      out.insertData("K_ID", kit["id"]);
      out.insertData("K_Nm", kit["name"]);
      out.insertData("K_Pr", kit["price"]);
      out.insertData("K_PcPr", kit["pcPrice"]);
      out.insertData("K_Tp", kit["type"]);
      out.insertData("K_Sz", kit["size"]);
      out.insertData("K_Dm", kit["dimensions"]);
      out.insertData("K_W", kit["weight"]);
      out.insertData("K_PcW", kit["pcWeight"]);
      out.insertData("K_D", kit["description"]);
      out.insertData("K_Cr", kit);
    };
    db.load([kitID], kits => {
      let kit = kits[0]?kits[0]:{name: "", price: 0, pcPrice: 0, type: "", size: "", dimensions: [0,0,0], weight: 0, pcWeight: 0, description: "", products:[]};
      (new CycleTableSQL).load([cycleID], cycles => {
        (new ProductTableSQL()).load(cycles[0]["productsID"], products => {
          kit.progressBars = kit.progressBars?kit.progressBars:[0, 0];
          for(var p in kit.products){
            let pr = kit.products[p];
            for(var k in products) if(products[k].name == pr.name){
              if(pr["price"] && pr["price"]["selected"] && products[k]["price"][pr["price"]["selected"]]){
                products[k]["price"]["selected"] = pr["price"]["selected"];
                products[k].count = pr.count;
              }
            }
          }
          kit.products = products;
          fillProfile(kit);
        });
      });

    });
  }

  cleanKitProfile(cycleID){
    var out = new CyclesOutput();

    out.insertData("K_ID", "");
    out.insertData("K_Nm", "");
    out.insertData("K_Pr", 0);
    out.insertData("K_PcPr", 0);
    out.insertData("K_Tp", "");
    out.insertData("K_Sz", "");
    out.insertData("K_Dm", [0, 0, 0]);
    out.insertData("K_W", 0);
    out.insertData("K_PcW", 0);
    out.insertData("K_D", "");
    (new CycleTableSQL).load([cycleID], cycles => {
      (new ProductTableSQL()).load(cycles[0]["productsID"], products => {
        out.insertData("K_Cr", {products:products, progress_bars: [0, 0]});
      });
    });
  }

  fillProductProfile(productID){
    var db = new ProductTableSQL();
    var out = new CyclesOutput();
    db.load([productID], products => {
      let product = products[0];
      product = product?product:{name: "", unit: "", count: {}, price: {}, dimensions: [0,0,0], weight: 0, description: ""};

      out.insertData("P_ID", product["id"]);
      out.insertData("P_Nm", product["name"]);
      out.insertData("P_Unt", product["unit"]);
      out.insertData("P_C", product["count"]);
      out.insertData("P_Pr", product["price"]);
      out.insertData("P_Dm", product["dimensions"]);
      out.insertData("P_W", product["weight"]);
      out.insertData("P_D", product["description"]);
    });
  }

  cleanProductProfile(){
    var out = new CyclesOutput();
    var product = {id: "",name: "", unit: "", count: {}, price: {}, dimensions: [0,0,0], weight: 0, description: ""};

    out.insertData("P_Nm", product["name"]);
    out.insertData("P_ID", product["id"]);
    out.insertData("P_Unt", product["unit"]);
    out.insertData("P_C", product["count"]);
    out.insertData("P_Pr", product["price"]);
    out.insertData("P_Dm", product["dimensions"]);
    out.insertData("P_W", product["weight"]);
    out.insertData("P_D", product["description"]);
  }

  createCycle(id, name, cb){
    var db = new CycleTableSQL();

    db.load([id], cycles => {
      let cycle = id != -1?cycles[0]:new CycleModel({name: name, kitsID: [], ordersID: [], productsID: []});

      db.save([cycle], cycles => {
        cb(cycles[0]["id"]);
      });
    });
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

    if(!order["cycleID"]){
      let cycleID = (new CyclesInput()).takeData("C_ID");
      if(!cycleID) throw "WTF, Why havent record been selected???";
      order["cycleID"] = cycleID;
    }else{
      this.fillOrdersWin(order["id"]);
    }
    db.save([order]);
  }

  displayKits(cycleID){
    var out = new CyclesOutput();
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
    let out = new CyclesOutput();
    let cycle = {};

    cycle[cycleID] = false;
    out.insertData("C_CL1", cycle);
    out.insertData("C_CL2", cycle);

    (new CycleTableSQL()).del([cycleID]);
  }

  addToArray(inpName, emp){
    if(!inpName) return false;
    let inp = new CyclesInput();
    let out = new CyclesOutput();
    let vals = inp.takeData(inpName);
    out.insertData(inpName, [emp, ...vals]);
  }

  takeProductFromPage(){
    var inp = new CyclesInput();
    let id = inp.takeData("P_ID");
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
    let id = inp.takeData("K_ID");
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

  getCurrentCycleID(){
    let inp = new CyclesInput();
    return inp.takeData("C_ID");
  }
}
