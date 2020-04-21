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
      name: [
        new HTMLInput(
          _.selector + " " + _.fields.name,
          "",
          str => str,
          val => val,
          val => {
            _.product.name = val;
            _.onChange();
          }
        ),
        val => {
          this.value = val?val:"";
        }],
      unit: [
        new HTMLList(_.selector + " " + _.fields.unit,
          false,
          {
            kg: "Kilogram",
            p: "Piece",
            l: "Liter",
            g: "Gramm"
          }, "p", selected => {
            _.product.unit = selected;
          }),
          selected => {
            this.selected = selected;
          }
      ],
      price: [new HTMLTableInput(_.selector + " " + _.fields.price,
          ["input[data-type='p-wh']", "input[data-type='p-sh']", "input[data-type='p-rst']", "input[data-type='p-kt']"],
          [0, 0, 0, 0],
          strArr => strArr.map(str => parseInt(str)),
          valArr => valArr,
          valArr => {
            _.product.price = valArr;
          }
        ),
        arr => {
          this.val = arr;
        }],
      count: [new HTMLTableInput(_.selector + " " + _.fields.count,
          ["input[data-type='c-st']", "input[data-type='c-wh']", "input[data-type='c-sh']", "input[data-type='c-kt']", "input[data-type='c-or']", "input[data-type='c-lft']"],
          [0, 0, 0, 0, 0, 0],
          strArr => strArr.map(str => parseInt(str)),
          valArr => valArr,
          valArr => {
            if(!valArr[0]) valArr[0] = 0;

            valArr[3] = valArr[0] - valArr[1] - valArr[2];
            valArr[3] = valArr[3]?valArr[3]:0;
            valArr[5] = valArr[3] - valArr[4];
            valArr[5] = valArr[5]?valArr[5]:0;

            _.profile.count.val = valArr;

            _.product.count = valArr;
          }
        ),
        arr => {
          this.val = arr;
        }],
      dimensions: [
        new HTMLInput(
            _.selector + " " + _.fields.dimensions,
            [0,0,0],
            str => str.split(" ").map(v => parseFloat(v)),
            val => val.join(" "),
            val => {
              _.product.dimensions = val;
              _.onChange();
            }
          ),
          val => {
          this.value = val?val:[0, 0, 0];
        }],
      weight: [new HTMLInput(
          _.selector + " " + _.fields.weight,
          "",
          str => parseFloat(str),
          val => val,
          val => {
            _.product.weight = val;
            _.onChange();
          }
        ),
        val => {
        this.value = val?val:0;
        }],
      description: [new HTMLTextfield(_.selector + " " + _.fields.description, "", txt => {_.product.description = txt;}), val => {this.value = val}]
    };

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k][0].activate) _.profile[k][0].activate();
    });
  }

  open(id){
    let _ = this;
    this.clean();

    this.db.load([id], products => {
      if(products[0]){
        _.product = product[0];
        // - code - set up all fields in the profile
        Object.keys(_.profile).forEach(fieldName => {
          _.profile[fieldName][1].call(_.profile[fieldName][0], _.kit[fieldName]);
          if(_.profile[fieldName][0].activate) _.profile[fieldName][0].activate();
        });
      }
    });
  }

  clean(){
    // - code - clean all the fields in profile
    this.product = new ProductModel();
  }

  onChange(){
    let _ = this;
    _.db.save([_.product], product => {
      if(!product) return;
       _.product.id = product.id;
       _.onchange(_.product);
    });
  }
}
