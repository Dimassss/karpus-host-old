var e = new EventHandler();
var c = new CycleController();

c.addOrdersToTable();

e.bind("label[for^=cycle-]", "click", c.selectCycle);
e.bind(".cycles-tab-container .cycle, .cycles-tab-container .controll .dropup-content", "scroll", (e) => {
  let tbl = q("table#orders tbody");
  let dH = tbl.scrollHeight - tbl.scrollTop;
  let dW = tbl.scrollWidth - tbl.scrollLeft;
  if(dH < 400 || dW < 400) c.addOrdersToTable(e);
});
e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-left", "mousedown", c.scrollNavBarLeft);
e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-right", "mousedown", c.scrollNavBarRight);
e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-left, .cycles-tab-container .scroll-btns .icon.icon-arrow-right", "mouseup", c.endScroll);
e.bind(".cycles-tab-container .create-cycle label.create-cycle", "click", c.createCycle);
e.bind(".cycles-container table#orders tbody tr", "dblclick", c.editOrder);
e.bind("section.alert-window navbar label:nth-child(2)", "click", c.closeOrder);
e.bind("section.alert-window navbar label:nth-child(1)", "click", c.saveOrder);
e.bind("section.alert-window #js-cycle", "change", c.displayKitsOnCycleSelect);
e.bind("body > header div.drop a:nth-child(3)", "click", c.deleteCycle);
e.bind("body > header div.drop a:nth-child(4)", "click", c.deleteRecord);
e.bind(".cycles-container table#orders tbody tr, .cycles-container table#kits tbody tr, .cycles-container table#products tbody tr", "click", c.selectRecord);
e.bind("section.alert-window .form-group .input-group span.btn.input-group-btn", "click", c.addToArray);
e.bind(".cycles-container .content .form-group .input-group span.btn.input-group-btn", "click", e => {c.addToArray(e); c.saveProduct(e);});
e.bind(".cycles-container .content .form-group .input-group span.btn.input-group-btn", "click", e => {c.addToArray(e); c.saveKit(e);});
e.bind(".cycles-container .content form-input:not(.js-isArray)", "change", c.saveProduct);
e.bind(".cycles-container .content form-input:not(.js-isArray)", "change", c.saveKit);
e.bind("body > header div.drop a:nth-child(5)", "click", c.createKit);
e.bind("body > header div.drop a:nth-child(6)", "click", c.createProduct);

function q(s){
  return document.querySelector(s);
}
