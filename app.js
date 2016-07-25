const dotenv = require('dotenv');

var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var amazon = require('amazon-product-api');

var index = require("./routes/index");

var app = express();

dotenv.load({ path: '.env' });

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);

mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});


function getRandomProduct(){
  var productCategories = [
		{name: "Appliances", ID: "2619526011"},
		{name: "Baby", ID: "165797011"},
		{name: "Cell Phones & Accessories", ID: "2335753011"}
	]

	var productCategory = productCategories[Math.floor(Math.random()*productCategories.length)];

	var client = amazon.createClient({
	  awsId: process.env.AWSAccessKeyId,
	  awsSecret: process.env.AWSSecretKey,
	  awsTag: "nattestad-20"
	});

	client.itemSearch({
	  searchIndex: 'Books',
	  sort:"salesrank",
	  BrowseNode:productCategory.ID,
	  responseGroup: 'ItemAttributes,Offers,Images'
	}).then(function(results){
		console.log(JSON.stringify(results));
	  return results[Math.floor(Math.random()*results.length)]
	}).catch(function(err){
		console.log(JSON.stringify(err));
	});
}


