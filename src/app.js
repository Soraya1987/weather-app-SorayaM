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

}

let apiKey="43f1d8f12b8168c4b7d63a4219944689";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
//console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);