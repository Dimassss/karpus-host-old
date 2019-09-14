window.onload = run;
function run(){
  var e = new EventHandler();
  var c = new CustomerProfileController();

  c.addCustomersToTable();
  c.addOrdersToTable();

  e.bind("table#customers tbody", "scroll", (e) => {
    let tbl = q("table#customers tbody");
    let dH = tbl.scrollHeight - tbl.scrollTop;
    if(dH < 400) c.addCustomersToTable(e);
  });
  e.bind("table#orders tbody", "scroll", (e) => {
    let tbl = q("table#orders tbody");
    let dH = tbl.scrollHeight - tbl.scrollTop;
    if(dH < 400) c.addOrdersToTable(e);
  });
  e.bind("table#customers tbody tr", "click", c.selectRecord, ["customers"]);
  e.bind("table#orders tbody tr", "dblclick", c.selectRecord, ["orders"]);
  e.bind("body > header div.drop a:nth-child(1)", "click", c.createCustomer);
  e.bind("body > header div.drop a:nth-child(2)", "click", c.deleteCustomer);
  e.bind("body > header div.drop a:nth-child(3)", "click", c.deleteOrder);
  e.bind("section.alert-window navbar label:nth-child(1)", "click", c.saveOrder);
  e.bind("section.alert-window #js-cycle", "change", c.displayKitsOnCycleSelect);
  e.bind("input[name=js-customer-nav-table-search]", "click", c.searchCustomers);
  e.bind("input[name=js-cutomer-order-table-search]", "click", c.seachOrders);
  e.bind('label[for="open-alert-window"][name=create_order]', "click", c.createOrder);
  e.bind('.windows .window form-input:not(.js-isArray)', "click", c.saveCustomer);
  e.bind('.windows .window .form-group .input-group span.btn.input-group-btn', "click", e => {c.addToArray(e); c.saveCustomer(e)});
  e.bind('section.alert-window .form-group .input-group span.btn.input-group-btn', "click", c.addToArray);

  function q(s){
    return document.querySelector(s);
  }
}
