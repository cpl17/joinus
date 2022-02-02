var express = require('express');
var app = express();
var mysql = require('mysql')
var bodyParser = require("body-parser")

// Configure App

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Set up connection
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database: 'join_us'
}) ;

// "/"

app.get("/", function(req,res){
	// Find count 
	
	var q = 'SELECT COUNT(*) AS total FROM users'
	
	connection.query(q, function(error, results, fields) {
		if(error) throw error;
		var count = results[0].total;
		
		// res.send("Viewer count is " + count);
		res.render("home", {data: count});
		});
});

// "/register"

app.post("/register", function(req,res){
	var person = {
			email: req.body.email
	};
	
	connection.query('INSERT INTO users SET ?', person, function(error, result){
		if(error) throw(error);
		res.redirect("/")
	});
})

// "/joke"

app.get("/joke", function(req,res){
	var joke = "Knock Knock";
	res.send(joke);
});

// "/random_num"

app.get("/random_num", function(req,res){
	var num = Math.random();
	res.send("Your lucky num is " + num);
});


app.listen(3000, function(){
	console.log("Server running on 3000");
});