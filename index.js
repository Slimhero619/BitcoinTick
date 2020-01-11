const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ba = require('bitcoinaverage');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendfile(__dirname + "/index.html");

app.post("/", function(req, res){

    // console.log(req.body.crypto);

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";
    var amount = req.body.amount;
  
    var options = {
        url: baseURL,
        method: "GET", 
        qs: {
            from:crypto,
            to: fiat,
            amount: amount
        }
    };
    
    
    request(options, function(error, response, body){
        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);
        var currentdate = data.time;


        res.write("The current date is " + currentdate);
        res.write(" " + amount + crypto + " is currently worth " + price + fiat + " ");
        res.send();
    });

    
});





});
app.listen(3000, function(){
console.log("Server is running on port 3000")
});

