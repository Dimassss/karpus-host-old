<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Customers</title>
    <!--<link rel="stylesheet" href="assets/css/all.css"-->
    <link rel="stylesheet" href="../app/assets/css/vendor.css">
    <link rel="stylesheet" href="../app/assets/css/styles/utilits.css">
    <link rel="stylesheet" href="../app/assets/css/styles/header.css">
    <link rel="stylesheet" href="../app/assets/css/styles/main-container.css">
    <link rel="stylesheet" href="../app/assets/css/styles/customerProfile.css">
    <link rel="stylesheet" href="../app/assets/css/styles/tabs.css">
    <link rel="stylesheet" href="../app/assets/css/styles/table.css">
    <link rel="stylesheet" href="../app/assets/css/styles/kit-selecting.css">
    <link rel="stylesheet" href="../app/assets/css/styles/alert-window.css">
    <link rel="stylesheet" href="../app/assets/css/styles/form.css">
    <style>
      /*Customers*/
      #customers th:nth-child(1), #customers td:nth-child(1){
        width: 180px;
      }
      #customers th:nth-child(2), #customers td:nth-child(2){
        width: 180px;
      }
      /*Orders table*/
      #customer_orders th:nth-child(1), #customer_orders td:nth-child(1){
        width: 160px;
      }
      #customer_orders th:nth-child(2), #customer_orders td:nth-child(2){
        width: 140px;
      }
      #customer_orders th:nth-child(3), #customer_orders td:nth-child(3){
        width: 150px;
      }
      #customer_orders th:nth-child(4), #customer_orders td:nth-child(4){
        width: 180px;
      }
      #customer_orders th:nth-child(5), #customer_orders td:nth-child(5){
        width: 80px;
      }
      #customer_orders th:nth-child(6), #customer_orders td:nth-child(6){
        width: 90px;
      }
      #customer_orders th:nth-child(7), #customer_orders td:nth-child(7){
        width: 80px;
      }
      #customer_orders th:nth-child(8), #customer_orders td:nth-child(8){
        width: 90px;
      }
      #customer_orders th:nth-child(9), #customer_orders td:nth-child(9){
        width: 200px;
      }
      #customer_orders th:nth-child(10), #customer_orders td:nth-child(10){
        width: 170px;
      }
    </style>
  </head>
  <body>
    <header>
      <div><a href="main" class="path">Customer Profile</a></div>
      <div><span class="username"><?= ($SESSION['username']) ?></span>: <a class="logout" href="functions/endSession">Logout</a></div>
      <div class="drop">
        <span tabindex="1" class="drop-btn">Menu</span>
        <div class="dropdown-content">
          <a href="#">Create customer</a>
          <a href="#">Delete Customer</a>
          <a href="#">Delete order</a>
        </div>
      </div>
    </header>

    <main class="unique-scroll customerProfile">
      <div class="container">
        <div class="columns">
          <div class="col-4 col-xl-5">
            <section class="table-container">
              <input name="js-customer-nav-table-search" class="search" placeholder="Search" value="" type="text" autocomplete="off"/>
              <div class="unique-scroll">
                <table id="customers">
                  <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Telephone</th>
                      </tr>
                  </thead>
                  <tbody></tbody>
                  <tfoot>
                    <tr>
                      <td>Full Name</td>
                      <td>Telephone</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
          <div class="col-8 col-xl-7">
            <section class="tabs-container">
              <div class="tabs">
                <label class="tab" for="win1">Profile</label>
                <label class="tab" for="win2">Orders</label>
              </div>
              <div class="windows">
                <input type="radio" name="win" id="win1" autocomplete="off" checked/>
                <div class="window unique-scroll">
                  <form action="#forms" class="form-horizontal content">
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-full-name">Full Name</label>
                      </div>
                      <div class="col-4 col-sm-12">
                        <input class="form-input" type="text" id="js-full-name" placeholder="Full Name" autocomplete="off">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-telephones">Telephones</label>
                      </div>
                      <div class="col-3 col-sm-12">
                        <div class="input-group">
                          <input class="form-input js-isArray" type="text" id="js-telephones" placeholder="Telephone" autocomplete="off">
                          <span class="btn input-group-btn">Add</span>
                        </div>
                      </div>
                      <div class="col-5 col-ml-auto col-sm-12 js-telephones-container"></div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-addresses">Addresses</label>
                      </div>
                      <div class="col-3 col-sm-12">
                        <div class="input-group">
                          <input class="form-input js-isArray" type="text" id="js-addresses" placeholder="Address" autocomplete="off">
                          <span class="btn input-group-btn">Add</span>
                        </div>
                      </div>
                      <div class="col-5 col-ml-auto col-sm-12 js-addresses-container">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-e-mail">E-mail</label>
                      </div>
                      <div class="col-4 col-sm-12">
                        <input class="form-input" type="text" id="js-e-mail" placeholder="E-mail" autocomplete="off">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-notes">Notes</label>
                      </div>
                      <div class="col-9 col-sm-12">
                        <textarea class="form-input" id="js-notes" placeholder="Notes" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-preferences">Preferences</label>
                      </div>
                      <div class="col-9 col-sm-12">
                        <textarea class="form-input" id="js-preferences" placeholder="Preferences" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-social-medias">Social Media</label>
                      </div>
                      <div class="col-3 col-sm-12">
                        <div class="input-group">
                          <input class="form-input js-isArray" type="text" id="js-social-medias" placeholder="Social Media" autocomplete="off">
                          <span class="btn input-group-btn">Add</span>
                        </div>
                      </div>
                      <div class="col-5 col-ml-auto col-sm-12 js-social-medias-container"></div>
                    </div>
                    <div class="form-group">
                      <div class="col-3 col-sm-12">
                        <label class="form-label" for="js-activity">Activity</label>
                      </div>
                      <div class="col-4 col-sm-12">
                        <input class="form-input" type="text" id="js-activity" placeholder="Activity" autocomplete="off">
                      </div>
                    </div>
                  </form>
                </div>

                <input type="radio" name="win" id="win2"/>
                <div class="window unique-scroll">
                  <label for="open-alert-window" class="btn btn-fit" name="create_order">Create order</label>
                  <section class="table-container">
                    <input name="js-customer-order-table-search" class="search" placeholder="Search" value="" type="text" autocomplete="off"/>
                    <div class="unique-scroll">
                      <table id="customer_orders">
                        <thead>
                            <tr>
                              <th>Cycle</th>
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
                            <td>Cycle</td>
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
              </div>
            </section>
          </div>
        </div>
      </div>

      <input type="checkbox" name="open-alert-window" id="open-alert-window">
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
                <label class="form-label" for="js-addresses">Summary:</label>
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
  <script type="text/javascript" src="../app/assets/js/Inputs/customerProfile.js"></script>
  <script type="text/javascript" src="../app/assets/js/Outputs/Output.js"></script>
  <script type="text/javascript" src="../app/assets/js/Outputs/customerProfile.js"></script>
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
  <script type="text/javascript" src="../app/assets/js/DAO/CustomerProfileDAO.js"></script>
  <script type="text/javascript" src="../app/assets/js/Controllers/CustomerProfileController.js"></script>
  <script type="text/javascript" src="../app/assets/js/CustomerProfile.js"></script>
</html>
