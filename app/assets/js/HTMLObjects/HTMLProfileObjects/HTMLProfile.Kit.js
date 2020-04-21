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
      name: [
        new HTMLInput(
            _.selector + " " + _.fields.name,
            "",
            str => str,
            val => val,
            val => {
              _.kit.name = val;
              _.onChange();
            }
          ),
          val => {
          this.value = val?val:"";
        }],
      pcPrice: [new HTMLText(_.selector + " " + _.fields.pcPrice, ""), txt => {this.text = txt;}],
      price: [new HTMLInput(
          _.selector + " " + _.fields.name,
          "",
          str => parseFloat(str),
          val => val,
          val => {
            _.kit.price = val;
            _.profile.pcPrice[1].call(_.profile.pcPrice[0], val);
            _.onChange();
          }
        ),
        val => {
        this.value = val?val:0;
      }],
      type: [new HTMLInput(
          _.selector + " " + _.fields.type,
          "",
          str => str,
          val => val,
          val => {
            _.kit.type = val;
            _.onChange();
          }
        ),
        val => {
        this.value = val?val:"";
      }],
      size: [new HTMLInput(
          _.selector + " " + _.fields.size,
          "",
          str => str,
          val => val,
          val => {
            _.kit.size = val;
            _.onChange();
          }
        ),
        val => {
        this.value = val?val:"";
      }],
      dimensions: [
        new HTMLInput(
            _.selector + " " + _.fields.dimensions,
            [0,0,0],
            str => str.split(" ").map(v => parseFloat(v)),
            val => val.join(" "),
            val => {
              _.kit.dimensions = val;
              _.onChange();
            }
          ),
          val => {
          this.value = val?val:[0, 0, 0];
        }],
      pcWeight: [new HTMLText(_.selector + " " + _.fields.pcWeight, ""), txt => {this.text = txt;}],
      weight: [new HTMLInput(
          _.selector + " " + _.fields.weight,
          "",
          str => parseFloat(str),
          val => val,
          val => {
            _.kit.weight = val;
            _.profile.pcWeight[1].call(_.profile.pcWeight[0], val);
            _.onChange();
          }
        ),
        val => {
        this.value = val?val:0;
      }],
      desription: [new HTMLTextfield(_.selector + " " + _.fields.description, "", txt => {_.kit.description = txt;return txt}), val => {this.value = val;return val}],
      products: [new HTMLKitProductForm(_.selector + " " + _.fields.kits, {
        updateFormEvent: kit => {
          Object.keys(kit).forEach(k => _.kit[k] = kit[k]);
          _.onChange();
        }
      }, false), d => {
        //d = [kit, products]
        this.fillKitForm(d[0], d[1]);
      }]
    };

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k][0].activate) _.profile[k][0].activate();
    });
  }

  open(id){
    let _ = this;
    let f = (kit, products) => {
      _.kit = kit;
      // - code - set up all fields in the profile
      Object.keys(_.profile).forEach(fieldName => {
        if(fieldName == "products") _.profile[fieldName][1].call(_.profile[fieldName][0], [_.kit, products]);
        else _.profile[fieldName][1].call(_.profile[fieldName][0], _.kit[fieldName]);
        if(_.profile[fieldName][0].activate) _.profile[fieldName][0].activate();
      });
    };

    this.clean();

    if(!id) f(new KitModel(), {});
    else this.db.load([id], kits => {
      if(kits){
        _.id = id;
        (new ProductTableSQL()).select("`cycleID` = ?", [kits[0].cycleID], products => {
          f(kits[0], Object.fromEntries(products.map(pr => [pr.id, pr])));
        });
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
