

//start with Top Level async await
const popup = document.getElementById("popup");
const shownStyle = `background: rgba(119,119,119,0.4);cursor: pointer;height: 100%;position: fixed;text-align: center;top: 0;width: 100%;z-index: 10000;backdrop-filter: blur(5px);transition-duration: 0.4s;transform: scale(1);/*display: none;*/`;
const hiddenStyle = `background: rgba(119,119,119,0.4);cursor: pointer;height: 100%;position: fixed;text-align: center;top: 0;width: 100%;z-index: 10000;backdrop-filter: blur(5px);display: none;transition-duration: 0.4s;transform: scale();`;
popup.style = hiddenStyle;
let open = false;
const rarityColors = {
	"common": "rgb(200,200,200)",
	"rare": "rgb(100,200,100)",
	"super_rare": "rgb(100,150,200)",
	"epic": "rgb(200,100,200)",
	"legendary": "rgb(220,220,10)",
	"uber": "rgb(255,0,0)"
}

async function hi() {
	let data = await fetch(`${!localStorage.getItem("dev") ? `https://api.dazai.app` : "http://localhost:8080"}/eco/getShop`,
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
	document.getElementById("username").innerText = data.userInfo.name;
	document.getElementById("coins").innerText = `${data.userInfo.coins} DazCoin`;
	document.getElementById("resetsIn").innerText = `Shop refreshes in ${data.refreshesInEnglish}`

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
	let purchasedItems = data.userInfo.shopInfo.split("|");
	purchasedItems.shift();
	purchasedItems.forEach(item => {
		let filtered = false;
		data.shop = data.shop.filter(x => {
			if (x.itemID === item && filtered === false) {
				filtered = true
				return false;
			}
			return true;
		})
	})
	for (let i = 0; i < data.shop.length; i++) {
		const element = data.shop[i];
		document.getElementById("shopArea").innerHTML += `<div class="col-md-6 col-lg-4" style="/*transform: translateY(100%);*/">
		<div class="card shopCard"><img class="card-img-top w-100 d-block" src="${element.image}" />
			<div class="card-body">
				<h4 class="card-title">${element.itemName}</h4>
				<h6 class="text-center card-title" style="color:${rarityColors[element.rarity]};">${element.rarity.toUpperCase().replace(/_/g, " ")}</h6>
				<p class="card-text">${element.itemLore}</p>
			</div>
			<div><button class="btn btn-outline-primary btn-sm" type="button" style="color:${rarityColors[element.rarity]};border-color:${rarityColors[element.rarity]}" id="${element.itemID}" onClick="onClick(this)">BUY (${element.price} DC)</button></div>
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
async function onClick(self) {
	// console.log(self.parentNode.parentNode.childNodes)
	document.getElementById("itemImg").src = self.parentNode.parentNode.childNodes[0].src;
	document.getElementById("closeButton").style = "display: none;"
	document.getElementById("text").innerText = "Purchasing reqeusted item...";
	popup.style = shownStyle;

	if (open) return;
	open = true;
	let data = await fetch(`${!localStorage.getItem("dev") ? `https://api.dazai.app` : "http://localhost:8080"}/eco/purchaseFromShop`,
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem("token"),
			},
			method: "POST",
			body: JSON.stringify({
				item: self.id
			})
		});
	open = false;
	document.getElementById("closeButton").style = ""
	if (!data.ok)
		return document.getElementById("text").innerHTML = `Purchase Failed!</br>Reason:</br><code>${await data.json()}</code>`;
	let res = (await data.json())
	if (!res) {
		return document.getElementById("text").innerHTML = `Purchase Failed!</br>Reason:</br><code>You do not have enough Daz Coins!</code>`;
	}

	// alert("Purchase complete! Thank you for your purchase!");
	window.location.reload();
	// return document.getElementById("text").innerHTML = `Purchase Complete!`
}
async function closePopup() {
	popup.style = hiddenStyle;
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