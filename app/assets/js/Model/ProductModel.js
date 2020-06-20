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

  getCellOfRow(t){
    let _ = this;
    let vals;

    switch (t) {
      case 'name':
        return _[t];
        break;
      case 'unit':
        return _[t];
        break;
      case 'price':
        vals = this[t]?this[t]:[0,0,0,0];
        return Object.values(vals).join("</td><td data-rowid='"+_.id+"'>");
        break;
      case 'count':
        vals = this[t]?this[t]:[0,0,0,0,0,0];
        return Object.values(vals).join("</td><td data-rowid='"+_.id+"'>");
        break;
      case 'dimensions':
        return _[t].join(" ")
        break;
      case 'weight':
        return _[t] + " " + _.unit
        break;
      case 'description':
        return _[t];
        break;
      default:
        return JSON.stringify(this[t]);
    }
  }
}
