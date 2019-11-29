class CyclesOutput extends Output{
  constructor(){
    function q(s){
      return document.querySelector(s);
    }

    function qa(s){
      return document.querySelectorAll(s);
    }

    if(g["Output"]["cycles"]) return g["Output"]["cycles"];
    var _this;
    const outputs = [
                      ["C_ID", "section.cycles-container .cycle", "e7"],
                      ["P_ID", ".w-products form", "e7"],
                      ["K_ID", ".w-kits form", "e7"],
                      ["C_ACC", ".cycles-tab-container .controll input[name='new-cycle-name']", "e2"], //Cycle controll => add/change cycle
                      ["C_CL1", ".cycles-tab-container .cycles label", "e6"], //Cycle cycles => cycles list1
                      ["C_CL2", ".cycles-tab-container .controll .drop .dropup-content label", "e6"], //Cycle controll => cycle list2
                      ["O_Tbl", ".w-orders table#orders", "e1"], //Orders => orders table
                      ["K_Tbl", ".w-kits table#kits", "e1"], //Kits => nav table of kits
                      ["K_Nm", ".w-kits .content form input#js-kit-name", "e2"], //Kit name
                      ["K_Pr", ".w-kits .content form input#js-kit-price", "e2"], //Kit Price
                      ["K_PcPr", ".w-kits .content form #js-kit-pc-price", "e2"], //Kit Pc Price
                      ["K_Tp", ".w-kits .content form input#js-kit-type", "e2"], //Kit Type
                      ["K_Sz", ".w-kits .content form input#js-kit-size", "e2"], //Kit Size
                      ["K_Dm", ".w-kits .content form input#js-kit-dimensions", "e5"], //Kit Dimensions
                      ["K_W", ".w-kits .content form input#js-kit-weight", "e2"], //Kit Weight
                      ["K_PcW", ".w-kits .content form #js-kit-pc-weight", "e2"], //Kit Pc Weight
                      ["K_D", ".w-kits .content form textarea#js-kit-description", "e2"], //Kit Description
                      ["K_Cr", ".w-kits .content .kits .kit", "e4"], //Kit Creating
                      ["P_Tbl", ".w-products table#products", "e1"], //Product => products nav table
                      ["P_Nm", ".w-products .content form input#js-product-name", "e2"], //Products => product name
                      ["P_Unt", ".w-products .content form input#js-product-unit", "e2"], //Products => product unit
                      ["P_C", ".w-products .content form table#js-product-count-set", "e3"], //Products => product count set
                      ["P_Pr", ".w-products .content form table#js-product-price-set", "e3"], //Products => product price set
                      ["P_Dm", ".w-products .content form input#js-product-dimensions", "e5"], //Products => product dimensions
                      ["P_W", ".w-products .content form input#js-product-weight", "e2"], //Products => product weight
                      ["P_D", ".w-products .content form textarea#js-product-description", "e2"], //Products => description
                      ["AW_ID", ".alert-window", "e7"],
                      ["AW_Nm", ".alert-window h2:first-child", "e8"],
                      ["AW_Tel", ".alert-window input#js-telephones", "e9"],
                      ["AW_SM", ".alert-window input#js-social-media", "e9"],
                      ["AW_ON", ".alert-window textarea#js-order-notes", "e2"],
                      ["AW_Pr", ".alert-window textarea#js-order-preferences", "e2"],
                      ["AW_Adr", ".alert-window input#js-addresses", "e9"],
                      ["AW_Sum", ".alert-window input#js-summary", "e2"],
                      ["AW_Bill", ".alert-window input#js-is-billed", "e10"],
                      ["AW_Pay", ".alert-window input#js-order-paid", "e2"],
                      ["AW_P", ".alert-window input#js-order-pay-date, .alert-window input#js-order-paid", "e11"],
                      ["AW_PD", ".alert-window input#js-order-pay-date", "e2"],
                      ["AW_c_id", ".alert-window select#js-cycle", "e12"],
                      ["AW_kits", ".alert-window .kits .kit", "e13"],
                      ["AW_n_ths", ".alert-window input#js-is-not-this", "e10"],
                      ["AW_an_FN", ".alert-window input#js-another-full-name", "e2"],
                      ["AW_an_Tel", ".alert-window input#js-another-telephone", "e2"]
                    ];
    const editors = {
                      "e1": (s, d) => {
                        /**
                          @desc modarate tables in documents
                          @param d {Object} =>
                          d = {
                            head: [[[text, col-span, row-span], [text, col-span, row-span]], [[text, col-span, row-span], [text, col-span, row-span]]],
                            body: [[{<data-attrubutes>}, [text, col-span, row-span], [text, col-span, row-span]], [[text, col-span, row-span], [text, col-span, row-span]]],
                            foot: [[[text, col-span, row-span], [text, col-span, row-span]], [[text, col-span, row-span], [text, col-span, row-span]]],
                          }
                          <data-attrubutes> := id
                          @do get variable %d and convert it to html. Than paste or edit needed parts of table setted in variable %d
                          @note if in body for tr element setted only its data-id, so elemnt will be deleted with this data-id
                        */

                        //preparing variables
                        var head, body, foot;

                        //creating head of table

                        if(d.head){
                          head = "<thead>";
                          d.head.forEach(tr => {
                            head += "<tr>";
                            tr.forEach(th => {
                              if(th[0] != "id") head += "<th" + (th[1]?` colspan="${th[1]}"`:"") + (th[2]?` rowspan="${th[2]}"`:"") + ">" + th[0] + "</th>";
                            })
                            head += "</tr>";
                          });
                          head += "</thead>";
                        }

                        //creating body of table
                        if(d.body){
                          //body is object where {data-id: tr-outerHTML}
                          body = {};

                          if(d.body == -1) q(s + " tbody").innerHTML = "";
                          else d.body.forEach(tr => {
                            if(tr.length <= 1){
                              body[tr[0].id] = "";
                            }else{
                              var trHTML = `<tr data-id="${tr[0].id}">`;
                              for(var i = 1; i < tr.length; i++){
                                let td = tr[i];
                                trHTML += `<td${(td[1]?` colspan="${td[1]}"`:"")}${(td[2]?` rowspan="${td[2]}"`:"")}>${td[0]}</td>`;
                              }
                              trHTML += "</tr>";
                              body[tr[0].id] = trHTML;
                            }
                          });
                        }

                        //creating foot of table
                        if(d.foot){
                          foot = "<tfoot>";
                          d.foot.forEach(tr => {
                            foot += "<tr>";
                            tr.forEach(td => {
                              if(td[0] != "id") foot +=  `<td${(td[1]?` colspan="${td[1]}"`:"")}${(td[2]?` rowspan="${td[2]}"`:"")}>${td[0]}</td>`;
                            })
                            foot += "</tr>";
                          });
                          foot += "</tfoot>";
                        }

                        //delete/add/change/set html table
                        //setting head
                        if(head) q(s + " thead").outerHTML = head;
                        //setting foot
                        if(foot) q(s + " tfoot").outerHTML = foot;
                        //editing body
                        if(body){
                          for(var k in body){
                            var tr = q(s + ` tbody tr[data-id='${k}']`);
                            if(tr){
                              if(!tr.classList.contains("selected") || body[k] == "") tr.outerHTML = body[k];
                              else tr.outerHTML = body[k].substr(0,4) + 'class="selected" ' + body[k].substr(4);
                            }
                            else q(s + ` tbody`).insertAdjacentHTML("beforeend", body[k]);
                          }
                        }
                      },
                      "e2": (s, d) => {
                        /**
                          @desc write text
                          @param d {String|Float}
                          @do take %d varialbe and paste it needed place of %s element
                        */
                        q(s).value = d;
                      },
                      "e3": (s, d) => {
                        /**
                          @desc paste values into fields-set
                          @param d {Object<String:String|Float>} => d = {field_name: value}
                          @do take %d variable and than paste every value into its field
                        */
                        var _this = this;

                        for(var k in d){
                          q(`${s} input[data-type='${k}']`).value = d[k];
                        }
                      },
                      "e4": (s, d) => {
                        /**
                          @desc paste needed html-kit-containers or edit conetent of existed kit-containers
                          @param d {Object} => {count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progressBars: [weight, volume]}
                          @do take every kit-object from %d variable and generate from this html. Than set this html to outerHTML of previous container or create new
                          @note data-name="ind-%id%" means induvidual kit, where data-name=kit_name
                        */

                        q(s).outerHTML = `<div class="kit" style="margin-top: .5rem">
                                  <h6 class="columns">
                                    <div class="col-12" style="padding-bottom:.3rem">Kit creating</div>
                                    <progress class="progress col-12" value="${d.progress_bars[0]}" min="0" max="100"></progress>
                                    <progress class="progress col-12" value="${d.progress_bars[1]}" min="0" max="100"></progress>
                                  </h6>
                                  <div class="products-container unique-scroll">
                                    ${(ps => {
                                      var r = "";
                                      for(var i = 0; i < ps.length; i++) r += `<div class="product columns">
                                                                                <div class="col-5">${ps[i].name}</div>
                                                                                <div class="col-1" data-weight="${ps[i].weight}">${ps[i].unit}</div>
                                                                                <div class="col-3">
                                                                                  <select class="form-select">
                                                                                    <option value="p-kt" title="kit"${ps[i].price.selected == "p-kt"?" selected":""}>k-${ps[i].price["p-kt"]}</option>
                                                                                    <option value="p-wh" title="wholesale"${ps[i].price.selected == "p-wh"?" selected":""}>w-${ps[i].price["p-wh"]}</option>
                                                                                    <option value="p-sh" title="shop"${ps[i].price.selected == "p-sh"?" selected":""}>s-${ps[i].price["p-sh"]}</option>
                                                                                    <option value="p-rst" title="restaurant"${ps[i].price.selected == "p-rst"?" selected":""}>r-${ps[i].price["p-rst"]}</option>
                                                                                  </select>
                                                                                </div>
                                                                                <div class="col-3"><input value="${ps[i].count}" placeholder="Count" class="form-input" type="number"/></div>
                                                                              </div>`;
                                    return r;
                                    })(d.products)}
                                  </div></div>`;

                      },
                      "e5": (s, d) => {
                        /**
                          @desc convert array to string and paste into field
                          @param d {Array<String|Float>}
                          @do take %d varialbe and convert array of numbers/strings to string, where each string is splited by white space
                        */

                        q(s).value = d.join(" ");
                      },
                      "e6": (s, d) => {
                        /**
                          @desc display new cycles to their container
                          @param d {Object<String>} => d = {cycle_id: cycle_name}
                          @do take %d varialbe and replace existed cycle or add new if it is not created yet
                        */

                        for(var c in d){
                          let a = q(`${s}[for=cycle-${c}]`);
                          if(a){
                            if(d[c]) a.innerHTML = d[c];
                            else q(s + "[for=cycle-" + c + "]").outerHTML = "";
                          } else q(s.slice(0, -6)).insertAdjacentHTML("beforeend", `<label for="cycle-${c}">${d[c]}</label>`);
                        }
                      },
                      "e7": (s, d) => {
                        this.q(s).setAttribute("data-id", d);
                      },
                      "e8": (s, d) => {
                        this.q(s).innerHTML = d;
                      },
                      "e9": (s, d) => {
                        /**
                          @desc paste needed text into field and antoher into html-list of this field
                          @param d {Array<Array<String, String>>} where d = [value, value]
                          @do take first element and paste it to the field and another elements convert to the html-list and paste it into list container
                        */
                        _this.q(s).value = d[0];

                        var list = "";
                        for(var i = 1; i < d.length; i++){
                          list += `<option>${d[i]}</option>`;
                        }

                        _this.q(s.substr(0, -(s.split(" ").reverse()[0].length)) + " datalist#" + _this.q(s).getAttribute("list")).innerHTML = list;
                      },
                      "e10": (s, d) => {
                        /**
                          @desc set boolean value to the checkbox or radio input field
                          @param d {Boolean}
                          @do set boolean value to the checkbox or radio input field
                        */
                        _this.q(s).checked = d;
                      },
                      "e11": (s, d) => {
                        /**
                          @desc paste needed values into 2 fields and another into html-array of those fields
                          @param d {Array<Array<String, String>>}
                          @do take %d variable and than paste 2 values of first element into 2 fields and another elements convert to html-array and paste into array container
                        */
                        var fields = _this.qa(s),
                            containerName = " ." + fields[0].getAttribute("data-array"),
                            htmlArray = "";

                        fields[0].value = d[0][parseInt(fields[0].getAttribute("data-index"))];
                        fields[1].value = d[0][parseInt(fields[1].getAttribute("data-index"))];
                        for(var i = 1; i < d.length; i++){
                          if(!(!d[i][0] || !d[i][1])) htmlArray += `<span class="chip">
                                          <chip>${d[i][0]} - ${d[i][1]}</chip>
                                          <a href="#" class="btn btn-clear" id="close-${Math.random()}" aria-label="Close" role="button"></a>
                                        </span>`;
                        }

                        _this.q(s.substr(0, -(s.split(" ").reverse()[0].length)) + containerName).innerHTML = htmlArray;
                      },
                      "e12": (s, d) => {
                        /**
                          @desc set/add values to the select container
                          @param d {Array<Array<String, String>>} where d = [[value, text], [value, text]]
                          @do take %d variable and convert it to html, than take first element of array and make it cheked and another add to the select container
                        */

                        var list = "";
                        for(var i = 0; i < d.length; i++){
                          if(d[i].length == 2) list += `<option value="${d[i][0]}"${i==1?" selected":""}>${d[i][1]}</option>`;
                        }
                        this.q(s).innerHTML = list;
                      },
                      "e13": (s, d) => {
                        /**
                          @desc paste needed html-kit-containers or edit conetent of existed kit-containers
                          @param d {Object} => {kit_name:{count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}}
                          @do take every kit-object from %d variable and generate from this html. Than set this html to outerHTML of previous container or create new
                          @note data-name="ind-%id%" means induvidual kit, where data-name=kit_name
                        */

                        for(var k in d){
                          var r;
                          if(k.substr(0,4) == "ind-") r = `<div class="kit" data-name="${k}">
                                <h6 class="columns">
                                  <div class="col-9">${k} - ${d[k].price} - ${d[k].weight}</div>
                                  <div class="col-3"><input placeholder="Count" class="form-input" type="number" value="${d[k].count}" min="0" step="1"/></div>
                                  <progress class="progress col-12" value="${d[k].progress_bars[0]}" min="0" max="100"></progress>
                                  <progress class="progress col-12" value="${d[k].progress_bars[1]}" min="0" max="100"></progress>
                                </h6>
                                <div class="products-container unique-scroll">
                                  ${(ps => {
                                    var r = "";
                                    for(var i = 0; i < ps.length; i++) r += `<div class="product columns">
                                                                              <div class="col-5">${ps[i].name}</div>
                                                                              <div class="col-1" data-weight="${ps[i].weight}">${ps[i].unit}</div>
                                                                              <div class="col-3">${ps[i].price}</div>
                                                                              <div class="col-3"><input value="${ps[i].count}" placeholder="Count" class="form-input" type="number"/></div>
                                                                            </div>`;
                                    return r;
                                  })(d[k].products)}
                                </div>
                              </div>`;
                          else r = `<div class="kit" data-name="${k}">
                                      <h6 class="columns">
                                        <div class="col-3">${d[k].weight} kg</div>
                                        <div class="col-3">${d[k].pcPrice}</div>
                                        <div class="col-3"><input value="${d[k].price}" placeholder="Price" class="form-input" type="number" min="0"/></div>
                                        <div class="col-3"><input value="${d[k].count}" placeholder="Count" class="form-input" type="number" min="0" step="1"/></div>
                                        <progress class="progress col-12" value="${d[k].progress_bars[0]}" min="0" max="100"></progress>
                                        <progress class="progress col-12" value="${d[k].progress_bars[1]}" min="0" max="100"></progress>
                                      </h6>
                                      <div class="products-container unique-scroll">
                                        ${(ps => {
                                          var r = "";
                                          for(var i = 0; i < ps.length; i++) r += `<div class="product columns">
                                                                                    <div class="col-5">${ps[i].name}</div>
                                                                                    <div class="col-1" data-weight="${ps[i].weight}">${ps[i].unit}</div>
                                                                                    <div class="col-3">
                                                                                      <select class="form-select">
                                                                                        <option value="p-kt" title="kit"${ps[i].price.selected == "p-kt"?" selected":""}>k-${ps[i].price["p-kt"]}</option>
                                                                                        <option value="p-wh" title="wholesale"${ps[i].price.selected == "p-wh"?" selected":""}>w-${ps[i].price["p-wh"]}</option>
                                                                                        <option value="p-sh" title="shop"${ps[i].price.selected == "p-sh"?" selected":""}>s-${ps[i].price["p-sh"]}</option>
                                                                                        <option value="p-rst" title="restaurant"${ps[i].price.selected == "p-rst"?" selected":""}>r-${ps[i].price["p-rst"]}</option>
                                                                                      </select>
                                                                                    </div>
                                                                                    <div class="col-3"><input value="${ps[i].count}" placeholder="Count" class="form-input" type="number"/></div>
                                                                                  </div>`;
                                        return r;
                                        })(d[k].products)}
                                      </div></div>`;
                            //kits[k] = r;
                            var kit = _this.q(`${s}[data-name=${k}]`);
                            if(kit) kit.outerHTML = r
                            else _this.q(`${s} span.add-kit`).parentNode.insertAdjacentHTML("beforebegin", r);
                          }
                        }
                    };
    super(editors, outputs);
    _this = this;
    return g["Output"]["cycles"] = this;
  }
}
