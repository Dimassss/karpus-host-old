<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Cycles</title>
    <!--<link rel="stylesheet" href="assets/css/styles/.css">-->
    <link rel="stylesheet" href="../app/assets/css/vendor.css">
    <link rel="stylesheet" href="../app/assets/css/styles/utilits.css">
    <link rel="stylesheet" href="../app/assets/css/styles/header.css">
    <link rel="stylesheet" href="../app/assets/css/styles/main-container.css">
    <link rel="stylesheet" href="../app/assets/css/styles/cycles.css">
    <link rel="stylesheet" href="../app/assets/css/styles/cycle-footer.css">
    <link rel="stylesheet" href="../app/assets/css/styles/table.css">
    <link rel="stylesheet" href="../app/assets/css/styles/kit-selecting.css">
    <link rel="stylesheet" href="../app/assets/css/styles/form.css">
    <link rel="stylesheet" href="../app/assets/css/styles/alert-window.css">
    <style>
      /*sub editings*/
      table#js-product-count-set input[data-type='c-st'], table#js-product-count-set input[data-type='c-kt'], table#js-product-count-set input[data-type='c-lft']{
        color: green!important;
      }
      table#js-product-count-set tr td:nth-child(1), table#js-product-count-set td:nth-child(4), table#js-product-count-set td:nth-child(6){
        background: green;
      }

      /*Orders table*/
      #orders{
        min-width: 1520px;
      }
      #orders th:nth-child(1), #orders td:nth-child(1){
        width: 180px;
      }
      #orders th:nth-child(2), #orders td:nth-child(2){
        width: 180px;
      }
      #orders th:nth-child(3), #orders td:nth-child(3){
        width: 120px;
      }
      #orders th:nth-child(4), #orders td:nth-child(4){
        width: 180px;
      }
      #orders th:nth-child(5), #orders td:nth-child(5){
        width: 180px;
      }
      #orders th:nth-child(6), #orders td:nth-child(6){
        width: 80px;
      }
      #orders th:nth-child(7), #orders td:nth-child(7){
        width: 90px;
      }
      #orders th:nth-child(8), #orders td:nth-child(8){
        width: 90px;
      }
      #orders th:nth-child(9), #orders td:nth-child(9){
        width: 90px;
      }
      #orders th:nth-child(10), #orders td:nth-child(10){
        width: 180px;
      }
      #orders th:nth-child(11), #orders td:nth-child(11){
        width: 150px;
      }
      /*Kit Table*/
      #kits {
          min-width: 270px;
      }

      #kits th:nth-child(1), #kits td:nth-child(1){
        width: 100px;
      }
      #kits th:nth-child(2), #kits td:nth-child(2){
        width: 80px;
      }
      #kits th:nth-child(3), #kits td:nth-child(3){
        width: 90px;
      }
      /*Product Table*/
      #products {
          min-width: 1230px;
      }

      #products th:nth-child(1), #products td:nth-child(1){
        width: 120px;
      }
      #products th:nth-child(2), #products td:nth-child(2){
        width: 80px;
      }
      #products th:nth-child(3), #products td:nth-child(3){
        background-color: #0f230f;
        width: 60px;
      }
      #products th:nth-child(4), #products td:nth-child(4){
        width: 60px;
      }
      #products th:nth-child(5), #products td:nth-child(5){
        width: 60px;
      }
      #products th:nth-child(6), #products td:nth-child(6){
        background-color: #0f230f;
        width: 60px;
      }
      #products th:nth-child(7), #products td:nth-child(7){
        width: 60px;
      }
      #products th:nth-child(8), #products td:nth-child(8){
        background-color: #0f230f;
        width: 60px;
      }
      #products th:nth-child(9), #products td:nth-child(9){
        width: 60px;
      }
      #products th:nth-child(10), #products td:nth-child(10){
        width: 60px;
      }
      #products th:nth-child(11), #products td:nth-child(11){
        width: 60px;
      }
      #products th:nth-child(12), #products td:nth-child(12){
        width: 60px;
      }
      #products th:nth-child(13), #products td:nth-child(13){
        width: 130px;
      }
      #products th:nth-child(14), #products td:nth-child(14){
        width: 100px;
      }
      #products th:nth-child(15), #products td:nth-child(15){
        width: 200px;
      }
    </style>
  </head>
  <body>

    <header>
      <div>
        <a href="main" class="path">Cycles</a>:
        <label for="win1">Orders</label>,
        <label for="win2">Kits</label>,
        <label for="win3">Products</label>
      </div>
      <div><span class="username"><?= ($SESSION['username']) ?></span>: <a class="logout" href="functions/endSession">Logout</a></div>
      <div class="drop">
        <span tabindex="1" class="drop-btn">Menu</span>
        <div class="dropdown-content">
          <a href="#">Generate farm document</a>
          <a href="#">Generate transport document</a>
          <a href="#">Delete this cycle</a>
          <a href="#">Delete record</a>
          <a href="#">Create kit</a>
          <a href="#">Create product</a>
        </div>
      </div>
    </header>

    <main class="unique-scroll cycles">
      <section class="cycles-container">
        <div class="cycle">
          <input type="radio" name="win" id="win1" hidden checked/>
          <div class="win1 w-orders">
            <section class="table-container">
              <input id="js-search-field-orders" class="search" placeholder="Search" value="" type="text"/>
              <div class="unique-scroll">
                <table id="orders">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Telephone</th>
                      <th>Kit</th>
                      <th>Products</th>
                      <th>Adress</th>
                      <th>Cost</th>
                      <th>Is Billed</th>
                      <th>Paid</th>
                      <th>Pay Date</th>
                      <th>Notes</th>
                      <th>Order Source</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                  <tfoot>
                    <tr>
                      <td>Full Name</td>
                      <td>Telephone</td>
                      <td>Kit</td>
                      <td>Products</td>
                      <td>Adress</td>
                      <td>Cost</td>
                      <td>Is Billed</td>
                      <td>Paid</td>
                      <td>Pay Date</td>
                      <td>Notes</td>
                      <td>Order Source</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
          <input type="radio" name="win" id="win2" hidden/>
          <div class="win2 container w-kits">
            <div class="columns">
              <div class="col-3">
                <section class="table-container">
                  <input id="js-search-field-kits" class="search" placeholder="Search" value="" type="text"/>
                  <div class="unique-scroll">
                    <table id="kits">
                      <thead>
                        <tr>
                          <th>Kit Name</th>
                          <th>Type</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                      <tfoot>
                        <tr><td>Kit Name</td><td>Type</td><td>Price</td></tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </div>
              <div class="col-9 unique-scroll content"><div class="container"><div class="columns">
                <form action="#forms" class="form-horizontal col-7">
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-name">Kit Name</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="js-kit-name" placeholder="Kit Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-price">Price</label>
                    </div>
                    <div class="col-2 col-sm-4">
                      <label id="js-kit-pc-price" class="form-label">Price-pc</label>
                    </div>
                    <div class="col-7 col-sm-8">
                      <input class="form-input" type="text" id="js-kit-price" placeholder="Price">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-type">Type</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="js-kit-type" placeholder="Type">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-size">Size</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="js-kit-size" placeholder="Size">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-dimensions">Dimensions</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <input class="form-input" type="text" id="js-kit-dimensions" placeholder="Dimensions">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-weight">Weight</label>
                    </div>
                    <div class="col-2 col-sm-12">
                      <label id="js-kit-pc-weight" class="form-label">Weight-pc</label>
                    </div>
                    <div class="col-7 col-sm-12">
                      <input class="form-input" type="text" id="js-kit-weight" placeholder="Weight">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-kit-description">Description</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <textarea class="form-input" id="js-kit-description" placeholder="Description" rows="3"></textarea>
                    </div>
                  </div>
                </form>
                <div class="kits col-5">
                  <div class="kit" style="margin-top: .5rem">
                    <h6 class="columns">
                      <div class="col-12" style="padding-bottom:.3rem">Kit creating</div>
                      <progress class="progress col-12" value="" max="100"></progress>
                      <progress class="progress col-12" value="" max="100"></progress>
                    </h6>
                    <div class="products-container unique-scroll"></div>
                  </div>
                </div>
              </div></div></div>
            </div>
          </div>
          <input type="radio" name="win" id="win3" hidden/>
          <div class="win3 container w-products">
            <div class="columns">
              <div class="col-5">
                <section class="table-container">
                  <input id="js-search-field-products" class="search" placeholder="Search" value="" type="text"/>
                  <div class="unique-scroll">
                    <table id="products">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Unit</th>
                          <th title="Count start">c-st</th>
                          <th title="Count wholesale">c-wh</th>
                          <th title="Count shops">c-sh</th>
                          <th title="Count start for kits">c-kt</th>
                          <th title="Count from orders">c-or</th>
                          <th title="Count left">c-lft</th>
                          <th title="Price for wholesale">p-wh</th>
                          <th title="Price for shops">p-sh</th>
                          <th title="Price for restaurants">p-rst</th>
                          <th title="Price for kits">p-kt</th>
                          <th>Dimensions</th>
                          <th>Weight</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                      <tfoot>
                        <tr>
                          <td>Name</td>
                          <td>Unit</td>
                          <td title="Count start">c-st</td>
                          <td title="Count wholesale">c-wh</td>
                          <td title="Count shops">c-sh</td>
                          <td title="Count start for kits">c-kt</td>
                          <td title="Count from orders">c-or</td>
                          <td title="Count left">c-lft</td>
                          <td title="Price for wholesale">p-wh</td>
                          <td title="Price for shops">p-sh</td>
                          <td title="Price for restaurants">p-rst</td>
                          <td title="Price for kits">p-kt</td>
                          <td>Dimensions</td>
                          <td>Weight</td>
                          <td>Description</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </div>
              <div class="col-7 content">
                <form action="#forms" class="form-horizontal">
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-name">Product Name</label>
                    </div>
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" id="js-product-name" placeholder="Product Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-unit">Unit</label>
                    </div>
                    <div class="col-4 col-sm-12">
                      <select class="form-input" id="js-product-unit">
                        <option selected value="p">Piece</option>
                        <option value="kg">Kilogram</option>
                        <option value="L">Liter</option>
                        <option value="g">Gramm</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-count">Count</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <table class="table-conatiner-fields" id="js-product-count-set">
                        <tr>
                          <td title="Count start">c-st</td>
                          <td title="Count wholesale">c-wh</td>
                          <td title="Count shops">c-sh</td>
                          <td title="Count start for kits">c-kt</td>
                          <td title="Count from orders">c-or</td>
                          <td title="Count left">c-lft</td>
                        </tr>
                        <tr>
                          <td title="Count start"><input data-type="c-st" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Count wholesale"><input data-type="c-wh" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Count shops"><input data-type="c-sh" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Count start for kits"><input data-type="c-kt" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Count from orders"><input data-type="c-or" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Count left"><input data-type="c-lft" class="form-input" value="0" type="number" min="0"/></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-price">Price</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <table class="table-conatiner-fields" id="js-product-price-set">
                        <tr>
                          <td title="Price for wholesale">p-wh</td>
                          <td title="Price for shops">p-sh</td>
                          <td title="Price for restaurants">p-rst</td>
                          <td title="Price for kits">p-kt</td>
                        </tr>
                        <tr>
                          <td title="Price for wholesale"><input data-type="p-wh" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Price for shops"><input data-type="p-sh" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Price for restaurants"><input data-type="p-rst" class="form-input" value="0" type="number" min="0"/></td>
                          <td title="Price for kits"><input data-type="p-kt" class="form-input" value="0" type="number" min="0"/></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-dimensions">Dimensions</label>
                    </div>
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" id="js-product-dimensions" placeholder="Dimensions">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-weight">Weight</label>
                    </div>
                    <div class="col-4 col-sm-12">
                      <input class="form-input" type="text" id="js-product-weight" placeholder="Weight">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-3 col-sm-12">
                      <label class="form-label" for="js-product-description">Description</label>
                    </div>
                    <div class="col-9 col-sm-12">
                      <textarea class="form-input" id="js-product-description" placeholder="Description" rows="3"></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="cycles-tab-container">
        <div class="controll">
          <div>
            <input type="checkbox" name="create-cycle" id="create-cycle" hidden>
            <label for="create-cycle"><i class="icon icon-plus"></i></label>
            <div class="create-cycle">
              <label for="create-cycle"><i class="icon icon-cross"></i></label>
              <input type="text" name="new-cycle-name" value="" placeholder="Cycle Name">
              <label for="create-cycle"><i class="icon icon-check"></i></label>
            </div>
          </div>
          <div class="drop">
            <span tabindex="1" class="drop-btn"><i class="icon icon-menu"></i></span>
            <div class="dropup-content unique-scroll"></div>
          </div>
        </div>
        <div class="cycles"></div>
        <div class="scroll-btns">
          <i class="icon icon-arrow-left"></i>
          <i class="icon icon-arrow-right"></i>
        </div>
      </section>

      <input type="checkbox" name="open-alert-window" id="open-alert-window_not_work" style="display: none">
      <section class="alert-window">
        <navbar>
          <label for="open-alert-window"><i class="icon icon-2x icon-check" style="color: green"></i></label>
          <label for="open-alert-window"><i class="icon icon-2x icon-cross" style="color: red"></i></label>
        </navbar>
        <div class="unique-scroll">
          <form action="#forms" class="form-horizontal content">
            <div class="form-group">
              <div class="col-12">
                <h2 width="100%" style="text-align: center">Full Name</h2>
              </div>
            </div>
            <div class="form-group">
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-telephones">Telephones:</label>
              </div>
              <div class="col-3 col-sm-12">
                <div class="input-group">
                  <input class="form-input js-isArray" type="text" id="js-telephones" list="telephones" placeholder="Telephone" autocomplete="off">
                  <datalist id="telephones">
                  </datalist>
                </div>
              </div>
              <div class="col-1"></div>
              <div class="col-1 col-sm-12">
                <label class="form-label" for="js-addresses">Addresses:</label>
              </div>
              <div class="col-1">
                <label class="form-switch" for="js-is-not-this">
                  <input type="checkbox" id="js-is-not-this">
                  <i class="form-icon"></i> Not This
                </label>
              </div>
              <div class="col-3 col-sm-12">
                <div class="input-group">
                  <input class="form-input js-isArray" type="text" id="js-addresses" list="addresses" placeholder="Address" autocomplete="off">
                  <datalist id="addresses">
                  </datalist>
                </div>
                <div class="input-group">
                  <input class="form-input" type="text" id="js-another-full-name" placeholder="Full Name" autocomplete="off">
                  <input class="form-input" type="text" id="js-another-telephone" placeholder="Telephone" autocomplete="off">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-social-media">Social Media:</label>
              </div>
              <div class="col-3 col-sm-12">
                <div class="input-group">
                  <input class="form-input js-isArray" type="text" id="js-social-media" list="medias" placeholder="Media" autocomplete="off">
                  <datalist id="medias">
                  </datalist>
                </div>
              </div>
              <div class="col-1"></div>
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-summary">Summary:</label>
              </div>
              <div class="col-1 col-sm-4">
                <label class="form-label" id="js-summary-pc">Sum-pc</label>
              </div>
              <div class="col-2 col-sm-8">
                <input class="form-input" type="number" min="0" id="js-summary" placeholder="Summary" autocomplete="off">
              </div>
            </div>
            <div class="form-group">
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-order-notes">Order Notes:</label>
              </div>
              <div class="col-3 col-sm-12">
                <textarea class="form-input" id="js-order-notes" placeholder="Order Notes" rows="3"></textarea>
              </div>
              <div class="col-1"></div>
              <div class="col-1 col-sm-12">
                <label class="form-label" for="js-order-paid">Paid:</label>
              </div>
              <div class="col-1">
                <label class="form-switch" for="js-is-billed">
                  <input type="checkbox" id="js-is-billed">
                  <i class="form-icon"></i> Is Billed
                </label>
              </div>
              <div class="col-3 col-sm-12">
                <div class="input-group">
                  <input class="form-input js-isArray" id="js-order-paid" placeholder="Paid" data-array="js-order-pay-container" data-index="0" autocomplete="off"/>
                  <input class="form-input js-isArray" type="date" id="js-order-pay-date" placeholder="Date" data-array="js-order-pay-container" data-index="1" autocomplete="off">
                  <span class="btn input-group-btn">Add</span>
                </div>
                <div class="js-order-pay-container">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-order-preferences">Preferences:</label>
              </div>
              <div class="col-3 col-sm-12">
                <textarea class="form-input" id="js-order-preferences" placeholder="Preferences" rows="3"></textarea>
              </div>
            </div>
            <hr></hr>
            <div class="form-group">
              <div class="col-2 col-sm-12">
                <label class="form-label" for="js-cycle">Cycle:</label>
              </div>
              <div class="col-4 col-sm-12">
                <select id="js-cycle" class="form-select">
                </select>
              </div>
            </div>
            <div class="kits">
              <div class="kit add">
                <span class="add-kit">Create individual kit</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  </body>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../app/assets/js/GlobalVariables.js"></script>
  <script type="text/javascript" src="../app/assets/js/EventHandlers/eventHandler.js"></script>
  <script type="text/javascript" src="../app/assets/js/Inputs/Input.js"></script>
  <script type="text/javascript" src="../app/assets/js/Inputs/cycles.js"></script>
  <script type="text/javascript" src="../app/assets/js/Outputs/Output.js"></script>
  <script type="text/javascript" src="../app/assets/js/Outputs/cycles.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/Model.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/CustomerModel.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/CycleModel.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/KitModel.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/OrderModel.js"></script>
  <script type="text/javascript" src="../app/assets/js/Model/ProductModel.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/websql.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/TableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/CustomerTableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/CycleTableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/KitTableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/OrderTableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/Storage/ProductTableSQL.js"></script>
  <script type="text/javascript" src="../app/assets/js/DAO/DAO.js"></script>
  <script type="text/javascript" src="../app/assets/js/DAO/CyclesDAO.js"></script>
  <script type="text/javascript" src="../app/assets/js/Controllers/CycleController.js"></script>
  <script type="text/javascript" src="../app/assets/js/Cycles.js"></script>
</html>
