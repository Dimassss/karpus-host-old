/**
@class ProductModel
@params
  @param {Object} data => all fields to set in current object

@constructor {id, cycleID, name, unit, price:{kit, wholesale, shop, restaurant}, count, dimensions, weight, description}
*/
class ProductModel extends Model{
  constructor(data){
    super(data);
  }
}
