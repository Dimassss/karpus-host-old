/**
@class CustomerProfileController

@methods
  @method addCustomersToTable
    @param {Event} e
    @do onScroll add new customers to nav table of customers
  @method openCustomer
    @param {Event} e
    @do on double click on customer row in nav table load its data to customer prifile and orders nav table
  @method createCustomer
    @param {Event} e
    @do on click on "Create new Customer" button it clean prifle and orders nav table for new customers
  @method deleteCustomer
    @param {Event} e
    @do delete selected customers from db and nav table. If it was showed in window - clean window
  @method deleteOrder
    @param {Event} e
    @do delete selcted order from nav table and from db
  @method editOrder
    @param {Event} e
    @do on double click open alertWindow and full out all fields in that window in order to change it
  @method saveCustomer
    @param {Event} e
    @do on every time some field change on window this method is called  to save this customer to db and edit its data in cunstomers nav table is needed
  @method saveOrder
    @param {Event} e
    @do on click on "tick" save button in alertWindow it take all data from alertWindow and save it as order to db and change data in orders nav table if it is needed
  @method addToArray
    @param {Event} e
    @do on click on "add" button on page it take data from needed field and paste new element to html-array
  @method createOrder
    @param {Event} e
    @do on click on "Create Order" button shows alertWindow with empty fields
  @method displayKitsOnCycleSelect
    @param {Event} e
    @do when user select cycle in alertWindow in display all kits from that cycle in kits-container
  @method searchCustomers
    @param {Event} e
    @do update customers table for new search query
  @method searchOrders
    @param {Event} e
    @do update orders table for new search query
*/

class CustomerProfileController{
  constructor(){
    if(g.Controller.CustomerProfile.instance) return g.Controller.CustomerProfile.instance;
    this.dao = new CustomerProfileDAO();
    this.in = new CustomerProfileInput();
    return g.Controller.CustomerProfile.instance = this;
  }

  addCustomersToTable(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    let s = "%" + _this.in.takeData("NT_SF") + "%";

    if(s!="%%"){
      _this.dao.selectTable(s)
    }

    if(g.Controller.CustomerProfile.customerNavTableScrollCounter != -1){
      _this.dao.addCustomersToNavTable(((s!="%%"?'fullName LIKE ? or telephones LIKE ?':"TRUE") + ' ORDER BY id DESC LIMIT ?, ?'),
                                      ([
                                        s, s,
                                        g.Controller.CustomerProfile.customerNavTableScrollCounter*g.Controller.CustomerProfile.customerNavTableCountToSelect,
                                        g.Controller.CustomerProfile.customerNavTableCountToSelect
                                      ]).filter(el => el != undefined &&(typeof el == "string"?el != "%%":true)),
                                      cb);
      g.Controller.CustomerProfile.customerNavTableScrollCounter++;
    }
  }

  addOrdersToTable(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.addOrdersToTable(_this.in.takeData("WP_ID"), undefined, cb);
  }

  openCustomer(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    var customerID = e.target.parentNode.getAttribute("data-id");
    _this.dao.fillCustomerWin(customerID, cb);
  }

  createCustomer(e){
    let _this = g.Controller.CustomerProfile.instance;
    let sl = _this.in.takeData("TblC_Slct");

    if(sl[2]) sl[2].classList.remove("selected");
    _this.dao.fillCustomerWin(-1);
  }

  deleteCustomer(e){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.deleteCustomer(_this.in.takeData("WP_SC").getAttribute("data-id"));
  }

  deleteOrder(e){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.deleteOrder(parseInt(_this.in.takeData("WO_SO").getAttribute("data-id")));
  }

  editOrder(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.fillOrderCreatingWin(_this.in.takeData("WP_ID"), parseInt(e.target.parentNode.getAttribute("data-id")), cb);
  }

  saveCustomer(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    let customer = _this.dao.getCustomerFromPage();
    let out = new CustomerProfileOutput();

    if(!(customer.fullName=="" && customer.id == -1)) _this.dao.saveCustomer(customer, customer => {
      if(customer) out.insertData("WP_ID", customer["id"]);
      out.insertData("WP_Tbl", {body:[[{id: customer["id"], class: "selected"}, [customer["fullName"], 1, 1], [JSON.stringify(customer["telephones"]).slice(4, -1).split("\",\"").join("<br>").replace(/\"/g, ""), 1, 1]]]});

      if(cb) cb();
    });
  }

  saveOrder(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    let [order, customer] = _this.dao.getOrderFromPage();
    let out = new CustomerProfileOutput();
    
    _this.dao.saveOrder(order, order => {
      out.insertData("AW_ID", order["id"]);
      _this.dao.addOrdersToTable(order["customerID"], order["id"], cb, true);
    });

    _this.dao.saveCustomer(customer, customer => {
      out.insertData("WP_Pr", customer.preferences);
      out.insertData("WP_Tel", customer.telephones);
      out.insertData("WP_Adr", customer.adresses);
      out.insertData("WP_SM", customer.socialMedia);

      out.insertData("WP_Tbl", {body:[[{id: customer["id"], class: "selected"}, [customer["fullName"], 1, 1], [JSON.stringify(customer["telephones"]).slice(4, -1).split("\",\"").join("<br>").replace(/\"/g, ""), 1, 1]]]});
    });
  }

  addToArray(e){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.addToArray(...({
              "Telephone":["WP_Tel", ""],
              "Address":["WP_Adr", ""],
              "Social Media":["WP_SM", ""],
              "Paid":["AW_P", ["", ""]],
              "Date":["AW_P", ["", ""]]
            })[e.target.parentNode.querySelector("input").getAttribute("placeholder")]);
  }

  createOrder(e){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.fillOrderCreatingWin(_this.in.takeData("WP_ID"), -1);
  }

  displayKitsOnCycleSelect(e){
    let _this = g.Controller.CustomerProfile.instance;
    _this.dao.displayKits(parseInt(_this.in.takeData("AW_c_id")));
  }

  searchCustomers(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    g.Controller.CustomerProfile.customerNavTableScrollCounter = 0;
    _this.addCustomersToTable(e, cb);
  }

  seachOrders(e, cb){
    let _this = g.Controller.CustomerProfile.instance;
    g.Controller.CustomerProfile.customerNavTableScrollCounter = 0;
    _this.addOrdersToTable(e, cb);
  }

  selectRecord(e, recordName, cb){
    let _this = g.Controller.CustomerProfile.instance;
    let slName = ({"customer_orders": "TblO_Slct", "customers": "TblC_Slct"})[recordName]

    if(slName){
      let sl = _this.in.takeData(slName);
      if(sl[2]) sl[2].classList.remove("selected");
      e.target.parentNode.classList.add("selected");
    }

    let fillProfile = ({"orders": _this.editOrder, "customers": _this.openCustomer})[recordName];

    if(fillProfile != undefined) fillProfile(e, cb);
  }

  updateOrderForm(e){
    let _this = g.Controller.CustomerProfile.instance;
    let kits = _this.dao.getOrderFromPage(undefined,1);
    _this.dao.updateOrderForm(kits);
  }

  //function to delete:
  fillDatabase(cb){
    const c = new CycleTableSQL(),
          p = new ProductTableSQL(),
          k = new KitTableSQL();

    c.load([1,2], cycles => {
      if(cycles[1] && cycles[0].name == "cycle00" && cycles[1].name == "cycle01"){
        /*if(confirm("Do you want to clean cycles, products and kits tables?")){
          let ids = [];
          (Array(160).join(",").split(",")).map(k => 1).forEach((k, i) => ids[i]=i);
          c.del(ids);
          p.del(ids);
          k.del(ids);
        }*/
        return false;
      }

      if(!confirm("Fill up database with example data?")) return false;

      c.save([
        new CycleModel({name: "cycle00"}),
        new CycleModel({name: "cycle01"}),
        new CycleModel({name: "cycle02"}),
        new CycleModel({name: "cycle03"}),
      ], ()=>{
        for(var i = 0; i < 1; i++) p.save([
          new ProductModel({cycleID: 1, name: "product00", unit: "kg", price: {"p-wh": 25, "p-sh": 25, "p-rst": 30, "p-kt": 50}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.0, description: "Some description about product00"}),
          new ProductModel({cycleID: 1, name: "product01", unit: "g", price: {"p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 30}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.1, description: "Some description about product01"}),
          new ProductModel({cycleID: 1, name: "product02", unit: "kg", price: {"p-wh": 55, "p-sh": 27, "p-rst": 30, "p-kt": 76}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.2, description: "Some description about product02"}),
          new ProductModel({cycleID: 1, name: "product03", unit: "kg", price: {"p-wh": 35, "p-sh": 26, "p-rst": 30, "p-kt": 23}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.3, description: "Some description about product03"}),

          new ProductModel({cycleID: 2, name: "product04", unit: "c", price: {"p-wh": 65, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.4, description: "Some description about product04"}),
          new ProductModel({cycleID: 2, name: "product05", unit: "c", price: {"p-wh": 25, "p-sh": 28, "p-rst": 30, "p-kt": 22}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.5, description: "Some description about product05"}),
          new ProductModel({cycleID: 2, name: "product06", unit: "kg", price: {"p-wh": 35, "p-sh": 65, "p-rst": 30, "p-kt": 27}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.6, description: "Some description about product06"}),
          new ProductModel({cycleID: 2, name: "product07", unit: "kg", price: {"p-wh": 5, "p-sh": 25, "p-rst": 30, "p-kt": 25}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.7, description: "Some description about product07"}),

          new ProductModel({cycleID: 3, name: "product08", unit: "L", price: {"p-wh": 75, "p-sh": 75, "p-rst": 30, "p-kt": 26}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.8, description: "Some description about product08"}),
          new ProductModel({cycleID: 3, name: "product09", unit: "kg", price: {"p-wh": 25, "p-sh": 75, "p-rst": 30, "p-kt": 22}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.9, description: "Some description about product09"}),
          new ProductModel({cycleID: 3, name: "product10", unit: "L", price: {"p-wh": 75, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.1, description: "Some description about product10"}),
          new ProductModel({cycleID: 3, name: "product11", unit: "kg", price: {"p-wh": 65, "p-sh": 26, "p-rst": 30, "p-kt": 24}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.11, description: "Some description about product11"}),

          new ProductModel({cycleID: 4, name: "product12", unit: "c", price: {"p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 28}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.12, description: "Some description about product12"}),
          new ProductModel({cycleID: 4, name: "product13", unit: "g", price: {"p-wh": 20, "p-sh": 25, "p-rst": 30, "p-kt": 23}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.13, description: "Some description about product13"}),
          new ProductModel({cycleID: 4, name: "product14", unit: "L", price: {"p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 21}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.14, description: "Some description about product14"}),
          new ProductModel({cycleID: 4, name: "product15", unit: "c", price: {"p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 29}, count: {"c-st":90,"c-wh":30,"c-sh":20,"c-kt":20,"c-or":10,"c-lft":20}, dimensions: [0.3, 0.3, 0.2], weight: 1.15, description: "Some description about product15"}),
        ], ()=>{
          k.save([
            new KitModel({cycleID: 1, name: "Kit00", price: 140, pcPrice: 120, weight: 11, pcWeight: 10, products: [
              {name: "product02", unit: "kg", price:{selected: "p-kt", "p-wh": 55, "p-sh": 27, "p-rst": 30, "p-kt": 76}, count:2, weight:1.5},
              {name: "product01", unit: "g", price:{selected: "p-kt", "p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 30}, count:5, weight:3.4},
              {name: "product03", unit: "kg", price:{selected: "p-kt", "p-wh": 35, "p-sh": 26, "p-rst": 30, "p-kt": 23}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE1", size: "S", description: "Some description about kit00"}),
            new KitModel({cycleID: 1, name: "Kit01", price: 140, pcPrice: 220, weight: 13, pcWeight: 10, products: [
              {name: "product00", unit: "kg", price:{selected: "p-kt", "p-wh": 25, "p-sh": 25, "p-rst": 30, "p-kt": 50}, count:2, weight:1.5},
              {name: "product01", unit: "g", price:{selected: "p-kt", "p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 30}, count:5, weight:3.4},
              {name: "product02", unit: "kg", price:{selected: "p-kt", "p-wh": 55, "p-sh": 27, "p-rst": 30, "p-kt": 76}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE2", size: "M", description: "Some description about kit01"}),
            new KitModel({cycleID: 1, name: "Kit02", price: 140, pcPrice: 320, weight: 17, pcWeight: 10, products: [
              {name: "product03", unit: "kg", price:{selected: "p-kt", "p-wh": 35, "p-sh": 26, "p-rst": 30, "p-kt": 23}, count:2, weight:1.5},
              {name: "product02", unit: "kg", price:{selected: "p-kt", "p-wh": 55, "p-sh": 27, "p-rst": 30, "p-kt": 76}, count:5, weight:3.4},
              {name: "product00", unit: "kg", price:{selected: "p-kt", "p-wh": 25, "p-sh": 25, "p-rst": 30, "p-kt": 50}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE2", size: "L", description: "Some description about kit02"}),

            new KitModel({cycleID: 2, name: "Kit03", price: 140, pcPrice: 120, weight: 10, pcWeight: 10, products: [
              {name: "product04", unit: "c", price:{selected: "p-kt", "p-wh": 65, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count:2, weight:1.5},
              {name: "product06", unit: "kg", price:{selected: "p-kt", "p-wh": 35, "p-sh": 65, "p-rst": 30, "p-kt": 27}, count:5, weight:3.4},
              {name: "product07", unit: "kg", price:{selected: "p-kt", "p-wh": 5, "p-sh": 25, "p-rst": 30, "p-kt": 25}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE3", size: "S", description: "Some description about kit03"}),
            new KitModel({cycleID: 2, name: "Kit04", price: 140, pcPrice: 170, weight: 14, pcWeight: 10, products: [
              {name: "product04", unit: "c", price:{selected: "p-kt", "p-wh": 65, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count:2, weight:1.5},
              {name: "product05", unit: "c", price:{selected: "p-kt", "p-wh": 25, "p-sh": 28, "p-rst": 30, "p-kt": 22}, count:5, weight:3.4},
              {name: "product06", unit: "kg", price:{selected: "p-kt", "p-wh": 35, "p-sh": 65, "p-rst": 30, "p-kt": 27}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE2", size: "M", description: "Some description about kit04"}),
            new KitModel({cycleID: 2, name: "Kit05", price: 140, pcPrice: 210, weight: 18, pcWeight: 10, products: [
              {name: "product04", unit: "c", price:{selected: "p-kt", "p-wh": 65, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count:2, weight:1.5},
              {name: "product05", unit: "c", price:{selected: "p-kt", "p-wh": 25, "p-sh": 28, "p-rst": 30, "p-kt": 22}, count:5, weight:3.4},
              {name: "product07", unit: "kg", price:{selected: "p-kt", "p-wh": 5, "p-sh": 25, "p-rst": 30, "p-kt": 25}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE1", size: "L", description: "Some description about kit05"}),

            new KitModel({cycleID: 3, name: "Kit06", price: 140, pcPrice: 100, weight: 09, pcWeight: 10, products: [
              {name: "product11", unit: "kg", price:{selected: "p-kt", "p-wh": 65, "p-sh": 26, "p-rst": 30, "p-kt": 24}, count:2, weight:1.5},
              {name: "product10", unit: "L", price:{selected: "p-kt", "p-wh": 75, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count:5, weight:3.4},
              {name: "product09", unit: "kg", price:{selected: "p-kt", "p-wh": 25, "p-sh": 75, "p-rst": 30, "p-kt": 22}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE3", size: "S", description: "Some description about kit06"}),
            new KitModel({cycleID: 3, name: "Kit07", price: 140, pcPrice: 140, weight: 12, pcWeight: 10, products: [
              {name: "product08", unit: "L", price:{selected: "p-kt", "p-wh": 75, "p-sh": 75, "p-rst": 30, "p-kt": 26}, count:2, weight:1.5},
              {name: "product09", unit: "kg", price:{selected: "p-kt", "p-wh": 25, "p-sh": 75, "p-rst": 30, "p-kt": 22}, count:5, weight:3.4},
              {name: "product11", unit: "kg", price:{selected: "p-kt", "p-wh": 65, "p-sh": 26, "p-rst": 30, "p-kt": 24}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE1", size: "M", description: "Some description about kit07"}),
            new KitModel({cycleID: 3, name: "Kit08", price: 140, pcPrice: 195, weight: 15, pcWeight: 10, products: [
              {name: "product10", unit: "L", price:{selected: "p-kt", "p-wh": 75, "p-sh": 23, "p-rst": 30, "p-kt": 27}, count:2, weight:1.5},
              {name: "product08", unit: "L", price:{selected: "p-kt", "p-wh": 75, "p-sh": 75, "p-rst": 30, "p-kt": 26}, count:5, weight:3.4},
              {name: "product09", unit: "kg", price:{selected: "p-kt", "p-wh": 25, "p-sh": 75, "p-rst": 30, "p-kt": 22}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE3", size: "L", description: "Some description about kit08"}),

            new KitModel({cycleID: 4, name: "Kit09", price: 140, pcPrice: 126, weight: 10, pcWeight: 10, products: [
              {name: "product15", unit: "c", price:{selected: "p-kt", "p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 29}, count:2, weight:1.5},
              {name: "product14", unit: "L", price:{selected: "p-kt", "p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 21}, count:5, weight:3.4},
              {name: "product13", unit: "g", price:{selected: "p-kt", "p-wh": 20, "p-sh": 25, "p-rst": 30, "p-kt": 23}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE2", size: "S", description: "Some description about kit09"}),
            new KitModel({cycleID: 4, name: "Kit10", price: 140, pcPrice: 147, weight: 14, pcWeight: 10, products: [
              {name: "product15", unit: "c", price:{selected: "p-kt", "p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 29}, count:2, weight:1.5},
              {name: "product14", unit: "L", price:{selected: "p-kt", "p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 21}, count:5, weight:3.4},
              {name: "product12", unit: "c", price:{selected: "p-kt", "p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 28}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE1", size: "M", description: "Some description about kit10"}),
            new KitModel({cycleID: 4, name: "Kit11", price: 140, pcPrice: 170, weight: 14, pcWeight: 10, products: [
              {name: "product12", unit: "c", price:{selected: "p-kt", "p-wh": 26, "p-sh": 22, "p-rst": 30, "p-kt": 28}, count:2, weight:1.5},
              {name: "product14", unit: "L", price:{selected: "p-kt", "p-wh": 22, "p-sh": 28, "p-rst": 30, "p-kt": 21}, count:5, weight:3.4},
              {name: "product13", unit: "g", price:{selected: "p-kt", "p-wh": 20, "p-sh": 25, "p-rst": 30, "p-kt": 23}, count:4, weight:2.7}
            ], progress_bars: [80, 75], dimensions: [0.3, 0.4, 0.4], type: "TYPE2", size: "L", description: "Some description about kit11"})
          ], ()=>{alert("Assistance tables are filled up. You can use this app now."); if(cb) cb()});
        });
      });
    });
  }

}
