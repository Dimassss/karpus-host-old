class HTMLArray extends HTMLObject{
  constructor(selector, fields, fieldsConverter){
    //fields = {fieldName: handler}
    //handler convert data from html field to string
    // fieldsConverter is a func which convert data from element to string to paste it in html element of html array

    this.array = [];

    super(selector);
  }

  addNewElement(e){
    //calls when user click on "add" button

    let fields = {};
    // - code - take data from html fields and add them to @fields, fields[fieldName] = this.fields[fieldName](inp.value).valueOf();
    // - code - clean html fields
    // - code - add element to the html array
    // - code - add event listener to a cross of the html element
    this.array[this.array.length] = Object.assign({}, fields);
  }

  removeElement(e){
    //calls when user click on a cross of the html elemnt

    let id;
    // - code - get id of element in array
    // - remove it from html array
    this.array = this.array.slice(0, id-1).concat(this.array.slice(id, this.array.length));
  }

  clean(){
    // - code - remove all the elemnents of html array
    this.array = [];
  }
}
