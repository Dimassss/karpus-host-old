/**
@class KitModel
@param {Number} k => is primary key of record in db. By default this is number so k is number
*/
class KitModel extends Model{
  constructor(k){
    super({id: k}, "KITS", {});
  }
}
