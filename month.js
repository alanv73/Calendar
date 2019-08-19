const MonthName = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

let weeksInMonth = (targetDate) => {
	let currentMonth = targetDate.getMonth();
	let firstOfMonth = new Date(
		targetDate.getFullYear(),
		currentMonth,
		1
	);
	let firstDayOfWeek = firstOfMonth.getDay();
	let lastOfMonth = new Date(
		targetDate.getFullYear(),
		currentMonth + 1,
		0
	);
	return Math.ceil((firstDayOfWeek + lastOfMonth.getDate()) / 7);
};

let resetCalendar = () => {
	let tableBody = document.querySelector('tbody');
	while (tableBody.firstChild) {
		tableBody.removeChild(tableBody.firstChild);
	}
};

let buildCalendar = (month, year) => {
	let myDate = new Date(year, month, 1);
	let weeks = weeksInMonth(myDate);
	console.log(`date: ${myDate}\nweeks: ${weeks}`);
	let tableBody = document.querySelector('tbody');
	let monthHeading = document.getElementById('month');
	monthHeading.innerText =
		MonthName[myDate.getMonth()] + ' ' + year;
	let newRow, newTD;
	let day = 1;
	let firstOfMonth = new Date(
		myDate.getFullYear(),
		myDate.getMonth(),
		1
	).getDay();
	let lastOfMonth = new Date(
		myDate.getFullYear(),
		myDate.getMonth() + 1,
		0
	).getDate();
	console.log(myDate, firstOfMonth);
	let useDay = false;

	for (let i = 0; i < weeks; i++) {
		newRow = document.createElement('tr');
		newRow.classList.add('ht-19');
		tableBody.appendChild(newRow);
		for (let j = 0; j < 7; j++) {
			if (j >= firstOfMonth) useDay = true;
			newTD = document.createElement('td');
			newTD.classList.add('col-1');
			if (useDay & (day <= lastOfMonth))
				newTD.innerText = day++;
			newRow.appendChild(newTD);
		}
	}
};

let nextButton = document.getElementById('nextMonth');
nextButton.addEventListener('click', () => {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	resetCalendar();
	buildCalendar(month, year);
});

let prevButton = document.getElementById('prevMonth');
prevButton.addEventListener('click', () => {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	resetCalendar();
	buildCalendar(month, year);
});

resetCalendar();

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

buildCalendar(month, year);
