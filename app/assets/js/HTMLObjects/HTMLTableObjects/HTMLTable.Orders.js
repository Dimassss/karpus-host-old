class HTMLTableOrders extends HTMLTable{
  constructor(selector, callbacks, cols, useCustomerNameForSearching){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    super(new OrderTableSQL(), selector, cols);

    this.callbacks = callbacks;
    this.useCustomerNameForSearching = useCustomerNameForSearching | false;
  }

  selectRow(){
    let _ = this;
    if(this.callbacks.selectRow) this.callbacks.selectRow.forEach(cb => cb(_));
  }

  dblSelectRow(){
    let _ = this;
    if(!isNaN(_.selected) && this.callbacks.dblSelectRow) this.callbacks.dblSelectRow.forEach(cb => cb(_.selected));
  }

  loadOnCycleSelect(cycleID){
    this.sqlMain = "`cycleID` = ?"
    this.sqlData = [cycleID];
    this.cleanTable();
    this.loadNewRowsEvent("FL");
  }

  loadNewRowsEvent(forceLoad){
    let _this = this;
    let options = {
      sqlMain: _this.sqlMain,
      sqlData: _this.sqlData,
      count: 30,
      order: "DESC",
      haveIDs: Object.keys(_this.body),
      searchingStr: (this.findInput && this.findInput.value)?this.findInput.value:"",
      searchCols: Object.fromEntries(_this.columns.filter(col => !["id", "customerID", "customerName"].includes(col)).map(col => [col, "string"])),
      getCols: "*"
    };

    if(_this.useCustomerNameForSearching) options.otherTables = {
      "CUSTOMERS": {
        searchCols: {"fullName":"string"},
        getCol: "id",
        mapTo: "customerID"
      }
    };

    if(!this.tableIsFull) if(forceLoad == "FL" || this.html.scrollHeight - this.html.scrollTop < 400)
        this.db.select(
          options,
          orders => {
            if(!orders) _this.tableIsFull = true;
            else{
              (new CustomerTableSQL()).load(orders.map(ord => ord.customerID), customers =>{
                customers = Object.fromEntries(customers.map(customer => [customer.id, customer]));
                orders.forEach(order => {
                  order.customerName = customers[order.customerID].fullName;
                  _this.addOrUpdateRow(order);
                });
              });
            }
          }
        );
  }
}
