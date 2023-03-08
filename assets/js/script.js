// On-load function
$(function() { 
    var btn = $('.btn');
    var historySection = $('.city-searches')
    var numOfSearches = null;
    
    // Produces an on click function storing user information into local storage
    btn.click(function() {
        var userInput = $('.city-input').val();
        var userInputLower = $('.city-input').val().toLowerCase();
        numOfSearches += 1;       

        localStorage.setItem(JSON.stringify(numOfSearches), userInput);

        if ($('.card temp') !== null) {
            clearCurrentWeatherInfo();
        }
        // getLocationUrl(userInputLower);
        printHistory(userInput);
        printCityWeatherInfo(userInput);
    });

    // sets the local storage and upon reload, if there is information, it will then display
    var setStorage = function() {
        var storageKeys = Object.keys(localStorage);

        if (storageKeys !== null) {
            storageKeys.forEach((key) => {
                printHistory(localStorage.getItem(key))
            });
        }
    }

    // Prints the amount of searched items based on the amount in local storage
    var printHistory = function(city) {
        var bootstrapDiv = $('<div>');
        var listEl = $('<div>');
        var listDetail = city;

        bootstrapDiv.addClass('card card-body history-item custom-card');
        listEl.addClass('list-text').text(listDetail);
        bootstrapDiv.appendTo(historySection);
        listEl.appendTo(bootstrapDiv);
    }

    // This is where the information on the API is stored as well as logging the information given
    var printCityWeatherInfo = function(city) {
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=1a91782a2d8a6d880d1f0a1bb5990c24`;
        
        fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var tempF = filterApiObj(data).main.temp;
            var wind = filterApiObj(data).wind.speed;
            var humidity = filterApiObj(data).main.humidity;
            var icon = `https://openweathermap.org/img/w/${filterApiObj(data).weather[0].icon}.png`
            console.log(tempF)
            dailyCardRender(city, tempF, wind, humidity, icon);
        });
    }

    // This function clears any items with room for updated items in local storage
    var clearCurrentWeatherInfo = function() {
        $('.weather-info').empty();
    }

    var dailyCardRender = function(city, temp, wind, humidity, icon) {
        var placementDiv = $('.weather-info');
        var bootstrapDiv = $('<div>');
        var headerDiv = $('<div>');
        var bodyDiv = $('<div>');
        var cardTitle = $('<h5>');
        var cardText = $('<p>');
        var weatherIcon = $('<img>');
        var tempEl = $('<p>');
        var windEl = $('<p>');
        var humidityEl = $('<p>');
        var listDetail = city;

        bootstrapDiv.addClass('card temp');
        headerDiv.addClass('card-header temp').text('Search another city to get a full 5 day forcast!');
        bodyDiv.addClass('card-body temp');
        cardTitle.addClass('card-title temp').text(listDetail);
        tempEl.text(`Temp: ${temp} F`);
        windEl.text(`Wind: ${wind} Mph`);
        humidityEl.text(`Humidity: ${humidity}%`);
        weatherIcon.attr('src', icon);

        bootstrapDiv.appendTo(placementDiv);
        headerDiv.appendTo(bootstrapDiv);
        bodyDiv.appendTo(bootstrapDiv);
        cardTitle.appendTo(bodyDiv);
        cardText.appendTo(bodyDiv);
        weatherIcon.appendTo(cardTitle);
        tempEl.appendTo(bodyDiv);
        windEl.appendTo(bodyDiv);
        humidityEl.appendTo(bodyDiv);
    }

    var filterApiObj = function(data) {
        return data.list[0];
    }
    setStorage();
});