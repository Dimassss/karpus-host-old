class HTMLProfileKit extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    fields = {fieldName: relativeSelector}
    onchage(KitModel)
    */

    super(selector, fields);

    this.db = new KitTableSQL();
    this.onchange = onchange;
  }

  open(id){
    let _ = this;
    this.clean();

    this.db.load([id], kits => {
      if(kits[0]){
        _.kit = kit[0];
        // - code - set up all fields in the profile
        // - code - add event listeners to the fields
        // when field is updated listener must save kit
      }
    });
  }

  clean(){
    // - code - clean all the fields in profile
    this.kit = new KitModel();
  }

  onChange(){
    let _ = this;
    _.db.save([_.kit], kit => {
      if(!kit) return;
       _.kit.id = kit.id;
       _.onchange(_.kit);
    });
  }
}
