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
    this.dao = new CustomerProfileDAO();
    this.in = new CustomerProfileInput();
  }

  addCustomersToTable(e){
    var _this = this;
    let s = _this.in.takeData("NT_SF");
    s = (s != "")?s:undefined;

    if(g.Controller.CustomerProfile.customerNavTableScrollCounter != -1){
      this.dao.addCustomersToNavTable((s?'`fullName` LIKE "%?%" and `telephones` LIKE "%?%"':"TRUE") + ' ORDER BY id DESC LIMIT ?, ?',
                                      ([
                                        s, s,
                                        g.Controller.CustomerProfile.customerNavTableScrollCounter*g.Controller.CustomerProfile.customerNavTableCountToSelect,
                                        g.Controller.CustomerProfile.customerNavTableCountToSelect
                                      ]).filter(el => el?true:false));
      g.Controller.CustomerProfile.customerNavTableScrollCounter++;
    }
  }

  addOrdersToTable(e){
    this.dao.addOrdersToTable(this.in.takeData("WP_ID"));
  }

  openCustomer(e){
    var customerID = e.target.getAttribute("data-id");
    this.dao.fillCustomerWin(customerID);
  }

  createCustomer(e){
    this.dao.fillCustomerWin(-1);
  }

  deleteCustomer(e){
    var _this = this;
    this.dao.deleteCustomer(_this.in.takeData("WP_SC").getAttribute("data-id"));
  }

  deleteOrder(e){
    var _this = this;
    this.dao.deleteOrder(_this.in.takeData("WP_SO").getAttribute("data-id"));
  }

  editOrder(e){
    var _this = this;
    this.dao.fillOrderCreatingWin(_this.in.takeData("WP_ID", e.target.getAttribute("data-id")));
  }

  saveCustomer(e){
    let customer = this.dao.getCustomerFromPage();
    let out = new CustomerProfileOutput();
    customer = this.dao.saveCustomer(customer);
    if(customer) out.insertData("WP_ID", customer["id"]);
    out.insertData("WP_Tbl", {body:[[{id: customer["id"]}, [customer["fullName"], 1, 1], [customer["telephones"], 1, 1]]]});
  }

  saveOrder(e){
    let r = this.dao.getOrderFromPage();
    let out = new CustomerProfileOutput();
    order = this.dao.saveCustomer(order[0]);
    out.insertData("AW_ID", order["id"]);
    this.dao.addOrdersToTable(order["customerID"], order["id"]);
  }

  addToArray(e){
    this.dao.addToArray(...({
              "Telephone":["WP_Tel", ""],
              "Address":["WP_Adr", ""],
              "Social Media":["WP_SM", ""],
              "Paid":["AW_P", ["", ""]],
              "Date":["AW_P", ["", ""]]
            })[e.target.parentNode.querySelector("input").getAttribute("placeholder")]);
  }

  createOrder(e){
    this.fillOrderCreatingWin(this.in.takeData("WP_ID"), -1);
  }

  displayKitsOnCycleSelect(e){
    this.dao.displayKits(this.in.takeData("AW_c_id"));
  }

  searchCustomers(e){
    g.Controller.CustomerProfile.customerNavTableScrollCounter = 0;
    this.addCustomersToTable(e);
  }

  seachOrders(e){
    g.Controller.CustomerProfile.customerNavTableScrollCounter = 0;
    this.addOrdersToTable(e);
  }

  selectRecord(e, recordName){
    let sl = this.in.takeData("Tbl_Slct");
    sl[2].classList.remove("selected");
    e.target.classList.add("selected");
    sl = this.in.takeData("Tbl_Slct");
    let fillProfile = ({"orders": this.editOrder, "customers": this.openCustomer})[recordName];
    if(fillProfile != undefined) fillProfile(e);
  }

}
