/**
@class Model, parent
@params
  @param {Object} data => all fields to set in current object

@methods
  @method setFields
  @param {Object} data => all fields to set in current object
  @do set new fields to object
*/
class Model{
  constructor(data){
    for(var k in data) this[k] = data[k];
  }

  setFields(data){
    for(var k in data) this[k] = data[k];
  }

  toDB(){
    let record = {};

    for(var c in this){
      if(typeof this[c] == "function") continue;
      if(typeof this[c] == "number") record[c] = this[c];
      else record[c] = JSON.stringify(this[c]);
    }

    return record;
  }

  fromDB(record){
    for(var c in record){
      if(typeof record[c] == "number") this[c] = record[c];
      else{
        try {
          this[c] = JSON.parse(record[c]);
        } catch (e) {
          this[c] = record[c];
        }
      }
    }

    return this;
  }
}
