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

        function validateEmail($email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test( $email );
        }
        $.fn.inputFilter = function(inputFilter) {
          return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
              if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                this.value = "";
              }
          });
        };
        $(".input-phone").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 999999999999);
        });
        $('input[type=email]').change(function(e){
          let val = $(this).val();
          if(!validateEmail(val)){
            $(this).parents('.form-group').addClass('has-error');
            $(this).parents('.form-group').find('.error-text').html('Неверно введен email');
            $(this).focus(function (e) {
                $(this).parents('.form-group').removeClass('has-error');
            });
          }
        });
        $('form .btn-submit').click(function(e){
          e.preventDefault();
          let values = $(this).parents('form').find('input[data-reqired]');
          let errorArray = new Array();
          for (let index = 0; index < values.length; index++) {
              if( $(values[index]).attr('type')=='email' && $(values[index]).val()){
                if(!validateEmail($(values[index]).val())){
                  errorArray.push($(values[index]));
                  $(values[index]).parents('.form-group').addClass('has-error');
                  $(values[index]).parents('.form-group').find('.error-text').html('Неверно введен email');
                  $(values[index]).focus(function (e) {
                      $(values[index]).parents('.form-group').removeClass('has-error');
                  });
                }
              } else {
              if(!$(values[index]).val()){
                errorArray.push($(values[index]));
                if($(values[index]).attr('type')=='email') {
                  $(values[index]).parents('.form-group').find('.error-text').html('Введите Ваш email');
                }
                $(values[index]).parents('.form-group').addClass('has-error');
                $(values[index]).focus(function (e) {
                    $(this).parents('.form-group').removeClass('has-error');
                });
              }
            }
          }
          if(errorArray.length==0){
            $(this).parents('form').submit();
          }
        });
    });
});