class CustomerProfileOutput extends Output{
  constructor(){
    function q(s){
      return document.querySelector(s);
    }

    function qa(s){
      return document.querySelectorAll(s);
    }

    if(g["Output"]["customerProfile"]) return g["Output"]["customerProfile"];
    var _this;
    const outputs = [
                      ["WP_Tbl", ".customerProfile table#customers", "e1"],
                      ["WP_Tbl_CD", '.customerProfile table#customers tr[data-id="?"]', "e11"],
                      ["WP_Tbl_OD", '.customerProfile table#customer_orders tr[data-id="?"]', "e11"],
                      ["WP_ID", ".customerProfile", "e10"],
                      ["WP_Nm", ".customerProfile input#js-full-name", "e2"],
                      ["WP_Tel", ".customerProfile input#js-telephones", "e3"],
                      ["WP_Adr", ".customerProfile input#js-addresses", "e3"],
                      ["WP_E-m", ".customerProfile input#js-e-mail", "e2"],
                      ["WP_Nt", ".customerProfile textarea#js-notes", "e2"],
                      ["WP_Pr", ".customerProfile textarea#js-preferences", "e2"],
                      ["WP_SM", ".customerProfile input#js-social-medias", "e3"],
                      ["WP_Act", ".customerProfile input#js-activity", "e2"],
                      ["WO_Tbl", ".customerProfile table#customer_orders", "e1"],
                      ["AW_Opn", "input#open-alert-window[name=open-alert-window]", "e5"],
                      ["AW_ID", ".alert-window", "e10"],
                      ["AW_Nm", ".alert-window h2:first-child", "e9"],
                      ["AW_Tel", ".alert-window input#js-telephones", "e4"],
                      ["AW_SM", ".alert-window input#js-social-media", "e4"],
                      ["AW_ON", ".alert-window textarea#js-order-notes", "e2"],
                      ["AW_Pr", ".alert-window textarea#js-order-preferences", "e2"],
                      ["AW_Adr", ".alert-window input#js-addresses", "e4"],
                      ["AW_Sum", ".alert-window input#js-summary", "e2"],
                      ["AW_Bill", ".alert-window input#js-is-billed", "e5"],
                      ["AW_Pay", ".alert-window input#js-order-paid", "e2"],
                      ["AW_P", ".alert-window input#js-order-pay-date, .alert-window input#js-order-paid", "e6"],
                      ["AW_PD", ".alert-window input#js-order-pay-date", "e2"],
                      ["AW_c_id", ".alert-window select#js-cycle", "e7"],
                      ["AW_kits", ".alert-window .kits .kit", "e8"],
                      ["AW_n_ths", ".alert-window input#js-is-not-this", "e5"],
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
                          if(typeof d.body == "object"){
                            for(var j = 0; j < d.body.length; j++){
                              let tr = d.body[j];

                              if(tr.length <= 1){
                                body[tr[0].id] = undefined;
                              }else{
                                var trHTML = `<tr data-id="${tr[0].id}"${tr[0].class?` class="${tr[0].class}"`:""}>`;
                                for(var i = 1; i < tr.length; i++){
                                  let td = tr[i];
                                  trHTML += `<td${(td[1]?` colspan="${td[1]}"`:"")}${(td[2]?` rowspan="${td[2]}"`:"")}>${td[0]}</td>`;
                                }
                                trHTML += "</tr>";
                                body[tr[0].id] = trHTML;
                              }
                            }
                          }else{
                            q(s + " tbody").innerHTML = "";
                          }
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
                            var tr = q(s + ` tbody tr[data-id="${k}"]`);
                            if(tr){
                              let classList = tr.getAttribute("class") + ".";
                              tr.outerHTML = body[k];
                              q(s + ` tbody tr[data-id="${k}"]`).setAttribute("class", classList.slice(0, -1));
                              q(s + ` tbody tr[data-id="${k}"]`).setAttribute("class", q(s + ` tbody tr[data-id="${k}"]`).classList.value.replace(/js-hasEventListener-[-a-zA-Z0-9]+/g, ""));
                            }
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
                          @desc paste needed text into field and another into html-array of this field
                          @param d {Array<String>}
                          @do take %d variable and than paste first element into field and another elements convert to html-array and paste into array container
                        */

                        var field = _this.q(s),
                            containerName = " ." + field.getAttribute("id") + "-container",
                            htmlArray = "";

                        field.value = d[0];

                        for(var i = 1; i < d.length; i++){
                          htmlArray += `<span class="chip ${field.getAttribute("id").substr(0, -1)}">
                                          <chip>${d[i]}</chip>
                                          <a href="#" class="btn btn-clear" id="${Math.random()}" aria-label="Close" role="button" onclick="this.parentNode.outerHTML = ''"></a>
                                        </span>`;
                        }

                        _this.q(s.substr(0, -(s.split(" ").reverse()[0].length)) + containerName).innerHTML = htmlArray;
                      },
                      "e4": (s, d) => {
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
                      "e5": (s, d) => {
                        /**
                          @desc set boolean value to the checkbox or radio input field
                          @param d {Boolean}
                          @do set boolean value to the checkbox or radio input field
                        */
                        _this.q(s).checked = d;
                      },
                      "e6": (s, d) => {
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
                          if(d[i] && d[i][0] && d[i][1]) htmlArray += `<span class="chip">
                                          <chip>${d[i][0]} - ${d[i][1]}</chip>
                                          <a href="#" class="btn btn-clear" id="close-${Math.random()}" aria-label="Close" role="button"></a>
                                        </span>`;
                        }

                        _this.q(s.substr(0, -(s.split(" ").reverse()[0].length)) + containerName).innerHTML = htmlArray;
                      },
                      "e7": (s, d) => {
                        /**
                          @desc set/add values to the select container
                          @param d {Array<Array<String, String>>} where d = [[value, text], [value, text]]
                          @do take %d variable and convert it to html, than take first element of array and make it cheked and another add to the select container
                        */

                        var list = "";
                        for(var i = 0; i < d.length; i++){
                          if(d[i].length == 2) list += `<option value="${d[i][0]}"${d[i][2]?" selected":""}>${d[i][1]}</option>`;
                        }
                        this.q(s).innerHTML = list;
                      },
                      "e8": (s, d) => {
                        /**
                          @desc paste needed html-kit-containers or edit conetent of existed kit-containers
                          @param d {Object} => {kit_name:{count, price, pcPrice, weight, pcWeight, products: [{name, unit, price|:{kit, wholesale, shop, restaurant, selected: price_type}, count, weight}], progress_bars: [weight, volume]}}
                          @do take every kit-object from %d variable and generate from this html. Than set this html to outerHTML of previous container or create new
                          @note data-name="ind-%id%" means induvidual kit, where data-name=kit_name
                        */
                        console.log(d);
                        for(var k in d){
                          console.log(d[k]);

                          var r;
                          if(k.substr(0,4) == "ind-") r = `<div class="kit js-to-save" data-name="${k.toLowerCase()}">
                                <h6 class="columns">
                                  <div class="col-3">${k}</div>
                                  <div class="col-3">${d[k].price}</div>
                                  <div class="col-3">${d[k].weight}</div>
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
                          else r = `<div class="kit js-to-save" data-name="${k.toLowerCase()}">
                                      <h6 class="columns">
                                        <div class="col-3 weight">${d[k].weight} kg</div>
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

                            var kit = _this.q(`${s}[data-name="${k}"]`);
                            if(kit) kit.outerHTML = r;
                            else _this.q(`${s} span.add-kit`).parentNode.insertAdjacentHTML("beforebegin", r);
                          }

                          Array.from(qa(`${s}:not(.js-to-save):not(.add)`)).forEach(k => k.outerHTML = "");
                          Array.from(qa(`${s}.js-to-save`)).forEach(k => k.classList.remove("js-to-save"));
                        },
                      "e9": (s, d) => {
                        this.q(s).innerHTML = d;
                      },
                      "e10": (s, d) => {
                        this.q(s).setAttribute("data-id", d);
                      },
                      "e11": (s, d) => {
                        this.q(s.replace("?", d)).remove();
                      }
                    };
    super(editors, outputs);
    _this = this;
    return g["Output"]["customerProfile"] = this;
  }
}
