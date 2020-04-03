/**
@class KitModel
@params
  @param {Object} data => all fields to set in current object

@constructor {id, cycleID, name, count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}
*/
class KitModel extends Model{
  constructor(data){
    super(data);
  }
}
