class HTMLAlertWinOrder extends HTMLAlertWin{
  constructor(selector, mapper, okCB){
    /**
    mapper = {
      fieldName: relativeSelector
    }

    In the current object are the following fields for alert win:
      cyclesSelect,
      kits = [HTMLKitProductsForm]
      summary = HTMLText
      cycleSelection = HTMLList

    */
    super(selector);

    this.selector = selector;
    this.mapper = mapper;
    this.okCB = okCB;

    this.dbCustomer = new CustomerTableSQL();
    this.dbOrder = new OrderTableSQL();
    this.dbKit = new KitTableSQL();
    this.dbProduct = new ProductTableSQL();
    this.dbCycle = new CycleTableSQL();
  }

  ok(){
    
  }

  fillUp(orderID, customerID){
    //orderID is setted => order is old and user want to update it
    //customerID is setted => order is new and user want to create it
    //At the same time can be setted either orderID or customerID

    if(!(orderID || customerID)){
      console.assert(false, {text: "orderID and customerID are not setted", data: {orderID:orderID, customerID:customerID});
      return;
    }

    this.orderID = orderID;
    this.order = new OrderModel({/*empty order object*/});
    let _ = this;

    const preparing = (order, customerID) => {
      //prepare needed objects
      _.dbCustomer.load([customerID], customers => {
        if(!customer[0]) throw Exception;
        _.dbCycle.select("1=1", [], cycles => {
          if(!cycles){
            alert("You cant create order because there is no cycles in database");
            return;
          }

          _.order = order;
          _.customer = customer;
        });
      });
    };

    if(orderID) this.dbOrder.load([orderID], orders => preparing(orders[0], orders[0].customerID));
    else preparing(order);


  }

  loadKitsOnCycleSelect(cycleID, orderKits){
    const maxWeight = 100, maxVolume = 100;
    let _ = this;

    _.dbKit.select("`cycleID` = ?", [cycleID], kits => {
      if(orderKits){
        let idMapping = {};

        kits.forEach((k,i) => idMapping[k.id] = i);
        orderKits.forEach(kit => {
          kits[idMapping[kit.id]] = kit;
        });
      }

      _.dbProduct.select("`cycleID` = ?", [cycleID], products => {
        _.kits = [];
        kits.forEach(kit => {
          _.kits[_kits.length] = new HTMLKitProductForm(_.selector + " " + _.mapper.kits, kit, products, maxWeight, maxVolume, {
            addOrUpdateProductEvent: kit => {
              _.summary.text = _.kits.map(kit => kit.pcPrice).reduce((a,b) => a + b , 0);
            },
            deleteProductInFormEvent: kit => {
              _.summary.text = _.kits.map(kit => kit.pcPrice).reduce((a,b) => a + b , 0);
            }
          });
          _.kits.forEach(kitForm => kitForm.createKitForm());
        });
      });
    });
  }

  get customer(){
    //convert alert window fields to customer objects
  }

  get order(){
    //convert alert window fields to order objects
  }

  set customer(customer){
    //convert customer fields to alert win fields
  }

  set order(order){
    //convert order fields to alert win fields

    // - code - fill up fields in alert win from @order

    _.loadKitsOnCycleSelect(order.id, order.kits.filter(kit => kit.count > 0));
  }
}
