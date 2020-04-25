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

    switch (t) {
      case 'name':
        return _[t];
        break;
      case 'unit':
        return _[t];
        break;
      case 'price':
        return Object.values(this[t]).join("</td><td data-rowid='"+_.id+"'>");
        break;
      case 'count':
        return Object.values(this[t]).join("</td><td data-rowid='"+_.id+"'>");
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
