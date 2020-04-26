class HTMLProfileProduct extends HTMLProfile{
  constructor(selector, fields, onchange){
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

    this.db = new ProductTableSQL();
    this.onchange = onchange;
    this.selector = selector;
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
            g: "Gramm"
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
      count: new HTMLTableInput(_.selector + " " + _.fields.count,
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

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k].activate) _.profile[k].activate();
    });
  }

  open(id){
    let _ = this;
    this.clean();

    if(id !== undefined) this.db.load([id], products => {
      if(products[0]){
        _.product = products[0];
        // - code - set up all fields in the profile
        _.setProduct(products[0]);
      }
    });
    else{
      _.clean();
    }
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
    _.db.save([_.product], products => {
      if(!products[0]) return;
       _.product.id = products[0].id;
       _.onchange(_.product);
    });
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
    _.profile.count.val = product.count;
    _.profile.dimensions.value = product.dimensions;
    _.profile.weight.value = product.weight;
    _.profile.description.value = product.description;
  }
}
