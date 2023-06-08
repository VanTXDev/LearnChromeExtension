chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// 2. A page requested user data, respond with a copy of `user`
	if (message.action === "get-page-style") {
		console.log(message);
		sendResponse({ bgColor: message.bgColor });
	}
});
