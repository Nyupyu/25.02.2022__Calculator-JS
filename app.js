const clearCurrentBtn = document.querySelector(".clearCurrentBtn");
const clearAllBtn = document.querySelector(".clearAllBtn");
const clearHistoryBtn = document.querySelector(".clearHistoryBtn");
const backspaceBtn = document.querySelector(".backspaceBtn");
const changeBtn = document.querySelector(".changeBtn");
const resultBtn = document.querySelector(".resultBtn");
const operators = document.querySelectorAll(".operatorBtn");
const numbers = document.querySelectorAll(".numberBtn");
const historyList = document.querySelector(".historyList");
const previousNumber = document.querySelector(".previousNumber");
const mathSign = document.querySelector(".mathSign");
const currentNumber = document.querySelector(".currentNumber");

let result = "";

function display() {
	// jeżeli zawiera kropke i blokana tylko na kropke
	if (currentNumber.innerHTML.includes(".") && this.textContent === ".") {
		return;
	} else if (currentNumber.innerHTML === "" && this.textContent === ".") {
		return (currentNumber.innerHTML = "0.");
	}
	currentNumber.innerHTML += this.textContent;
}

function operate() {
	if (previousNumber.innerHTML !== "" && mathSign.innerHTML !== "") {
		calculate();
	}
	if (this.textContent === "1/x" && previousNumber.innerHTML === "") {
		calculate();
		mathSign.innerHTML = "1/";
		return (previousNumber.innerHTML = "");
	} else {
		mathSign.innerHTML = this.textContent;
	}
	previousNumber.innerHTML = currentNumber.innerHTML;
	// if (currentNumber.innerHTML === "" && this.textContent !== "") {
	// 	previousNumber.innerHTML = "0";
	// }
	currentNumber.innerHTML = "";
}

function calculate() {
	if (previousNumber.innerHTML === "" && mathSign.innerHTML === "") {
		addToHistory(currentNumber.innerHTML);
		return currentNumber.innerHTML;
	}
	// zapamiętać żeby zmienić z stinga na number bo inaczej chujnia z grzybnią!
	let a = Number(previousNumber.innerHTML);
	let b = Number(currentNumber.innerHTML);
	let operator = mathSign.innerHTML;
	switch (operator) {
		case "+":
			result = a + b;
			break;
		case "-":
			result = a - b;
			break;
		case "×":
			result = a * b;
			break;
		case "÷":
			if (b == "0" || a == "0") {
				previousNumber.innerHTML = "";
				mathSign.innerHTML = "";
				return (currentNumber.innerHTML = "0");
			} else {
				result = a / b;
			}
			break;
		case "1/":
			result = b / (b * b);
			break;
		case "%":
			result = (a / 100) * b;
			break;
		case "^":
			result = a ** b;
			break;
		case "√":
			result = Math.pow(a, 1 / b);
			break;
	}
	addToHistory();
	currentNumber.innerHTML = result;
	previousNumber.innerHTML = "";
	mathSign.innerHTML = "";
}

function addToHistory() {
	if (mathSign.innerHTML === "") {
		return;
	}
	const newLi = document.createElement("li");
	newLi.innerHTML = `<p>${previousNumber.innerHTML}</p> <p>${mathSign.innerHTML}</p> <p>${currentNumber.innerHTML}</p> <p>=</p> <p>${result}</p>`;
	newLi.classList.add("newLi");
	clearHistoryBtn.classList.add("active");
	historyList.appendChild(newLi);
}

function clearCurrentNumbers() {
	currentNumber.innerHTML = "";
}

function clearAll() {
	currentNumber.innerHTML = "";
	mathSign.innerHTML = "";
	previousNumber.innerHTML = "";
}

function clearHistory() {
	while (historyList.firstChild) {
		historyList.removeChild(historyList.firstChild);
	}
}

function deleteLastNumber() {
	currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
}

function plusMinusChanger() {
	if (currentNumber.innerHTML > 0) {
		currentNumber.innerHTML = currentNumber.innerHTML - 2 * currentNumber.innerHTML;
	} else if (currentNumber.innerHTML < 0) {
		currentNumber.innerHTML = Math.abs(currentNumber.innerHTML);
	}
}

numbers.forEach((number) => {
	number.addEventListener("click", display);
});
operators.forEach((operator) => {
	operator.addEventListener("click", operate);
});
clearCurrentBtn.addEventListener("click", clearCurrentNumbers);
clearAllBtn.addEventListener("click", clearAll);
clearHistoryBtn.addEventListener("click", clearHistory);
backspaceBtn.addEventListener("click", deleteLastNumber);
changeBtn.addEventListener("click", plusMinusChanger);
resultBtn.addEventListener("click", calculate);
