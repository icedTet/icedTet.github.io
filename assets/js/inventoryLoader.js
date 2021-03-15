

//start with Top Level async await

let open = false;
const rarityColors = {
	"common": "rgb(200,200,200)",
	"rare": "rgb(100,200,100)",
	"super_rare": "rgb(100,150,200)",
	"epic": "rgb(200,100,200)",
	"legendary": "rgb(220,220,10)",
	"uber": "rgb(255,0,0)",
	"starter": "rgb(255,255,255)"
}
const typeMap = {};
typeMap["Card Background"] = "personalbg";
typeMap["Color Scheme"] = "personalcolor";
typeMap["Card Design"] = "design";
const itemMap = new Map();
async function hi() {
	let data = await fetch(`${!localStorage.getItem("dev") ? `https://api.dazai.app` : "http://localhost:8080"}/eco/getInv`,
		{
			
			headers: {
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem("token"),
			},
		});
	if (!data.ok)
		return window.location.href = `${window.location.href.match(/(http(s:|:)\/\/)[^\/]+/)[0]}/login`;
	data = await data.json();
	console.log(data);
	// return;
	document.getElementById("username").innerText = data.userInfo.name;
	document.getElementById("coins").innerText = `${data.userInfo.coins} DazCoin`;
	// document.getElementById("resetsIn").innerText = `Shop refreshes in ${data.refreshesInEnglish}`

	while (document.getElementById("shopArea").childNodes.length) {
		document.getElementById("shopArea").removeChild(document.getElementById("shopArea").childNodes[0]);
	}
	/*
			{
			"itemID": "ani_dazai",
			"itemName": "Dazai Animated",
			"price": 5000,
			"sellable": 1,
			"itemLore": "In my opinion the dopest background!",
			"isNumbered": 1,
			"isTradeable": 1,
			"rarity": "legendary",
			"image": "https://dazai.app/assets/img/ani_dazai.gif",
			"type": "Card Background",
			"currentNum": 1,
			"free": 0
		},*/
	for (let i = 0; i < data.inv.length; i++) {
		const element = data.inv[i];
		itemMap.set(element.itemID,element);
		document.getElementById("shopArea").innerHTML += `<div class="col-md-6 col-lg-4" style="/*transform: translateY(100%);*/">
		<div class="card shopCard" style="${data.itemsLoaded.includes(element.itemID)? "background-color:rgb(10,10,10)":""}"><img class="card-img-top w-100 d-block" src="${element.image}" />
			<div class="card-body">
				<h4 class="card-title">${element.itemName}</h4>
				<h6 class="text-center card-title" style="color:${rarityColors[element.rarity]};">${element.rarity.toUpperCase().replace(/_/g, " ")}</h6>
				<p class="card-text">${element.itemLore}</p>
			</div>
			<div><button class="btn btn-outline-primary btn-sm" type="button" style="color:${rarityColors[element.rarity]};border-color:${rarityColors[element.rarity]}" id="${element.itemID}" onClick="${!data.itemsLoaded.includes(element.itemID)? `setActive('${element.itemID}')`:""}">${data.itemsLoaded.includes(element.itemID)? "SELECTED":"SET AS ACTIVE"}</button></div>
		</div>
	</div>`

	}
	Array.from(document.getElementsByClassName("unblur")).forEach(x => x.classList.remove("unblur"));
}
hi();
/**
 * 
 * @param {Node} self 
 */
async function setActive(element) {
	// console.log(self.parentNode.parentNode.childNodes)
	element = itemMap.get(element);
	if (open) return;
	open = true;
	console.log(element);
	let data = await fetch(`${!localStorage.getItem("dev") ? `https://api.dazai.app` : "http://localhost:8080"}/eco/setActive`,
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem("token"),
			},
			method: "POST",
			body: JSON.stringify({
				item: element.itemID,
				type: typeMap[element.type],
			})
		});
	
	let res = (await data.json())
	console.log(res);
	hi();
	open = false;
	// return document.getElementById("text").innerHTML = `Purchase Complete!`
}
// $(document).ready(function() {

//     /* Every time the window is scrolled ... */
//     $(window).scroll( function(){

//         /* Check the location of each desired element */
//         $('.shopCard').each( function(i){

//             var bottom_of_object = $(this).position().top + $(this).outerHeight();
//             var bottom_of_window = $(window).scrollTop() + $(window).height();

//             /* If the object is completely visible in the window, fade it it */
//             if( bottom_of_window > bottom_of_object ){

//                 $(this).animate({'opacity':'1'},500);

//             }

//         }); 

//     });

// });