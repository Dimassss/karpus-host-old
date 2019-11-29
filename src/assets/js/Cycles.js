window.onload = () => setTimeout(run, 10);
function run(){
  var e = new EventHandler();
  var c = new CycleController();
  var trBindRecords = () => e.bind(".cycles-container table#orders tbody tr, .cycles-container table#kits tbody tr, .cycles-container table#products tbody tr", "click", c.selectRecord);
  var trBindOrders = () => e.bind(".cycles-container table#orders tbody tr", "dblclick", c.editOrder);
  var trBindCycles = () => e.bind("label[for^=cycle-]", "click", e => {c.selectCycle(e, undefined, () => {trBindOrders(); trBindRecords();})});

  c.addCyclesToNavBar(undefined, trBindCycles)
  e.bind(".cycles-tab-container .cycles, .cycles-tab-container .controll .dropup-content", "scroll", (e) => {
    let tbl = [q(".cycles-tab-container .controll .dropup-content"), q(".cycles-tab-container .cycles")];
    let dH = tbl[0].scrollHeight - tbl[0].scrollTop;
    let dW = tbl[1].scrollWidth - tbl[1].scrollLeft;
    if(dH < 400 || dW < 400) c.addCyclesToNavBar(e, trBindCycles);
  });
  e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-left", "mousedown", c.scrollNavBarLeft);
  e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-right", "mousedown", c.scrollNavBarRight);
  e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-left, .cycles-tab-container .scroll-btns .icon.icon-arrow-right", "mouseup", c.endScroll);
  e.bind(".cycles-tab-container .scroll-btns .icon.icon-arrow-left, .cycles-tab-container .scroll-btns .icon.icon-arrow-right", "mouseleave", c.endScroll);
  e.bind(".cycles-tab-container .create-cycle label[for=create-cycle]:nth-child(3)", "click", c.createCycle);
  e.bind(".cycles-container table#orders tbody tr", "dblclick", c.editOrder);
  e.bind("section.alert-window navbar label:nth-child(2)", "click", c.closeOrder);
  e.bind("section.alert-window navbar label:nth-child(1)", "click", c.saveOrder, [() => {trBindOrders(); trBindRecords();}]);
  e.bind("section.alert-window #js-cycle", "change", c.displayKitsOnCycleSelect);
  e.bind("body > header div.drop a:nth-child(3)", "click", c.deleteCycle);
  e.bind("body > header div.drop a:nth-child(4)", "click", c.deleteRecord);
  e.bind("section.alert-window .form-group .input-group span.btn.input-group-btn", "click", c.addToArray);
  e.bind(".cycles-container .w-products .content .form-input:not(.js-isArray)", "change", c.saveProduct, [trBindRecords]);
  e.bind(".cycles-container .w-kits .content .form-input:not(.js-isArray)", "change", c.saveKit, [trBindRecords]);
  e.bind("body > header div.drop a:nth-child(5)", "click", c.createKit);
  e.bind("body > header div.drop a:nth-child(6)", "click", c.createProduct);

  function q(s){
    return document.querySelector(s);
  }

  function qa(s){
    return document.querySelectorAll(s);
  }
}
