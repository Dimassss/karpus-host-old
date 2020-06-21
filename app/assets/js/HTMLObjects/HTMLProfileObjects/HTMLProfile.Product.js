class HTMLProfileProduct extends HTMLProfile{
  constructor(selector, fields, onchange, page = "cycles"){
    /*
    IS NO CORRECT:
    fields = {fieldName: relativeSelector}
    NEW VARIANT:
    fields = {
      fieldName: [HTMLObject, HTMLObject.handler(data)]
    }

    onchage(ProductModel)
    */

    super(selector, fields);

    this.page = page;
    this.db = new ProductTableSQL();
    this.onchange = onchange;
    this.selector = selector;

    this.cycleID = NaN;
  }

  activate(){
    let _ = this;

    _.profile = {
      name: new HTMLInput(
          _.selector + " " + _.fields.name,
          "",
          str => str,
          val => val,
          val => {
            _.product.name = val;
            _.onChange();
          }
        ),
      unit: new HTMLList(_.selector + " " + _.fields.unit,
          false,
          {
            kg: "Kilogram",
            p: "Piece",
            l: "Liter",
            g: "Gramm",
            c: "Count"
          }, "p", [selected => {
            _.product.unit = selected;
            _.onChange();
          }]),
      price: new HTMLTableInput(_.selector + " " + _.fields.price,
          {"p-wh": "input[data-type='p-wh']", "p-sh": "input[data-type='p-sh']", "p-rst": "input[data-type='p-rst']", "p-kt": "input[data-type='p-kt']"},
          {"p-wh": 0, "p-sh": 0, "p-rst": 0, "p-kt": 0},
          strArr => strArr,
          valArr => valArr,
          valArr => {
            _.product.price = valArr;
            _.onChange();
          }
        ),
      dimensions: new HTMLInput(
            _.selector + " " + _.fields.dimensions,
            [0,0,0],
            str => str.split(" ").map(v => parseFloat(v)),
            val => val.join(" "),
            val => {
              _.product.dimensions = val;
              _.onChange();
            }
          ),
      weight: new HTMLInput(
          _.selector + " " + _.fields.weight,
          "",
          str => parseFloat(str),
          val => val,
          val => {
            _.product.weight = val;
            _.onChange();
          }
        ),
      description: new HTMLTextfield(_.selector + " " + _.fields.description, "", txt => {
        _.product.description = txt;
        _.onChange();
      })
    };

    if(this.page == "cycles") _.profile.count = new HTMLTableInput(_.selector + " " + _.fields.count,
                {'c-st': "input[data-type='c-st']", 'c-wh': "input[data-type='c-wh']", 'c-sh': "input[data-type='c-sh']", 'c-kt': "input[data-type='c-kt']", 'c-or': "input[data-type='c-or']", "c-lft": "input[data-type='c-lft']"},
                {'c-st':0, 'c-wh': 0, 'c-sh': 0, 'c-kt': 0, 'c-or': 0, 'c-lft': 0},
                strArr => {
                  if(!strArr["c-st"]) strArr["c-st"] = 0;

                  strArr["c-kt"] = strArr["c-st"] - strArr["c-wh"] - strArr["c-sh"];
                  strArr["c-kt"] = strArr["c-kt"]?strArr["c-kt"]:0;
                  strArr["c-lft"] = strArr["c-kt"] - strArr["c-or"];
                  strArr["c-lft"] = strArr["c-lft"]?strArr["c-lft"]:0;

                  return strArr;
                },
                valArr => {
                  if(!valArr["c-st"]) valArr["c-st"] = 0;

                  valArr["c-kt"] = valArr["c-st"] - valArr["c-wh"] - valArr["c-sh"];
                  valArr["c-kt"] = valArr["c-kt"]?valArr["c-kt"]:0;
                  valArr["c-lft"] = valArr["c-kt"] - valArr["c-or"];
                  valArr["c-lft"] = valArr["c-lft"]?valArr["c-lft"]:0;

                  return valArr;
                },
                valArr => {
                  _.product.count = valArr;
                  _.onChange();
                }
              );

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k].activate) _.profile[k].activate();
    });
  }

  open(id){
    let _ = this;
    this.clean();

    if(id == undefined) return;

    this.db.load([id], products => {
      if(!products[0]) return;
      _.product = products[0];
      if(this.page == "products"){
        // - code - set up all fields in the profile
        _.setProduct(_.product);
      }else if(this.page == "cycles" && !isNaN(this.cycleID)){
        (new CycleTableSQL).load([this.cycleID], cycles => {
          if(!cycles[0]) return;
          (new DBAccess()).getUsedOrderCountOfProducts(cycles[0].id, counts => {
            let changes = cycles[0].products[id]?cycles[0].products[id]:{};
            if(!changes.count) changes.count = {"c-st":0,"c-wh":0,"c-sh":0,"c-kt":0,"c-or":0,"c-lft":0};
            _.product = {..._.product, ...changes}
            _.product.__proto__ = ProductModel.prototype;
            _.product.count["c-or"] = counts[_.product.id]?counts[_.product.id]:0;
            _.setProduct(_.product);
          });
        });
      }
    });
  }

  clean(){
    // - code - clean all the fields in profile
    this.product = new ProductModel({
      name: "",
      unit: "kg",
      price: {"p-wh":0,"p-sh":0,"p-rst":0,"p-kt":0},
      count: {"c-st":0,"c-wh":0,"c-sh":0,"c-kt":0,"c-or":0,"c-lft":0},
      dimensions: [0,0,0],
      weight: 0,
      description: ""
    });

    this.setProduct(this.product);
  }

  onChange(){
    let _ = this;
    if(this.page == "products") _.db.save([_.product], products => {
      if(!products[0]) return;
       _.product.id = products[0].id;
       _.onchange(_.product);
    });
    else if(this.page == "cycles" && !isNaN(this.cycleID)){
      (new CycleTableSQL).load([_.cycleID], cycles => {
        if(!cycles[0]) return;
        let cycle = cycles[0];
        
        _.db.load([_.product.id], products => {
          if(!products[0]) return;
          let pr = products[0];
          let changed = Object.fromEntries(
                          Object.entries(_.product)
                                .filter(f => products[0][f[0]] != f[1])
                        );
          if(changed) cycle.products[_.product.id] = changed;
          else delete cycle.products[_.product.id];

          (new CycleTableSQL).save([cycle], () => {
            _.onchange(_.product);
          });
        });
      })
    }

  }

  setProduct(product){
    /*
    name: HTMLInput
    unit: HTMLList
    price: HTMLTableInput
    count: HTMLTableInput
    dimensions: HTMLInput
    weight: HTMLInput
    description: HTMLTextfield
    */
    let _ = this;
    _.profile.name.value = product.name;
    _.profile.unit.selected = product.unit;
    _.profile.price.val = product.price;
    if(this.page == "cycles") _.profile.count.val = product.count;
    _.profile.dimensions.value = product.dimensions;
    _.profile.weight.value = product.weight;
    _.profile.description.value = product.description;
  }
}
