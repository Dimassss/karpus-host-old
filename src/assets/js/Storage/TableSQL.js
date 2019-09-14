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

    websql.process(`CREATE TABLE IF NOT EXISTS ${table}(${(function(){
      var columns = ""
      for(var c in v){
        columns += v[c][2] + ",";
      }
      return columns;
    })()}) PRIMARY KEY (\`${k}\`))`);

  }

  l(keys){
    var records = [];
    for(var i = 0; i< keys.length; i++) if(!k[1]){
      websql.process({
        "sql": `SELECT * FROM ${table} WHERE ${k[0]} in (${(function(){
          var r = "";
          for(var j = 0; j < keys.length; j++) r += "?,";
          return r.slice(0, -1);
        })()})`,
        "data": keys,
        "success": (tr, r) => {
          for(var i = 0; i < r.rows.length; i++){
            var row = r.rows.item(i);
            for(var col in row){
              records[i][col] = row[col];
            }
          }
        }
      });
    }
    return record;
  }

  save(records){
    var k = this.k, table = this.table, v = this.v;
    var processDATA = [];
    for(var i = 0; i < records.length; i++) if(!records[i][k]) processDATA[processDATA.length] = {
                              "sql": `INSERT INTO ${table} ${(function(){
                                        var cols = "(", vals = "(";
                                        for(var c in v){
                                          cols += c + ",";
                                          vals += "?,";
                                        }
                                        cols = cols.slice(0, -1) + ")", vals = vals.slice(0, -1) + ")";
                                        return `${cols} VALUES ${vals}`;
                                      })()}`,
                              "data": (function(){
                                var r = [];
                                for(var c in v){
                                  r[r.length] = records[i][c];
                                }
                                return r;
                              })(),
                              "success": (tr, r) => {
                                records[i][k] = r.insertedId;
                              }
                            };
      else processDATA[processDATA.length] = {"sql": `UPDATE ${table} SET ${(function(){
                                var vals = "";
                                for(var c in v){
                                  if(c != Object.keys(k)[0]) vals += `${c} = ?,`;
                                }
                                return vals.slice(0, -1);
                              })()} WHERE ${k} = ${records[i][k]}`,
                              "data": (function(){
                                var r = [];
                                for(var c in v){
                                  r[r.length] = records[i][c];
                                }
                                return r;
                              })()
                            };
    websql.process(processDATA);
    return records;
  }

  del(keys){
    var k = this.k, table = this.table, v = this.v;
    for(var i = 0; i < records.length; i++) if(records[i][k]) websql.process({
      "sql": `DELETE FROM ${table} WHERE ${k} = ?`,
      "data": [keys[i]]
    });
  }

  sl(where, data){
    var records = [];
    for(var i = 0; i< keys.length; i++) if(!k[1]){
      websql.process({
        "sql": `SELECT * FROM ${table} WHERE ${where}`,
        "data": data,
        "success": (tr, r) => {
          for(var i = 0; i < r.rows.length; i++){
            var row = r.rows.item(i);
            for(var col in row){
              records[i][col] = row[col];
            }
          }
        }
      });
    }
    return record;
  }
}
