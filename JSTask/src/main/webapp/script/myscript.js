
function trapFinder(start, end, b) {
	const map = new Map();
	for (start; start < end + 1; start++) {
		var sum = start;
		while (sum > 0) {
			if (start % b == 0 || b % start == 0 || sum % b == 0 || b % sum == 0) {
				map.set(start, b);
				b += 2;
			}
			else {
				if (b != 3) {
					b--;
				}
			}
			if (sum < 10) {
				break;
			}
			sum = findSum(sum);
		}
	}
	return map;
}


function findSum(number) {
	var sum = 0;

	while (number != 0) {
		sum = sum + number % 10;
		number = Math.floor(number / 10);
	}
	return Math.floor(sum);
}

function toBinary(input) {
	var a = input;
	var out = "";
	while (a > 0) {
		out = (a % 2) + out;
		a = Math.floor(a / 2);
	}
	return out;
}


function parentChild() {
	const parents = document.getElementsByName("parent");
	const childs = document.getElementsByName("child");
	const map = new Map();
	let list = new Array();

	for (var a = 0; a < parents.length; a++) {
		if (map.get(parents[a].value) == null) {
			list = new Array();

			map.set(parents[a].value, list);
		}
		map.get(parents[a].value).push(childs[a].value);
	}
	return map;
}

function getChild() {
	let search = document.getElementById("search").value;
	let map = parentChild();
	let arr = map.get(search);
	var length = 0;
	let outArray = new Array();
	for (var a = 0; a < arr.length; a++) {
		var out = map.get(arr[a]);
		if (out != null) {
			length = length + out.length;
			outArray.push(out);
		}
	}
	if (length > 1) {
		document.getElementById("message").innerText += search + " has " + length + " grandchildrens" + ". They are " + outArray + ".";
	}
	else if (length === 1) {
		document.getElementById("message").innerText += search + " has " + length + " grandchild " + "whose name is " + outArray + ".";
	}
	else if (length === 0) {
		document.getElementById("message").innerText += search + " has no grandchildrens";
	}
}

let out = "";
var exp;
let dotCount = 0;
function calci(number) {

	exp = document.getElementById("displayer").value;
	if (exp.charAt(exp.length - 1) == '.' && (number == '+' || number == '-' || number == '*' || number == '/' || number == 'square')) {
		return;
	}
	
	if (number == ')' && (exp.charAt(exp.length - 2) == '%' || exp.charAt(exp.length - 2) == '+' 
	|| exp.charAt(exp.length - 2) == '-' || exp.charAt(exp.length - 2) == '*' || exp.charAt(exp.length - 2) == '/')) {
		return;
	}
	
	exp = document.getElementById("displayer1").value;
	if (exp.charAt(exp.length - 2) == '%' && (number == '+' || number == '*' || number == '/')) {
		return;
	}
	
	if (number == 'square' && (exp.charAt(exp.length - 2) == '%' || exp.charAt(exp.length - 2) == '+' 
		|| exp.charAt(exp.length - 2) == '-' || exp.charAt(exp.length - 2) == '*' || exp.charAt(exp.length - 2) == '/')) {
		return;
	}
	
	//addition
	if (number == '+') {
		dotCount = 0;
		out += document.getElementById("displayer").value;
		defaultColor();
		document.getElementById(number).style.backgroundColor = "red";
		exp = out;
		if (exp.charAt(exp.length - 1) == "-" || exp.charAt(exp.length - 2) == "(") {
			out = exp.substring(0, exp.length - 2)
		}
		else if (exp.charAt(exp.length - 2) == "*" || exp.charAt(exp.length - 2) == "/" || exp.charAt(exp.length - 2) == "+" 
		|| exp.charAt(exp.length - 2) == "-" && exp.charAt(exp.length - 1) == " " ) {
			out = exp.substring(0, exp.length - 3);
			out += " + ";
			document.getElementById("displayer1").value = out;
		}
		else {
			out += " + ";
			document.getElementById("displayer1").value = out;
			document.getElementById("displayer").value = "";
		}
	}

	//subtraction
	else if (number == '-') {
		dotCount = 0;
		out += document.getElementById("displayer").value;
		defaultColor();
		document.getElementById(number).style.backgroundColor = "red";
		exp = out;
		if (exp.charAt(exp.length - 1) == "-" || exp.charAt(exp.length - 2) == "(") {
			out = exp.substring(0, exp.length - 2)
		}
		else if (exp.charAt(exp.length - 2) == "*" || exp.charAt(exp.length - 2) == "/"
			|| exp.charAt(exp.length - 2) == "+" || exp.charAt(exp.length - 2) == "-" && exp.charAt(exp.length - 1) == " "
			 || exp.charAt(exp.length - 2) == "%" || out.length == 0) {
			document.getElementById("displayer").value = " -";
			document.getElementById("displayer1").value = out + " -";
		}
		else {
			out += " - ";
			document.getElementById("displayer1").value = out;
			document.getElementById("displayer").value = "";
		}
	}

	//multiplication
	else if (number == '*') {
		dotCount = 0;
		defaultColor();
		document.getElementById(number).style.backgroundColor = "red";
		out += document.getElementById("displayer").value;
		exp = out;
		if (exp.charAt(exp.length - 1) == "-") {
			out = exp.substring(0, exp.length - 2)
		}
		else if (exp.charAt(exp.length - 2) == "*" || exp.charAt(exp.length - 2) == "-" && exp.charAt(exp.length - 1) == " " 
		|| exp.charAt(exp.length - 2) == "/" || exp.charAt(exp.length - 2) == "+" || exp.charAt(exp.length - 2) == "(") {
			out = exp.substring(0, exp.length - 3);
			out += " * ";
			document.getElementById("displayer1").value = out;
		}
		else {
			out += " * ";
			document.getElementById("displayer1").value = out;
			document.getElementById("displayer").value = "";
		}
	}

	//division
	else if (number == '/') {
		dotCount = 0;
		defaultColor();
		document.getElementById(number).style.backgroundColor = "red";
		out += document.getElementById("displayer").value;
		exp = out;
		if (exp.charAt(exp.length - 1) == "-" || exp.charAt(exp.length - 2) == "(") {
			out = exp.substring(0, exp.length - 2)
		}
		else if (exp.charAt(exp.length - 2) == "*" || exp.charAt(exp.length - 2) == "-" && exp.charAt(exp.length - 1) == " "
			|| exp.charAt(exp.length - 2) == "+" || exp.charAt(exp.length - 2) == "/" ) {
			out = exp.substring(0, exp.length - 3);
			out += " / ";
			document.getElementById("displayer1").value = out;
		}

		else {
			out += " / ";
			document.getElementById("displayer1").value = out;
			document.getElementById("displayer").value = "";
		}
	}
//clear
	else if (number == ce) {
		out=document.getElementById("displayer").value;
		exp = document.getElementById("displayer").value;
		document.getElementById("displayer").value = exp.substring(0, exp.length - 1);
		exp=out;
		out=exp.substring(0, exp.length - 1);
		document.getElementById("displayer1").value = out;
	}
//allclear
	else if (number == ac) {
		dotCount = 0;
		defaultColor();
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = "";
		out = "";
	}

	else if (number == '(') {
		dotCount = 0;
		out += document.getElementById("displayer").value;
		exp = out;
		if (isNaN(exp.charAt(exp.length - 2)) || exp.charAt(exp.length - 1) == "-" || document.getElementById("displayer").value=="") {
		out += " ( ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
		}
		else{
		out +=" *  ( ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
	}
	}

	else if (number == ')') {
		dotCount = 0;
		out += document.getElementById("displayer").value+ " ) ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
	}

	else if (number == 'pi') {
		dotCount=1;
		out += document.getElementById("displayer").value+Math.PI;
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
	}
	
	else if (number == 'square') {
		if(document.getElementById("displayer").value!="")
		{
		out += document.getElementById("displayer").value+" ² ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
		}
	}

	else if (number == 'radic') {
		out += document.getElementById("displayer").value+" √ ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
	}

	else if (number == '%') {
		out += document.getElementById("displayer").value+" % ";
		document.getElementById("displayer").value = "";
		document.getElementById("displayer1").value = out;
	}

	else {
		document.getElementById("displayer").value += number;
		var num = "";
		var dis = document.getElementById("displayer").value;
		dis = dis.replaceAll(",", "");
		num = numberFormat(dis);
		if (number == ".") {
			dotCount++;
		}
		if (dotCount > 1) {
			number = number.substring(0, number.length - 1);
			num = num.substring(0, num.length - 1);
		}
		document.getElementById("displayer").value = num;
		document.getElementById("displayer1").value += number;
	}
}

function equals() {
	defaultColor();
	var output = 0;
	out += document.getElementById("displayer").value;
	document.getElementById("displayer1").value = out;
	output = evaluator(out);
	out = "";
	document.getElementById("displayer").value = numberFormat(output);
}

function defaultColor()
{
	document.getElementById('+').style.backgroundColor = "#000000a6";
	document.getElementById('*').style.backgroundColor = "#000000a6";
	document.getElementById('/').style.backgroundColor = "#000000a6";
	document.getElementById('-').style.backgroundColor = "#000000a6";	
}

//old without BODMAS
function calculate(str) {

	str = str.replaceAll(",", "");
	let arr = str.split(" ");
	arr = arr.filter(e => e);
	for (var a = 0; a < arr.length; a += 2) {
		switch (arr[a + 1]) {
			case '+':
				arr[a + 2] = (+arr[a] + +arr[a + 2]);
				break;
			case '-':
				arr[a + 2] = (+arr[a] - +arr[a + 2]);
				break;
			case '/':
				arr[a + 2] = (+arr[a] / +arr[a + 2]);
				break;
			case '*':
				arr[a + 2] = (+arr[a] * +arr[a + 2]);
				break;
			default:
				{
					if (arr[a + 1] < 0) {
						arr[a + 1] = (+arr[a] + +arr[a + 1]);
					}
					break;
				}
		};
		if (a == arr.length - 1) {
			return arr[a];
		}
	}
}


//Comma separator
function numberFormat(input) {

	var str = input.toString().split(".");
	var length = str[0].length;
	var ch = str[0].charAt(length - 1);
	str[0] = str[0].substring(0, str[0].length - 1);
	str[0] = str[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
	str[0] = str[0] + ch;
	return str.join(".");
}

//BODMAS
function evaluator(expression) {
	
	expression = expression.replaceAll(",", "");
	let openIndex = expression.indexOf("(");
	let closeIndex = expression.lastIndexOf(")");
	try {
		if (openIndex > closeIndex || !expression.includes("(") && expression.includes(")")) {
			return "check the brackets";
		}
		if (isNaN(expression.charAt(expression.length - 2)) && expression.charAt(expression.length - 2)!='²' || expression.charAt(expression.length - 2) == "-" && expression.charAt(expression.length - 1) == " "
			|| expression.charAt(expression.length - 1) == "-"
		) {
			return "check the operators";
		}
		let total = expression.split(' ');
		let values = [];
		let operator = [];
		let openCount = 0;
		let closeCount = 0;
		for (let i = 0; i < total.length; i++) {
			if (total[i] == ' ' || total[i] == '') {
				continue;
			}

			if (total[i] <= 0 || total[i] >= 0) {
				let sbuf = "";
					sbuf = sbuf + total[i];
				values.push(parseFloat(sbuf));
			}

			else if (total[i] == '(') {
				operator.push(total[i]);
				openCount++
			}

			else if (total[i] == ')') {
				closeCount++;
				//undefined condition added to avoid infinity loop 
				while (operator[operator.length - 1] != '(' && operator[operator.length - 1] != undefined) {
					if (operator[operator.length - 1] == '²' || operator[operator.length - 1] == '√') {
						values.push(solve(operator.pop(), values.pop(), ""));
					}
					else {
						values.push(solve(operator.pop(), values.pop(), values.pop()));
					}
				}
				operator.pop();
			}

			else if (total[i] == '+' || total[i] == '-' || total[i] == '*' || total[i] == '/' || total[i] == '%' || total[i] == "√" || total[i] == "²") {
				if (operator[operator.length - 1] == "√" || operator[operator.length - 1] == "²") {
					while (operator.length > 0 && precedenceChecker(total[i], operator[operator.length - 1])) {
						values.push(solve(operator.pop(), values.pop(), ""));
					}
				}
				else {
					while (operator.length > 0 && precedenceChecker(total[i], operator[operator.length - 1])) {
						values.push(solve(operator.pop(), values.pop(), values.pop()));
					}
				}
				operator.push(total[i]);
			}
		}

		while (operator.length > 0) {
			if (operator[operator.length - 1] == "√" || operator[operator.length - 1] == "²") {
				values.push(solve(operator.pop(), values.pop(), ""));
			}
			else {
				values.push(solve(operator.pop(), values.pop(), values.pop()));
			}
		}

		if (openCount != closeCount) {
			return "check the brackets";
		}
		return values.pop();
	}
	catch (err) {
		document.getElementById("displayer").value = "syntax error";
	}
}

//precedence
function precedenceChecker(op1, op2) {
	
	if (op2 == '(' || op2 == ')') {
		return false;
	}
	
	if ((op1 == '*' || op1 == '/') &&
		(op2 == '+' || op2 == '-')) {
		return false;
	}

	if (op2 == '%' && (op1 == '*' || op1 == '/')) {
		return true;
	}
	if (op1 == '%' && (op2 == '+' || op2 == '-')) {
		return false;
	}
	if (op1 == "√" || op1 == "²") {
		return false;
	}
	else {
		return true;
	}
}

function solve(op, b, a) {

	if ((op != '√' && op != '²') && !a) {
		return b;
	}

	switch (op) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			return a / b;
		case '%':
			return a % b;
		case '√':
			return Math.sqrt(b);
		case '²':
			return b * b;
	}
	return 0;
}
