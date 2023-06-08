const btnSearch = document.getElementById("btn-search");
const inputSearchKey = document.getElementById("search_key");
const resultsList = document.getElementById("result-list");

btnSearch.addEventListener("click", function (e) {
	e.preventDefault();
	resultsList.innerHTML = "";
	var searchKey = inputSearchKey.value;
	chrome.runtime.onInstalled.addListener(() => {
		chrome.action.setBadgeText({
			text: "ON"
		});
	});
	chrome.history.search(
		{ text: searchKey, startTime: 0, maxResults: 20 },
		function (results) {
			for (let index = 0; index < results.length; index++) {
				const item = results[index];
				const liElement = document.createElement("li");
				const aTagElement = document.createElement("a");
				aTagElement.setAttribute("href", item.url);
				aTagElement.setAttribute("target", "_blank");
				aTagElement.innerText = index + ". " + item.url;
				liElement.append(aTagElement);
				resultsList.append(liElement);
			}
		}
	);
});

chrome.runtime.sendMessage("get-user-data", (response) => {
	// 3. Got an asynchronous response with the data from the service worker
	console.log("received user data", response);
});

chrome.runtime.sendMessage("get-car-data", (response) => {
	// 3. Got an asynchronous response with the data from the service worker
	console.log("received car data", response);
});
