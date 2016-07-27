var productLink;
var score = 0;
var strikes = 0;
var showAmazonNotice = true;
if(localStorage.getItem("showAmazonNotice") == "no"){
	showAmazonNotice = false;
}
var hasGuessed = false;
var lost = false;
var allProductsForRun = [];
var highScore = localStorage.getItem("highScore") || 0;

$(document).ready(function(){
	$('#startSoloGame').click(function(){
		$("#startGameContainer").slideUp();
		startGame();
	});

	$("#playAgainButton").click(function(){
		startGame();
	})

	$("#productArea").click(function(){
		if(hasGuessed){
			window.open(productLink,'_blank');
		}
	});

	$("#amazonNoticeDismiss").click(function(){
		showAmazonNotice = false;
		localStorage.setItem("showAmazonNotice", "no");
		$("#amazonNotice").slideUp();
	});

	$("#nextButtonContainer").click(function(){
		if(lost){
			$("#gameContainer").hide();
			gameOver();
		}else{
			clearField();
			loadNewProduct();
		}
	});

	$(".aPriceButton").click(function(){
		if(!hasGuessed){
			if($(this).attr("id") == "priceButton" + $.data(document.body).box){
				$("#priceButton" + $.data(document.body).box).css("background-color", "rgba(114, 198, 99, 1.0)")
				score = score + 1;
				$("#scoreContainer").html("Score: " + score)
			}else{
				$("#priceButton" + $.data(document.body).box).css("background-color", "rgba(114, 198, 99, 1.0)")
				$(this).css("background-color", "rgba(203, 91, 81, 1.0)")
				strikes = strikes + 1;
				if(strikes == 1){
					$("#strike1").attr("src", "images/fullStrike.png");
				}
				if(strikes == 2){
					$("#strike2").attr("src", "images/fullStrike.png");
				}
				if(strikes == 3){
					$("#strike3").attr("src", "images/fullStrike.png");
					lost = true;
				}
			}

			hasGuessed = true;
			$("#productArea").css("cursor", "pointer");

			if(showAmazonNotice){
				$("#amazonNotice").show();
			}

			$("#nextButtonContainer").show();
		}
	});
});

function startGame(){
	$("#strike1").attr("src", "images/emptyStrike.png");
	$("#strike2").attr("src", "images/emptyStrike.png");
	$("#strike3").attr("src", "images/emptyStrike.png");

	$("#gameContainer").slideDown();

	$("#gameOverProductSummary").html('<h2>Products on your run:</h2> <h5 id="summaryAmazonInstructions">Click item to see amazon page</h5>');
	$("#gameOverContainer").hide();

	clearField()
	loadNewProduct();

	allProductsForRun = [];
	strikes = 0;
	score = 0;
	$("#scoreContainer").html("Score: " + score)

	lost = false;
}

function clearField(){
	$(".price").html("")
	$(".oldPrice").html("");
	$(".aPriceButton").hide();
	$("#productImage").attr("src", "images/loading.gif");
	$("#productTitle").html("");
	$("#amazonNotice").hide();
	$("#nextButtonContainer").hide();
	$(".aPriceButton").css("background-color", "#fff")
	hasGuessed = false;
	$("#productArea").css("cursor", "auto");

}

function gameOver(){
	$("#gameOverContainer").show();
	$("#numCorrect").html(score);
	if(score > highScore){
		highScore = score;
		localStorage.setItem('highScore', highScore);
	}
	$("#highScore").html("High Score: " + highScore)
	for (var i = 0; i < allProductsForRun.length; i++) {
		// console.log(renderProductSummary(allProductsForRun[i]));
		$("#gameOverProductSummary").append(renderProductSummary(allProductsForRun[i]))
	}
		
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

		$("#priceButton" + correctBox).find(".price").html("$"+data.showPrice.toFixed(2));
		if(data.oldPrice){
			//$("#priceButton" + correctBox).find(".oldPrice").html(data.oldPrice.toFixed(2));
			//var saleRatio = data.oldPrice.toFixed(2) / data.showPrice.toFixed(2);			
		}

		var possibleScales = []
		if(price < 10){
			// console.log("<10")
			possibleScales[0] = 2;
			possibleScales[1] = 4;
			possibleScales[2] = 6;
			possibleScales[3] = 8;
		}else if(price < 20){
			// console.log("<20")
			possibleScales[0] = 8;
			possibleScales[1] = 12;
			possibleScales[2] = 15;
			possibleScales[3] = 5;
		}else if(price < 40){
			// console.log("<40")
			possibleScales[0] = 12;
			possibleScales[1] = 18;
			possibleScales[2] = 22;
			possibleScales[3] = 7;
		}else if(price < 60){
			possibleScales[0] = 17;
			possibleScales[1] = 25;
			possibleScales[2] = 32;
			possibleScales[3] = 10;
		}else if(price < 80){
			possibleScales[0] = 15;
			possibleScales[1] = 23;
			possibleScales[2] = 30;
			possibleScales[3] = 9;
		}else if(price < 110){
			possibleScales[0] = 15;
			possibleScales[1] = 34;
			possibleScales[2] = 45;
			possibleScales[3] = 25;
		}else if(price < 150){
			possibleScales[0] = 29;
			possibleScales[1] = 35;
			possibleScales[2] = 45;
			possibleScales[3] = 18;
		}else if(price < 200){
			possibleScales[0] = 30;
			possibleScales[1] = 45;
			possibleScales[2] = 90;
			possibleScales[3] = 65;
		}else{
			possibleScales[0] = 50;
			possibleScales[1] = 100;
			possibleScales[2] = 200;			
			possibleScales[3] = 150;
		}
		// console.log("correctbox ", correctBox)
		var pickedPrices = [price];

		var numberThatShouldBeBelow = Math.floor(Math.random()*4)
		var numberThatShouldBeAbove = 3 - numberThatShouldBeBelow;
		var numberAbove = 0;
		var numberBelow = 0;

		for (var i = 1; i <= 4; i++) {
			if(i != correctBox){
				// console.log("I ", i);

				var attemptCount = 0;
				var alreadyPicked = false;

				do{
					attemptCount = attemptCount + 1;

					// console.log("picked prices: ", pickedPrices);
					var offset = possibleScales[Math.floor(Math.random()*3)];
					if(attemptCount < 100){
						if(numberBelow < numberThatShouldBeBelow){
							offset = offset * -1;
						}
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

				$("#priceButton" + i).find(".price").html("$"+(price + offset).toFixed(2));
				if(data.oldPrice){
					//$("#priceButton" + i).find(".oldPrice").html(((data.oldPrice+offset).toFixed(2));
					//$("#priceButton" + i).find(".oldPrice").html(((price+offset) * saleRatio).toFixed(2));
				}
			}
		}
		allProductsForRun.push(data);
		$(".aPriceButton").show();

	});
}

function renderProductSummary(product){
	return '<a target="_blank" href="' + product.productURL + '"><div class="col-md-3 summaryContainer"><div class="summaryImageContainer"><img src=' + product.largeURL +' class="summaryImage"></div><div class="summaryTitle">' + product.title + '</div><div class="summaryMoneyAmount">$' + product.showPrice + '</div></div></a>'
}



