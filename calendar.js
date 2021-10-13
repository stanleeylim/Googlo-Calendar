var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var d = new Date(); 
var currentMonth = d.getMonth();
var currentYear = d.getFullYear();
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
    console.log(numberOfDays);
}

const getNumberOfDays = (month, year) => {
    return new Date(year, month, 0).getDate();
}

// const setCalendarBody = () = {
    
// }