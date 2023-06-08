const disModeIcons = `<button class="btn-dis-mode" data-mode="dark" id="btn-dis-mode"></button>`;
const bodyPage = document.getElementsByTagName("body")[0];
bodyPage.innerHTML += disModeIcons;
const backgroundColorDefault = bodyPage.style.backgroundImage;
const colorDefault = bodyPage.style.backgroundImage;

var darkIconUrl = chrome.runtime.getURL("images/dark-mode-icon.png");
var LightIconUrl = chrome.runtime.getURL("images/day-sunny-icon.png");
var button = document.getElementById("btn-dis-mode");
button.style.backgroundImage = "url(" + darkIconUrl + ")";

button.addEventListener("click", function () {
	changeBackgroundColor(button.getAttribute("data-mode"));
});

function changeBackgroundColor(disMode) {
	if (disMode == "dark") {
		bodyPage.style.backgroundColor = "rgb(0 0 0)";
		bodyPage.style.color = "#ffffff";
		button.setAttribute("data-mode", "light");
		button.style.backgroundImage = "url(" + LightIconUrl + ")";
	} else {
		bodyPage.style.backgroundColor = backgroundColorDefault;
		bodyPage.style.color = colorDefault;
		button.style.backgroundImage = "url(" + darkIconUrl + ")";
		button.setAttribute("data-mode", "dark");
	}
}
