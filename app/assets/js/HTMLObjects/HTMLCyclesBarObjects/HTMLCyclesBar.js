class HTMLCyclesBar extends HTMLObject{
  constructor(selector, fields, callbacks){
    /*
    NOT CORRECT OLD VARIANT
    selectors = {
      talbes: {
        order,
        kit,
        product
      },
      profiles: {
        kit,
        product
      },
      alertWins: {
        order
      }
    }
    NEW VARIANT:
    callbacks = {
      selectCycle: [funk(cycleID)],
      deleteCycle: [],
      cleanCycle: []
    }
    */

    super(selector);

    this.fields = fields;
    this.selectedCycle = NaN; //index of selected Cycle
    this.callbacks = callbacks;
    this.dbCycle = new CycleTableSQL();
  }

  activate(){
    let _ = this;

    this.html.querySelector(_.fields.newCycleAdd).addEventListener("click", e => _.createCycle(e));

    this.dbCycle.select("1=1", [], cycles => {
      _.cycles = cycles;

      //add cycles to the bar and add event listeners to the cycles
      _.cycles.forEach(cycle => {
        _.html.querySelector("div.cycles").insertAdjacentHTML("afterbegin", `<label for="cycle-${cycle.id}">${cycle.name}</label>`);
        _.html.querySelector("div.cycles label[for='cycle-" + cycle.id + "']").addEventListener("click", e => _.selectCycle.call(_, e));
      });

    });
  }

  stopScroll(e){
    // - code - stop scrolling
  }

  scrollLeft(e){
    // - code - scroll bar to the left side
  }

  scrollRight(e){
    // - code - scroll bar to the right side
  }

  selectCycle(e){
    let _ = this;
    let id = parseInt(e.target.getAttribute("for").split("-")[1]); //get id of selected cycle

    this.selectedCycle = id;
    this.callbacks.selectCycle.forEach(f => f(id));

  }

  deleteCycle(){
    this.callbacks.cleanCycle.forEach(f => f());
    if(isNaN(this.selectedCycle)) return;
    let cid = this.selectedCycle.valueOf();

    this.html.querySelector("label[for='cycle-"+cid+"']").outerHTML = "";
    this.dbCycle.del([cid]);
    this.callbacks.deleteCycle.forEach(f => f(cid));
    this.selectedCycle = NaN;
  }

  createCycle(e){
    this.callbacks.cleanCycle.forEach(f => f());

    let _ = this;
    let cycleName = this.html.querySelector(_.fields.newCycleInput).value.valueOf(); //get from html name of cycle
    if(cycleName == "")return;
    else this.html.querySelector(_.fields.newCycleInput).value = "";console.log(cycleName,this.html.querySelector(_.fields.newCycleInput));
    // save and add cycle element to the html
    this.dbCycle.save([new CycleModel({name: cycleName})], cycles => {
      _.selectedCycle = cycles[0].id;
      _.html.querySelector(_.fields.cycles).insertAdjacentHTML("afterbegin", `<label for="cycle-${cycles[0].id}">${cycles[0].name}</label>`);
      _.html.querySelector(_.fields.cycles + " label[for='cycle-" + cycles[0].id + "']").addEventListener("click", e => _.selectCycle(e));
    });
  }
}
