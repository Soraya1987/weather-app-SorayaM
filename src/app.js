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

function getForecast(coordinates){
  let apikey="43f1d8f12b8168c4b7d63a4219944689";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
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
     celciusTemperature=response.data.main.temp;
     temperatureElement.innerHTML=Math.round(celciusTemperature);

     getForecast(response.data.coord);
}


function search(city)
{
 let apikey="43f1d8f12b8168c4b7d63a4219944689";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event)
{
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input")
    search(cityInputElement.value);
}


function formatDay(timeStamp)
{
  let date=new Date(timeStamp*1000);
  let day=date.getDay();
   let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

function displayForecast(response){
    let forcast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML=`<div class="row">`;

    forcast.forEach(function(forcastDay, index){
        if(index<6){
           forecastHTML+=`
        <div class="card col m-1 border round">
            <div class="weather-forcast-date border">
            ${formatDay(forcastDay.dt)}</div>
              <img src="https://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" alt="" width="100">
            <div class="weather-forcast-temperatures border">
              <span class="weather-forcast-temprature-max"> ${Math.round(forcastDay.temp.max)}°</span>
              <span class="weather-forcast-temprature-min">&nbsp;&nbsp;&nbsp;&nbsp; ${Math.round(forcastDay.temp.min)}° </span>
            </div>  
        </div>
        `;
        }
        
    }
    );
    forecastHTML+=`</div>`;
    forecastElement.innerHTML=forecastHTML;
}

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

search("Tabriz");

