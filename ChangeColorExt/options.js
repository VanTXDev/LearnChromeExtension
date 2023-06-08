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

const setColorsOptionsList = () => {
	colorList.forEach((color) => {
		const option = document.createElement("option");
		option.value = color;
		option.text = color;
		option.style.backgroundColor = color;

		option.addEventListener("click", () => {
			alert("clicked");
		});
		selectBoxColors.append(option);
	});
};

setColorsOptionsList();
selectBoxColors.addEventListener("change", () => {
	console.log(selectBoxColors.value);
	selectBoxColors.style.backgroundColor = selectBoxColors.value;
	chrome.storage.local.set({ color: selectBoxColors.value }).then(() => {
		console.log("Value is set");
	});
});
