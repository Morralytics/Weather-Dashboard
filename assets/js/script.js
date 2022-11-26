// On-load function
$(function() {

    var btn = $('.btn');
    var historySection = $('.city-searches')
    var numOfSearches = null;
    
    btn.click(function() {
        var userInput = $('.city-input').val();
        numOfSearches += 1;       

        localStorage.setItem(JSON.stringify(numOfSearches), userInput);
        printHistory(userInput);
    });

    var setStorage = function() {
        var storageKeys = Object.keys(localStorage);

        storageKeys.forEach((key) => {
            console.log(key + ' ' + localStorage[key]);
        });
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

    setStorage();
});