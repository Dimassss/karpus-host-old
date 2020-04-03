/**
@class CustomerProfile
@desc is needed to get data from CustomerProfile page
*/
class CustomerProfileInput extends Input{
  constructor(){
    function q(s){
      return document.querySelector(s);
    }

    function qa(s){
      return document.querySelectorAll(s);
    }

    if(g["Input"]["customerProfile"]) return g["Input"]["customerProfile"];

    function take_getKit(s, v, r, kit){
      if(!kit) var kit = q(s);

      var name, price, pcPrice = 0, weight, pcWeight = 0, count, products = [], pr_bar = [];

      count = parseInt(r(kit.querySelector("h6 input[placeholder='Count']").value));

      name = r(kit.getAttribute("data-name"));
      if(kit.querySelector("h6 input[placeholder='Price']").value) price = parseFloat(r(kit.querySelector("h6 input[placeholder='Price']").value));
      else price = 0;
      weight = parseFloat(r(kit.querySelector("h6 .weight").innerHTML));
      pr_bar = [parseInt(kit.querySelectorAll("h6 progress")[0].value), parseInt(kit.querySelectorAll("h6 progress")[1].value)];
      var products_html = Array.from(kit.querySelectorAll(".products-container .product"));
      for(var j = 0; j < products_html.length; j++){
        var p_name, p_unit, p_price, p_count, p_weight, product_html = products_html[j];

        p_name = r(product_html.querySelector("div:nth-child(1)").innerHTML);
        p_unit = r(product_html.querySelector("div:nth-child(2)").innerHTML);
        p_price = (() => {
                    var select = product_html.querySelector("div:nth-child(3) select");

                    if(!select) return undefined;
                    var res = {selected: select.value};
                    Array.from(select.options).forEach(op => res[op.value] = parseFloat(op.innerText.split("-")[1]));

                    return Object.assign({}, res);
                    })();
        p_count = parseInt(r(product_html.querySelector("div input[placeholder='Count']").value));
        p_weight = parseFloat(r(product_html.querySelector("div:nth-child(2)").getAttribute("data-weight")));

        products[products.length] = {name: p_name, unit: p_unit, price: p_price, count: p_count, weight: p_weight};
        pcPrice += (typeof p_price == "object"?p_price[p_price.selected]: p_price)*p_count;
        pcWeight += p_weight*p_count;
      }

      return Object.assign({}, {price: price, pcPrice:Number((pcPrice).toFixed(2)), weight: weight, pcWeight: Number((pcWeight).toFixed(2)), count: count, products: products, progress_bars: pr_bar});
    }

    const inputs = [
                    ["TblC_Slct", "table#customers .selected", "v", "t9"],
                    ["TblO_Slct", "table#customer_orders .selected", "v", "t9"],
                    ["Tbl_rows", "table#customers tbody tr", "v", "t10"],
                    ["NT_SF", ".customerProfile input[name=js-customer-nav-table-search]", "v", "t1"],
                    ["WP_ID", ".customerProfile", "v", "t7"],
                    ["WP_SC", ".customerProfile table#customers tr.selected", "t8"],
                    ["WP_SC", ".customerProfile table#customers tr.selected", "v", "t8"],
                    ["WP_Nm", ".customerProfile input#js-full-name", "v", "t1"],
                    ["WP_Tel", ".customerProfile input#js-telephones", "v1", "t5"],
                    ["WP_Adr", ".customerProfile input#js-addresses", "v1", "t5"],
                    ["WP_E-m", ".customerProfile input#js-e-mail", "v", "t1"],
                    ["WP_Nt", ".customerProfile textarea#js-notes", "v", "t1"],
                    ["WP_Pr", ".customerProfile textarea#js-preferences", "v", "t1"],
                    ["WP_SM", ".customerProfile input#js-social-medias", "v1", "t5"],
                    ["WP_Act", ".customerProfile input#js-activity", "v", "t1"],
                    ["WO_SF", ".customerProfile input[name=js-customer-order-table-search]", "v", "t1"],
                    ["WO_SO", ".customerProfile table#customer_orders tr.selected", "v", "t8"],
                    ["AW_ID", ".alert-window", "v", "t7"],
                    ["AW_Tel", ".alert-window input#js-telephones", "v", "t5"],
                    ["AW_SM", ".alert-window input#js-social-media", "v", "t5"],
                    ["AW_ON", ".alert-window textarea#js-order-notes", "v", "t1"],
                    ["AW_Pr", ".alert-window textarea#js-order-preferences", "v", "t1"],
                    ["AW_Adr", ".alert-window input#js-addresses", "v", "t5"],
                    ["AW_Sum", ".alert-window input#js-summary", "v", "t1"],
                    ["AW_Bill", ".alert-window input#js-is-billed", "v", "t2"],
                    ["AW_Pay", ".alert-window input#js-order-paid", "v1", "t1"],
                    ["AW_P", ".alert-window input#js-order-pay-date, .alert-window input#js-order-paid", "v", "t6"],
                    ["AW_PD", ".alert-window input#js-order-pay-date", "v1", "t1"],
                    ["AW_c_id", ".alert-window select#js-cycle", "v", "t1"],
                    ["AW_kits", ".alert-window .kits .kit:not(.add)", "v", "t3"],
                    ["AW_n_ths", ".alert-window input#js-is-not-this", "v", "t2"],
                    ["AW_an_FN", ".alert-window input#js-another-full-name", "v", "t1"],
                    ["AW_an_Tel", ".alert-window input#js-another-telephone", "v", "t1"]
                  ];
    const takes = {
                    "t1": (s, v, r) => {
                      /**
                        @desc get string from input or textarea
                        @return {String}
                      */

                      const a = r(q(s).value);
                      if(v(a)) return a;
                      else console.assert(false, {field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input"});
                    },
                    "t2": (s, v, r) => {
                      /**
                        @desc get boolean from input value
                        @return {Boolean}
                      */

                      return r(q(s).checked);
                    },
                    "t3": (s, v, r) => {
                      /**
                        @desc get kits object-array with kits objects from .alert-window
                        @return {Object} => {kit_name:{count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}}
                      */

                      const kits = {};
                      const kits_html = Array.from(qa(s));

                      for(var i = 0; i < kits_html.length; i++){
                        const count = parseInt(r(kits_html[i].querySelector("h6 input[placeholder='Count']").value));

                        if(count < 1 || !count) continue;
                        kits[r(kits_html[i].getAttribute("data-name"))] = take_getKit(s, v, r, kits_html[i]);
                      }

                      return kits;
                    },
                    /**
                      @desc get kit object from .alert-window
                      @return {Object} => {pcPrice, pcWeight, products: [{name, unit, price, count, weight}], progress_bars: [weight, volume]}
                    */
                    "t4": take_getKit,
                    "t5": (s, v, r) => {
                      /**
                        @desc get string and array of string from input and its array
                        @return {Array<String>} => ["val1", "val2"] where first element of array is from input and other from html-array
                      */
                      const a = r(q(s).value);
                      if(!v(a)) console.error({field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input", input: a});

                      let id = q(s).getAttribute("id");
                      const ar = Array.from(q(s).parentNode.parentNode.parentNode.querySelectorAll("." + id + "-container .chip chip")).map(el => r(el.innerHTML));

                      return [a, ...ar];
                    },
                    "t6": (s, v, r) => {
                      /**
                        @desc get string and array of array of 2 strings from inputs and their arrays
                        @return {Array<Array<String>>} => [["val1", "val2"],["val1", "val2"]] where first element of array is from input and other from html-array
                      */

                      const a1 = r(qa(s)[0].value), a2 = r(qa(s)[1].value), b = [];
                      if(!v(a1) || !v(a2)) throw {field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input", input: [a1, a2]};

                      let id = q(s).getAttribute("id");
                      const ar = Array.from(q(s).parentNode.parentNode.querySelectorAll(".chip chip")).map(el => r(el.innerHTML).split(" - "));
                      let result, inp = [[a1, a2]]
                      result = inp.concat(ar);
                      return result;
                    },
                    "t7": (s, v, r) => {
                      return parseInt(r(q(s).getAttribute("data-id")));
                    },
                    "t8": (s, v, r) => {
                      return q(s);
                    },
                    "t9": (s, v, r) => {
                      let k = q(s);
                      return k?[k.parentNode.parentNode.getAttribute("id"), parseInt(k.getAttribute("data-id")), k]:[];
                    },
                    "t10": (s, v, r) => {
                      return qa(s);
                    }
                  };
    const validators = {
                        "v": () => true,
                        "v1": str => str !== ""
                      };

    super(takes, validators, inputs);

    return g["Input"]["customerProfile"] = this;
  }
}
