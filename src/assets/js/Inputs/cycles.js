/**
@class CustomerProfile
@desc is needed to get data from Cycles page
*/

class CyclesInput extends Input{
  constructor(){
    function q(s){
      return document.querySelector(s);
    }

    function qa(s){
      return document.querySelectorAll(s);
    }

    function take_getKit(s, v, r, kit){
      if(!kit) var kit = q(s);

      var name, price, pcPrice = 0, weight, pcWeight = 0, count, products = [], pr_bar = [];

      count = parseInt(r(kit.querySelector("h6 input[placeholder='Count']")));

      name = r(kit.getAttribute("data-name"));
      price = parseFloat(r(kit.querySelector("h6 input[placeholder='Price']").value | kit.querySelector("h6 div:nth-child(2)").innerHTML));
      weight = parseFloat(r(kit.querySelector("h6 .weight").innerHTML));
      pr_bar = [parseInt(kit.querySelector("h6 progress:first-child").value), parseInt(kit.querySelector("h6 progress:nth-child(2)").value)];

      var products_html = kit.querySelectorAll(".products-container .product");
      for(var j = 0; j < products_html.length; j++){
        var p_name, p_unit, p_price, p_count, p_weight, product_html = products_html[j];

        p_name = r(product_html.querySelector("div:nth-child(1)").innerHTML);
        p_unit = r(product_html.querySelector("div:nth-child(2)").innerHTML);
        p_price = (() => {
                    var select = product_html.querySelector("div:nth-child(3) select");
                    if(!select) return undefined;
                    var res = {selected: select.value};
                    select.options.forEach(op => res[op.value] = parseFloat(op.innerText));
                    return Object.assign({}, res);
                  })() | parseFloat(r(product_html.querySelector("div:nth-child(3)").innerText));
        p_count = parseFloat(r(product_html.querySelector("div input[placeholder='Count']").value));
        p_weight = parseFloat(r(product_html.querySelector("div:nth-child(2)").getAttribute("data-weight")));

        products[products.length] = {name: p_name, unit: p_unit, price: p_price, count: p_count, weight: p_weight};

        pcPrice += typeof p_price == "object"?p_price[p_price.selected]: p_price;
        pcWeight += p_weight;
      }

      return Object.assign({}, {price: price, pcPrice:pcPrice, weight: weight, pcWeight: pcWeight, count: count, products: products, progressBars: pr_bar});
    }

    if(g["Input"]["cycles"]) return g["Input"]["cycles"];

    const inputs = [
                    ["Tbl_Slct", "table tr.selected", "v", "t7"],
                    ["C_Slct", "label.selected[for^=cycle-]", "v", "t7"],
                    ["P_ID", ".w-products form", "v","t6"],
                    ["K_ID", ".w-kits form", "v","t6"],
                    ["C_ID", "section.cycles-container .cycle", "v", "t6"],
                    ["add_c", ".cycles-tab-container .controll input[name=new-cycle-name]", "v", "t1"],
                    ["or_SF", ".cycles-container .w-orders input#js-search-field", "v", "t1"],
                    ["kt_SF", ".cycles-container .w-kits input#js-search-field", "v", "t1"],
                    ["kt_Nm", ".cycles-container .w-kits input#js-kit-name", "v", "t1"],
                    ["kt_Pr", ".cycles-container .w-kits input#js-kit-price", "v", "t3"],
                    ["kt_Tp", ".cycles-container .w-kits input#js-kit-type", "v", "t1"],
                    ["kt_Sz", ".cycles-container .w-kits input#js-kit-size", "v", "t1"],
                    ["kt_Dm", ".cycles-container .w-kits input#js-kit-dimensions", "v", "t8"],
                    ["kt_w", ".cycles-container .w-kits input#js-kit-weight", "v", "t3"],
                    ["kt_d", ".cycles-container .w-kits textarea#js-kit-description", "v", "t1"],
                    ["kt_prs", ".cycles-container .w-kits .kits .kit", "v", "t2"],
                    ["pr_SF", ".cycles-container .w-products input#js-search-field", "v", "t1"],
                    ["pr_Nm", ".cycles-container .w-products input#js-product-name", "v", "t1"],
                    ["pr_Unt", ".cycles-container .w-products input#js-product-unit", "v", "t1"],
                    ["pr_c", ".cycles-container .w-products table#js-product-count-set input", "v", "t4"],
                    ["pr_p", ".cycles-container .w-products table#js-product-price-set input", "v", "t4"],
                    ["pr_Dm", ".cycles-container .w-products input#js-product-dimensions", "v", "t8"],
                    ["pr_w", ".cycles-container .w-products input#js-product-weight", "v", "t3"],
                    ["pr_d", ".cycles-container .w-products textarea#js-product-description", "v", "t1"],

                    ["AW_ID", ".alert-window", "v", "t6"],
                    ["AW_Tel", ".alert-window input#js-telephones", "v", "t9"],
                    ["AW_SM", ".alert-window input#js-social-media", "v", "t9"],
                    ["AW_ON", ".alert-window textarea#js-order-notes", "v", "t1"],
                    ["AW_Pr", ".alert-window textarea#js-preferences", "v", "t1"],
                    ["AW_Adr", ".alert-window input#js-addresses", "v", "t7"],
                    ["AW_Sum", ".alert-window input#js-summary", "v", "t1"],
                    ["AW_Bill", ".alert-window input#js-is-billed", "v", "t10"],
                    ["AW_Pay", ".alert-window input#js-order-paid", "v1", "t1"],
                    ["AW_P", ".alert-window input#js-order-pay-date, .alert-window input#js-order-paid", "v", "t11"],
                    ["AW_PD", ".alert-window input#js-order-pay-date", "v1", "t1"],
                    ["AW_c_id", ".alert-window select#js-cycle", "v", "t1"],
                    ["AW_kits", ".alert-window .kits .kit:not(.add)", "v", "t12"],
                    ["AW_n_ths", ".alert-window input#js-is-not-this", "v", "t10"],
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
                      else throw {field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input"};
                    },
                    "t2": (s, v, r) => {
                      /**
                        @desc get kit object from .alert-window
                        @return {Object} => {pcPrice, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}
                      */

                      var kit = q(s);
                      var pcPrice = 0, pcWeight = 0, products = [], pr_bar = [];

                      pr_bar = [parseInt(kit.querySelectorAll("h6 progress")[0].value), parseInt(kit.querySelectorAll("h6 progress")[1].value)];

                      var products_html = kit.querySelectorAll(".products-container .product");
                      for(var j = 0; j < products_html.length; j++){
                        var p_name, p_unit, p_price, p_count, p_weight, product_html = products_html[j];

                        p_name = r(product_html.querySelector("div:nth-child(1)").innerHTML);
                        p_unit = r(product_html.querySelector("div:nth-child(2)").innerHTML);
                        p_price = (() => {
                                    var select = product_html.querySelector("div:nth-child(3) select");
                                    var res = {selected: select.value};
                                    Array.from(select.options).forEach(op => {
                                        res[op.value] = parseFloat(op.innerText.split("-")[1]);
                                      });
                                    return Object.assign({}, res);
                                  })();
                        p_price = p_price?p_price:parseFloat(r(product_html.querySelector("div:nth-child(3)").innerText));
                        p_count = parseFloat(r(product_html.querySelector("div input[placeholder='Count']").value)) | 0;
                        p_weight = parseFloat(r(product_html.querySelector("div:nth-child(2)").getAttribute("data-weight")));

                        products[products.length] = {name: p_name, unit: p_unit, price: p_price, count: p_count, weight: p_weight};

                        pcPrice += p_price[p_price["selected"]] | p_price;
                        pcWeight += p_weight;
                      }
                      
                      return Object.assign({}, {pcPrice:pcPrice, pcWeight: pcWeight, products: products, progress_bars: pr_bar});
                    },
                    "t3": (s, v, r) => {
                      /**
                        @desc get float from input
                        @return {Float}
                      */

                      return parseFloat(r(q(s).value));
                    },
                    "t4": (s, v, r) => {
                      /**
                        @desc get array of floats from set of inputs
                        @return {Object<String: Float>} => {"data-type": "value"}
                      */

                      const a = {};
                      qa(s).forEach(p => {
                        a[r(p.getAttribute("data-type"))] = parseFloat(r(p.value));
                      });
                      return a;
                    },
                    "t5": (s, v, r) => {
                      /**
                        @desc get array of 3 floats from input
                        @return {Array<Float>} => [Float, Float, Float]
                      */

                      const a = [], b = r(q(s)).split(" ");
                      a[0] = parseFloat(b[0]);
                      a[1] = parseFloat(b[1]);
                      a[2] = parseFloat(b[2]);
                      return a;
                    },
                    "t6": (s, v, r) => {
                      return parseInt(r(q(s).getAttribute("data-id")));
                    },
                    "t7": (s, v, r) => {
                      let k = q(s);
                      return k?[k.parentNode.parentNode.getAttribute("id"), parseInt(k.getAttribute("data-id")), k]:[];
                    },
                    "t8": (s, v, r) => {
                      return r(q(s).value).split(" ");
                    },
                    "t9": (s, v, r) => {
                      /**
                        @desc get string and array of string from input and its array
                        @return {Array<String>} => ["val1", "val2"] where first element of array is from input and other from html-array
                      */
                      const a = r(q(s).value);
                      if(!v(a)) console.error({field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input", input: a});

                      let id = q(s).getAttribute("id");
                      const ar = Array.from(q(s).parentNode.parentNode.parentNode.querySelectorAll("." + id + "-container .chip chip")).map(el => r(el.innerHTML));

                      return [a, ar];
                    },
                    "t10": (s, v, r) => {
                      /**
                        @desc get boolean from input value
                        @return {Boolean}
                      */

                      return r(q(s).checked);
                    },
                    "t11": (s, v, r) => {
                      /**
                        @desc get string and array of array of 2 strings from inputs and their arrays
                        @return {Array<Array<String>>} => [["val1", "val2"],["val1", "val2"]] where first element of array is from input and other from html-array
                      */

                      const a1 = r(qa(s)[0].value), a2 = r(qa(s)[1].value), b = [];
                      if(v(a)) return a;
                      else throw {field: s ,class: "CustomerProfile", src: "js/HTML_Input/customerProfile.js", errorMsg: "Invalid input"};

                      let id = q(s).getAttribute("id");
                      const ar = q(s).parentNode.querySelectorAll(".chip chip").map(el => r(el.innerHTML).split(" - "));
                      return [[a1, a2], ...ar];
                    },
                    "t12": (s, v, r) => {
                      /**
                        @desc get kits object-array with kits objects from .alert-window
                        @return {Object} => {kit_name:{count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}}
                      */

                      const kits = {};
                      const kits_html = qa(s);
                      for(var i = 0; i < kits_html.length; i++){
                        const count = parseInt(r(kit.querySelector("h6 input[placeholder='Count']")));
                        if(count < 1) continue;
                        kits[r(kit.getAttribute("data-kit-name"))] = take_getKit(s, v, r, kits_html[i]);
                      }

                      return kits;
                    }
                  };
    const validators = {"v": () => true};

    super(takes, validators, inputs);

    return g["Input"]["cycles"] = this;
  }
}
