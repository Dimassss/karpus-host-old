<?php
	$tables = [
			"customer"=>[
				"first name",
				"second name",
				"telefons",
				"adresses",
				"emails",
				"notes",
				"preference",
				"social media",
				"activity"
			],
			"order"=>[
				"customer_id",
				"delivery_choise",
				"order_source",
				"price",
				"isPaid",
				"payDate",
				"isBilled",
				"notes",
				"products",
				"date",
				"box_number",
				"isCorrect"
			],
			"product"=>[
				"name",
				"price",
				"measure",
				"description"
			],
			"kit"=>[
				"products",
				"size",
				"type",
				"wieght",
				"price",
				"description",
				"hasOptions"
			]
			];
	if(isset($_GET["tableName"])&&isset($tables[$_GET["tableName"]])){
		$table = $_GET["tableName"];
	} else {
		die("Table doesnt exist");
	}
	
	function getTableContent($count, $table){
		$req = [];
		$len = sizeof($table);
		for($i=0; $i<$count; $i++){
			$row = [];
			for($j=0; $j<$len; $j++){
				$row[$j] = md5($j+$i);
			}
			$req[$i] = $row;
		}
		return $req;
	}
?>


<!doctype html>
<html>
<head>
<link rel="stylesheet" href="https://unpkg.com/picnic">
<link rel="stylesheet" type="text/css" href="style.css"/>
<link rel="stylesheet" type="text/css" href="body.css"/>

<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<table class="table-main">
	<thead>
		<tr>
			<th>
				  <input id="table-select-all" type="checkbox" name="table-select-all"/>
			</th>
			<?php
				foreach($tables[$table] as $row){
					echo "<th>".$row."</th>";
				}
			?>
		</tr>
		<tr class="search">
			<th style="background-color: #0084e9"> </th>
			<?php
				foreach($tables[$table] as $row){
					echo "<th><input type=\"text\" placeholder=\"".$row."\"/></th>";
				}
			?>
		</tr>
	</thead>
	<tbody>
		<?php
			$rows = getTableContent(20, $tables[$table]);
			
			foreach($rows as $key=>$row){
				echo "<tr>";
				echo "<td style=\"background-color: #0084e9\"><input id=\"".$tableName.$key."\" type=\"checkbox\" name=\"".$tableName.$key."\"/></td>";
				foreach($row as $val){
					echo '<td>'.$val.'</td>';
				}
				echo "</tr>";
			}
		?>
	</tbody>
</table>

<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>
</html>