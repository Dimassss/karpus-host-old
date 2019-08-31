/**
@class CustomerProfile
@desc is needed to get data from Cycles page
*/

class Cycles extends Input{
  constructor(){
    var q = this.q, qa = this.qa;
    if(g["HTML_Input"]["cycles"]) return g["HTML_Input"]["cycles"];

    const inputs = [
                    ["add_c", ".cycle-tab-container .controll input#create-cycle", "v", "t1"],
                    ["or_SF", ".cycles-container .w-orders input#js-search-field", "v", "t1"],
                    ["kt_SF", ".cycles-container .w-kits input#js-search-field", "v", "t1"],
                    ["kt_Nm", ".cycles-container .w-kits input#js-kit-name", "v", "t1"],
                    ["kt_Pr", ".cycles-container .w-kits input#js-kit-price", "v", "t3"],
                    ["kt_Tp", ".cycles-container .w-kits input#js-kit-type", "v", "t1"],
                    ["kt_Sz", ".cycles-container .w-kits input#js-kit-size", "v", "t1"],
                    ["kt_Dm", ".cycles-container .w-kits input#js-kit-dimensions", "v", "t"],
                    ["kt_w", ".cycles-container .w-kits input#js-kit-weight", "v", "t3"],
                    ["kt_d", ".cycles-container .w-kits input#js-kit-description", "v", "t1"],
                    ["kt_prs", ".cycles-container .w-kits .kits .kit", "v", "t2"],
                    ["pr_SF", ".cycles-container .w-products input#js-search-field", "v", "t1"],
                    ["pr_Nm", ".cycles-container .w-products input#js-product-name", "v", "t1"],
                    ["pr_Unt", ".cycles-container .w-products input#js-product-unit", "v", "t1"],
                    ["pr_c", ".cycles-container .w-products table#js-product-count-set input", "v", "t4"],
                    ["pr_p", ".cycles-container .w-products table#js-product-price-set input", "v", "t4"],
                    ["pr_Dm", ".cycles-container .w-products input#js-product-dimensions", "v", "t"],
                    ["pr_w", ".cycles-container .w-products input#js-product-weight", "v", "t3"],
                    ["pr_d", ".cycles-container .w-products input#js-product-description", "v", "t1"]
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
                        @return {Object} => {pc_price, pc_weight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}
                      */

                      var kit = q(s);
                      var pc_price = 0, pc_weight = 0, products = [], pr_bar = [];

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

                        pc_price += p_price;
                        pc_weight += p_weight;
                      }

                       return Object.assign({}, {pc_price:pc_price, pc_weight: pc_weight, products: products, progress_bars: pr_bar});
                    },
                    "t3": (s, v, r) => {
                      /**
                        @desc get float from input
                        @return {Float}
                      */

                      return parseFloat(r(q(s)));
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
                    }
                  };
    const validators = {"v": () => true}

    super(takes, validators, inputs);

    return g["HTML_Input"]["cycles"] = this;
  }
}
