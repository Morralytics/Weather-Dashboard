// On-load function
$(function() {

    var btn = $('.btn');
    var historySection = $('.city-searches')
    var numOfSearches = null;
    
    btn.click(function() {
        var userInput = $('.city-input').val();
        numOfSearches += 1;       

        localStorage.setItem(JSON.stringify(numOfSearches), userInput);

        if ($('.card temp') !== null) {
            clearCurrentWeatherInfo();
        }
        printHistory(userInput);
        printCityWeatherInfo(userInput);
    });

    var setStorage = function() {
        var storageKeys = Object.keys(localStorage);

        
        if (storageKeys !== null) {
            storageKeys.forEach((key) => {
                printHistory(localStorage.getItem(key))
            });
        }
    }

    var printHistory = function(city) {
        var bootstrapDiv = $('<div>');
        var listEl = $('<div>');
        var listDetail = city;

    
        bootstrapDiv.addClass('card card-body history-item custom-card');
        listEl.addClass('list-text').text(listDetail);
        bootstrapDiv.appendTo(historySection);
        listEl.appendTo(bootstrapDiv);
    }

    var printCityWeatherInfo = function(city) {
        var placementDiv = $('.weather-info');
        var bootstrapDiv = $('<div>');
        var headerDiv = $('<div>');
        var bodyDiv = $('<div>');
        var cardTitle = $('<h5>');
        var cardText = $('<p>');
        var listDetail = city;

        bootstrapDiv.addClass('card temp');
        headerDiv.addClass('card-header temp').text('Search for a city to get a full 5 day forcast!');
        bodyDiv.addClass('card-body temp');
        cardTitle.addClass('card-title temp').text(listDetail);
        cardText.addClass('card-text temp').text('Temp, wind, humidity placeholder');

        bootstrapDiv.appendTo(placementDiv);
        headerDiv.appendTo(bootstrapDiv);
        bodyDiv.appendTo(bootstrapDiv);
        cardTitle.appendTo(bodyDiv);
        cardText.appendTo(bodyDiv);
    }

    var clearCurrentWeatherInfo = function() {
        $('.weather-info').empty();
    }

    setStorage();
});