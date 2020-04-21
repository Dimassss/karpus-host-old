class HTMLProfileCustomer extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    IS NO CORRECT:
    fields = {fieldName: relativeSelector}
    NEW VARIANT:
    fields = {
      fieldName: [HTMLObject, HTMLObject.handler(data)]
    }

    onchage(CustomerModel)

    */

    super(selector, fields);

    this.db = new CustomerTableSQL();
    this.onchange = onchange;
  }

  activate(){
    let _ = this;

    _.profile = {

    };

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k][0].activate) _.profile[k][0].activate();
    });
  }

  open(id){
    let _ = this;
    this.clean();

    this.db.load([id], customers => {
      if(customers[0]){
        _.customer = customer[0];
        // - code - set up all fields in the profile
        // - code - add event listeners to the fields
        // when field is updated listener must save customer
      }
    });
  }

  clean(){
    // - code - clean all the fields in profile
    this.customer = new CustomerModel();
  }

  onChange(){
    let _ = this;
    _.db.save([_.customer], customer => {
      if(!customer) return;
       _.customer.id = customer.id;
       _.onchange(_.customer);
    });
  }
}
