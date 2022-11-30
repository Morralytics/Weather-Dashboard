// On-load function
$(function() {

    
    var btn = $('.btn');
    var historySection = $('.city-searches')
    var numOfSearches = null;
    
    

    btn.click(function() {
        var userInput = $('.city-input').val();
        var userInputLower = $('.city-input').val().toLowerCase();
        numOfSearches += 1;       

        localStorage.setItem(JSON.stringify(numOfSearches), userInput);

        if ($('.card temp') !== null) {
            clearCurrentWeatherInfo();
        }
        getLocationUrl(userInputLower);
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

    var getLocationUrl = function(city) {
        
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
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1a91782a2d8a6d880d1f0a1bb5990c24&units=imperial`;
        var placementDiv = $('.weather-info');
        var bootstrapDiv = $('<div>');
        var bootstrapDiv2 = $('<div>')
        var headerDiv = $('<div>');
        var bodyDiv = $('<div>');
        var bodyDiv2 = $('<div>');
        var cardTitle = $('<h5>');
        var cardText = $('<p>');
        var listDetail = city;
        
        fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var listOfDays = [];
            console.log(data);
            for (i = 0; i < data.list.length; i++) {
                var arr = data.list[i].dt_txt.split([''])
                var time = arr[11] + arr[12];
                var date = data.list[i].dt_txt.split(' ')[0];
                var tmrDate = data.list[i].dt_txt.split(' ')[0]+1;
                var timeStamp = new Date(data.list[i].dt * 1000);
                console.log(timeStamp);
            }
            var time = new Date();
            var localTime = time.getTime();
            var localOffset = time.getTimezoneOffset() * 60000;
            var utc = localTime + localOffset;
            var userCity = utc +(1000 * data.city.timezone);
            console.log(new Date(userCity));
            cardText.addClass('card-text temp').text(data);
        });

        bootstrapDiv.addClass('card temp');
        headerDiv.addClass('card-header temp').text('Search another city to get a full 5 day forcast!');
        bodyDiv.addClass('card-body temp');
        cardTitle.addClass('card-title temp').text(listDetail);

        bootstrapDiv2.addClass('card smaller temp');
        bodyDiv2.addClass('card-body smaller temp').text('Placeholder');

        bootstrapDiv.appendTo(placementDiv);
        headerDiv.appendTo(bootstrapDiv);
        bodyDiv.appendTo(bootstrapDiv);
        cardTitle.appendTo(bodyDiv);
        cardText.appendTo(bodyDiv);

        for (i = 0; i < 3; i ++) {
            bootstrapDiv2.appendTo(placementDiv);
            bodyDiv2.appendTo(bootstrapDiv2);
        }
    }

    var clearCurrentWeatherInfo = function() {
        $('.weather-info').empty();
    }

    setStorage();
});