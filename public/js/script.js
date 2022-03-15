//Kory Kinter

"use strict";

let $ = function(id){
    return document.getElementById(id);
};

let newLoc = function() {
    location = "connections.html";
};

let logit = function() {
    console.log($("topic").value);
}