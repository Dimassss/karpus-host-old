class HTMLProfileCustomer extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    fields = {fieldName: relativeSelector}
    onchage(CustomerModel)
    */

    super(selector, fields);

    this.db = new CustomerTableSQL();
    this.onchange = onchange;
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
