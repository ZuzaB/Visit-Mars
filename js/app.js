$(function() {

  var nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr';
  var $top = $('header');
  var nasaGaleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr';
  var $sectionBottom = $('#bottom');
  var $divGallery = $sectionBottom.find('.image');
  var $button = $('button');
  var counter = 0;
  var $btnScroll = $('span');
  var $loader = $('.loader-wrapper');

  function imageTop(image) {
    var $url = image.url;
    $top.css('background-image', 'url("' + $url + '")');
  }

  $.ajax({
    url: nasaUrl + '&date=' + RandomDate()
  }).done(function(response) {
    imageTop(response);
    $loader.fadeOut(5000);
  }).fail(function(error) {
    alert('Nie można uzyskać połączenia z serwerem.');
  });

  $btnScroll.on('click', function(e) {
    $('html, body').animate({
      scrollTop: $("#bottom").offset().top
    }, 1000);
  });

  function galeryImage(marsImages) {
    $.each(marsImages, function(indexImg, marsImg) {
      var $divImg = $('<div class="col-lg-4 col-sm-6 col-sx-12 hidden"><img src="' + marsImg.img_src + '" class="img-responsive"></div>');
      $divGallery.append($divImg);
    });
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function RandomDate() {

    var $year = getRandomInt(2010, 2016);
    var $mouth = getRandomInt(1, 12);
    var $day = getRandomInt(1, 28);
    var $date = $year + '-' + $mouth + '-' + $day;

    return $date;
  }

  function loadingMarsImg() {
    $.ajax({
      url: nasaGaleryUrl
    }).done(function(response) {
      galeryImage(response.photos);
    }).fail(function(error) {
      alert('Nie można uzyskać połączenia z serwerem.');
    });
  }

  function showImages() {
    var $divMarsImages = $divGallery.children();
    for (var i = counter; i < counter + 6; i++) {
      $divMarsImages.eq(i).removeClass('hidden');
    }
    counter += 6;
  }

  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(window).height();
    var bodyHeight = $(document).height() - windowHeight;
    var scrollPercentage = (scrollTop / bodyHeight);

    if (scrollPercentage > 0.9) {
      showImages(counter);
    }
  });
  loadingMarsImg();
});
