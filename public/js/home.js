var productLink;
var score;

$(document).ready(function(){
	$('#startSoloGame').click(function(){
		$("#startGameContainer").slideUp();
		startGame();
	});

	$("#productImageContainer").click(function(){
		window.open(productLink,'_blank');
	});

	$(".aPriceButton").click(function(){
		if($(this).attr("id") == "priceButton" + $.data(document.body).box){
			score = score + 1;
			$("#priceButton" + $.data(document.body).box).css("background-color", "rgba(114, 198, 99, 1.0)")

		}else{
			$("#priceButton" + $.data(document.body).box).css("background-color", "rgba(114, 198, 99, 1.0)")
			$(this).css("background-color", "rgba(203, 91, 81, 1.0)")
		}

	});
});

function startGame(){
	clearField()
	loadNewProduct();
}

function clearField(){
	$(".price").html("")
	$(".oldPrice").html("");
}

function loadNewProduct(){
	$.get("/aProduct/random", function(data){
		// console.log(data);
		$("#productImage").attr("src", data.largeURL);
		$("#productTitle").html(data.title);
		productLink = data.productURL;

		var correctBox = (Math.floor(Math.random()*4)+1) ;
		var price = data.showPrice

		// HEY YOU read this \/
		//If you are seeing this, it means you are trying to cheat by diggin into page source. Good for you, enjoy being super hacker man. Just don't be an ass when you brag to your friends. Also, if you want to learn more about the awesome world of coding, check out http://www.w3schools.com/ and https://www.codecademy.com/
		
		$.data(document.body, "box", correctBox);
		// console.log($.data(document.body).box);

		$("#priceButton" + correctBox).find(".price").html(data.showPrice.toFixed(2));
		if(data.oldPrice){
			//$("#priceButton" + correctBox).find(".oldPrice").html(data.oldPrice.toFixed(2));
			//var saleRatio = data.oldPrice.toFixed(2) / data.showPrice.toFixed(2);			
		}

		var possibleScales = []
		if(price < 5){
			// console.log("<5")
			possibleScales[0] = 1;
			possibleScales[1] = 2;
			possibleScales[2] = 4;
		}else if(price < 10){
			// console.log("<10")
			possibleScales[0] = 5;
			possibleScales[1] = 7;
			possibleScales[2] = 9;
		}else if(price < 20){
			// console.log("<20")
			possibleScales[0] = 8;
			possibleScales[1] = 12;
			possibleScales[2] = 15;
		}else if(price < 40){
			// console.log("<40")
			possibleScales[0] = 10;
			possibleScales[1] = 15;
			possibleScales[2] = 30;
		}else if(price < 60){
			possibleScales[0] = 15;
			possibleScales[1] = 20;
			possibleScales[2] = 35;
		}else if(price < 80){
			possibleScales[0] = 20;
			possibleScales[1] = 30;
			possibleScales[2] = 40;
		}else if(price < 150){
			possibleScales[0] = 30;
			possibleScales[1] = 50;
			possibleScales[2] = 70;
		}else if(price < 250){
			possibleScales[0] = 50;
			possibleScales[1] = 80;
			possibleScales[2] = 100;
		}else{
			possibleScales[0] = 50;
			possibleScales[1] = 100;
			possibleScales[2] = 200;			
		}
		// console.log("correctbox ", correctBox)
		var pickedPrices = [price];
		for (var i = 1; i <= 4; i++) {
			if(i != correctBox){
				// console.log("I ", i);

				var alreadyPicked = false;
				do{
					// console.log("picked prices: ", pickedPrices);
					var offset = possibleScales[Math.floor(Math.random()*3)];
					if(Math.random() < .5){
						offset = offset * -1;
					}
					// console.log("proposing: ", price + offset);

					alreadyPicked = false
					for (var j = 0; j < pickedPrices.length; j++) {
						if(price + offset == pickedPrices[j]){
							alreadyPicked = true;
						}
					}


				}while(price + offset <= 0 || alreadyPicked);
				
				// console.log("picked ", price + offset);
				
				pickedPrices.push(price+offset);

				$("#priceButton" + i).find(".price").html((price + offset).toFixed(2));
				if(data.oldPrice){
					//$("#priceButton" + i).find(".oldPrice").html(((data.oldPrice+offset).toFixed(2));
					//$("#priceButton" + i).find(".oldPrice").html(((price+offset) * saleRatio).toFixed(2));
				}
			}
		}
		
	});
}





