window.onload = () => {
	const bgColor = document.body.style.backgroundColor;
	chrome.runtime.sendMessage(
		{
			action: "get-page-style",
			bgColor: bgColor
		},
		(response) => {
			console.log(response);
		}
	);
	const btnChangeColor = document.getElementById("btn-change-color");
	const selectBoxColors = document.getElementById("opt_colors");
	const colorList = [
		"#3aa757",
		"#e8453c",
		"#f9bb2d",
		"#4688f1",
		"#000",
		"#fff",
		"#d7d2bf"
	];
	// Retrieve the color from storage and update the button's style and value
	chrome.storage.local.get("color", (result) => {
		if (result.color) {
			const colorChoosed = result.color;
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					args: [colorChoosed],
					func: (colorChoosed) => {
						var color = document.body.style.backgroundColor;
						chrome.storage.local.set({ color: color }, function () {
							colorList.push(color);
						});
						document.body.style.backgroundColor = colorChoosed;
					}
				});
			});
		}
	});

	btnChangeColor.addEventListener("click", (e) => {
		const colorChoosed = e.target.value;
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id },
				args: [colorChoosed],
				func: (colorChoosed) => {
					document.body.style.backgroundColor = colorChoosed;
				}
			});
		});
	});

	const setColorsOptionsList = () => {
		colorList.forEach((color) => {
			const option = document.createElement("option");
			option.value = color;
			option.text = color;
			option.style.backgroundColor = color;
			selectBoxColors.append(option);
		});
	};

	setColorsOptionsList();
	selectBoxColors.addEventListener("change", () => {
		chrome.storage.local.set({ color: selectBoxColors.value }, function () {
			console.log(selectBoxColors.value);
			selectBoxColors.style.backgroundColor = selectBoxColors.value;
			btnChangeColor.style.backgroundColor = selectBoxColors.value;
			btnChangeColor.setAttribute("value", selectBoxColors.value);
		});
	});
};
