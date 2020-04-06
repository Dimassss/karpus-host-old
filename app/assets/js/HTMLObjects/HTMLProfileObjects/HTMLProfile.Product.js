class HTMLProfileProduct extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    fields = {fieldName: relativeSelector}
    onchage(ProductModel)
    */

    super(selector, fields);

    this.db = new ProductTableSQL();
    this.onchange = onchange;
  }

  open(id){
    let _ = this;
    this.clean();

    this.db.load([id], products => {
      if(products[0]){
        _.product = product[0];
        // - code - set up all fields in the profile
        // - code - add event listeners to the fields
        // when field is updated listener must save product
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
