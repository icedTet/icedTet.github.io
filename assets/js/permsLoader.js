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
        try {
            if (localStorage.getItem("dazaiPermsCached") && JSON.parse(localStorage.getItem("dazaiPermsCached")).expires > (new Date()).getTime()) {
                console.log("Using Results cache")
                res(JSON.parse(localStorage.getItem("dazaiPermsCached")).responseText);
                return localStorage.getItem("dazaiPermsCached").responseText;
            }
        } catch (er) {
            alert("Warning, Brower Cache read request denied. Please grant access to the browser cache or some features like the Dazai Panel will not work!")
        }
        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app/api/getPerms';
        Http.open("GET", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
            // console.log("bak")
            if (Http.readyState == 4 || Http.readyState == "complete") {
                try {
                    console.log("Fetched data!")
                    localStorage.setItem("dazaiPermsCached", JSON.stringify({
                        expires: (new Date()).getTime() + 86400000,
                        responseText: Http.responseText
                    }))
                } catch (er) {} 
                // console.log(localStorage.getItem("dazaiPermsCached"))
                res(Http.responseText);
            }
        }
        Http.send(JSON.stringify(theUrl));
    })
}
async function yes() {
    // console.log("yas")
    httpGet().then(chans => {
        let data = JSON.parse(chans);
        // data.sort()d
        data = data.filter(x => x)
        data = data.sort(function (a, b) {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });
        let ani = document.getElementById("perms")
        data.forEach(x => {
            ani.innerHTML+=`<li class="list-group-item" style="text-align: right;margin-top: 10px;">
            <span>${x}</span>
            </li>`
        });
        // alert("Done!")

    })
}
yes();

