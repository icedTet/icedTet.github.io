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
    theUrl.code = JSON.parse(localStorage.getItem("DazaiAPIData")).authToken;
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

        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/getInventory';
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
    // console.log(xmlHttp.statusText) 
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
        token.url = "https://dazai.app/inventory/"
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

 function setCust(itemID){
    const Http = new XMLHttpRequest();
    const url = 'https://api.dazai.app:8080/api/set-cust';
    Http.open("POST", url);

    var access_token = "5938ea"
    // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.onreadystatechange = (e) => {
        //   console.log(Http.responseText)
        if (Http.readyState == 4 || Http.readyState == "complete") {
            let pdata = JSON.parse(Http.responseText)
            alert(pdata);
            if (pdata.pass){
                window.location.replace("http://dazai.app/inventory/");
            }
        }
    }
    // console.log(token);
    Http.send(JSON.stringify({
        code: JSON.parse(localStorage.getItem("DazaiAPIData")).authToken,
        item: itemID
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
    // console.log(guildid["code"])
    if (!localStorage.getItem("DazaiAPIData") && guildid && !guildid["code"]) {
        window.location.replace("https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Finventory%2F&response_type=code&scope=identify%20email%20connections%20guilds")
        return;
    }
    if (!localStorage.getItem("DazaiAPIData") && guildid && guildid.code){
        let resData = await login(guildid);
        localStorage.removeItem("DazaiAPIData");
        localStorage.setItem("DazaiAPIData",resData)
        
        // window.location.replace("http://dazai.app/self/");
        // return;
    }
    httpGet(guildid).then(chans => {

        // console.log()
        const data = JSON.parse(chans)
                if (data === "relog"){
            localStorage.clear()
            return window.location.replace("https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Finventory%2F&response_type=code&scope=identify%20email%20connections%20guilds")
        } 
        let items = data.allItems;
        let element = document.getElementById("allInv");
        items = items.map((item)=>{
            let arr = data.inventory.map(x=>x.id);
            console.log(arr)
            item["amnt"] = arr.filter(x=>{
                console.log(x,item.itemName,x.toLowerCase() === item.itemID.toLowerCase())
                return x.toLowerCase() === item.itemID.toLowerCase()
            }).length;
            item["amnt"] =item.free || item["amnt"];
            return item;
        })
        let height = 400
        let numbered = items.filter(x=>x.isNumbered).sort((a,b)=>b.amnt-a.amnt);
        if (numbered.length > 0){
            height += (numbered[0].amnt)*20
        }
        items.sort((a,b)=>b.amnt-a.amnt)
        for (let a = 0 ; a < Math.ceil(items.length/3);a++){
            let fp = "<div class=\"row align-items-center\">";
            for (let i =a*3 ; i<((a*3)+3);i++){
                item = items[i];
                // console.log(item)
                fp = fp+"<div class=\"col\" style=\"opacity: "+(item.amnt!==0? 1:0.2)+";\">"
                fp += `<div class=\"card\" style=\"height: "+height+"px;margin-top: 15px;margin-bottom: 15px;${data.currentBG === item.itemID.toLowerCase() || data.currentBG+"cs" === item.itemID.toLowerCase()? "background-color:rgb(9,9,9);":""}\">\
                    <div class=\"card\" ><img class=\"card-img-top w-100 d-block\" src=\"${item.image}\" /></div>\
                    <div class=\"card-body\">\
                    <p class=\"card-text\" style=\"font-size: 12px;color: rgb(200,200,200);\">x${item.amnt}</p>\
                    <p style=\"font-size: 12px;color: rgb(100,100,100);\">id: <code>${item.itemID}</code></p>\
                    <button class="btn btn-info" type="button" onclick="setCust(&quot;${item.itemID}&quot;)">Set As Main</button>`
                fp +="<h4 class=\"card-title\">"+item.itemName+"</h4>\
                        <h6 class=\"text-muted card-subtitle mb-2\">"+(CapEach(item.rarity)).replace(/\_/g," ")+"</h6>\
                        <p class=\"card-text\">"+item.itemLore+"</p>"
                        if (item.isNumbered){
                            let ntext = []
                            let filt = data.inventory.filter(x=>x.id.toLowerCase() === item.itemID.toLowerCase())

                            filt.sort((a,b)=> (a.serial|| 0 )-(b.serial || 0))
                            for (let b = 0 ; b< filt.length;b++){
                                ntext.push("#"+(filt[b].serial || "N/A")+ " of "+item.currentNum);
                            }
                            fp +='<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br /><code>'+ntext.join("<br />")+'</code></p>'
                        }
                
                fp +="</div>\
                </div>\
            </div>"
            }
            fp += "</div>";
            element.innerHTML+= fp;
        }
    })
    
}
yes();

