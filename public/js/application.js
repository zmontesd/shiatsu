$(document).ready(function() {
  
  function clearButtonClasses(button) {
    button.removeClass('btn-info btn-success btn-primary available unavailable booked');
  }
  
  function updateButton(button, cssClass, message) {
    clearButtonClasses(button);
    button.fadeOut(500, function() {
      button.text(message).fadeIn(500);
    });
    button.addClass(cssClass);
  }
  
  function updateMassageCount(count) {
    $('.massage_count').text(count);
  }
  
  function failBooking(button, message) {
    updateButton(button, 'btn-danger', message);
  }
  
  function passBooking(button, message) {
    updateButton(button, 'btn-success booked', message);
  }

  $('.appt_book').on('click', function(e) {
    e.preventDefault();

    var button = $(this);
    var time = button.data('time');

    if (button.hasClass('unavailable'))
      {
        void(0);
      }
    else if (button.hasClass('available') || button.hasClass('btn-danger'))
      {
        var request = $.ajax({
          url: "/appointments/book",
          type: "put",
          data: { appointment_id: button.data('appointmentid')}
        });

        request.done(function(data){
          if (data.booked === true)
          {
            passBooking(button, (time + " Booked!"));
            updateMassageCount(data.appt_count);
          }
          else
          {
            failBooking(button, "Don't be greedy now...");
          }
        });
        request.fail(function(data){
          failBooking(button,"Server Error");
        });
      }
    else if (button.hasClass('booked'))
      {
        var request = $.ajax({
          url: "/appointments/unbook",
          type: "put",
          data: { appointment_id: button.data('appointmentid')}
        });

        request.done(function(data) {
          updateButton(button,"available btn-info",(time + " Unbooked!"));
          updateMassageCount(data.appt_count);
        });
      }
  });

  // therapist Bookings
  $('.show_appt dropdown').on('hover', function(e) {
    $('.dropdown-toggle').dropdown();
  });

  // therapist delete a appointment 
  $('.delete_appt').on('click', function(e) {
    e.preventDefault();

    var request = $.ajax({
      url: $(this).find('a').attr('href'),
      type: 'delete'
    });
    request.done(function() {
      document.location.reload();
    });
  });

  // therapist to delete appointments on the same day
  $('.therapist_day_label').hover(function() {
    var ogText = $(this).text(); 

    $(this).text("delete day").addClass("btn-danger"); 
    
    $('.delete_appt_list').on('click', function(e) {
      e.preventDefault();
        var request = $.ajax({
          url: $(this).attr('href'),
          type: 'put'
        });
        request.done(function(result) {
          document.location.reload(result);
      });
    }); 
    
    $(this).on('mouseleave', function() {
      $(this).text(ogText).removeClass("btn-danger").delay(2000);
    });
  });

  // dynamic form to add more appointment blocks
  $('#add-appt-block').on('click', function() {
    $('.appt-new').last().clone().appendTo("#appt-list").show();
  });

  $('.preference').on('submit', function(e){
    var form = $(this);
    e.preventDefault();
    $.ajax({
           url: form.attr('action'),
           type: 'put',        
           data: {preference: $('.pressure').val()}, 
           }).done(function(){
            updateButton($('.preference_submit'),"available btn-info", " Updated!")
            $('.user_pref').text($('.pressure').val());
           })
    });

  $('.condition').on('submit', function(e){;
    var form = $(this);
    e.preventDefault();
    console.log($('.conditions_desc').val())
    $.ajax({
           url: form.attr('action'),
           type: 'put',        
           data: {description: $('.conditions_desc').val()}, 
           }).done(function(){
            updateButton($('.condition_button'),"available btn-info", " Updated!")
            $('.new_conditions').append($('.conditions_desc').val()+'<br>')
            $('.conditions_desc').val('')
            // $('.current_conditions').val().empty()
           })
    });

});

function clearButtonClasses(button) {
  button.removeClass('btn-info btn-success btn-primary btn-danger available unavailable booked');
}

function updateButton(button,cssClass,message) {
  clearButtonClasses(button);
  button.fadeOut(500, function() {
    button.text(message).fadeIn(500);
  });
  button.addClass(cssClass);
}

function updateMassageCount(count) {
  $('.massage_count').text(count);
}

function failBooking(button,message) {
  updateButton(button,'btn-danger',message);
}

function passBooking(button, message) {
  updateButton(button,'btn-success booked',message);
}
