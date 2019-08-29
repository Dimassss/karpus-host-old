/**
@class Test
@function isEqual {Object, Object} => compare to objects
 * @param value => first object
 * @param other => second object
 * @return {boolean}

@function log {String, String} => display message with css type selected
 * @param msg => massage to display in console
 * @param type => type of message
 * * type := "info" | "primary" | "error1" | "error2" | "header1" | "header2"
*/
class Test{
  constructor(){}

  isEqual(value, other) {
    var _this = this;
    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

    	// Get the object type
    	var itemType = Object.prototype.toString.call(item1);

    	// If an object or array, compare recursively
    	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
    		if (!_this.isEqual(item1, item2)) return false;
    	}

    	// Otherwise, do a simple comparison
    	else {

    		// If the two items are not the same type, return false
    		if (itemType !== Object.prototype.toString.call(item2)) return false;

    		// Else if it's a function, convert to a string and compare
    		// Otherwise, just compare
    		if (itemType === '[object Function]') {
    			if (item1.toString() !== item2.toString()) return false;
    		} else {
    			if (item1 !== item2) return false;
    		}

    	}
    };

    // Compare properties
    if (type === '[object Array]') {
    	for (var i = 0; i < valueLen; i++) {
    		if (compare(value[i], other[i]) === false) return false;
    	}
    } else {
    	for (var key in value) {
    		if (value.hasOwnProperty(key)) {
    			if (compare(value[key], other[key]) === false) return false;
    		}
    	}
    }

    // If nothing failed, return true
    return true;
  }

  log(msg, type){
    if(!type) throw new Error("type variable is not setted");

    var t = ""
    switch(type){
      case "info":
        t = "color: #999;font-size: 14px;";
        break;
      case "primary":
        t = "color: ;font-size: px;";
        break;
      case "error1":
        t = "color: red;font-size: 14px;";
        break;
      case "error2":
      case "header1":
        t = "color: violet;font-size: 15px;";
        break;
      case "header2":
        t = "color: ;font-size: px;";
        break;
    }

    console.log("%c" + msg, t);
  }

  check_expect(val1, val2){
    var _this = this,
        isEqual;
    if(typeof val1 == "object") isEqual = _this.isEqual(val1, val2);
    else isEqual = val1 == val2;

    if(isEqual) _this.log(JSON.stringify(val1) + " = " + JSON.stringify(val2), "info");
    else{
      _this.log(JSON.stringify(val1) + " != \n" + JSON.stringify(val2), "error1");
      console.log(val1, val2);
      return false;
    }
    return true;
  }

  method_check_expect(tests){
    var counter = 0, passed = 0, _this=this;

    for(var i = 0; i < tests.length; i++){
      if(_this.check_expect(tests[i][0], tests[i][1])) passed++;
      counter++;
    }

    return [counter, passed];
  }
}
