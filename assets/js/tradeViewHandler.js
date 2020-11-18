// var requre
// const axios = require("axios");
// import axios from './axios.js';

// const { resolve } = require("bluebird");

// const { overArgs } = require("lodash");

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function delet(arg1, arg2, arg3, arg4, arg5) {
    alert([arg1, arg2, arg3, arg4, arg5].join(" | "))
}
// function refreshCache(){
//     localStorage.removeItem("DazaiGuildListCached")

//     window.location.replace(window.location.href);
// }
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
    theUrl = {code :JSON.parse(localStorage.getItem("DazaiAPIData")).authToken};
    return new Promise(function (res, rej) {
try {
    

        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/getInventory';
        Http.open("POST", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
            // console.log(Http.readyState,Http.responseText)
            if (Http.readyState == 4 || Http.readyState == "complete") {
                
                res(Http.responseText);
            }
        }
        // console.log(theUrl)
        Http.send(JSON.stringify(theUrl));
    }catch (error) {
    console.log(error)
    }
    })
}
function getTrade(theUrl) {

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    // if (xmlHttp.readyState == XMLHttpRequest.DONE) {
    //     alert(xmlHttp.responseText);
    // }
    // }  
    // xmlHttp.open( "GET", "http://98.37.151.150:8080/api/admin", false ); // false for synchronous request
    // xmlHttp.send( JSON.stringify(theUrl) );
    // console.log(xmlHttp.statusText) 
    // theUrl.code = JSON.parse(localStorage.getItem("DazaiAPIData")).authToken;
    return new Promise(function (res, rej) {

        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/get-trade';
        Http.open("POST", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
            // console.log(Http.readyState,Http.responseText)
            if (Http.readyState == 4 || Http.readyState == "complete") {
                res(Http.responseText);
            }
        }
        Http.send(JSON.stringify(theUrl));
    })
}
function login(token) {

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    // if (xmlHttp.readyState == XMLHttpRequest.DONE) {
    //     alert(xmlHttp.responseText);
    // }
    // }  
    // xmlHttp.open( "GET", "http://98.37.151.150:8080/api/admin", false ); // false for synchronous request
    // xmlHttp.send( JSON.stringify(theUrl) );
    // theUrl.code = JSON.parse(localStorage.getItem("DazaiAPIData")).authToken;
    return new Promise(function (res, rej) {


        // try {
        //     if (localStorage.getItem("DazaiGuildListCached") && JSON.parse(localStorage.getItem("DazaiGuildListCached")).expire > (new Date()).getTime()){
        //         // console.log(JSON.parse(localStorage.getItem("DazaiGuildListCached")).data,"Returning cache")
        //         res(JSON.parse(localStorage.getItem("DazaiGuildListCached")).data);
        //         return;
        //     }
        // } catch (error) {
        //     // alert(error)
        // }
        token.url = "https://dazai.app/trade/"
        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/login';
        Http.open("POST", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
            //   console.log(Http.responseText)
            if (Http.readyState == 4 || Http.readyState == "complete") {
                res(Http.responseText);
            }
        }
        console.log(token);
        Http.send(JSON.stringify(token));
    })
}

 
function CapEach(str){
    let arr = str.split(" ");
    arr = arr.map(x=>x.split(""));
    arr = arr.map((x)=>{
        x[0] = x[0].toUpperCase();
        return x.join("")
    })
    return arr.join(" ");
}
function acceptTrade(){
    if (!localStorage.getItem("DazaiAPIData")) {
        window.location.href("https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Ftrade&response_type=code&scope=identify")
        // return;
    }
    let theUrl = getUrlVars("id");
    theUrl.code = JSON.parse(localStorage.getItem("DazaiAPIData")).authToken;
    const Http = new XMLHttpRequest();
    const url = 'https://api.dazai.app:8080/api/accept-trade';
    Http.open("POST", url);

    var access_token = "5938ea"
    // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.onreadystatechange = (e) => {
        // console.log(Http.readyState,Http.responseText)
        if (Http.readyState == 4 || Http.readyState == "complete") {
            // res(Http.responseText);
            let resp = JSON.parse(Http.responseText)
            if (resp.failed){
                alert(resp.reason);
            }
            console.log(Http.responseText);
        }
    }
    console.log(theUrl)
    Http.send(JSON.stringify(theUrl));
    // getUrlVars("id")
    // alert("A")
}
async function yes() {
    var guildid = getUrlVars("code")
    let getinv = true;
    // console.log(guildid["code"])
    if (!localStorage.getItem("DazaiAPIData") && guildid && !guildid["code"]) {
        getinv = false
        // return;
    }
    if (!localStorage.getItem("DazaiAPIData") && guildid && guildid.code){
        let resData = await login(guildid);
        localStorage.removeItem("DazaiAPIData");
        localStorage.setItem("DazaiAPIData",resData)
        
        window.location.replace("http://dazai.app/self/");
        // return;
    }
    
    let tradeData = JSON.parse(await getTrade(getUrlVars("id")));
    // console.log("p1")
    if (!tradeData){
        return alert("Invalid Trade ID!");
    }else{
        console.log(tradeData)
    }
    let offers = tradeData.trade.tradegive
    let giveup = tradeData.trade.tradetake;
    document.getElementById("lengthA").style = "width: "+((tradeData.user.name.length*20)+350)+"px;text-align: right;"
    document.getElementById("traderName").innerHTML = tradeData.user.name + '<img id="traderPic" src="'+tradeData.user.avatar+'" width="48" height="48" style="margin-left: 50px;border-radius:10px" />'
   
   //  document.getElementById("traderPic").src = +tradeData.user.avatar
    document.getElementById("unhidecard").style = "margin-left: 25px;";
     if (getinv){
         
        // console.log(offers)
         let inv = JSON.parse(await httpGet({})).inventory;
         console.log(inv)
         offers = offers.map(x=>{
             console.log(x)
            x.amount = inv.filter(y=>(y.id+"").toLowerCase() === (x.itemID+"").toLowerCase()).length;
            return x;
        });
       giveup = giveup.map(x=>{
        x.amount = inv.filter(y=>(y.id+"").toLowerCase() === (x.itemID+"").toLowerCase()).length
        return x;
    });
    }else{
        offers = offers.map(x=>{
            console.log(x)
           x.amount = "N/A"
           return x;
       });
       giveup = giveup.map(x=>{
        x.amount =  "N/A"
        return x;
    });
       
    }
        if (!getinv){
            document.getElementById("tradeBtn").innerHTML = "Sign in to Trade!"
        }
        let offerI = document.getElementById("group1");
        let gib = document.getElementById("group2");
        offers.forEach(x=>{
            offerI.innerHTML+="<div class=\"card shadow-lg\" style=\"border-radius: 12px;border-style: none;\"><img class=\"card-img-top w-100 d-block\" src=\""+x.image+"\" />\
            <div class=\"card-body\">\
                <h4 class=\"card-title\" style=\"font-size: 24px;\">"+x.itemName+"</h4>\
                <p class=\"card-text\" style=\"color: rgb(220,220,220);font-size: 12px;margin-top: -15px;\">id: <code>"+x.itemID+"</code></p>\
                "+(x.isNumbered !==0? "<p class=\"card-text\" style=\"color: rgb(220,220,220);font-size: 12px;margin-top: 0px;\">Serial Number: <code>"+x.serial+"</code></p>":"")+"\
                <p class=\"card-text\">"+x.rarity.replace(/\_/g," ").toUpperCase()+"</p>\
                <p class=\"card-text\" style=\"font-size: 12px;color: rgb(255,255,255);\">You own "+x.amount+" of this</p>\
            </div>\
        </div>"
        })
        giveup.forEach(x=>{
            gib.innerHTML+="<div class=\"card shadow-lg\" style=\"border-radius: 12px;border-style: none;\"><img class=\"card-img-top w-100 d-block\" src=\""+x.image+"\" />\
            <div class=\"card-body\">\
                <h4 class=\"card-title\" style=\"font-size: 24px;\">"+x.itemName+"</h4>\
                <p class=\"card-text\" style=\"color: rgb(220,220,220);font-size: 12px;margin-top: -15px;\">id: <code>"+x.itemID+"</code></p>\
                "+(x.isNumbered !==0? "<p class=\"card-text\" style=\"color: rgb(220,220,220);font-size: 12px;margin-top: 0px;\">Serial Number: <code>"+x.serial+"</code></p>":"")+"\
                <p class=\"card-text\">"+x.rarity.replace(/\_/g," ").toUpperCase()+"</p>\
                <p class=\"card-text\" style=\"font-size: 12px;color: rgb(255,255,255);\">You own "+x.amount+" of this</p>\
            </div>\
        </div>"
        })
        for (var i =0 ; i<6-offers.length;i++){
            offerI.innerHTML+='<div class="card shadow-lg" style="border-radius: 12px;border-style: none;"></div>'
        }
        for (var i =0 ; i<6-giveup.length;i++){
            gib.innerHTML+='<div class="card shadow-lg" style="border-radius: 12px;border-style: none;"></div>'
        }
    //  console.log(tradeData.user,document.getElementById("traderPic").src,tradeData.user.avatar);

    
    }

yes();

 