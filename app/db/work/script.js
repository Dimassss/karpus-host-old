$(function(){
	
	$(".table-main #table-select-all").on("click",function(){
			if($(".table-main #table-select-all")[0].checked){
				$.map(document.querySelectorAll(".table-main tbody tr td:first-child input"), function(n){n.checked = true;});
			}else{
				$.map(document.querySelectorAll(".table-main tbody tr td:first-child input"), function(n){n.checked = false;});
			}
	});
	
	$(".do button").on("click", function(){
		$(".do-menu").toggle(200, toggleDoButton);
	});
	
	function toggleDoButton(){
		if($(".do-menu").css("display")!=="none"){
			$(".do button").css({"backgroundColor":"#fa0"});
			$(".do button").text("Back");
		}else{
			$(".do button").css({"backgroundColor":"#3390E1"});
			$(".do button").text("Do");
		}
	}
});

