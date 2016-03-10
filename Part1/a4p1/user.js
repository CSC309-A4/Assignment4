// pretty cool effect
$('.form').find('input, textarea').on('keyup', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    }

});


// toggle between sign up or login
$('.tab1 a').on('click', function (e) {
  
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  $('.tab2 a').parent().addClass('active');
  $('.tab2 a').parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

$('.tab2 a').on('click', function (e) {
  
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  $('.tab1 a').parent().addClass('active');
  $('.tab1 a').parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});