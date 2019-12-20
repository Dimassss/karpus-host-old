<?php

if(isset($_GET["tableName"])) $tableName = $_GET["tableName"];
else die("The table wasnt found. <a href=\"main.html\">Return to main page</a>");

?>

<!doctype html>
<html>
<head>
<title><?php echo $tableName;?></title>

<link rel="stylesheet" href="https://unpkg.com/picnic">
<link rel="stylesheet" type="text/css" href="style.css"/>
<link rel="stylesheet" type="text/css" href="header.css"/>
<link rel="stylesheet" type="text/css" href="body.css"/>

<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<div id="container">

<div class="header-container">
	<div class="header flex demo">
		<div class="logo"><a href="main.html">
			<img src="logo.png" class="img" />
		</a></div>
		<div class="name-page">
			<h2><?php echo $tableName; ?></h2>
		</div>
		<div class="username">
			<p style="float:right; margin-right: 3em;">Username</p>
		</div>
		<div class="do">
			<button>Do</button>
		</div>
	</div>
</div>

<div class="do-menu">
	<div class="menu flex four demo">
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
		<div><button>BUTTON</button></div>
	</div>
</div>

<iframe src="table.php?tableName=<?php echo $tableName; ?>" class="body"></iframe>

</div>

<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
<script src="script.js"></script>

</body>
</html>