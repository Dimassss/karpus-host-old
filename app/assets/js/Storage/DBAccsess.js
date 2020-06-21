class DBAccess{
  constructor(){
    if(g["Storage"]["DBAccess"]) return g["Storage"]["DBAccess"];
    return g["Storage"]["DBAccess"] = this;
  }

  getLeftCountOfProducts(cycleID, cb){
    $.post("/crm/getLeftCountOfProducts", {cycleID:cycleID}).done((data) => {
      cb(JSON.parse(data));
    });
  }

  getUsedOrderCountOfProducts(cycleID, cb){
    $.post("/crm/getUsedOrderCountOfProducts", {cycleID:cycleID}).done((data) => {
      cb(JSON.parse(data));
    });
  }

  getLeftCountOfProduct(prID, orderID, cycleID, cb){
    $.post("/crm/getLeftCountOfProduct", {cycleID:cycleID, prID:prID, orderID:orderID}).done((data) => {
      cb(JSON.parse(data));
    });
  }
  
  getLeftCountOfProductsNotInOrder(orderID, cycleID, cb){
    $.post("/crm/getLeftCountOfProductsNotInOrder", {cycleID:cycleID, orderID:orderID}).done((data) => {
      cb(JSON.parse(data));
    });
  }
}
