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
  constructor(){
    super();
  }

  addCustomersToNavTable(where, data, cb){
    var db = new CustomerTableSQL();
    var out = new CustomerProfileOutput();
    var columns = ["fullName", "telephones"];
    var tableObject = {body:[]};

    db.select(where, data, customers => {
      console.log(customers);
      customers.forEach(customer => {
        let row = [];
        row[row.length] = {id: customer.id};
        for(var i = 0; i < columns.length; i++){
          let val = customer[columns[i]];

          if(typeof val == "object") val = JSON.stringify(val).slice(4, -1).split("\",\"").join("<br>").replace(/\"/g, "");

          row[row.length] = [val, 1, 1];
        }
        tableObject.body[tableObject.body.length] = row;
      });
      if(customers[0]) g.Controller.CustomerProfile.customerNavTableScrollCounter = -1;
      out.insertData("WP_Tbl", tableObject);
      if(cb) cb();
    });
  }

  fillCustomerWin(customerID, cb){
    var out = new CustomerProfileOutput();
    var db = new CustomerTableSQL();
    db.load([customerID], customers => {
      var customer = customers[0];
      customer = customer!=undefined?customer:{fullName:"", telephones: [""], adresses: [""], email: "", notes: "", preferences: "", socialMedia: [""], activity: "", isEmpty: true};
      var columns = ["fullName", "telephone"];

      out.insertData("WP_ID", customerID);
      out.insertData("WP_Nm", customer["fullName"]);
      out.insertData("WP_Tel", customer["telephones"]);
      out.insertData("WP_Adr", customer["adresses"]);
      out.insertData("WP_E-m", customer["email"]);
      out.insertData("WP_Nt", customer["notes"]);
      out.insertData("WP_Pr", customer["preferences"]);
      out.insertData("WP_SM", customer["socialMedia"]);
      out.insertData("WP_Act", customer["activity"]);

      g.Controller.CustomerProfile.orderNavTableScrollCounter = 0;

      out.insertData("WO_Tbl", {body: -1});

      if(!customer.isEmpty) this.addOrdersToTable(customerID, undefined, cb);
    });
  }

  addOrdersToTable(customerID, orderID, cb, isNew){
    customerID = parseInt(customerID);
    let s = (new CustomerProfileInput()).takeData("WO_SF");
    s = (s != "")?s:undefined;
    if(s) g.Controller.CustomerProfile.orderNavTableScrollCounter = 0;
    let db = new OrderTableSQL();
    let dbCycle = new CycleTableSQL();
    let out = new CustomerProfileOutput();

    if(g.Controller.CustomerProfile.orderNavTableScrollCounter != -1) dbCycle.select("1=1", [], cycles => {
                      db.select(
                        (orderID!=undefined?'id = ?':"customerID = ?") + (isNew?"":" ORDER BY id DESC LIMIT ?, ?"),
                        isNew?[orderID]:[
                          orderID!=undefined?orderID:customerID,
                          g.Controller.CustomerProfile.orderNavTableScrollCounter*g.Controller.CustomerProfile.orderNavTableCountToSelect,
                          g.Controller.CustomerProfile.orderNavTableCountToSelect
                        ],
                        orders => {
                          console.log(orders);
                          if(orders.length > 0){
                            let columns;
                            var tableObject = {body:[]};
                            columns = ["cycleID", "kits", "products", "adress", "summary", "billed", "pays", "payDates", "orderNotes", "socialMedia"];
                            orders.forEach(order => {
                                let row = [];
                                row[row.length] = {id: order.id};
                                for(var i = 0; i < columns.length; i++) row[row.length] = [convertField(order, columns[i]), 1, 1];
                                tableObject.body[tableObject.body.length] = row;
                              });
                              console.log(tableObject);
                            out.insertData("WO_Tbl", tableObject);
                            g.Controller.CustomerProfile.orderNavTableScrollCounter++;
                          }else g.Controller.CustomerProfile.orderNavTableScrollCounter = -1;

                          if(cb) cb();

                          function convertField(o, c){
                            switch(c){
                              case "cycleID":
                                let r = cycles.find(cycle => cycle.id == o[c])
                                return r?r.name:"Not Selected";
                                break;
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
                      )
                    });
  }

  fillOrderCreatingWin(customerID, orderID, cb){
    var dbOrder = new OrderTableSQL();
    var dbCustomer = new CustomerTableSQL();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();
    var out = new CustomerProfileOutput();
    var ordersF = customer => {
      dbOrder.load([orderID], orders => {
        var order = orders[0];
        order = order?order:{id: -1, telephone: [""], socialMedia: [""], adress: [""], orderNotes: "", summary: 0, billed: false, isNotThis: false, payDates: [""], pays: [""], cycleID: -1, customerID: customerID};

        out.insertData("AW_Opn", true);

        //fill fields from customer object
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

        if(order["cycleID"] == -1){
          dbCycle.select("TRUE", [], cycles => {
            out.insertData("AW_c_id", [[-1, "Select Cycle"], ...cycles.map(cycle => [cycle["id"], cycle["name"]]) ]);
          });
        }else{
          dbCycle.select("TRUE", [], cycles => {
            var selectedCycle = cycles.filter(cycle => cycle.id == order.cycleID)[0];
            var restCycles = cycles.filter(cycle => cycle.id != order.cycleID);
            out.insertData("AW_c_id", [ [selectedCycle.id, selectedCycle.name], ...restCycles.map(cycle => [cycle.id, cycle.name]) ]);

            dbKit.load(selectedCycle["kitsID"], kitsFromDB => {

              kitsFromDB.forEach((kit, i) => {
                var orderKit = order.kits[kit.name];
                if(!orderKit) return false;

                kitsFromDB[i].count = (typeof orderKit.count == "number")?orderKit.count:0;
                kitsFromDB[i].price = (typeof orderKit.price == "number")?(orderKit.price):(kitsFromDB[i].price);

                var names = {};
                orderKit.products.forEach((pr, i) => names[pr.name] = i);

                if(JSON.stringify(names) != "{}"){
                  kit.products.forEach((pr, i) => {
                    if(names[pr.name] !== undefined){
                      kit.products[i].count = orderKit.products[names[pr.name]].count;
                      kit.products[i].price.selected = orderKit.products[names[pr.name]].price.selected;
                    }
                  });
                }
              });

              var kitsData = {};

              kitsFromDB.forEach(kit => {
                kitsData[kit.name] = kit;
              });
              console.log(order.kits, kitsData, kitsFromDB);
              out.insertData("AW_kits", kitsData);

              if(cb) cb();
            });
          });
        }
      });
    };

    dbCustomer.load([customerID], customers => {
      ordersF(customers[0]);
    });
  }

  displayKits(cycleID){
    var out = new CustomerProfileOutput();
    var dbCycle = new CycleTableSQL();
    var dbKit = new KitTableSQL();

    dbKit.select("cycleID = ?", [cycleID], kits => {
      var kitsData = {};
      for(var k in kits){
        if(!kits[k].count) kits[k].count = 0;
        kitsData[kits[k]["name"]] = Object.assign({}, kits[k]);
      }
      out.insertData("AW_kits", kitsData);
    });

  }

  deleteCustomer(customerID){
    var db = new CustomerTableSQL();
    var out = new CustomerProfileOutput();
    var _in = new CustomerProfileInput();
    if(_in.takeData("WP_ID") == customerID) this.fillCustomerWin(-1);
    out.insertData("WP_Tbl_CD", customerID);
    db.del([customerID]);
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
      socialMedia: inp.takeData("WP_SM"),
      activity: inp.takeData("WP_Act")
    });
  }

  getOrderFromPage(){
    let inp = new CustomerProfileInput();
    let order = new OrderModel({
      id: inp.takeData("AW_ID"),
      cycleID: inp.takeData("AW_c_id"),
      telephone: inp.takeData("AW_Tel"),
      socialMedia: inp.takeData("AW_SM"),
      adress: inp.takeData("AW_Adr"),
      orderNotes: inp.takeData("AW_ON"),
      summary: inp.takeData("AW_Sum"),
      billed: inp.takeData("AW_Bill"),
      isNotThis: inp.takeData("AW_n_ths"),
      customerID: inp.takeData("WP_ID"),
      anotherFullName: inp.takeData("AW_an_FN"),
      anotherTelephone: inp.takeData("AW_an_Tel"),
      kits: inp.takeData("AW_kits")
    });
    let customer = this.getCustomerFromPage();
    customer.preferences = inp.takeData("AW_Pr");
    if(!customer.telephones.find(t => t==order.telephone)) customer.telephones.push(order.telephone[0]);
    if(!customer.adresses.find(o => o==order.adress)) customer.adresses.push(order.adress[0]);
    if(!customer.socialMedia.find(o => o==order.socialMedia)) customer.socialMedia.push(order.socialMedia[0]);

    const payData = inp.takeData("AW_P");
    let pays = payData.map(data => data[0]);
    let dates = payData.map(data => data[1]);

    order.pays = pays;
    order.payDates = dates;

    return [order, customer];
  }

  saveCustomer(customer, cb){
    let db = new CustomerTableSQL();
    let id = customer["id"];
    if(id==-1) delete customer["id"];
    db.save([customer], customers => {
      cb(customers[0]);
    });
  }

  saveOrder(order, cb){
    let db = new OrderTableSQL();
    let id = order["id"];
    if(id==-1) delete order["id"];
    db.save([order], orders => {
      cb(orders[0]);
    });
  }

  addToArray(inpName, emp){
    if(!inpName) return false;
    let inp = new CustomerProfileInput();
    let out = new CustomerProfileOutput();
    let vals = inp.takeData(inpName);

    vals[vals.length] = JSON.parse(JSON.stringify(vals[0]));
    vals[0] = emp;

    out.insertData(inpName, vals);
  }

  selectTable(search){
    Array.from((new CustomerProfileInput()).takeData("Tbl_rows")).forEach(tr => {
      var hasSearched = false;

      Array.from(tr.querySelectorAll("td")).forEach(td => {
        if(td.innerHTML.search(search) > -1) hasSearched = true;
      });

      if(hasSearched) tr.style.display = "table-row";
      else tr.style.display = "none";
    });
  }

}
