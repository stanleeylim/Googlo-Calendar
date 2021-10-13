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
        document.getElementsByClassName("main")[0].style.marginLeft = "0";
        document.getElementsByClassName("clock")[0].style.marginLeft = "-350px";
        document.getElementsByClassName("calendar")[0].style.marginLeft = "-329px"
    }
    else 
    {
        document.getElementsByClassName("side-section")[0].style.width = "350px";
        document.getElementsByClassName("main")[0].style.marginLeft = "350px";
        document.getElementsByClassName("clock")[0].style.marginLeft = "5px";
        document.getElementsByClassName("calendar")[0].style.marginLeft = "10px"
    }
}

setInterval(time, 1000)