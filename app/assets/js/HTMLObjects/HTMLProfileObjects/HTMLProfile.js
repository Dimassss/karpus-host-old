class HTMLProfile extends HTMLObject{
  constructor(selector, fields){
    /*
    fields = {fieldName: relativeSelector}
    */

    super(selector);

    this.fields = fields;
  }
}
