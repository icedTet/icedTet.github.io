// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
// (async ()=>{
// 	let item = document.getElementById("thing");
	
// 	//filter: blur(15px) brightness(83%) grayscale(27%) hue-rotate(0deg);background: url("https://github.com/icedTet/siteAssets/blob/main/output.png?raw=true") top / cover no-repeat;
// 	while (Number(item.style.split("blur(")[1].split("px)")[0]) > 0){
// 		await sleep(100);
// 		item.style = `filter: blur(${Number(item.style.split("blur(")[1].split("px)")[0])-1}px) brightness(83%) grayscale(27%) hue-rotate(0deg);background: url("https://github.com/icedTet/siteAssets/blob/main/output.png?raw=true") top / cover no-repeat;`
// 	}
// })()