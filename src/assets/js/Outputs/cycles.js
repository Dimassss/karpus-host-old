class CyclesOutput extends Output{
  constructor(){
    if(g["Output"]["cycles"]) return g["Ouput"]["cycles"];
    const outputs = [
                      ["C_ID", "section.cycles-container .cycle", "e7"],
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
                      ["P_C", ".w-products .content form input#js-product-count-set", "e3"], //Products => product count set
                      ["P_Pr", ".w-products .content form table#js-product-price-set", "e3"], //Products => product price set
                      ["P_Dm", ".w-products .content form table#js-product-dimensions", "e5"], //Products => product dimensions
                      ["P_W", ".w-products .content form input#js-product-weight", "e2"], //Products => product weight
                      ["P_D", ".w-products .content form textarea#js-product-description", "e2"], //Products => description
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
                              head += "<th" + (th[1]?` colspan="${th[1]}"`:"") + (th[2]?` rowspan="${th[2]}"`:"") + ">" + th[0] + "</th>";
                            })
                            head += "</tr>";
                          });
                          head += "</thead>";
                        }

                        //creating body of table
                        if(d.body){
                          //body is object where {data-id: tr-outerHTML}
                          body = {};
                          d.body.forEach(tr => {
                            if(tr.length <= 1){
                              body[tr.id] = undefined;
                            }else{
                              var trHTML = `<tr data-id="${tempId}">`;
                              for(var i = 1; i < tr.length; i++){
                                let td = tr[i];
                                trHTML += `<td${(td[1]?` colspan="${td[1]}"`:"")}${(td[2]?` rowspan="${td[2]}"`:"")}>${td[0]}</td>`;
                              }
                              trHTML = "</tr>";
                              body[tr.id] = trHTML;
                            }
                          });
                        }

                        //creating foot of table
                        if(d.foot){
                          foot = "<tfoot>";
                          d.foot.forEach(tr => {
                            foot += "<tr>";
                            tr.forEach(td => {
                              foot +=  `<td${(td[1]?` colspan="${td[1]}"`:"")}${(td[2]?` rowspan="${td[2]}"`:"")}>${td[0]}</td>`;
                            })
                            foot += "</tr>";
                          });
                          foot += "</tfoot>";
                        }

                        //delete/add/change/set html table
                        //setting head
                        if(head) _this.q(s + " thead").outerHTML = head;
                        //setting foot
                        if(foot) _this.q(s + " tfoot").outerHTML = foot;
                        //editing body
                        if(body){
                          for(var k in body){
                            var tr = _this.q(s + ` tbody tr[data-id='${k}']`);
                            if(tr) tr.outerHTML = body[k];
                            else _this.q(s + ` tbody`).insertAdjacentHTML("beforeend", body[k]);
                          }
                        }
                      },
                      "e2": (s, d) => {
                        /**
                          @desc write text
                          @param d {String|Float}
                          @do take %d varialbe and paste it needed place of %s element
                        */
                        _this.q(s).value = d;
                      },
                      "e3": (s, d) => {
                        /**
                          @desc paste values into fields-set
                          @param d {Object<String:String|Float>} => d = {field_name: value}
                          @do take %d variable and than paste every value into its field
                        */
                        var _this = this;

                        for(var k in d){
                            _this.q(`${s} input[data-type='${k}']`).value = d[k];
                        }
                      },
                      "e4": (s, d) => {
                        /**
                          @desc paste needed html-kit-containers or edit conetent of existed kit-containers
                          @param d {Object} => {count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progressBars: [weight, volume]}
                          @do take every kit-object from %d variable and generate from this html. Than set this html to outerHTML of previous container or create new
                          @note data-name="ind-%id%" means induvidual kit, where data-name=kit_name
                        */
                        _this.q(s).outerHTML = `<div class="kit"">
                                  <h6 class="columns">
                                    <div class="col-3">${d.weight} kg</div>
                                    <div class="col-3">${d.pcPrice}</div>
                                    <div class="col-3"><input value="${d.price}" placeholder="Price" class="form-input" type="number" min="0"/></div>
                                    <div class="col-3"><input value="${d.count}" placeholder="Count" class="form-input" type="number" min="0" step="1"/></div>
                                    <progress class="progress col-12" value="${d.progressBars[0]}" min="0" max="100"></progress>
                                    <progress class="progress col-12" value="${d.progressBars[1]}" min="0" max="100"></progress>
                                  </h6>
                                  <div class="products-container unique-scroll">
                                    ${(ps => {
                                      var r = "";
                                      for(var i = 0; i < ps.length; i++) r += `<div class="product columns">
                                                                                <div class="col-5">${ps[i].name}</div>
                                                                                <div class="col-1" data-weight="${ps[i].weight}">${ps[i].unit}</div>
                                                                                <div class="col-3">
                                                                                  <select class="form-select">
                                                                                    <option value="kit" title="kit"${p[i].price.selected == "kit"?" selected":""}>k-${p[i].price.kit}</option>
                                                                                    <option value="wholesale" title="wholesale"${p[i].price.selected == "wholesale"?" selected":""}>w-${p[i].price.wholesale}</option>
                                                                                    <option value="shop" title="shop"${p[i].price.selected == "shop"?" selected":""}>s-${p[i].price.shop}</option>
                                                                                    <option value="restaurant" title="restaurant"${p[i].price.selected == "restaurant"?" selected":""}>r-${p[i].price.restaurant}</option>
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
                        _this.q(s).value = d.join(" ");
                      },
                      "e6": (s, d) => {
                        /**
                          @desc display new cycles to their container
                          @param d {Object<String>} => d = {cycle_id: cycle_name}
                          @do take %d varialbe and replace existed cycle or add new if it is not created yet
                        */

                        for(var c in d){
                          let a = _this.q(`${s}[for='cycle-${c}']`);
                          if(a) a.innerHTML = d[c];
                          else _this.q(s.substr(0, -5)).insertAdjacentHTML("beforeend", `<label for="cycle-${c}">${d[c]}</label>`);
                        }
                      },
                      "e7": (s, d) => {
                        this.q(s).setAttribute("data-id", d);
                      }
                    };
    super(editors, outputs);
    return g["Output"]["cycles"] = this;
  }
}
