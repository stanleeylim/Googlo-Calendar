var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var d = new Date(); 
var currentMonth = d.getMonth();
var currentYear = d.getFullYear();
var currentDay = d.getDay();
var currentDate = d.getDate();
var selectedMonth = null;
var numberOfDays = null;

const initialCalendarLoad = () => {
    selectedMonth = currentMonth;
    showCalendarHeader();
}

const previousMonth = () => {
    //validasi kalo lagi di bulan januari, ke desember tahun sebelumnya
    if(selectedMonth == 0){
        selectedMonth = 11;
        currentYear -= 1;
    }else{
        selectedMonth -= 1;
    }
    showCalendarHeader();
}

const nextMonth = () => {
    //validasi kalo lagi di bulan desember, ke januari tahun berikutnya
    if(selectedMonth == 11){
        selectedMonth = 0;
        currentYear += 1;
    }else{
        selectedMonth += 1;
    }
    showCalendarHeader();
}

const showCalendarHeader = () => {
    document.getElementById("calendar-header-month").innerHTML = months[selectedMonth] + " " + currentYear;
    numberOfDays = getNumberOfDays(selectedMonth + 1, currentYear);
    setCalendarBody(selectedMonth, currentYear, numberOfDays);
}

const getNumberOfDays = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const setCalendarBody = (month, year, numberOfDays) => {
    //get first day of the month
    let firstDay = new Date(year, month).getDay();
    let date = 1;
    let currYear = new Date().getFullYear();
    //get the body of the calendar
    let tbl = document.getElementById("calendar-body-table");
    //clear all previous cells
    tbl.innerHTML = ""

    //create all cells, including create individual cells, filling them with data
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
           if (i === 0 && j < firstDay){
               cell = document.createElement("td");
               cellText = document.createTextNode("");
               cell.appendChild(cellText);
               row.appendChild(cell);
           }else if(date > numberOfDays){
               break;
           }else{
               cell = document.createElement("td");
               cellText = document.createTextNode(date);
               cellFunc = document.createAttribute("onclick");
               cellFunc.value = "viewEventsByDate(this)";
               cell.attributes.setNamedItem(cellFunc);
               cell.appendChild(cellText);
               //color today's date
               if(date === currentDate && month === currentMonth && year === currYear){
                   cell.classList.add("current-date");
               }
               row.appendChild(cell);
               date++;
           }
        }
        //append each row to calendary body
        tbl.appendChild(row);
    }
}

const goToday = () => {
    selectedMonth = currentMonth;
    currentYear = d.getFullYear();
    showCalendarHeader();
}