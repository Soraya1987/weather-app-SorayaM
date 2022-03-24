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
    console.log(year);
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

}

let apiKey="43f1d8f12b8168c4b7d63a4219944689";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
//console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);