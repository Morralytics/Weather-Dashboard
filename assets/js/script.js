// On-load function
var userInputArr = [];
$(document).ready(function () {
    var historySection = $('.city-searches')

    // Produces an on click function storing user information into local storage
    $(document).on('click', '.btn', function () {
        var userInputArr = [];
        var userInput = $('.city-input').val();
        var userInputTest = localStorage.getItem('user-history');
        var userInputHistory = JSON.parse(localStorage.getItem('user-history'));

        if (userInputTest === null) {
            userInputArr.push(userInput);
            localStorage.setItem('user-history', JSON.stringify(userInputArr));
            printHistory(userInputArr);
            printCityWeatherInfo(userInput);
            console.log(userInputArr)
        }

        userInputArr.push(userInput);
        userInputHistory.push(userInput);
        localStorage.setItem('user-history', JSON.stringify(userInputHistory))

        if ($('.card temp') !== null) {
            clearCurrentWeatherInfo();
        }

        printHistory(userInputArr);
        printCityWeatherInfo(userInput);
    });

    $(document).on('click', '.history-button', function () {
        clearCurrentWeatherInfo();
        if (userInputArr === 0) {
            userInputArr.push($(this).text());
            console.log(userInputArr)
            printCityWeatherInfo(userInputArr);
        } else {
            userInputArr.pop();
            userInputArr.push($(this).text());
            printCityWeatherInfo(userInputArr);
        }
    });

    // sets the local storage and upon reload, if there is information, it will then display
    var setStorage = function () {
        console.log(getStorage());
        if (getStorage() !== null) {
            printHistory(getStorage());
        }
    }

    // Prints the amount of searched items based on the amount in local storage
    var printHistory = function (city) {
        for (i = 0; i < city.length; i++) {
            var bootstrapDiv = $('<div>');
            var listEl = $('<button>');
            bootstrapDiv.addClass('card card-body custom-card');
            listEl.addClass('history-button card card-body list-text history-item').text(city[i]);
            listEl.attr('id', 'history-button');
            bootstrapDiv.appendTo(historySection);
            listEl.appendTo(bootstrapDiv);
        }
    }

    // This is where the information on the API is stored as well as logging the information given
    var printCityWeatherInfo = function (city) {
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=1a91782a2d8a6d880d1f0a1bb5990c24`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var tempF = filterApiObj(data).main.temp;
                var wind = filterApiObj(data).wind.speed;
                var humidity = filterApiObj(data).main.humidity;
                var icon = `https://openweathermap.org/img/w/${filterApiObj(data).weather[0].icon}.png`;
                dailyCardRender(city, tempF, wind, humidity, icon);
                forecastedWeather(data.list);
            });
    }

    // This function clears any items with room for updated items in local storage
    var clearCurrentWeatherInfo = function () {
        $('.weather-info').empty();
        $('.weather-forecast').empty();
    }

    var dailyCardRender = function (city, temp, wind, humidity, icon) {
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

        bootstrapDiv.attr('class', 'card temp d-flex');
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

    var renderForecastedCard = function (forecast) {
        var forecastPlacement = $('.weather-forecast')
        var tempF = forecast.main.temp;
        var wind = forecast.wind.speed;
        var humidity = forecast.main.humidity;
        var icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

        var column = $('<div>');
        var card = $('<div>');
        var bodyDiv = $('<div>');
        var cardTitle = $('<h5>');
        var weatherIcon = $('<img>');
        var tempEl = $('<p>');
        var windEl = $('<p>');
        var humidityEl = $('<p>');

        column.attr('class', 'five-day-card');
        card.attr('class', 'card');
        bodyDiv.attr('class', 'card-body p-5');
        cardTitle.attr('class', 'card-title').text(dayjs(forecast.dt_txt).format('M/D/YYYY'));
        tempEl.text(`Temp: ${tempF} F`);
        windEl.text(`Wind: ${wind} Mph`);
        humidityEl.text(`Humidity: ${humidity}%`);
        weatherIcon.attr('src', icon);
        
        card.appendTo(column);
        bodyDiv.appendTo(card);
        cardTitle.appendTo(bodyDiv);
        weatherIcon.appendTo(bodyDiv);
        tempEl.appendTo(bodyDiv);
        windEl.appendTo(bodyDiv);
        humidityEl.appendTo(bodyDiv);

        column.appendTo(forecastPlacement);
    }

    var forecastedWeather = function (forecast) {
        console.log(forecast);
        var startDate = dayjs().add(1, 'day').startOf('day').unix();
        var endDate = dayjs().add(6, 'day').startOf('day').unix();

        var headerColumn = $('<div>');
        var header = $('<h3>');

        headerColumn.addClass('col-12');
        header.textContent = '5-Day Forecast:';
        header.appendTo(headerColumn);

        for (i = 0; i < forecast.length; i++) {
            if (forecast[i].dt >= startDate && forecast[i].dt < endDate) {
                if (forecast[i].dt_txt.slice(11, 13) == '12') {
                    renderForecastedCard(forecast[i]);
                }
            }
        }
    }

    var filterApiObj = function (data) {
        return data.list[0];
    }

    var getStorage = function () {
        var storedHistory = localStorage.getItem('user-history');
        return JSON.parse(storedHistory);
    }

    setStorage();
});