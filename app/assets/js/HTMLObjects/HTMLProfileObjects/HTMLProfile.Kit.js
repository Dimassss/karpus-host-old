class HTMLProfileKit extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    IS NO CORRECT:
    fields = {fieldName: relativeSelector}
    NEW VARIANT:
    fields = {
      fieldName: [HTMLObject, HTMLObject.handler(data)]
    }

    onchage(KitModel)
    */

    super(selector, fields);

    this.db = new KitTableSQL();
    this.onchange = onchange;
    this.selector = selector;
  }

  activate(){
    let _ = this;

    _.profile = {
      name: new HTMLInput(
              _.selector + " form " + _.fields.name,
              "",
              str => str,
              val => val,
              val => {
                _.kit.name = val;
                _.onChange();
              }
            ),
      pcPrice: new HTMLText(_.selector + " form " + _.fields.pcPrice, ""),
      price: new HTMLInput(
              _.selector + " form " + _.fields.price,
              "",
              str => parseFloat(str),
              val => val,
              val => {
                _.kit.price = val;
                _.profile.pcPrice.text = val;
                _.onChange();
              }
            ),
      type: new HTMLInput(
              _.selector + " form " + _.fields.type,
              "",
              str => str,
              val => val,
              val => {
                _.kit.type = val;
                _.onChange();
              }
            ),
      size: new HTMLInput(
              _.selector + " form " + _.fields.size,
              "",
              str => str,
              val => val,
              val => {
                _.kit.size = val;
                _.onChange();
              }
            ),
      dimensions: new HTMLInput(
              _.selector + " form " + _.fields.dimensions,
              [0,0,0],
              str => str.split(" ").map(v => parseFloat(v)),
              val => val.join(" "),
              val => {
                _.kit.dimensions = val;
                _.onChange();
              }
            ),
      pcWeight: new HTMLText(_.selector + " form " + _.fields.pcWeight, ""),
      weight: new HTMLInput(
          _.selector + " form " + _.fields.weight,
          "",
          str => parseFloat(str),
          val => val,
          val => {
            _.kit.weight = val;
            _.onChange();
          }
        ),
      description: new HTMLTextfield(_.selector + " form " + _.fields.description, "", txt => {_.kit.description = txt;return txt}),
      products: new HTMLKitProductForm(_.selector + " " + _.fields.products, {
        updateFormEvent: () => {
          _.kit.products = _.profile.products.kit.products;
          _.kit.pcWeight = _.profile.products.kit.pcWeight;
          _.kit.pcPrice = _.profile.products.kit.pcPrice;
          _.profile.pcWeight.text = _.kit.pcWeight.toFixed(2) + " kg";
          _.profile.pcPrice.text = _. kit.pcPrice.toFixed(2) + " uah";
          _.onChange();
        }
      })
    };

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k].activate) _.profile[k].activate();
    });
  }

  open(id){
    let _ = this;
    let f = (kit, products) => {
      _.kit = kit;
      // - code - set up all fields in the profile
      _.setKitProfile(kit, products);
    };

    this.clean();

    if(!id){
      (new ProductTableSQL()).select("`cycleID` = ?", [_.cycleID], products => {
        f(_.kit, products);
      });
    } else this.db.load([id], kits => {
        if(kits){
          _.id = id;
          (new ProductTableSQL()).select("`cycleID` = ?", [kits[0].cycleID], products => {
            f(kits[0], products);
          });
        }
      });
  }

  clean(){
    // - code - clean all the fields in profile
    let _ = this;
    this.kit = new KitModel({
      name: "",
      price: 0,
      type: "",
      size: "",
      dimensions: [0,0,0],
      weight: 0,
      description: "",
      products: {},
      cycleID: _.cycleID
    });
  }

  onChange(){
    let _ = this;
    _.db.save([_.kit], kits => {
      if(!kits[0]) return;
       _.kit.id = kits[0].id;
       _.onchange(_.kit);
    });
  }

  setKitProfile(kit, products){
    /*
    name: "HTMLInput"
    pcPrice: "HTMLText"
    price: "HTMLInput"
    type: "HTMLInput"
    size: "HTMLInput"
    dimensions: "HTMLInput"
    pcWeight: "HTMLText"
    weight: "HTMLInput"
    desription: "HTMLTextfield"
    products: "HTMLKitProductForm"
    */
    let _ = this;

    _.profile.name.value = kit.name;
    _.profile.price.value = kit.price;
    _.profile.type.value = kit.type;
    _.profile.size.value = kit.size;
    _.profile.dimensions.value = kit.dimensions;
    _.profile.weight.value = kit.weight;
    _.profile.description.value = kit.description;
    _.profile.products.fillKitForm(kit, products);
    _.profile.pcPrice.text = _.profile.products.kit.pcPrice.toFixed(2) + " uah";
    _.profile.pcWeight.text = _.profile.products.kit.pcWeight.toFixed(2) + " kg";
  }
}
