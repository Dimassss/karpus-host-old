class OrderTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["OrderTableSQL"]) return g["Storage"]["OrderTableSQL"];
    super("id", "ORDERS", {});
    return g["Storage"]["OrderTableSQL"] = this;
  }

  load(keys){
    const records = this.l(keys);
    const orders = [];
    for(var i = 0; i < records.length; i++) orders[orders.length] = new OrderModel(records[i]);
    return orders;
  }

  select(where, data){
    const records = this.sl(where, data);
    const orders = [];
    for(var i = 0; i < records.length; i++) orders[orders.length] = new OrderModel(records[i]);
    return orders;
  }
}
