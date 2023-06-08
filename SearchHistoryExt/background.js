chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: "ON"
	});
});
// Example of a simple user data object
const user = {
	username: "demo-user"
};

const car = {
	make: "Honda",
	name: "Civic",
	date: "2023-06-08"
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// 2. A page requested user data, respond with a copy of `user`
	if (message === "get-user-data") {
		sendResponse(user);
	}
	if (message === "get-car-data") {
		sendResponse(car);
	}
});
