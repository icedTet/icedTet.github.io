//no req
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//reeee
const urlVars = getUrlVars();
if (!urlVars["access_token"])
	window.location.href = "https://discord.com/oauth2/authorize?client_id=747901310749245561&redirect_uri=https%3A%2F%2Fdazai.app%2Flogin.html&response_type=token&scope=identify%20email";
else{
	localStorage.setItem("token",urlVars["access_token"]);
	window.location.href = "https://dazai.app/user"
}