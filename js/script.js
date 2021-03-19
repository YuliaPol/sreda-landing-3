jQuery(function ($) {
    $(document).ready(function () {
        if($('.thanks-container').length > 0){
          $('.thanks-container').find('.ready-active').addClass('active');  
        }
        function get_elapsed_time_string(total_seconds) {
            function pretty_time_string(num) {
              return ( num < 10 ? "0" : "" ) + num;
            }
          
            var hours = Math.floor(total_seconds / 3600);
            total_seconds = total_seconds % 3600;
          
            var minutes = Math.floor(total_seconds / 60);
            total_seconds = total_seconds % 60;
          
            var seconds = Math.floor(total_seconds);
          
            // Pad the minutes and seconds with leading zeros, if required
            hours = pretty_time_string(hours);
            minutes = pretty_time_string(minutes);
            seconds = pretty_time_string(seconds);
          
            // Compose the string for display
            var currentTimeString = hours + ":" + minutes + ":" + seconds;
          
            return currentTimeString;
        }
        
        var elapsed_seconds = 7*60;
        setInterval(function() {
            if(elapsed_seconds >0){
              elapsed_seconds = elapsed_seconds - 1;
              let timeStr = get_elapsed_time_string(elapsed_seconds).split(':');
              let hours = timeStr[0];
              let minutes = timeStr[1];
              let seconds = timeStr[2];
              $('.timer .hours').find('.value').html(hours);
              $('.timer .minutes').find('.value').html(minutes);
              $('.timer .seconds').find('.value').html(seconds);
            }
        }, 1000);

        $('.form-valid').submit(function(e){
            e.preventDefault();
            let values = $(this).find('input[data-reqired]');
            let errorArray = new Array();
            for (let index = 0; index < values.length; index++) {
                if(!$(values[index]).val()){
                  errorArray.push($(values[index]));
                  $(values[index]).parents('.form-group').addClass('has-error');
                  $(values[index]).focus(function (e) {
                      $(this).parents('.form-group').removeClass('has-error');
                  });
                }
            }
            if(errorArray.length==0){
                var parents = $(this).parents('.form-wrapper');
                $(this).remove();
                parents.find('.timer').remove(0);
                parents.find('.bonus-text-wrapper .bonus-text').remove();
                parents.find('.form-text').remove(0);
                parents.find('.thank-you-text').fadeIn(300);
                parents.find('.bonus-text-wrapper .thank-you-hidden-text').fadeIn(300);
            }
        });
    });
});