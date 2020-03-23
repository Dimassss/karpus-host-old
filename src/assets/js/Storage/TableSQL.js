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
    //_this.DBAccess = new DBaccess():

    /*this.DBAccess.createTableIfNotExist(`CREATE TABLE IF NOT EXISTS ${table}(${(function(){
      var columns = ""
      for(var c in v){
        columns += v[c] + ",";
      }
      return columns.slice(0, -1);
    })()})`);*/

    /*console.log(`CREATE TABLE IF NOT EXISTS ${table}(${(function(){
      var columns = ""
      for(var c in v){
        columns += v[c] + ",";
      }
      return columns.slice(0, -1);
    })()})`);*/

  }

  /*l(keys, cb){
    let _this = this;
    var records = [];
    var processDATA = [];
    for(var i = 0; i < keys.length; i++) if(keys[i]){
      processDATA[processDATA.length] = {
        "sql": `SELECT * FROM ${_this.table} WHERE ${_this.k} in (${(function(){
          var r = "";
          for(var j = 0; j < keys.length; j++) r += "?,";
          return r.slice(0, -1);
        })()})`,
        "data": keys,
        "success": (tr, r) => {
          for(var i = 0; i < r.rows.length; i++){
            var row = r.rows.item(i);
            records[i] = {};
            for(var col in row){
              records[i][col] = row[col];
            }
          }
        }
      };
    }

    if(processDATA.length > 0) this.DBAccess.load(processDATA, cb, records);
    else cb(records);
  }*/
  l(keys, cb){
    let _this = this;

    $.post("/crm/load", {keys:keys, table: _this.table, k: _this.k}).done((data) => {
      cb(data);
    });
  }

  /*save(records, cb){
    var k = this.k, table = this.table, v = this.v, forI = [], counter = 0;
    var processDATA = [];

    for(var i = 0; i < records.length; i++){
      if(records[i] && !records[i][k]){
        forI[forI.length] = i - 1;
        processDATA[processDATA.length] = {
                              "sql": `INSERT INTO ${table} ${(function(){
                                        var cols = "(", vals = "(";
                                        for(var c in v){
                                          if(c == k) continue;
                                          cols += c + ",";
                                          vals += "?,";
                                        }
                                        cols = cols.slice(0, -1) + ")", vals = vals.slice(0, -1) + ")";
                                        return `${cols} VALUES ${vals}`;
                                      })()}`,
                              "data": (function(){
                                var r = [];
                                var todb = records[i].toDB();
                                for(var c in v){
                                  if(c == k) continue;
                                  r[r.length] = todb[c];
                                }
                                return r;
                              })(),
                              "success": (tr, r) => {
                                records[forI[counter] + 1][k] = r.insertId;
                                counter++;
                              }
                            };
      }else if(records[i]) processDATA[processDATA.length] = {"sql": `UPDATE ${table} SET ${(function(){
                                var vals = "";
                                for(var c in v){
                                  if(c == k) continue;
                                  if(c != Object.keys(k)[0]) vals += `${c} = ?,`;
                                }
                                return vals.slice(0, -1);
                              })()} WHERE ${k} = ${records[i][k]}`,
                              "data": (function(){
                                var r = [];
                                var todb = records[i].toDB();
                                for(var c in v){
                                  if(c == k) continue;
                                  r[r.length] = todb[c];
                                }
                                return r;
                              })()
                            };
    }

    if(processDATA.length > 0) this.DBAccess.save(processDATA, () => {cb(records)});
    else cb(records);
  }*/
  save(records, cb){
    let _this = this;

    $.post("/crm/save", {records: records, table: _this.table, k: _this.k, v: _this.v}).done((data) => {
      cb(data);
    });
  }

  /*del(keys){
    keys = keys.map(key => parseInt(key));
    var k = this.k, table = this.table;

    for(var i = 0; i < keys.length; i++) if(keys[i]) this.DBAccess.delete({
      "sql": `DELETE FROM ${table} WHERE ${k} = ?`,
      "data": [keys[i]]
    });
  }*/
  del(keys){
    let _this = this;

    $.post("/crm/del", {keys: keys, table: _this.table, k: _this.k})
  }

  /*sl(where, data, cb){
    var records = [], forI = [], counter = 0;
    this.DBAccess.select({
      "sql": `SELECT * FROM ${this.table} WHERE ${where}`,
      "data": data,
      "success": (tr, r) => {
        for(var i = 0; i < r.rows.length; i++){
          var row = r.rows.item(i);
          records[i] = [];
          for(var col in row){
            records[i][col] = row[col];
          }
        }
      }
    }, () => cb(records));
  }*/
  sl(where, data, cb){
    let _this = this;

    $.post("/crm/select", {where: where, table: _this.table, data: data}).done((data) => {
      cb(data);
    });
  }
}
