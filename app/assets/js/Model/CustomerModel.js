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

  getCellOfRow(t){
    let _ = this;

    switch (t) {
      case 'fullName':
        return this[t];
        break;
      case 'telephones':
        return this[t].join(", ");
        break;
      default:
          return JSON.stringify(this[t]);
    }
  }
}
