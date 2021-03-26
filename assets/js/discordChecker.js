(async ()=>{
	let thing = await fetch("https://discord.com/api/v8/users/@me",{
		headers:{
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json"
		},

	})
	if (!thing.ok)
	return window.location.href = `${window.location.href.match(/(http(s:|:)\/\/)[^\/]+/)[0]}/login`;

})();