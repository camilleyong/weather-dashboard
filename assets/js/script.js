var submitBtn = document.querySelector('#submitBtn');
var tempInfo = document.querySelector('#tempInfo');
var windInfo = document.querySelector('#windInfo');
var humidInfo = document.querySelector('#humidInfo');
var description = document.querySelector('#description');
var uvIndex = document.querySelector("#uvIndex");
var cityName = document.querySelector('#cityName');
var input = document.querySelector("#input");
var forecastContainer = $('#forecastContainer');
var currentIcon = document.querySelector('#currentIcon');
var currentTime = document.querySelector('#currentTime');


// Fetching the API. Displaying search city weather info, submit buttom to work

var city;

function getWeatherApi () {

// Fetching and displaying the city name when user searches

    var weatherURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + input.value + "&appid=19099350b2009c216e953f3dddf3a632";
    
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].name);
            cityName.textContent = ("🌎 " + data[0].name + " 🌎");

// Fetching the lat and lon of the user's city search

    var cityLat = data[0].lat;
    var cityLon = data[0].lon;
    var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=9b35244b1b7b8578e6c231fd7654c186";
            return fetch(secondUrl)
                .then(function (response){
                    return response.json();
                })
                .then (function (data){



    // CURRENT WEATHER INFO
                console.log (data);
    var currentImageIcon = data.current.weather[0].icon;
    var icon = document.createElement('img');
        
                icon.setAttribute("src" , "http://openweathermap.org/img/wn/" + currentImageIcon + "@2x.png");
    var currentDate = moment(data.current.dt , "X").format("MMM Do, YYYY");
                currentTime.textContent = (currentDate);
                currentIcon.append(icon);
                tempInfo.textContent = ("Temperature: " + data.current.temp + "°F");
                windInfo.textContent = ("Wind Speed: " + data.current.wind_speed + " mph");
                humidInfo.textContent = ("Humidity: " + data.current.humidity + "%");
                description.textContent = ("Description: " + data.current.weather[0].description);
                uvIndex.textContent = ("UV Index: " + data.current.uvi);

    // 5 DAY FORECAST

    var otherWeathersNumbers = ['1' , '2' , '3' , '4' , '5'];

    forecastContainer.empty();

    otherWeathersNumbers.forEach(function(numbers){

    var fiveDayForecast = $(data.daily[numbers]);

    var forecastColumn = $('<div>').addClass('col').css({'margin-right': "40px"});
    var forecastCard = $('<div>').addClass('card h-100');
    var forecastBody = $('<div>').addClass('card-body');
    var forecastDate = $('<h4>').addClass('card-title').css({'background-color': 'rgb(136,136,136)'});
    var forecastIcon = $('<img>').css({'text-align': 'center'});
    var forecastTextMax = $('<p>').addClass('card-text');
    var forecastTextMin = $('<p>').addClass('card-text');
    var forecastTextDesc = $('<p>').addClass('card-text');
    var forecastTextWind = $('<p>').addClass('card-text');
    var forecastTextHumid = $('<p>').addClass('card-text');
    
// Changed the unix date to regular time

    var unixFormat = moment(data.daily[numbers].dt , "X").format("MMM Do, YYYY");
                    console.log(unixFormat);
// Display 5 day forecast info
    var forecastMax = data.daily[numbers].temp.max;
    var forecastMin = data.daily[numbers].temp.min;
    var forecastDescription = data.daily[numbers].weather[0].description;
    var forecastImageIcon = data.daily[numbers].weather[0].icon;
    var forecastWind = data.daily[numbers].wind_speed;
    var forecastHumid = data.daily[numbers].humidity;

        forecastDate.text(unixFormat);
        forecastTextMax.text('Max Temp: ' + forecastMax + '°F');
        forecastTextMin.text('Min Temp: ' + forecastMin + '°F');
        forecastTextDesc.text('Description: ' + forecastDescription);
        forecastTextWind.text('Wind Speed: ' + forecastWind + ' mph');
        forecastTextHumid.text('Humidity: ' + forecastHumid + '%');
        forecastIcon.attr("src" , "https://openweathermap.org/img/wn/" + forecastImageIcon + "@2x.png");

        forecastBody.append(forecastDate, forecastIcon, forecastTextMax, forecastTextMin, forecastTextWind, forecastTextHumid, forecastTextDesc);
        forecastCard.append(forecastBody);
        forecastColumn.append(forecastCard);
        forecastContainer.append(forecastColumn);
    })

         })
        }

        )};

// Submit button event listener
submitBtn.addEventListener("click" , getWeatherApi);

//  Calling the function
getWeatherApi();

function setUVColor(uvIndex) {
    if (uvIndex <= 2) {
      return "favorable";
    } else if (uvIndex <= 7) {
      return "moderate";
    } else {
      return "severe";
    }
  }

// Local Storage for Previous Searches
var listOfCities = [];

submitBtn.addEventListener("click" , function(event) {
    event.preventDefault()

city = input.value;
setlocalStorage(city);
displaySearchHistory();
});

// Display previous searchs as buttons
function displaySearchHistory () {
    var history = $('#previousSearch');
     history.empty();

     var getItem = JSON.parse(localStorage.getItem("city"));

     getItem.forEach(function(item){
        var searchList = $('<button>').css({'width': '14.4rem', 'font-size': '20px' , 'margin-bottom': '10px' , 'background-color': 'rbg(131,133,130)' , "border-radius": '5px'}).addClass('btnClick');
        searchList.text(item);
        history.append(searchList);
     });


     };


function setlocalStorage(city) {

// get cities local storage and make an empty slot in storage
    if (!localStorage.getItem("city")) {
        localStorage.setItem("city" , "[]");
    } else {
// parse it
    listOfCities = JSON.parse(localStorage.getItem("city"));
}
// if the city isn't included in the array, then add it
    if (!listOfCities.includes(city)) {
        listOfCities.push(city);
    }
// if it is more than 5, delete the first item in array
    if (listOfCities.length >= 5) {
        listOfCities.shift();
    }
// set local storage and stringify
        localStorage.setItem("city" , JSON.stringify(listOfCities));

}


function getRecentCity () {
    console.log(this);

}

displaySearchHistory(city);

var recentSearchButton = document.getElementsByClassName("btnClick");
console.log(recentSearchButton);
recentSearchButton.forEach(function (city){

var cityText = city.innerHTML;

    $(cityText).on('click' , getRecentCity);
    console.log('click');
});









