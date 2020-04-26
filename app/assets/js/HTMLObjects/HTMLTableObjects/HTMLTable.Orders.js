class HTMLTableOrders extends HTMLTable{
  constructor(selector, callbacks, cols){
    /*
    callbacks = {func1: [cb1, cb2, ...]}
    Every callback take current HTMLTableObject obj as a parametr
    */

    super(new OrderTableSQL(), selector, cols);

    this.callbacks = callbacks;
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

    if(!this.tableIsFull) if(forceLoad == "FL" || this.html.scrollHeight - this.html.scrollTop < 400)
      this.db.select(
              _this.sqlMain + " "
              + (
                  (this.findInput && this.findInput.value)
                  ?(_this.columns.map(col => "`" + col + "` LIKE '%" + this.findInput.value + "%'").join(" OR ") + " AND "):""
              ) + (Object.keys(_this.body)[0]?("AND `id` NOT IN ("
              + Object.keys(_this.body).map(el => "?").join(",")
              + ") "):"") + "ORDER BY ID DESC LIMIT 30",
          [..._this.sqlData, ...Object.keys(this.body)],
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
