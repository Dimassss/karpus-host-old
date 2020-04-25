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

  getCellOfRow(t){
    let _ = this;
    switch (t) {
      case "kits":
        let html = Object.keys(this[t]).map(k =>
              `<span title="${
                Object.values(_[t][k].products)
                      .map(pr => `${pr.name}: ${pr.count}`)
                      .join("\n")
              }">${_[t][k].name}: ${_[t][k].count}</span>`
            ).join("<br>");
        return html;
        break;
      case "telephone":
        return _[t];
        break;
      case "adress":
        return _[t];
        break;
      case "payDates":
        return _[t].filter(o => o != "").map(o => (new Date(o).toLocaleDateString())).join(",<br>");
        break;
      case "pays":
        return _[t].filter(o => o != "").join(", ");
        break;
      case "orderNotes":
        return _[t];
        break;
      case "socialMedia":
        return _[t];
        break;
      case "customerName":
        return _[t];
        break;
      default:
        return JSON.stringify(this[t]);
    }
  }
}
