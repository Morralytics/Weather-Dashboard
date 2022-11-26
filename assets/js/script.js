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

        bootstrapDiv.addClass('card');
        bootstrapDiv.addClass('card-body history-item').text(listDetail);
        bootstrapDiv.appendTo(historySection);
        listEl.appendTo(bootstrapDiv);
    }
});