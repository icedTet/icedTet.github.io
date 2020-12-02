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

        const Http = new XMLHttpRequest();
        const url = 'https://api.dazai.app:8080/api/getInventory';
        Http.open("POST", url);

        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
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
            console.log("x.childNodes[0].childNodes[3].childNodes[10]",x.childNodes[0].childNodes[3].childNodes[12])
            quant = parseInt(x.childNodes[0].childNodes[3].childNodes[12].innerText.replace("Serial Number: ",""));
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
async function removeItem(self){
    if (self.parentElement.parentElement.parentElement.parentElement.id === "givegib"){
        let thing = document.getElementById(self.parentElement.parentElement.parentElement.id.split("-clone")[0]);
        thing.childNodes[0].childNodes[1].childNodes[0];
        thing.childNodes[0].children[1].children[0].innerText = "x"+(parseInt((thing.childNodes[0].children[1].children[0].innerText).replace("x",""))+1)
        thing.style = "opacity: 1.0"
    }
    let offers = document.getElementById("givegib")
    let takes = document.getElementById("takey")
    let str ;
    self.parentElement.parentElement.parentElement.remove();
    if (offers.childElementCount === 0 && takes.childElementCount === 0){
        document.getElementById("create-trade").style = "background: rgb(24,24,24);border-radius: 9px;border-width: 0px;display:none;";
        document.getElementById("checkboxx").style = "display:none;"
    }
    
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
async function addToOffer(id,self){
    let offers = document.getElementById("givegib")
    let takes = document.getElementById("takey")
    let gtitle = document.getElementById("giveAwayTitle")
    let tTitle = document.getElementById("TakeTitle").child
    // console.log(self.parentElement.children[0])
    let qres = (self.parentElement.children[0].innerText.replace("x","")-1)
    
    if (qres < 0){
        return;
    }
    
    self.parentElement.children[0].innerText = "x"+ qres;
    if (offers.childElementCount > 5){
        alert("You can only give away a maximum of 6 items per side!");
        return
    }
    if (qres == 0){
        self.parentElement.parentElement.parentElement.style = "opacity: 0.2";
    }
    let item = document.getElementById(id);
    // console.log(item)
    let clone = item.cloneNode(true);
    // console.log(clone.innerHTML,clone.innerHTML.replace('<button class="btn btn-primary ffs" type="button" style="background: rgb(50,50,50);margin-top:25px;" onClick= addToOffer(\"'+id+'\")>Offer</button>',""))
    //<button class="btn btn-primary ffs" type="button" style="background: rgb(50,50,50);margin-top:25px;" onclick="addToOffer(&quot;detective_agency-card)">Offer</button>
    clone.innerHTML = clone.innerHTML.replace('<button class="btn btn-primary ffs" type="button" style="background: rgb(50,50,50);margin-top:25px;"','<button class="btn btn-primary ffs" type="button" style="display:none"').replace('style="margin-left: 20px;margin-top:25px;background: rgb(143,93,95);"','style="display: none;"').replace('style="font-size: 12px;color: rgb(200,200,200);"','style="display:none"')
    clone.style = "opacity: 1.0";
    clone.id +="-clone-give";
    // let c = clone.childNodes[0].childNodes[3];
    if (clone.innerHTML.includes('<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#')){
        // '<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#3 of 8<br>#4 of 8<br>#5 of 8<br>#6 of 8<br>#7 of 8</code></p>'
        let preparse = clone.innerHTML.split('<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#')[1].split("</code></p>")[0].split("<br>").map(x=>x.replace(/\#/g,"").split(" ")[0]);
        console.log(preparse)
        
       let res = prompt("Please enter which serial number you would like to offer (Possible Options : "+preparse.join(" , ")+"):", "");
       while (!preparse.includes(res) && res && res !== ""){
           console.log(res)
        res = prompt("I don't think you have that serial number! Please enter which serial number you would like to offer (Possible Options : "+preparse.join(" , ")+"):", "");
       }
       if (!res || res === ""){
           return
       }
       try {
        let cutout ='<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#'+ clone.innerHTML.split('<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#')[1].split("</code></p>")[0]+'</code></p>';
        clone.innerHTML = clone.innerHTML.replace(cutout,"");
       } catch (error) {
           
       }

       
       clone.childNodes[0].childNodes[3].innerHTML+= '<br><p class="card-text" style="font-size: 20px;color: rgb(200,200,200);" id="'+id+'-serial1">Serial Number: '+res+"</p>";
       console.log(clone.childNodes[0].childNodes[3]);
       
    //    clone.innerHTML = qsp[0]+ '<p class="card-text">'+qvar[0]+'</p>' +'<br><p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">Serial: '+res+"</p>" +qsp[1];
    }
    // console.log(clone.innerHTML.includes('<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#')
    clone.childNodes[0].childNodes[3].innerHTML += '<br><p style="font-size: 24px;color: rgb(200,200,200);" id="'+id+'-quant-give">Quantity : 1</p>'+ '<button class="btn btn-primary ffs" type="button" style="background: rgb(200,50,50);margin:0px;border-radius: 5px;border-width: 0px;margin-left:-1px" onclick="removeItem(this)">Remove Item</button>';
    offers.append(clone);
    document.getElementById("checkboxx").style = "";
    document.getElementById("create-trade").style = "background: rgb(24,24,24);border-radius: 9px;border-width: 0px;"
    gtitle.style = "text-align: left;margin-top: 0px;font-family: Catamaran, sans-serif;font-size: 32px;padding-left: 20px;"
    tTitle.style = "text-align: left;margin-top: 15px;font-family: Catamaran, sans-serif;font-size: 32px;padding-left: 20px;";
    
    // (takes.childElementCount == 0? tTitle.innerText = tTitle.innerText.replace(" Nothing Wanted!","")+" Nothing Wanted!" : tTitle.innerText = tTitle.innerText.replace(" Nothing Wanted!",""));
    // (offers.childElementCount == 0? gtitle.innerText= gtitle.innerText.replace(" Nothing Offered!","")+ " Nothing Offered!" : gtitle.innerText = gtitle.innerText.replace(" Nothing Offered!",""));
}
async function addToWant(id){
    let offers = document.getElementById("givegib")
    let takes = document.getElementById("takey")
    let gtitle = document.getElementById("giveAwayTitle")
    let tTitle = document.getElementById("TakeTitle")
    document.getElementById("create-trade").style = "background: rgb(24,24,24);border-radius: 9px;border-width: 0px;display:block;"

    if (takes.childElementCount > 5){
        alert("You can only accept a maximum of 6 items per side!");
        return
    }
    let item = document.getElementById(id);
    // console.log(item)
    let cl = item.cloneNode(true);
    cl.id +="-clone-take";
    try {
        let cutout ='<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#'+ cl.innerHTML.split('<p class="card-text" style="font-size: 12px;color: rgb(200,200,200);">You Own :<br><code>#')[1].split("</code></p>")[0]+'</code></p>';
        cl.innerHTML = cl.innerHTML.replace(cutout,"");
        
    } catch (error) {
        
    }

    // console.log(clone.innerHTML,clone.innerHTML.replace('<button class="btn btn-primary ffs" type="button" style="background: rgb(50,50,50);margin-top:25px;" onClick= addToOffer(\"'+id+'\")>Offer</button>',""))
    cl.innerHTML = cl.innerHTML.replace('style="background: rgb(50,50,50);margin-top:25px;"','style="display: none;"').replace('style="margin-left: 20px;margin-top:25px;background: rgb(143,93,95);"','style="display: none;"').replace('style="font-size: 12px;color: rgb(200,200,200);"','style="display:none"')
    cl.style = "opacity: 1.0";
    cl.childNodes[0].childNodes[3].innerHTML += '<br><p style="font-size: 24px;color: rgb(200,200,200);" id="'+id+'-quant-want">Quantity : 1</p>' + '<button class="btn btn-primary ffs" type="button" style="background: rgb(200,50,50);margin:0px;border-radius: 5px;border-width: 0px;margin-left:-1px" onclick="removeItem(this)">Remove Item</button>';
    takes.append(cl);
    document.getElementById("checkboxx").style = ""
    document.getElementById("create-trade").style = "background: rgb(24,24,24);border-radius: 9px;border-width: 0px;"
    gtitle.style = "text-align: left;margin-top: 0px;font-family: Catamaran, sans-serif;font-size: 32px;padding-left: 20px;"
    tTitle.style = "text-align: left;margin-top: 15px;font-family: Catamaran, sans-serif;font-size: 32px;padding-left: 20px;";
    // (takes.childElementCount == 0? tTitle.innerText = tTitle.innerText.replace(" Nothing Wanted!","")+" Nothing Wanted!" : tTitle.innerText = tTitle.innerText.replace(" Nothing Wanted!",""));
    
    // (offers.childElementCount == 0? gtitle.innerText= gtitle.innerText.replace(" Nothing Offered!","")+ " Nothing Offered!" : gtitle.innerText = gtitle.innerText.replace(" Nothing Offered!",""));
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
        if (guilds === "relog"){
            localStorage.clear()
            return window.location.replace("https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Finventory%2F&response_type=code&scope=identify%20email%20connections%20guilds")
        } 
        // console.log()
        const data = JSON.parse(chans)
        console.warn(data,"a");
        let items = data.allItems;
        let element = document.getElementById("allInv");
        
        items = items.map((item)=>{
            let arr = data.inventory.map(x=>x.id);
            console.log(arr)
            item["amnt"] = arr.filter(x=>{
                // console.log(x,item.itemName,x.toLowerCase() === item.itemID.toLowerCase())
                return x.toLowerCase() === item.itemID.toLowerCase()
            }).length;

            return item.isTradeable == 1? item:null;
        })
        items = items.filter(x=>x?true:false);
        let height = 450
        let numbered = items.filter(x=>x.isNumbered).sort((a,b)=>b.amnt-a.amnt);
        if (numbered.length > 0){
            height += (numbered[0].amnt)*25
        }
        items.sort((a,b)=>b.amnt-a.amnt)
        for (let a = 0 ; a < Math.ceil(items.length/3);a++){
            let fp = "<div class=\"row align-items-center\">";
            for (let i =a*3 ; i<((a*3)+3);i++){
                item = items[i];
                // console.log(item)
                if (!item.isTradeable) continue;
                fp = fp+"<div class=\"col\" style=\"opacity: "+(item.amnt!==0? 1:0.2)+";\" id= \""+item.itemID+"-card\">"
                fp += "<div class=\"card\" style=\"height: "+height+"px;margin-top: 15px;margin-bottom: 15px;\">\
                    <div class=\"card\" ><img class=\"card-img-top w-100 d-block\" src=\""+item.image+"\" /></div>\
                    <div class=\"card-body\">\
                    <p class=\"card-text\" style=\"font-size: 12px;color: rgb(200,200,200);\">x"+item.amnt+"</p>\
                    <p style=\"font-size: 12px;color: rgb(100,100,100);\">id: <code>"+item.itemID+"</code></p>"
                
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
                item.amnt !=0 ? fp += '<button class="btn btn-primary ffs" type="button" style="background: rgb(50,50,50);margin-top:25px;" onClick= addToOffer(\"'+item.itemID+'-card\",this)>Offer</button>':null;
                fp += '<button class="btn btn-primary ffs" type="button" style="margin-left: 20px;margin-top:25px;background: rgb(143,93,95);" onClick= addToWant(\"'+item.itemID+'-card\")>recieve</button>' 
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

