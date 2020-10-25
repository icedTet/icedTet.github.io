// var requre
// const axios = require("axios");
// import axios from './axios.js';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function httpGet(theUrl)
{
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    // if (xmlHttp.readyState == XMLHttpRequest.DONE) {
    //     alert(xmlHttp.responseText);
    // }
    // }  
    // xmlHttp.open( "GET", "http://98.37.151.150:8080/api/admin", false ); // false for synchronous request
    // xmlHttp.send( JSON.stringify(theUrl) );
    // console.log(xmlHttp.statusText)
    return new Promise(function (res,rej){
        const Http = new XMLHttpRequest();
        const url='https://api.dazai.app:8080/api/getCommands';
        Http.open("GET", url);
        
        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
          console.log("bak")
                    if (Http.readyState==4 || Http.readyState=="complete") res(Http.responseText);
        }
        Http.send(JSON.stringify(theUrl));
    })
}
async function yes(){
    var guildid = getUrlVars("code")
console.log("yas")
httpGet(guildid).then(chans=>{
    let element = document.getElementById("commandList");
    let data = JSON.parse(chans);
    data.forEach(item => {
        element.innerHTML+="<tr>\
        <td style=\"color: rgb(214,214,214);\">"+item.name+"</td>\
        <td style=\"color: rgb(214,214,214);\">"+item.description+"</td>\
        <td style=\"color: rgb(214,214,214);\">"+item.usage+"</td>\
    </tr>"
    });
    // alert("Done!")

})
}
yes();
