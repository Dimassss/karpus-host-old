class HTMLProfileCustomer extends HTMLProfile{
  constructor(selector, fields, onchange){
    /*
    fields = {fieldName: relativeSelector}
    onchage(CustomerModel)
    */

    super(selector, fields);

    this.db = new CustomerTableSQL();
    this.onchange = onchange;
    this.selector = selector;
    this.fields = fields;
  }

  activate(){
    let _ = this;

    _.profile = {
      fullName: new HTMLInput(
          _.selector + " " + _.fields.fullName,
          "",
          str => str,
          val => val,
          val => {
            _.customer.fullName = val;
            _.onChange();
          }
        ),
      telephones: new HTMLArray(_.selector + " " + _.fields.telephoneDiv, {
                          inp: new HTMLInput(
                              _.selector + " " + _.fields.telephones,
                              "",
                              str => str,
                              val => val,
                              val => {}
                            )
                          },
                          val => val,
                          fields => fields.inp.value,
                          list => {
                            _.customer.telephones = list;
                            _.onChange();
                          }
                        ),
      adresses: new HTMLArray(_.selector + " " + _.fields.adressDiv, {
                          inp: new HTMLInput(
                              _.selector + " " + _.fields.adresses,
                              "",
                              str => str,
                              val => val,
                              val => {}
                            )
                          },
                          val => val,
                          fields => fields.inp.value,
                          list => {
                            _.customer.adresses = list;
                            _.onChange();
                          }
                        ),
      email: new HTMLInput(
          _.selector + " " + _.fields.email,
          "",
          str => str,
          val => val,
          val => {
            _.customer.email = val;
            _.onChange();
          }
        ),
      notes: new HTMLTextfield(_.selector + " " + _.fields.notes, "", txt => {
        _.customer.notes = txt;
        _.onChange();
      }),
      preferences: new HTMLTextfield(_.selector + " " + _.fields.preferences, "", txt => {
        _.customer.preferences = txt;
        _.onChange();
      }),
      socialMedia: new HTMLArray(_.selector + " " + _.fields.socialMediaDiv, {
                          inp: new HTMLInput(
                              _.selector + " " + _.fields.socialMedia,
                              "",
                              str => str,
                              val => val,
                              val => {}
                            )
                          },
                          val => val,
                          fields => fields.inp.value,
                          list => {
                            _.customer.socialMedia = list;
                            _.onChange();
                          }
                        ),
      activity: new HTMLInput(
          _.selector + " " + _.fields.activity,
          "",
          str => str,
          val => val,
          val => {
            _.customer.activity = val;
            _.onChange();
          }
        ),
      createCycle: ".windows .window label[name='create_order']"
    };

    Object.keys(_.profile).forEach(k => {
      if(_.profile[k].activate) _.profile[k].activate();
    });
  }

  open(id){
    let _ = this;
    this.clean();

    if(id !== undefined) this.db.load([id], customers => {
      if(customers[0]){
        _.customer.id = customers[0].id;
        _.setCustomer(customers[0]);
      }
    });
  }

  clean(){
    // - code - clean all the fields in profile
    this.customer = new CustomerModel({
      fullName: "",
      telephones: [],
      adresses: [],
      email: "",
      notes: "",
      preferences: "",
      socialMedia: [],
      activity: ""
    });

    this.setCustomer(this.customer);
  }

  onChange(){
    let _ = this;
    _.db.save([_.customer], customers => {
      if(!customers[0]) return;
       _.customer.id = customers[0].id;
       _.onchange(_.customer);
    });
  }

  setCustomer(customer){
    /*
    fullName: HTMLInput
    telephones: HTMLArray
    adresses: HTMLArray
    email: HTMLInput
    notes: HTMLTextfield
    preferences: HTMLTextfield
    socialMedia: HTMLArray
    activity: HTMLInput
    */

    let _ = this;

    _.profile.fullName.value = customer.fullName;
    _.profile.telephones.array = customer.telephones;
    _.profile.adresses.array = customer.adresses;
    _.profile.email.value = customer.email;
    _.profile.notes.value = customer.notes;
    _.profile.preferences.value = customer.preferences;
    _.profile.socialMedia.array = customer.socialMedia;
    _.profile.activity.value = customer.activity;
  }
}
