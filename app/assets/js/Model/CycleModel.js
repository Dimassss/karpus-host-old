/**
@class CycleModel
@params
  @param {Object} data => all fields to set in current object

@constructor {id: 0, name: "", products: {id:{changed}}}
*/
class CycleModel extends Model{
  constructor(data){
    super(data);
  }

  fromDB(record){
    record.id = parseInt(record.id);
    record.products = JSON.parse(record.products);
    return new CycleModel(record);
  }

  toDB(){
    let rec = {};
    if(this.id) rec.id = this.id;
    rec.name = this.name;
    rec.products = JSON.stringify(this.products);
    return rec;
  }
}
