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

 function createTrade(){
    let offers = document.getElementById("givegib")
    let takes = document.getElementById("takey")
    let str ;
    if (offers.childElementCount === 0 && takes.childElementCount === 0) return alert("You cannot create a blank trade!");
    if (takes.childElementCount === 0 && !confirm("Are you sure you want to leave the return box blank (You are donating your offerings)?")) return;
    if (offers.childElementCount === 0 && !confirm("Are you sure you want to leave the offer box blank (You are asking for donations)?")) return;
    if (!confirm("Are you 100% Sure you would like to create the trade? You will lose access to the offered items for as long as the trade is on")) return;
    let Http = new XMLHttpRequest();
    const url = 'https://api.dazai.app:8080/api/create-trade';
    Http.open("POST", url);

    var access_token = "5938ea"
    // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.onreadystatechange = (e) => {
        //   console.log(Http.responseText)
        if (Http.readyState == 4 || Http.readyState == "complete") {
            let pdata = JSON.parse(Http.responseText)
            if (pdata.failed){
                alert(pdata.reason);
                return
            }else{
                alert("Horray! Your trade is now live at : https://dazai.app/trade?id="+pdata.tradeID+" . I have also Dmed you a copy of this link! Share it to whomever you would like to trade with!")
            }
            
            if (pdata.pass){
                window.location.replace("http://dazai.app/self/");
            }
        }
    }
    let offer = [];
    console.log(offers.childNodes)
    offers.childNodes.forEach(x=>offer.push(x));
    let take = [];
    takes.childNodes.forEach(x=>take.push(x));
    offer = offer.map(x=>{
        let quant; 
        try {
            quant = parseInt(x.childNodes[0].childNodes[3].childNodes[14].innerText.replace("Quantity : ",""));
            if (isNaN(quant)) quant = undefined;
        } catch (error) {
            
        }
        if (quant){
            quant +="";
        }
        return{
            id: x.id.split("-card-clone-give")[0],
            serial:quant
        }
       
    })
    take = take.map(x=>{
        return{
            id: x.id.split("-card-clone-take")[0],
        }
       
    })
    // console.log(offer,"ar",take)
    // console.log(token);
    // return;
    Http.send(JSON.stringify({
        code: JSON.parse(localStorage.getItem("DazaiAPIData")).authToken,
        give: offer,
        want: take,
        anon: document.getElementById("checkAnon").checked
    }));
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
        
        // window.location.replace("http://dazai.app/self/");
        // return;
    }
    
    let tradeData = JSON.parse(await getTrade(getUrlVars("id")));
    // console.log("p1")
    if (!tradeData){
        return alert("Invalid Trade ID!");
    }else{
        console.log(tradeData)
    let offers = tradeData.trade.tradegive
    let giveup = tradeData.trade.tradetake;
    document.getElementById("lengthA").style = "width: "+((tradeData.user.name.length*20)+350)+"px;text-align: right;"
    document.getElementById("traderName").innerHTML = tradeData.user.name + '<img id="traderPic" src="'+tradeData.user.avatar+'" width="48" height="48" style="margin-left: 50px;border-radius:10px" />'
   
   //  document.getElementById("traderPic").src = +tradeData.user.avatar
    document.getElementById("unhidecard").style = "margin-left: 25px;";
     if (getinv){
         
        console.log(offers)
         let inv = JSON.parse(await httpGet({})).inventory;
         console.log(inv)
         offers = offers.map(x=>{
             console.log(x)
            x.amount = inv.filter(y=>y.id.toLowerCase() === x.id.toLowerCase()).length;
            return x;
        });
        giveup = giveup.map(x=>{
            x.amount = inv.filter(y=>y.id.toLowerCase() === x.id.toLowerCase()).length
            return x;
        });
        let offerI = document.getElementById("group1");
        offers.map(x=>{
            offerI.innerHTML+="<div class=\"card shadow-lg\" style=\"border-radius: 12px;border-style: none;\"><img class=\"card-img-top w-100 d-block\" src=\""+"\" />\
            <div class=\"card-body\">\
                <h4 class=\"card-title\" style=\"font-size: 24px;\">Eve-ning</h4>\
                <p class=\"card-text\" style=\"color: rgb(220,220,220);font-size: 12px;margin-top: -15px;\">id: <code>eve-ning</code></p>\
                <p class=\"card-text\">SUPER RARE</p>\
                <p class=\"card-text\" style=\"font-size: 12px;color: rgb(255,255,255);\">You own 0 of this</p>\
            </div>\
        </div>"
        })
        
     }   
    //  console.log(tradeData.user,document.getElementById("traderPic").src,tradeData.user.avatar);

    
    }
}
yes();

