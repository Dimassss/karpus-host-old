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
}
