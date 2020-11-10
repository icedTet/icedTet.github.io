https://api.dazai.app:8080/api/botstats

// var requre
// const axios = require("axios");
// import axios from './axios.js';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function httpGet(theUrl) {
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    // if (xmlHttp.readyState == XMLHttpRequest.DONE) {
    //     alert(xmlHttp.responseText);
    // }
    // }  
    // xmlHttp.open( "GET", "http://98.37.151.150:8080/api/admin", false ); // false for synchronous request
    // xmlHttp.send( JSON.stringify(theUrl) );
    // console.log(xmlHttp.statusText)

    return new Promise(function (res, rej) {
        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/botstats';
        Http.open("GET", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
            // console.log("bak")
            if (Http.readyState == 4 || Http.readyState == "complete") {
                try {
                    let resultOBJ = JSON.parse(Http.responseText)
                    // {
                    //     "guilds": 57,
                    //     "members": 2107,
                    //     "uptime": "00 Hour(s) 00 Minute(s) and 08 Second(s)",
                    //     "shards": 2,
                    //     "pings": [
                    //         89,
                    //         92
                    //     ]
                    // }
                    let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
                    let avgPing = 0;
                    resultOBJ.pings.forEach(element => avgPing+=element);
                    avgPing = avgPing/resultOBJ.pings.length
                   
                    async function displayResults(){
                        for (var i = 0 ; i < 250;i++) {
                            await sleep(1);
                            document.getElementById("changeText").innerHTML = "<p>Serving "+Math.floor(resultOBJ.guilds*i/250)+" guilds</p>\
                            <p>with a total of "+Math.floor(resultOBJ.members*i/250)+" unique members\n</p><p>"+Math.floor(resultOBJ.shards*i/250)+" Shards with an average ping of "+Math.floor(avgPing*i/250)+"</p>";
                        }
                        
                        document.getElementById("changeText").innerHTML = "<p>Serving "+Math.floor(resultOBJ.guilds)+" guilds</p>\
                            <p>with a total of "+Math.floor(resultOBJ.members)+" unique members\n</p><p>"+Math.floor(resultOBJ.shards)+" Shards with an average ping of "+(avgPing)+"</p>";
                    }
                    document.getElementById("changeText").onscroll =  displayResults();
                    
                } catch (er) {} 
                // console.log(localStorage.getItem("dazaiCommandsCached"))
                res(Http.responseText);
            }
        }
        Http.send(JSON.stringify(theUrl));
    })
}
async function yes() {
    var guildid = getUrlVars("code")
    // console.log("yas")
    
    httpGet(guildid).then(chans => {
        
        // alert("Done!")

    })
}
yes();

