$('.btn').mouseup(function() { this.blur() }) //removes focus on buttons after clicked.

$(document).ready(function() { // function run at after page load
    
  var quotePull;
  var authorPull;
    
  function quoteFinder() {
    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en', // info at end of url can also be adjusted in the data object a few lines down.
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data: {
            method: 'getQuote',
            lang:  'en',
            format: 'jsonp'
        },
        success: function(response) {
         quotePull = response.quoteText;
         authorPull = response.quoteAuthor;
         $('#quote').text("\" " + quotePull + " \"");
         if (authorPull) {
            $('#author').text("- " + authorPull);
         }
         else {
            $('#author').text("- unkown");
         }
        $("#quote").animate({opacity: '1'}, "slow");
        $("#author").animate({opacity: '1'}, "slow");
    }
    });
  }
    
    $('#quoteButtonID').on('click',function(event) {
        $("#quote").animate({opacity: '0'}, "slow", function() {
            event.preventDefault();
            quoteFinder(); 
            });
        $("#author").animate({opacity: '0'}, "slow", function() {
            event.preventDefault();
            quoteFinder(); 
            });  
    });
    
     $('#tweetButtonID').on('click',function(event) {
        event.preventDefault();
        if (authorPull) {
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent( '\"' + quotePull + '\"' + ' - ' + authorPull)); 
         }
         else {
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent( '\"' + quotePull + '\"' + ' - unknown')); 
         }
    });
    
   quoteFinder(); 
    
});