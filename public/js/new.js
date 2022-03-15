// Kory Kinter

"use strict";

function showNewTopic() {
    if($("topic").value !== "") {
        $("newTopic").style.display = "none";
    } else {
        $("newTopic").style.display = "block";
    }
}

window.onload = function() {
    $("topic").addEventListener("change", showNewTopic);
};