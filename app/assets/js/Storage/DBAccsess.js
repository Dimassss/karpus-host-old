class DBAccess{
  constructor(){
    if(g["Storage"]["DBAccess"]) return g["Storage"]["DBAccess"];
    return g["Storage"]["DBAccess"] = this;
  }

  /*createTableIfNotExist(sql){
    websql.process(sql);
  }

  load(processDATA, cb, records){
    websql.process(processDATA, cb);

    $.ajax({url:"example.php",
            data: processDATA.})
      .done(function(data) {
        data = JSON.parse(data);
        var sql = data.sql;
        cb(data.response);
        websql.process(sql,
          () => {
            $.ajax("allGood", );
          },
          (error, statement) => {
            console.error("Error: " + error.message + " when processing " + statement);
          });
      })
      .fail(function() {
        websql.process(sql, () => {cb(records)});
      });
  }

  save(processDATA, cb){
    websql.process(processDATA, cb);

    $.ajax( "example.php" )
      .done(function() {
        alert( "success" );
      })
      .fail(function() {
        websql.process(sql);
      })
      .always(function() {
        alert( "complete" );
      });
  }

  delete(processDATA){
    websql.process(processDATA);

    $.ajax( "example.php" )
      .done(function() {
        alert( "success" );
      })
      .fail(function() {
        websql.process(sql);
      })
      .always(function() {
        alert( "complete" );
      });
  }

  select(processDATA){
    websql.process(processDATA);

    $.ajax( "example.php" )
      .done(function() {
        alert( "success" );
      })
      .fail(function() {
        websql.process(sql);
      })
      .always(function() {
        alert( "complete" );
      });
  }*/
  
}
