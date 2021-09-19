
class Calculator {
	constructor(currentOperandText) {
		this.currentOperandText = currentOperandText;
		this.clear()
	};

	clear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operator = '';
		this.calculated = false;
	};

	calculate() {
		var computation;
		var prev = parseFloat(this.previousOperand);
		var current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		if (this.operator === '+') {
			computation = prev + current;
		} else if (this.operator === '-') {
			computation = prev - current;
		} else if (this.operator === '*') {
			computation = prev * current;
		} else if (this.operator === '/') {
			computation = prev / current;
		} else {
			return;
		}
		this.currentOperand = computation;
		this.previousOperand = '';
		this.operator = '';
		this.calculated = true
	};

	appendNum(num) {
		if (this.calculated) {
			this.currentOperand = num;
			this.calculated = false;
		} else {
			this.currentOperand = this.currentOperand.toString() + num.toString();	
		}
		
	};

	displayNum() {
		this.currentOperandText.value = this.currentOperand;
	};

	chooseOperator(operator) {
		if (this.currentOperand === '') return;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
		this.operator = operator;
	};

};

nums = document.querySelectorAll('.num');
operators = document.querySelectorAll('.operator');
clearButton = document.getElementById('clearButton');
equalsButton = document.getElementById('equalsButton');
currentOperandText = document.getElementById('display');

var calculator = new Calculator(currentOperandText);

nums.forEach(num => {
	num.addEventListener('click', () => {
		calculator.appendNum(num.innerText);
		calculator.displayNum();
	});
});

operators.forEach(operator => {
	operator.addEventListener('click', () => {
		calculator.chooseOperator(operator.innerText);
		calculator.displayNum();
	});
});

equalsButton.addEventListener('click', () => {
	calculator.calculate();
	calculator.displayNum();
})

clearButton.addEventListener('click', () => {
	calculator.clear();
	calculator.displayNum();
})