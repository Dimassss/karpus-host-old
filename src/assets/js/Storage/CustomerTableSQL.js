class CustomerTableSQL extends TableSQL{
  constructor(){
    if(g["Storage"]["CustomerTableSQL"]) return g["Storage"]["CustomerTableSQL"];
    super("id", "CUSTOMERS", {});
    return g["Storage"]["CustomerTableSQL"] = this;
  }

  load(keys){
    const records = this.l(keys);
    const customers = [];
    for(var i = 0; i < records.length; i++) customers[customers.length] = new CustomerModel(records[i]);
    return customers;
  }

  select(where, data){
    const records = this.sl(where, data);
    const customers = [];
    for(var i = 0; i < records.length; i++) customers[customers.length] = new CustomerModel(records[i]);
    return customers;
  }
}
