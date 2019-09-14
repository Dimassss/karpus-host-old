/**
@class CustomerProfileDAO
@desc give method to easy moderate page and data on this page

@methods
  @method addCustomersToNavTable
    @param {String} where
    @param {Object} data
    @do add new customers as <tr> to nav table of customers
  @method fillCustomerWin
    @param {Intager} customerID
    @do get customer from db and fill all fields in customer windows and generate table of his orders
  @method fillOrderCreatingWin
    @param {Intager} customerID
    @param {Intager} orderID
    @do get customer and order from db and then fill all needed fields in order creating window
  @method displayKits
    @param {Intager} cycleID
    @do display all kits of selected cycle in order creating window
  @method deleteCustomer
    @param {Intager} customerID
    @do delete customer from db and from nav table of customers
  @method deleteOrder
    @param {Intager} orderID
    @do delete order from db and from nav table of customer's orders
  @method getCustomerFromPage
    @return {Customer} customer
    @do read all need fields and take its values to the customer object.
  @method getOrderFromPage
    @return {Array<Order, Customer>} [order, customer]
    @do read all need fields and take its values to the order object and returns updated customer objected.
  @method saveCustomer
    @param {Customer} customer
    @return {Customer} customer
    @do take customer object and save it to db. If it is new customer set id to the object and return it. Object if new and undefined if updated
  @method saveOrder
    @param {Customer} order
    @return {Customer} order
    @do take order object and save it to db. If it is new order set id to the object and return it. Object if new and undefined if updated
  @method addToArray
    @param {String} inpName
    @param {} emp => empty data for fields to be cleaned
    @do take data from needed field or fields and paste new element to html-array
*/
class CustomerProfileDAO extends DAO{
  constructor(){}

  addCustomersToNavTable(where, data){
    var out = new CustomerProfileOutput();
    var db = new CustomerTableSQL();
    var columns = ["fullName", "telephone"];
    var customers = table.select(where, data);
    var tableObject = {body:[]};

    db.select(where, data).forEach(customer => {
      let row = [];
      row[row.length] = {id: customer.id};
      for(var i = 0; i < columns.length; i++) row[row.length] = [customer[columns[i]], 1, 1];
      tableObject.body[tableObject.body.length] = row;
    });
    if(customers[0]) g.Controller.CustomerProfile.customerNavTableScrollCounter = -1;
    out.insertData("WP_Tbl", tableObject);
  }

  fillCustomerWin(customerID){
    var out = new CustomerProfileOutput();
    var db = new CustomerTableSQL();
    var customer = db.load([customerID])[0] | {fullName:"", telephones: [], adresses: [], email: "", notes: "", preferences: "", socialMedias: [], activity: "", isNotEmpty: false};
    var columns = ["fullName", "telephone"];
    var tableObject = {body:[]};

    out.insertData("WP_ID", customerID);
    out.insertData("WP_Nm", customer["fullName"]);
    out.insertData("WP_Tel", ["", customer["telephones"]]);
    out.insertData("WP_Adr", ["", customer["adresses"]]);
    out.insertData("WP_E-m", customer["email"]);
    out.insertData("WP_Nt", customer["notes"]);
    out.insertData("WP_Pr", customer["preferences"]);
    out.insertData("WP_SM", ["", customer["socialMedias"]]);
    out.insertData("WP_Act", customer["activity"]);

    if(!customer.isEmpty) this.addOrdersToTable(customerID);
  }

  addOrdersToTable(customerID, orderID){
    let s = (new CustomerProfileInput()).takeData("WO_SF");
    s = (s != "")?s:undefined;
    let q = ""; //create query for getted %s
    db = new OrderTableSQL();
    let orders = g.Controller.CustomerProfile.orderNavTableScrollCounter =! -1
                      ?db.select(
                        (orderID?'id = ?':"customerID = ?") + q +" ORDER BY id DESC LIMIT ?, ?",
                        [
                          orderID | customerID,
                          g.Controller.CustomerProfile.orderNavTableScrollCounter*g.Controller.CustomerProfile.orderNavTableCountToSelect,
                          g.Controller.CustomerProfile.orderNavTableCountToSelect
                        ]
                      ):[];
    if(orders[0]){
      orders.forEach(order => {
          let row = [];
          row[row.length] = {id: order.id};
          for(var i = 0; i < columns.length; i++) row[row.length] = [order[columns[i]], 1, 1];
          tableObject.body[tableObject.body.length] = row;
        });
      out.insertData("WO_Tbl", tableObject);
      g.Controller.CustomerProfile.orderNavTableScrollCounter++;
    }else g.Controller.CustomerProfile.orderNavTableScrollCounter = -1;
  }

  fillOrderCreatingWin(customerID, orderID){
    var dbOrder = new OrderTableSQL();
    var dbCustomer = new CustomerTableSQL();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var out = new CycleOutput();
    var order = dbOrder.load([orderID])[0] | {id: -1, telephone: "", socialMedia: "", adress: "", orderNotes: "", summary: 0, billed: false, isNotThis: false, payDates: [], pays: [], cycleID: -1, customerID: customerID};
    var customer = dbCustomer.load([order["customerID"]])[0] | {fullName:"", telephones: [], adresses: [], email: "", notes: "", preferences: "", socialMedias: [], activity: "", isNotEmpty: false};

    //fill fields from customer object
    out.insertData("AW_Nm", customer["fullName"]);
    out.insertData("AW_Pr", customer["Preferences"]);
    //fill fields from customer and order objects
    out.insertData("AW_Tel", [order["telephone"], ...customer["telephones"]].filter(tel => tel != order["telephone"]));
    out.insertData("AW_SM", [order["socialMedia"], ...customer["socialMedias"]].filter(media => media != order["socialMedia"]));
    out.insertData("AW_Adr", [order["adress"], ...customer["adresses"]].filter(adress => adress != order["adress"]));
    //fill fields from order object
    out.insertData("AW_ID", order["id"]);
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

  deleteCustomer(customerID){
    var db = new CustomerTableSQL();
    var out = new CustomerProfileOutput();
    var _in = new CustomerProfileInput();
    db.del([customerID]);
    out.insertData("WP_Tbl_CD", customerID);
    if(_in.takeData("WP_ID") == customerID) this.fillCustomerWin(-1);
  }

  deleteOrder(orderID){
    var db = new OrderTableSQL();
    var out = new CustomerProfileOutput();
    db.del([orderID]);
    out.insertData("WP_Tbl_OD", orderID);
  }


  getCustomerFromPage(){
    var inp = new CustomerProfileInput();
    return new CustomerModel({
      id: inp.takeData("WP_ID"),
      fullName: inp.takeData("WP_Nm"),
      telephones: inp.takeData("WP_Tel"),
      adresses: inp.takeData("WP_Adr"),
      email: inp.takeData("WP_E-m"),
      notes: inp.takeData("WP_Nt"),
      preferences: inp.takeData("WP_Pr"),
      socialMedias: inp.takeData("WP_SM"),
      activity: inp.takeData("WP_Act")
    });
  }

  getOrderFromPage(){
    var inp = new CustomerProfileInput();
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

  saveCustomer(customer){
    let db = CustomerTableSQL();
    let id = customer["id"];
    customer = db.save([customer])[0];
    return id != customer["id"]?customer:undefined;
  }

  saveOrder(order){
    let db = OrderTableSQL();
    let id = order["id"];
    order = db.save([order])[0];
    return order;
  }

  addToArray(inpName, emp){
    if(!inpName) return false;
    let inp = new CustomerProfileInput();
    let out = new CustomerProfileOutput();
    let vals = inp.takeData(inpName);
    out.insertData(inpName, [emp, ...vals]);
  }

}
