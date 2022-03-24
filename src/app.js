function formatDate(timeStamp)
{
    let date=new Date(timeStamp);
    let hourse=date.getHours();
    if(hourse<10){hourse=`0${hourse}`;}
    let minutes=date.getMinutes();
    if(minutes<10){minutes=`0${minutes}`;}
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
    let day=days[date.getDay()];
    let year=date.getFullYear();
    let month=date.getMonth()+1;  
  if (month<10){
    month=`0${month}`;
  }
  
  let numDay=date.getDate();
  if(numDay<10){
    numDay=`0${numDay}`;
  }
  let nowDate=document.querySelector("#nowDate");
    
      let formatDate = ` ${year}-${month}-${numDay}`;
      nowDate.innerHTML=formatDate; 
    return `${day} ${hourse}: ${minutes}`;
}

function displayTemperature(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);

    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;

    let discriptionElement=document.querySelector("#description");
    discriptionElement.innerHTML=response.data.weather[0].description;

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;

    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);

    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);

     let iconElement=document.querySelector("#icon");
     iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     iconElement.setAttribute("alt",response.data.weather[0].description);

}

let apiKey="43f1d8f12b8168c4b7d63a4219944689";
let city="New York";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
