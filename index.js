const time = () => {
    let clock = document.getElementById("live-clock");
    let d = new Date();
    let s = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
    let m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    let h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours());
    clock.textContent = h + ":" + m + ":" + s;
}

const toggleSideSection = () => {
    if(document.getElementsByClassName("side-section")[0].style.width == "350px") 
    {
        document.getElementsByClassName("side-section")[0].style.width = "0";
        document.getElementsByClassName("main")[0].style.marginLeft = "-350px";
        document.getElementsByClassName("clock")[0].style.marginLeft = "-350px";
        document.getElementsByClassName("calendar")[0].style.marginLeft = "-350px";
        document.getElementById("events-table").style.width = "100%";
    }
    else 
    {
        document.getElementsByClassName("side-section")[0].style.width = "350px";
        document.getElementsByClassName("main")[0].style.marginLeft = "0";
        document.getElementsByClassName("clock")[0].style.marginLeft = "0";
        document.getElementsByClassName("calendar")[0].style.marginLeft = "0";
        document.getElementById("events-table").style.width = "74%";
    }
    
}

const addEvent = () => {
    document.querySelector(".add-event-popup").style.display = "block";
    document.querySelector(".add-event-popup-bg").style.display ="block";
}

const closeAddEventPopup = () => {
    document.querySelector(".add-event-popup").style.display = "none"
    document.querySelector(".add-event-popup-bg").style.display ="none";
    document.getElementsByTagName("form")[0].reset();
    setAllDay();
}

const setAllDay = () => {
  let checked = document.querySelector("#ad-cb").checked;
  let inputTime = document.getElementById("event-time")

  if (checked){
    //remove required attribute
    inputTime.attributes.removeNamedItem("required");
    //clear and disable time input
    inputTime.value = "";
    inputTime.disabled = true;
  } else{
    //add required attribute
    let requiredAttr = document.createAttribute("required");
    inputTime.attributes.setNamedItem(requiredAttr);
    //enable time input
    inputTime.disabled = false;
  }
}

const disablePastDateTime = () => {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("event-date").setAttribute("min", today);
}

const submitEvent = () => {
    let submittedEvent = getEvent() === null ? [] : getEvent();
    let eventName = document.querySelector("#event-title").value;
    let eventDate = document.querySelector("#event-date").value;
    let eventTime = document.querySelector("#ad-cb").checked ?
    "00:00" : document.querySelector("#event-time").value;
    let data = {"event_name": eventName, "event_date": eventDate, "event_time": eventTime};
    submittedEvent.push(data);
    localStorage.setItem("data",JSON.stringify(submittedEvent));
}

const getEvent = () => {
    let data = localStorage.getItem("data");
    return JSON.parse(data);
}

const viewAllEvents = () => {
    let events = getEvent() === null ? [] : sortEvents(getEvent());
    if(events.length !== 0){
        document.querySelector("#no-schedule-text").style.display = "none";
        generateEventsTable(events);
    }else{
        document.querySelector("#no-schedule-text").style.display = "block";
    }
    console.log(events);
}

const generateEventsTable = (arr) => {
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    arr.forEach(element => {
        let row = document.createElement("tr");
        let cellEventName = document.createElement("td");
        let cellEventDate = document.createElement("td");
        let cellEventTime = document.createElement("td");
        //create date obj
        let currDateObj = new Date(element.event_date);
        eventNameText = document.createTextNode(element.event_name);
        eventDateText = document.createTextNode(days[currDateObj.getDay()]+ ", " + months[currDateObj.getMonth()] + " " + currDateObj.getDate());
        eventTimeText = document.createTextNode(element.event_time == "00:00" ? "All Day" : element.event_time);
        cellEventName.appendChild(eventNameText);
        cellEventDate.appendChild(eventDateText);
        cellEventTime.appendChild(eventTimeText);
        cellEventName.classList.add("event-name")
        row.appendChild(cellEventDate);
        row.appendChild(cellEventTime);
        row.appendChild(cellEventName);
        document.querySelector("#events-table").appendChild(row);
    });
}

const sortEvents = (arr) => {
    return arr.sort((a, b) => {
        return a.event_date.localeCompare(b.event_date) || a.event_time.localeCompare(b.event_time);
    });
}

const viewEventsByDate = () => {

}

setInterval(time, 1000)
window.addEventListener("load", disablePastDateTime, true);
window.addEventListener("load", viewAllEvents, true);