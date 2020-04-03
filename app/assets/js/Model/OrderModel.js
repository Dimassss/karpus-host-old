/**
@class OrderModel
@params
  @param {Object} data => all fields to set in current object

@constructor {id: 0, cycleID: 0, telephone: "", socialMedia: "", adress: "", orderNotes: "", summary: 0, billed: false, isNotThis: false, payDates: [], pays: [], cycleID: -1, customerID: customerID}

*/
class OrderModel extends Model{
  constructor(data){
    super(data);
  }
}
