/**
@class CustomerProfileController

@methods
  @method addCyclesToNavBar
    @param {Event} e
    @do on scroll in cycles nav bars it add new cycles names to that nav bars
  @method scrollNavBarLeft
    @param {Event} e
    @do scroll nav bar of cycles to left side on click on left side arrow
  @method scrollNavBarRight
    @param {Event} e
    @do scroll nav bar of cycles to right side on click on right side arrow
  @method endScroll
    @param {Event} e
    @do set g.Controller.Cycles.toScroll = false to stop scrolling in .cycles container
  @method createCycle
    @param {Event} e
    @do on click on "tick" save button in cycles-footer to create cycle it take value from field and add it to db and select nav bars
  @method selectCycle
    @param {Event} e
    @do on click on cycle name in cycles nav bar it load cycle's orders, kits and prodcts to the windows
  @method editOrder
    @param {Event} e
    @do on double click on order row it shows alertWindow, where fields are filled out with values of current order
  @method saveOrder
    @param {Event} e
    @do on click on "tick" save button in alertWindow it take all data from alertWindow and save it as order to db and change data in orders nav table if it is needed
  @method deleteRecord
    @param {Event} e
    @do delete selected record from db and from nav table
  @method displayKitsOnCycleSelect
    @param {Event} e
    @do when user select cycle in alertWindow in display all kits from that cycle in kits-container
*/
class CycleController{
  constructor(){
    this.dao = new CyclesDAO();
    this.in = new CyclesInput();
  }

  addCyclesToNavBar(e){
    this.dao.dispalyCycles('TRUE ORDER BY id DESC LIMIT ?, ?', [
            g.Controller.Cycles.cyclesNavBarScrollCounter * g.Controller.Cycles.cyclesNavBarCountToSelect,
            g.Controller.Cycles.cyclesNavBarCountToSelect
          ]);
  }

  scrollNavBarLeft(e){
    g.Controller.Cycles.toScroll = true;
    while(g.Controller.Cycles.toScroll) document.querySelector(".cycles-tab-container .cycles").scrollBy(-2, 0);
  }

  scrollNavBarRight(e){
    g.Controller.Cycles.toScroll = true;
    while(g.Controller.Cycles.toScroll) document.querySelector(".cycles-tab-container .cycles").scrollBy(2, 0);
  }

  endScroll(e){
    g.Controller.Cycles.toScroll = false;
  }

  createCycle(e){
    var cycleName = this.in.takeData("add_c");
    if(cycleName != ""){
      this.dao.createCycle(false?this.in.takeData("C_ID"):-1, cycleName);
    }
    this.dao.dispalyCycles('id = ?', [this.in.takeData("C_ID")]);
    this.selectCycle(e, this.in.takeData("C_ID"));
  }

  selectCycle(e, id){
    id = id?id:e.target.getAttribute("for").split("-")[1];
    this.dao.fillCycleWindows(id);
  }

  editOrder(e){
    this.dao.openOrderCreatingWindow();
    this.dao.fillOrderCreatingWindow(e.target.getAttribute("data-id"));
  }

  closeOrder(e){
    this.dao.closeOrderCreatingWindow();
  }

  saveOrder(e){
    let r = this.dao.getOrderFromPage();
    var order = r[0];
    var customer = r[1];
    this.dao.saveOrder(order);
  }

  displayKitsOnCycleSelect(e){
    this.dao.displayKits(this.in.takeData("AW_c_id"));
  }

  deleteCycle(e){
    let cycleID = this.in.takeData("C_ID");
    this.dao.cleanCycleWindows(cycleID);
    this.deleteCycle(cycleID)
  }

  deleteRecord(e){
    let sl = this.in.takeData("Tbl_Slct");
    let db = ({"orders": new OrderTableSQL(), "products": new ProductTableSQL(), "kits": new KitTableSQL()})[sl[0]];
    db.del([sl[1]]);
  }

  selectRecord(e){
    let sl = this.in.takeData("Tbl_Slct");
    sl[2].classList.remove("selected");
    e.target.classList.add("selected");
    sl = this.in.takeData("Tbl_Slct");
    let fillProfile = ({"orders": undefined, "products": this.dao.fillProductProfile, "kits": this.dao.fillKitProfile})[sl[0]];
    if(fillProfile != undefined) fillProfile(sl[1], this.in.takeData("C_ID"));
  }

  addToArray(e){
    this.dao.addToArray(...({
              "Paid":["AW_P", ["", ""]],
              "Date":["AW_P", ["", ""]]
            })[e.target.parentNode.querySelector("input").getAttribute("placeholder")]);
  }

  saveProduct(e){
    var product = this.dao.takeProductFromPage();
    var db = new ProductTableSQL();
    product = db.save([product])[0];
    this.dao.fillProductsWin([product["id"]]);
  }

  saveKit(e){
    var kit = this.dao.takeKitFromPage();
    var db = new KitTableSQL();
    kit = db.save([kit])[0];
    this.dao.fillKitsWin([kit["id"]]);
  }

  createKit(e){
    Array.from(document.querySelectorAll("table .selected")).forEach(s => s.classList.remove("selected"));
    this.dao.cleanKitProfile(this.in.takeData("C_ID"));
  }

  createProduct(e){
    Array.from(document.querySelectorAll("table .selected")).forEach(s => s.classList.remove("selected"));
    this.dao.cleanProductProfile();
  }

  search(e){
    let table = e.target.parentNode.querySelector("table");
    let str = e.target.value;
    let s = (str=="")?(() => true):(tr => Array.from(tr).fillter(td => td.innerHTML.search(str) > -1).length > 0);
    Array.from(table.querySelector("tr")).forEach(tr => tr.style.display = s(tr)?"none":"table-row");
  }
}
