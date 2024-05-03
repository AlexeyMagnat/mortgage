// 1. Получаем поля для изменения в них значений

/* значения из текстовых input */
const totalCost = document.getElementById("total-cost"),
	anInitialFee = document.getElementById("an-initial-fee"),
	creditTerm = document.getElementById("credit-term");
/* значения из range input */
const totalCostRange = document.getElementById("total-cost-range"),
	anInitialFeeRange = document.getElementById("an-initial-fee-range"),
	creditTermRange = document.getElementById("credit-term-range");
/* итоговые расчетные значения */
const totalAmountOfCredit = document.getElementById("amount-of-credit"),
	totalMonthlyPayment = document.getElementById("monthly-payment"),
	totalRecommendedIncome = document.getElementById("recommended-income");

/* получаем все range */
const inputsRange = document.querySelectorAll(".input-range");
/* получаем все кнопки с процентной ставкой */
const bankBtns = document.querySelectorAll(".bank");
console.log(bankBtns); // выводит псевдомассив node-list

// 2. Функция связывает range с input
// описание функции
const assignValue = () => {
	totalCost.value = totalCostRange.value;
	anInitialFee.value = anInitialFeeRange.value;
	creditTerm.value = creditTermRange.value;
}
// вызов функции
assignValue();

// 3. Работа со ставками
// массив с объектами
const banks = [
	{
		name: "alfa",
		percents: 8.7
	},
	{
		name: "sberbank",
		percents: 8.4
	},
	{
		name: "pochta",
		percents: 7.9
	},
	{
		name: "tinkoff",
		percents: 9.2
	}
]
let currentPercent = banks[0].percents;
console.log(currentPercent); // 8.7

// отловить событие клика на банки (циклом for of по псевдомассиву)
for (let bank of bankBtns) {
	bank.addEventListener("click", () => {
		for (let item of bankBtns) {
			item.classList.remove("active"); // убираем active с неактивной
		}
		bank.classList.add("active"); // добавляем active к кнопке
		takeActiveBank(bank); // вызов функции
	})
}
// описание функции вытащит имя текущего банка из дата атрибута
const takeActiveBank = currentActive => {
	const dataAttrValue = currentActive.dataset.name;
	console.log(dataAttrValue); // выводит alfa
	// описание функции вытащит объект текущего банка из дата атрибута
	const currentBank = banks.find(bank => bank.name === dataAttrValue);
	console.log(currentBank); // выводит объект банка
	// вытащить из объекта проценты
	currentPercent = currentBank.percents;
	console.log(currentPercent); // выводит 8.7
	calculation(totalCost.value, anInitialFee.value, creditTerm.value); // вызов функции калькулятор
}

// 3. Работа с range input
// отловить событие клика на range (циклом for of)
for (let input of inputsRange) {
	console.log(input); // выводит html элемента range
	input.addEventListener("input", () => {
		assignValue(); // вызов функции связывания range input
		calculation(totalCost.value, anInitialFee.value, creditTerm.value); // вызов функции калькулятор
	})
}

// 4. Описание функции Калькулятор
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
	/* 
	ЕП - Ежемесячный платеж
	РК - Размер кредита
	ПС - Процентная ставка
	КМ - Количество месяцев

	ЕП = (РК + (((РК / 100) * ПС) / 12)* КМ) / КМ
*/
	// назначили переменные
	let monthlyPayment; // ЕП
	let lounAmount = totalCost - anInitialFee; // РК
	let interestRate = currentPercent; // ПС
	let numberOfYears = creditTerm; // Количество лет
	let numberOfMonths = 12 * numberOfYears; // КМ

	monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths);
	// округляем результат расчета
	const monthlyPaymentArounded = Math.round(monthlyPayment);


	// проверка меньше 0 и вывод конечных результатов
	if (monthlyPaymentArounded < 0) {
		return false;
	} else {
		totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
		totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
		totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ₽`;
	}
}

// Добавляем событие input для текстовых полей
totalCost.addEventListener("input", () => {
	syncValues(totalCost, totalCostRange);
	calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

anInitialFee.addEventListener("input", () => {
	syncValues(anInitialFee, anInitialFeeRange);
	calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

creditTerm.addEventListener("input", () => {
	syncValues(creditTerm, creditTermRange);
	calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

// Функция для синхронизации значений между текстовыми полями и соответствующими range input
const syncValues = (textInput, rangeInput) => {
	rangeInput.value = textInput.value;
};


