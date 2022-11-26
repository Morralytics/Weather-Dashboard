// On-load function
$(function() {

    var btn = $('.btn');
    var historySection = $('.city-searches')
    
    btn.click(function() {
        var userInput = $('.city-input').val();
        localStorage.setItem('key', userInput);
        
        printHistory(userInput);
    });



    var printHistory = function(city) {
        var bootstrapDiv = $('<div>');
        var listEl = $('<div>');
        var listDetail = city;

    
        bootstrapDiv.addClass('card card-body history-item custom-card');
        listEl.addClass('list-text').text(listDetail);
        bootstrapDiv.appendTo(historySection);
        listEl.appendTo(bootstrapDiv);
    }
});