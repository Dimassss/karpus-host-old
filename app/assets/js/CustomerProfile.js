window.onload = () => setTimeout(run, 10);
function run(){
  var e = new EventHandler();
  var c = new CustomerProfileController();
  var trBindOrders = () => {
    e.bind("table#customer_orders tbody tr", "dblclick", c.selectRecord, ["orders"]);
    e.bind("table#customer_orders tbody tr", "click", c.selectRecord, ["customer_orders"]);
  };
  var trBindCustomers = () => e.bind("table#customers tbody tr", "click", c.selectRecord, ["customers", trBindOrders]);

  c.addCustomersToTable(undefined, trBindCustomers);
  c.addOrdersToTable(undefined, trBindOrders);

  e.bind("table#customers tbody", "scroll", (e) => {
    let tbl = q("table#customers tbody");
    let dH = tbl.scrollHeight - tbl.scrollTop;
    if(dH < 400) c.addCustomersToTable(e, trBindCustomers);
  });
  e.bind("table#orders tbody", "scroll", (e) => {
    let tbl = q("table#orders tbody");
    let dH = tbl.scrollHeight - tbl.scrollTop;
    if(dH < 400) c.addOrdersToTable(e, trBindOrders);
  });
  trBindCustomers();
  e.bind("body > header div.drop a:nth-child(1)", "click", c.createCustomer);
  e.bind("body > header div.drop a:nth-child(2)", "click", c.deleteCustomer);
  e.bind("body > header div.drop a:nth-child(3)", "click", c.deleteOrder);
  e.bind("section.alert-window navbar label:nth-child(1)", "click", c.saveOrder, [trBindOrders, trBindCustomers]);
  e.bind("section.alert-window #js-cycle", "change", c.displayKitsOnCycleSelect);
  e.bind("input[name=js-customer-nav-table-search]", "change", e => {c.searchCustomers(e, trBindCustomers)});
  e.bind("input[name=js-cutomer-order-table-search]", "change", e => {c.seachOrders(e, trBindOrders)});
  e.bind('label[for="open-alert-window"][name=create_order]', "click", c.createOrder);
  e.bind('.windows .window .form-input:not(.js-isArray)', "change", e => c.saveCustomer(e, trBindCustomers));
  e.bind('.windows .window .form-group .input-group span.btn.input-group-btn', "click", e => {c.addToArray(e); c.saveCustomer(e, trBindCustomers)});
  e.bind('section.alert-window .form-group .input-group span.btn.input-group-btn', "click", c.addToArray);

  e.watch("body > main section.tabs-container > div.windows > div:nth-child(2)", {childList: true, attributes:false, subtree:true, characterData:false, characterDataOldValue: false}, data => {
    data = data[0];
    if(data.addedNodes.length == 0 && data.removedNodes[0] && data.removedNodes[0].className == "chip "){
      c.saveCustomer(null, trBindCustomers);
    }
  });

  e.watch("section.alert-window div.kits", {childList: true, attributes:true, subtree:true, characterData:true, characterDataOldValue: false}, data => {
    if(data.filter(d => !(d.type == "attributes" && d.attributeName == "class")).length > 0){
      e.bind("section.alert-window div.kits .kit input, section.alert-window div.kits .kit select", "change", c.updateOrderForm);
    }
  });

  function q(s){
    return document.querySelector(s);
  }

  //string to delete:
  c.fillDatabase();
}
