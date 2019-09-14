/**
@class CustomerModel
@params
  @param {Object} data => all fields to set in current object

@constructor {id: 0, fullName:"", telephones: [], adresses: [], email: "", notes: "", preferences: "", socialMedias: [], activity: ""}


*/
class CustomerModel extends Model{
  constructor(data){
    super(data);
  }
}
