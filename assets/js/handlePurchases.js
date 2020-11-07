// var requre
// const axios = require("axios");
// import axios from './axios.js';

// const { resolve } = require("bluebird");

// const { overArgs } = require("lodash");

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function delet (arg1,arg2,arg3,arg4,arg5){
    alert([arg1,arg2,arg3,arg4,arg5].join(" | "))
}
// function refreshCache(){
//     localStorage.removeItem("DazaiGuildListCached")
    
//     window.location.replace(window.location.href);
// }
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
    theUrl.code = JSON.parse(localStorage.getItem("DazaiAPIData")).authToken;
    return new Promise(function (res,rej){


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
        const url='https://api.dazai.app:8080/api/getGuilds';
        Http.open("POST", url);
        
        var access_token = "5938ea"
        // Http.setRequestHeader('Authorization', 'Bearer ' + access_token);
        Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        Http.onreadystatechange = (e) => {
        //   console.log(Http.responseText)
        if (Http.readyState==4 || Http.readyState=="complete"){
            res(Http.responseText);
        } 
        }
        Http.send(JSON.stringify(theUrl));
    })
}
async function yes(){
    var guildid = getUrlVars("code")
console.log("yas")
if (!localStorage.getItem("DazaiAPIData") && !guildid){
    window.location.replace("https://discord.com/api/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Fself%2F&response_type=code&scope=identify")
}
httpGet(guildid).then(chans=>{
    
    // console.log()
    const guilds = JSON.parse(chans)
    let balinfo = chans.bal.coins;
    let offers = chans.offers
    document.getElementById("coinCount").innerHTML = "You have <strong>"+balinfo+" DC</strong>"
    let group1 = document.getElementById("group1")
    let group2 = document.getElementById("group2")
    let group3 = document.getElementById("group-3")
    offers.forEach((item,index) => {
        let addGroup = (index%3==0? group1:(index%3==1?group2:group3))
        addGroup.innerHTML += "<div class=\"card\"><img class=\"card-img-top w-100 d-block\" src=\""+item.fullImg+"\" />\
        <div class=\"card-body\">\
            <h4 class=\"card-title\" style=\"font-size: 24px;\">"+item.name+"</h4>\
            <h4 class=\"card-title\" style=\"font-size: 16px;color: "+(balinfo >= item.price? "rgb(213,216,252)":"rgb(213,50,50)")+";\">"+item.price+" DC</h4>\
            <p class=\"card-text\">"+item.lore+"</p>"+(balinfo >= item.price? "<button class=\"btn\" type=\"button\" onclick=\"\">Buy Now</button>":"")+"</div>\
    </div>";
    });

//     var element = document.getElementById("reroBody");
//     var title = document.getElementById("cDaash");
//     let chansparse = JSON.parse(chans);
//     console.log(chansparse)
//     title.innerHTML+=""+chansparse.chanName
//     document.getElementById("aiStrict").value = (chansparse.aiMod && chansparse.aiMod.sense? chansparse.aiMod.sense: 1)
//     chansparse.aiMod.exempts.forEach(x=>{
//         document.getElementById(x).checked = true;
//     }) 
//     document.getElementById("dazaiOn").checked = chansparse.aiMod.on;
//     document.getElementById("dazaiOnControl").innerHTML = (chansparse.aiMod.on? "On":"Off");
//     chansparse.disabledcmds.forEach((x)=>{
//         let switc = (x.disabled? "<div class=\"form-check custom-control custom-switch\"><input type=\"checkbox\" class=\"form-check-input custom-control-input\" id=\"switch_"+x.name+"\" onchange=\"doalert(this,'"+x.name+"_tag')\" /><label class=\"form-check-label custom-control-label\" id=\""+x.name+"_tag\" for=\"switch_"+x.name+"\" style=\"font-size: 24px;\">False</label></div>":"<div class=\"form-check custom-control custom-switch\"><input type=\"checkbox\" class=\"form-check-input custom-control-input\" id=\"switch_"+x.name+"\" onchange=\"doalert(this,'"+x.name+"_tag')\" /><label class=\"form-check-label custom-control-label\" id=\""+x.name+"_tag\" for=\"switch_"+x.name+"\" style=\"font-size: 24px;\">False</label></div>")
//         document.getElementById("cmds").innerHTML+=("\
//         <tr>\
//     <td style=\"text-align: left;\" id=\""+x.name+"\">"+x.name+"</td>\
//     <td class=\"text-center\" >"+switc+"</td>\</tr>")
//     })

//     chansparse.reros.forEach((x)=>{
//         var item = (x.emote.includes("https://")? '<img style="width: 31px;height: 32px;" src="'+x.emote+'" />':x.emote)
//         element.innerHTML +=("\
//         <tr>\
//     <td class=\"text-center\" id=\""+x.chanid+"\">"+item+"</td>\
//     <td class=\"text-center\">"+x.role+"</td>\
//     <td class=\"text-center\">"+x.msg+"</td>\
//     <td class=\"text-center\">"+x.channel+"</td>\
//     <td class=\"text-center\">"+x.roleid+"</td>\
//     <td style=\"text-align: center;\"><button id=\"button_"+x.chanid+"\" class=\"btn btn-danger\" style=\"margin-left: 5px;background: rgb(231,74,59);\" onclick=\"delet("+[x.emote,x.channel,x.msg,x.roleid].join(",")+")\" type=\"submit\"><i class=\"fa fa-trash\" style=\"font-size: 15px;\"></i></button></td>\</tr>");
    
   
    
    
    
    
//     function waitForLoad(id, callback){
//         var timer = setInterval(function(){
//             if(document.getElementById(id)){
//                 clearInterval(timer);
//                 console.log("loaded")
//                 callback();
//             }
//         }, 100);
//     }
//     waitForLoad("button_"+x.chanid+"\"",()=>{
//         document.getElementById("button_"+x.chanid+"\"").onclick = ()=> {
//             alert("Button for "+x.chanid+"clicked!");
//          };
//     })
   
//     })
    
//     // console.log(chans,guildid,JSON.stringify(guildid))
})
}
yes();

