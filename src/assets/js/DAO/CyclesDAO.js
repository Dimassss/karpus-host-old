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
      let columns = ["fullName", "telephone", "kits", "products", "adress", "summary", "billed", "pays", "payDates", "orderNotes", "socialMedia"];
      var tableObject = {body:[]};

      (new CustomerTableSQL()).load(orders.map(or => or.customerID), customers => {
        let nameMap = {};
        customers.forEach(c => nameMap[c.id] = c.fullName);
        orders.forEach((or, i) => orders[i].fullName = nameMap[or.customerID]);

        orders.forEach(order => {
          let row = [];
          row[row.length] = {id: order.id};
          for(var i = 0; i < columns.length; i++) row[row.length] = [convertField(order, columns[i]), 1, 1];
          console.log(order);
          tableObject.body[tableObject.body.length] = row;
        });

        out.insertData("O_Tbl", tableObject);
      });

      if(cb) cb();
    });

    function convertField(o, c){
      switch(c){
        case "kits":
          return Object.keys(o.kits).join(", ");
          break;
        case "products":
          return Object.keys(o.kits).map(kitName => kitName + ": [" + o.kits[kitName].products.map(pr => pr.name + ": " + pr.count).join(", ") + "]").join("<br>");
          break;
        case "pays":
          o[c].shift();
          return o[c].join(", ");
        case "payDates":
          o[c].shift();
          return o[c].join(", ");
        default:
          return o[c];
          break;
      }
    }
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
    this.cleanKitProfile();
    out.insertData("K_Tbl", {body: -1});
  }

  fillProductsWin(keys, cb){
    var db = new ProductTableSQL();
    var out = new CyclesOutput();
    const cols = ["name", "unit", "count", "price", "dimensions", "weight", "description"];
    var tableObject = {body:[]};
    console.log(db.v, cols);

    db.load(keys, products => {
      for(var i = 0; i < products.length; i++){
        var row = [{id: products[i]["id"], cycleID: products[i]["cycleID"]}];
        for(var j in cols) if(cols[j] != "id" && cols[j] != "cycleID"){
          const col = cols[j];
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
    this.cleanProductProfile();
    out.insertData("P_Tbl", {body: -1});
  }

  fillOrderCreatingWin(orderID, cb){
    var dbOrder = new OrderTableSQL();
    var dbCustomer = new CustomerTableSQL();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var out = new CyclesOutput();

    dbOrder.load([orderID], orders => {
      var order = orders[0];
      if(!order) return false;
      dbCustomer.load([order.customerID], customers => {
        let customer = customers[0];

        if(!customer){
          out.insertData("O_Tbl", {body:[[{id: orderID}]]});
          dbOrder.del([orderID]);
        }else{
          //fill fields from customer object
          out.insertData("Cstm_ID", customer.id);
          out.insertData("AW_Nm", customer["fullName"]);
          out.insertData("AW_Pr", customer["preferences"]);
          //fill fields from customer and order objects
          out.insertData("AW_Tel", [order["telephone"][0], ...customer["telephones"].filter(tel => tel != order["telephone"][0])]);
          out.insertData("AW_SM", [order["socialMedia"][0], ...customer["socialMedia"].filter(media => media != order["socialMedia"][0])]);
          out.insertData("AW_Adr", [order["adress"][0], ...customer["adresses"].filter(adress => adress != order["adress"][0])]);
          //fill fields from order object
          out.insertData("AW_ID", order["id"]);
          out.insertData("AW_ON", order["orderNotes"]);
          out.insertData("AW_Sum", order["summary"]);
          out.insertData("AW_Bill", order["billed"] == "true");
          out.insertData("AW_n_ths", order["isNotThis"] == "true");
          out.insertData("AW_an_FN", order["isNotThis"] == "true"?order["anotherFullName"]:"");
          out.insertData("AW_an_Tel", order["isNotThis"] == "true"?order["anotherTelephone"]:"");
          out.insertData("AW_P", order["payDates"].map((d, i) => [d, order["pays"][i]]));
          //clear kits
          out.insertData("AW_kits", {});

          dbCycle.select("TRUE", [], cycles => {
            var selectedCycle = cycles.find(cycle => cycle.id == order.cycleID);
            var restCycles = cycles.filter(cycle => cycle.id != order.cycleID);
            out.insertData("AW_c_id", [ [selectedCycle.id, selectedCycle.name], ...restCycles.map(cycle => [cycle.id, cycle.name]) ]);

            dbKit.select("cycleID = ?", [order.cycleID], kitsFromDB => {
              (new ProductTableSQL()).select("cycleID = ?", [order.cycleID], products => {
                kitsFromDB.forEach((kit, i) => {
                  let idMap = {};
                  kitsFromDB[i].products.forEach((pr, i) => idMap[pr.name] = i);
                  kitsFromDB[i].products = products.map(pr => {
                    if(typeof idMap[pr.name] != "undefined"){
                      let kPr = kitsFromDB[i].products[idMap[pr.name]];
                      pr.price.selected = kPr.price.selected;
                      pr.count = kPr.count;
                    }else{
                      pr.price.selected = pr.price["p-kt"];
                      pr.count = 0;
                    }
                    return JSON.parse(JSON.stringify(pr));
                  });

                  var orderKit = order.kits[kit.name];
                  if(!orderKit) return false;

                  kitsFromDB[i].count = (typeof orderKit.count == "number")?orderKit.count:0;
                  kitsFromDB[i].price = (typeof orderKit.price == "number")?(orderKit.price):(kitsFromDB[i].price);

                  var names = {};
                  orderKit.products.forEach((pr, i) => names[pr.name] = i);
                  let pcPrice = 0;
                  let pcWeight = 0;

                  kit.products.forEach((pr, i) => {
                    if(names[pr.name] !== undefined){
                      pr.count = orderKit.products[names[pr.name]].count;
                      pr.price.selected = orderKit.products[names[pr.name]].price.selected;
                      if(pr.count > 0){
                        pcPrice += pr.count*pr.price[pr.price.selected];
                        pcWeight += pr.weight*pr.count;
                      }
                    }else{
                      pr.count = 0;
                      pr.price.selected = "p-kt";
                    }
                    kit.products[i] = Object.assign({}, pr);
                  });
                  console.log(kit, pcPrice, pcWeight);
                  kit.pcPrice = pcPrice;
                  kit.pcWeight = pcWeight;
                });

                var kitsData = {};

                kitsFromDB.forEach(kit => {
                  console.log(kit);
                  kitsData[kit.name] = JSON.parse(JSON.stringify(kit));
                });

                out.insertData("AW_kits", kitsData);
                out.insertData("AW_SumPC", (kitsFromDB.filter(kit => kit.count > 0).map(kit => kit.count*(kit.price?kit.price:kit.pcPrice)).reduce((a, b) => a + b, 0)) + " uah");
                if(cb) cb();
              });
            });
          });
        }
      });
    });
  }

  updateOrderForm(kits){
    let out = new CyclesOutput();
    for(var k in kits) kits[k].name = k;
    let data = Object.values(kits).filter(kit => kit.count > 0).map(kit => [kit.count*(kit.price?kit.price:kit.pcPrice), kit.name]);

    out.insertData("AW_SumPC", (data.map(e => e[0]).reduce((a, b) => a + b, 0)) + " uah");
    data.forEach(d => {
      out.insertData("AW_KtPC", [kits[d[1]].pcPrice, kits[d[1]].pcWeight, d[1]]);
    });

  }

  fillKitProfile(kitID, cycleID){
    var db = new KitTableSQL();
    var out = new CyclesOutput();
    var fillProfile = kit => {
      out.insertData("K_ID", kit["id"]);
      out.insertData("K_Nm", kit["name"]);
      out.insertData("K_Pr", kit["price"]);
      out.insertData("K_PcPr", Number((kit["pcPrice"]).toFixed(2)));
      out.insertData("K_Tp", kit["type"]);
      out.insertData("K_Sz", kit["size"]);
      out.insertData("K_Dm", kit["dimensions"]);
      out.insertData("K_W", kit["weight"]);
      out.insertData("K_PcW", Number((kit["pcWeight"]).toFixed(2)));
      out.insertData("K_D", kit["description"]);
      out.insertData("K_Cr", kit);
    };
    db.load([kitID], kits => {
      let kit = kits[0]?kits[0]:{name: "", price: 0, pcPrice: 0, type: "", size: "", dimensions: [0,0,0], weight: 0, pcWeight: 0, description: "", products:[], progressBars:[0, 0]};

      (new ProductTableSQL()).select("cycleID = ?", [cycleID], products => {
        let idMap = {};
        kit.products.forEach((pr, i) => idMap[pr.name] = i);
        kit.products = products.map(pr => {
          if(typeof idMap[pr.name] != "undefined"){
            let kPr = kit.products[idMap[pr.name]];
            pr.price.selected = kPr.selected;
            pr.count = kPr.count;
          }else{
            pr.price.selected = pr.price["p-kt"];
            pr.count = 0;
          }
          return pr;
        });

        fillProfile(kit);
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

    (new ProductTableSQL()).select("cycleID = ?", [cycleID], products => {
      out.insertData("K_Cr", {products:products, progress_bars: [0, 0]});
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
    var product = {id: "",name: "", unit: "", count: {"c-st":0,"c-wh":0,"c-sh":0,"c-kt":0,"c-or":0,"c-lft":0}, price: {"p-wh":0,"p-sh":0,"p-rst":0,"p-kt":0}, dimensions: [0,0,0], weight: 0, description: ""};

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
    document.querySelector(".alert-window").style.display = "none";
  }

  openOrderCreatingWindow(){
    document.querySelector(".alert-window").style.display = "block";
  }

  getOrderFromPage(cb, returnOnlyKits){
    var inp = new CyclesInput();
    var order = new OrderModel({
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
      customerID: inp.takeData("Cstm_ID"),
      anotherFullName: inp.takeData("AW_an_FN"),
      anotherTelephone: inp.takeData("AW_an_Tel"),
      kits: inp.takeData("AW_kits")
    });

    if(returnOnlyKits) return order.kits;

    const payData = inp.takeData("AW_P");
    let pays = payData.map(data => data[0]);
    let dates = payData.map(data => data[1]);

    order.pays = pays;
    order.payDates = dates;

    (new CustomerTableSQL()).load([order.customerID], customers => {
      if(customers[0]){
        let customer = customers[0];
        if(!customer.telephones.find(t => t==order.telephone[0])) customer.telephones.push(order.telephone[0]);
        if(!customer.adresses.find(o => o==order.adress[0])) customer.adresses.push(order.adress[0]);
        if(!customer.socialMedia.find(o => o==order.socialMedia[0])) customer.socialMedia.push(order.socialMedia[0]);
        customer.preferences = inp.takeData("AW_Pr");
        cb(order, customer);
      }
    });
  }

  saveOrder(order){
    this.fillOrdersWin(order["id"]);
    (new OrderTableSQL()).save([order], () => {});
  }

  saveCustomer(customer){
    (new CustomerTableSQL()).save([customer], () => {});
  }

  displayKits(cycleID){
    var out = new CyclesOutput();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();


    dbKit.select("cycleID = ?", [cycleID], kits => {
      var kitsData = {};

      (new ProductTableSQL()).select("cycleID = ?", [cycleID], products => {
        for(var k in kits){
          let kit = kits[k];

          let idMap = {};
          kit.products.forEach((pr, i) => idMap[pr.name] = i);
          kit.products = products.map(pr => {
            if(typeof idMap[pr.name] != "undefined"){
              let kPr = kit.products[idMap[pr.name]];
              pr.price.selected = kPr.selected;
              pr.count = kPr.count;
            }else{
              pr.price.selected = pr.price["p-kt"];
              pr.count = 0;
            }
            return pr;
          });

          if(!kits[k].count) kits[k].count = 0;
          kitsData[kits[k]["name"]] = JSON.parse(JSON.stringify(kit));
        }

        out.insertData("AW_kits", kitsData);
      });
    });
  }

  deleteCycle(cycleID){
    let out = new CyclesOutput();
    let orderDB = new OrderTableSQL();
    let kitDB = new KitTableSQL();
    let productDB = new ProductTableSQL();
    let cycleDB = new CycleTableSQL();
    let cycle = {};

    cycle[cycleID] = false;
    out.insertData("C_CL1", cycle);
    out.insertData("C_CL2", cycle);

    orderDB.select(`cycleID LIKE ?`, [JSON.stringify(cycleID+"")], orders => {
      kitDB.select("cycleID = ?", [cycleID], kits => {
        productDB.select("cycleID = ?", [cycleID], products => {
          orderDB.del(orders.map(ord => ord.id));
          kitDB.del(kits.map(kit => kit.id));
          productDB.del(products.map(pr => pr.id));
          cycleDB.del([cycleID]);
        });
      });
    });
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
