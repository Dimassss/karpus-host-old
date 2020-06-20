/**
@class TableSQL, parent
@params
  @param {String} k => columnName of primaryKey. Example: k = "id"
  @param {String} table => table name of current object in db. Example: table = "customers"
  @param {Object} v => HashMap of column names in object and sql string to create this column. Example: v = {name: "	`name` VARCHAR(80) NOT NULL"}
                  v = {columnName: sqlString}
@methods
  @method l
    @param {Array} keys => array of primary keys in object
    @do delete current object from db
    @return {Array<Object>} => array of object from db
  @method save
    @param {Array<Object>} records => array of objects to record in db, where name of variables in objects are equal to column names in db
    @do update current object to db by its primary key or create new in db
    @return records => if there was new record it set primary key to record. After all is return in new array of object, which were passed to method
  @method del
    @param {Array} keys => array of primary keys in object
    @do delete current object from db
  @method sl
    @param {String} where => where sql query. Example where = "id = 8, name=`Vasa`"
    @param {Array} data => array of values to replace "?" in @where string
    @return {Array<Object>} => return selected objects from db

*/
class TableSQL{
  constructor(k, table, v){
    var _this = this;
    _this.k = k;
    _this.table = table;
    _this.v = v;

  }

  l(keys, cb){
    let _this = this;

    $.post("/crm/load", {keys:keys, table: _this.table, k: _this.k}).done((data) => {
      cb(JSON.parse(data));
    });
  }

  save(records, cb){
    let _this = this;

    $.post("/crm/save", {records: records.map(rec => rec.toDB()), table: _this.table, k: _this.k, v: _this.v}).done((data) => {
      if(cb) cb(Array.isArray(JSON.parse(data))
            ?JSON.parse(data).map(rec => (new Model).fromDB(rec))
            :JSON.parse(data));
    });
  }
  
  del(keys){
    let _this = this;

    $.post("/crm/del", {keys: keys, table: _this.table, k: _this.k})
  }
  
  sl(where, cb){
    /**
     * @where = {
         sqlMain: string,
          sqlData: array,
          count: (int),
          order: INC/DEC,
          haveIDs: Array(),
          searchingStr: String,
          searchCols: {colName: dataType},
          getCols: arrayOfColsToGet / "*",
          otherTables:{
            tableName: {
              searchCols: {colName: dataType},
              getCols: arrayOfColsToGet / "*"
            }
          }
       }
     */
    let _this = this;

    $.post("/crm/select", {where: where, currentTableName: _this.table}).done((data) => {
      cb(JSON.parse(data));
    });
  }
}
