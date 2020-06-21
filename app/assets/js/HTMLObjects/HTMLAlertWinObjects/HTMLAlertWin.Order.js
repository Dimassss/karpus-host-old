class HTMLAlertWinOrder extends HTMLAlertWin{
  constructor(selector, fields, okCB){
    /**
    fields = {
      fieldName: [HTMLObject]
    }

    okCB(customer, order)
    */
    super(selector);

    this.selector = selector;
    this.fields = fields;
    this.okCB = okCB;

    this.dbCustomer = new CustomerTableSQL();
    this.dbOrder = new OrderTableSQL();
    this.dbCycle = new CycleTableSQL();
  }

  activate(){
    let _ = this;

    _.alert = {
      customerName: new HTMLText(_.selector + " " + _.fields.customerName, ""),
      anotherName: new HTMLInput(
                          _.selector + " " + _.fields.anotherName,
                          "",
                          str => str,
                          val => val,
                          val => {
                            _.o.anotherName = val;
                          }
                        ),
      anotherTelephone: new HTMLInput(
                          _.selector + " " + _.fields.anotherTelephone,
                          "",
                          str => str,
                          val => val,
                          val => {
                            _.o.anotherTelephone = val;
                          }
                        ),
      isNotThis: new HTMLInput(
                          _.selector + " " + _.fields.isNotThis,
                          "",
                          str => str,
                          val => val,
                          val => {
                            _.o.isNotThis = val?1:0;
                          }
                        ),
      telephone: new HTMLList(_.selector + " " + _.fields.telephone,
                        true,
                        [], "", [selected => {
                          _.o.telephone = selected;
                        }]),
      socialMedia: new HTMLList(_.selector + " " + _.fields.socialMedia,
                        true,
                        [], "", [selected => {
                          _.o.socialMedia = selected;
                        }]),
      orderNotes: new HTMLTextfield(_.selector + " " + _.fields.orderNotes, "", txt => {_.o.orderNotes = txt;}),
      preferences: new HTMLTextfield(_.selector + " " + _.fields.preferences, "", txt => {_.c.preferences = txt;}),
      addresses: new HTMLList(_.selector + " " + _.fields.addresses,
                        true,
                        [], "", [selected => {
                          _.o.adress = selected;
                        }]),
      summary: new HTMLInput(
                          _.selector + " " + _.fields.summary,
                          "",
                          str => parseFloat(str),
                          val => val,
                          val => {
                            _.o.summary = val;
                          }
                        ),
      sumPCText: new HTMLText(_.selector + " " + _.fields.sumPCText, ""),
      billed: new HTMLInput(
                          _.selector + " " + _.fields.billed,
                          "",
                          str => str,
                          val => val,
                          val => {
                            _.o.billed = val?1:0;
                          }
                        ),
      pays: new HTMLArray(_.selector + " " + _.fields.paysDiv, {
                          pay: new HTMLInput(
                              _.selector + " " + _.fields.pays,
                              "",
                              str => parseFloat(str),
                              val => val,
                              val => {}
                            ),
                          payDates: new HTMLInput(
                              _.selector + " " + _.fields.payDates,
                              (() => {
                                var now = new Date(),
                                    day = ("0" + now.getDate()).slice(-2),
                                    month = ("0" + (now.getMonth() + 1)).slice(-2);
                                return now.getFullYear()+"-"+(month)+"-"+(day);
                              })(),
                              str => new Date(str),
                              val => {
                                var now = new Date(val),
                                    day = ("0" + now.getDate()).slice(-2),
                                    month = ("0" + (now.getMonth() + 1)).slice(-2);
                                return now.getFullYear()+"-"+(month)+"-"+(day);
                              },
                              val => {}
                            )
                          },
                          val => {
                            var now = new Date(val[1]),
                                day = ("0" + now.getDate()).slice(-2),
                                month = ("0" + (now.getMonth() + 1)).slice(-2);
                            return `${val[0]} uah - ${now.getFullYear()+"-"+(month)+"-"+(day)}`;
                          },
                          fields => {
                            return [fields.pay.value, fields.payDates.value];
                          }
                        ),
      cycleID: new HTMLList(_.selector + " " + _.fields.cycleID,
                        false,
                        [], "", [selected => {
                          _.o.cycleID = parseInt(selected);
                          _.alert.kits.loadKits(parseInt(selected));
                        }]),
      kits: new HTMLKitsPanel(
                        _.selector + " " + _.fields.kits, {
                          updateFormEvent: kits => {
                            //kits = {kitID: KitModel}
                            _.o.kits = kits;
                            _.alert.sumPCText.text = Object.values(kits).map(kit => kit.count*(kit.price?kit.price:kit.pcPrice)).reduce((a, b) => a + b, 0) + " uah";
                          }
                        }),
    };


    Object.keys(_.alert).forEach(k => {
      if(_.alert[k].activate) _.alert[k].activate();
    });
  }

  ok(){
    let _ = this;

    _.dbCustomer.save([_.customer], () => {});
    _.dbOrder.save([_.order], orders => {
      let order = orders[0];
      _.okCB(_.customer, order?order:_.order);
      _.setOrder(order);
    });
  }

  fillUp(orderID, customerID){
    //orderID is setted => order is old and user want to update it
    //customerID is setted => order is new and user want to create it
    //At the same time can be setted either orderID or customerID

    if(!(orderID || customerID)){
      console.assert(false, {text: "orderID and customerID are not setted", data: {orderID:orderID, customerID:customerID}});
      return;
    }

    this.orderID = orderID;
    this.o = new OrderModel({
      telephone: "",
      socialMedia: "",
      adress: "",
      orderNotes: "",
      summary: 0,
      billed: 0,
      isNotThis: 0,
      payDates: [],
      pays: [],
      customerID: customerID,
      kits: {}
    });
    let _ = this;

    const preparing = (order, customerID) => {
      //prepare needed objects
      _.dbCustomer.load([customerID], customers => {
        if(!customers[0]) throw Exception;
        _.dbCycle.select({}, cycles => {
          if(!cycles){
            alert("You cant create order because there is no cycles in database");
            return;
          }

          _.alert.cycleID.array = cycles.map(cycle => [cycle.id, cycle.name]);

          _.o = order;
          _.c = customers[0];
          _.setCustomer(customers[0]);
          _.setOrder(order);
        });
      });
    };

    if(orderID) this.dbOrder.load([orderID], orders => preparing(orders[0], orders[0].customerID));
    else preparing(this.o, customerID);
  }

  get customer(){
    //convert alert window fields to customer objects
    let _ = this;

    if(!_.c.telephones.find(tel => tel == _.o.telephone)) _.c.telephones[_.c.telephones.length] = _.o.telephone;
    if(!_.c.adresses.find(adr => adr == _.o.adress)) _.c.adresses[_.c.adresses.length] = _.o.adress;
    if(!_.c.socialMedia.find(med => med == _.o.socialMedia)) _.c.socialMedia[_.c.socialMedia.length] = _.o.socialMedia;

    return new CustomerModel(_.c);
  }

  get order(){
    //convert alert window fields to order objects
    let _ = this;

    _.o.payDates = [];
    _.o.pays = [];

    _.alert.pays.array.forEach(el => {
      _.o.payDates[_.o.payDates.length] = el[1];
      _.o.pays[_.o.pays.length] = el[0];
    });
    _.o.kits = Object.fromEntries(_.alert.kits.kits.filter(kitForm => kitForm.kit.count > 0).map(kitForm => [kitForm.kit.id, kitForm.kit]));

    return new OrderModel({
      id: _.o.id,
      cycleID: _.o.cycleID,
      customerID: _.o.customerID,
      telephone: _.o.telephone,
      socialMedia: _.o.socialMedia,
      adress: _.o.adress,
      orderNotes: _.o.orderNotes,
      summary: _.o.summary,
      billed: _.o.billed,
      isNotThis: _.o.isNotThis,
      payDates: _.o.payDates,
      pays: _.o.pays,
      kits: _.o.kits
    });
  }

  set order(order){
    this.o = order;

    this.setOrder(order);
  }

  set customer(customer){
    this.c = customer;

    this.setCustomer(customer);
  }

  setOrder(order){
    let _ = this;

    //_.alert.anotherName.value = order.anotherName;
    //_.alert.anotherTelephone.value =  order.anotherTelephone;
    _.alert.isNotThis.value = order.isNotThis;
    _.alert.telephone.selected = order.telephone;
    _.alert.socialMedia.selected = order.socialMedia;
    _.alert.orderNotes.value = order.orderNotes;
    _.alert.addresses.selected = order.adress;
    _.alert.summary.value = order.summary;
    _.alert.billed.value = order.billed;
    _.alert.pays.array = order.payDates.map((pd, i) => [order.pays[i], pd]);
    _.alert.cycleID.selected = order.cycleID;

    _.alert.kits.orderID = order.id;

    if(order.cycleID) _.alert.kits.loadKits(order.cycleID, Object.values(order.kits), (kits, products) => {
      var sum = 0;

      kits.filter(kit => kit.count && kit.count > 0).forEach(kit => {
        let price = kit.price
                        ?kit.price
                        :products.filter(pr => kit.products[pr.id])
                            .map(pr =>
                              kit.products[pr.id]
                                  .price[
                                    (kit.products[pr.id].price.selected)
                                    ?(kit.products[pr.id].price.selected)
                                    :("p-kt")
                                  ]
                              *(kit.products[pr.id].count
                                    ?kit.products[pr.id].count
                                    :0
                              )
                            ).reduce((a, b) => a + b, 0);
        sum += price*kit.count;
      });

      _.alert.sumPCText.text = sum + " uah";
    });
    else{
      _.alert.kits.clean();
    }
  }

  setCustomer(customer){
    let _ = this;

    _.alert.customerName.text = customer.fullName;
    _.alert.telephone.array = customer.telephones;
    _.alert.preferences.value = customer.preferences;
    _.alert.addresses.array = customer.adresses;
    _.alert.socialMedia.array = customer.socialMedia;
  }
}
