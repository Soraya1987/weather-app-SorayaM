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

function displayFahrenheitTemperature(event){
    event.preventDefault();
     let TemperatureElement=document.querySelector("#temperature");
     celsiusLink.classList.remove("active");
    fahreintheitLink.classList.add("active");
     let fahrenheitTemperature=(celciusTemperature*9)/5+32;
     TemperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahreintheitLink.classList.remove("active");
   
    temperatureElement.innerHTML=Math.round (celciusTemperature);
}

function displayForcast()
{
  let forecastElement=document.querySelector("#forecast");
  let days=["Thu","Fri","Sat","Sun"];
  let forecastHTML=`<div clas="row">`;
  days.forEach(function(day){
    forecastHTML+=
    `    <div class="col-2">
                        <div class="weather-forcast-date">
                           Thu
                        </div>
                        
                        <img src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png" alt="" width="40px" />
                        <div class="weather-forcast-temperatures">
                            <spn class="weather-forcast-temperature-max">
                               18°
                            </spn>
                            <spn class="weather-forcast-temperature-min">
                                12°
                            </spn>
                        </div>
                         
         </div>
    `;
  });
  forecastHTML+=`<\div>`;
  forecastElement.innerHTML=forecastHTML;
}

let celciusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahreintheitLink=document.querySelector("#fahrenheit-link");
fahreintheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celcuis-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);
displayForcast();
search("Tabriz");

