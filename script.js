
var alarmList=[];

const list=document.getElementById("alarmList");

// to append option value inside the drop down of set alarm 
const selectTag = document.querySelectorAll("select");

for(let i=12 ;i > 0;i--){
    i = i < 10? `0${i}`: i;
    let option = `<option value=${i}>${i}</option>`;
    selectTag[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59 ;i >= 0;i--){
    i = i < 10? `0${i}`: i;
    let option = `<option value=${i}>${i}</option>`;
    selectTag[1].firstElementChild.insertAdjacentHTML("afterend",option);
}



// function to display current time in clock
function currentTime(){
    // current time and date
    var time =  new Date();

    // getting hour, minute, second from current time
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // for am or pm
    var session = "";

    // getting value of am or pm from hours
    if(hours >= 12){
        session ="PM";
    }else{
        session ="AM";
    }

    // converting hours into 12hour format
    if(hours > 12){
        hours -=12;
    }

    // converting single digit values into double digit
    // hours
    if(hours < 10 ){
        hours = `0${hours}`;
    }
    // minutes
    if(minutes < 10 ){
        minutes = `0${minutes}`;
    }
    // seconds
    if(seconds < 10 ){
        seconds = `0${seconds}`;
    }

    let timeCurrent=`${hours}:${minutes}:${seconds} ${session}`;
    alarmList.map((alarm) => {
        if(alarm.time === timeCurrent){
            window.alert("alarm ring");
        }
    })


    // rendering time inside dom
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("session").innerHTML = session;
}

setInterval(currentTime, 1000);


function addAlarmToDisplay(alarm){
    // creating html element 'li'
	var div=document.createElement('div');

	div.innerHTML=`
                    <div>
                        <img src="./3557755.png" alt="clock width="20px" height="20px" />
                        ${alarm.time}
                    </div>  

                    <div>
                        <button id="${alarm.id}" class="delete">Delete</button>
                    </div>
	`;

	list.append(div);
	return;

}


function renderDom(){
    list.innerHTML='';
    alarmList.map((alarm) => addAlarmToDisplay(alarm));
}


function addAlarm(){
    // hour input from drop down menu
    const hour=document.getElementById("hoursInput").value;
    // minute
    const minute=document.getElementById("minutesInput").value;
    // am or pm
    const amPM=document.getElementById("sessionInput").value;

    // whether user entered correct value or not

    // if entered data is incorrect then show error message 
    if(hour === "Hour" || minute === "Minute"){
        window.alert("Enter Correct value !!");
        return;
    }
    // if entered correct value show alert message of new alarm added.
    window.alert(`Alarm set for ${hour} : ${minute} ${amPM}`);
    // store alarm time
    let alarmTime = {
        time:`${hour}:${minute}:00 ${amPM}`,
        id:Date.now().toString()
    };
    // append alarm time in alarm list
    alarmList.push(alarmTime);

    document.getElementById("hoursInput").value='Hour';
    document.getElementById("minutesInput").value='Minute';
    document.getElementById("sessionInput").value='AM';
    return;
}


function removeAlarm(alarmId){
    const newAlarmList = alarmList.filter((alarm) => alarm.id != alarmId);
    alarmList = newAlarmList;
    return;
}



// button to add a new alarm into the list
document.addEventListener("click",(event)=>{
    event.preventDefault();
    const target=event.target;
    if(target.className === "setAlarmBtn"){
        addAlarm();
    }
    else if(target.className === "delete"){
        removeAlarm(target.id);
    }
    renderDom();
});
