<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Main</title>
    <link rel="stylesheet" href="../app/assets/css/vendor.css">
    <link rel="stylesheet" href="../app/assets/css/styles/utilits.css">
    <link rel="stylesheet" href="../app/assets/css/styles/header.css">
    <link rel="stylesheet" href="../app/assets/css/styles/main-container.css">
    <link rel="stylesheet" href="../app/assets/css/styles/menu-tabs.css">
  </head>
  <body>
    <header>
      <div><a href="" class="path">Main</a></div>
      <div><span class="username"><?= ($SESSION['username']) ?></span>: <a class="logout" href="functions/endSession">Logout</a></div>
      <div class="drop">
        <span tabindex="1" class="drop-btn">Menu</span>
        <div class="dropdown-content">
        </div>
      </div>
    </header>

    <main class="unique-scroll">
      <section class="menu-tabs-container">
        <a href="customerProfile" class="tab">
          <img src="https://www.guttenberg.lib.ia.us/images/twitter%20icon/image" alt="tab-img"/>
          <h>Customer's profile</h>
        </a>
        <a href="cycles" class="tab">
          <img src="https://www.guttenberg.lib.ia.us/images/twitter%20icon/image" alt="tab-img"/>
          <h>Cycles</h>
        </a>
      </section>
    </main>
  </body>
</html>
