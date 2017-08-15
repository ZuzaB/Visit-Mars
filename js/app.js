$(function() {

  var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr";
  var $top = $('.top');
  var nasaGaleryUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr";
  var $sectionBottom = $('.bottom')
  var $divGallery = $sectionBottom.find('.image');
  var $button = $('button');
  var numberImg = 0;

console.log(nasaGaleryUrl);

  function imageTop(image) {
    var $url = image.url;
    $top.css('background-image', 'url("' + $url + '")');
  }

  $.ajax({
    url: nasaUrl + '&date=' + RandomDate()
  }).done(function(response) {
    imageTop(response);
  }).fail(function(error) {
    alert('Nie można pobrać danych z serwera.');
  });

  function galeryImage(marsImages) {

    $.each(marsImages, function(indexImg, marsImg) {
      var $divImg = $('<div class="col-lg-4 col-sm-6 col-sx-12"><img src="' + marsImg.img_src + '" class="img-responsive"></div>');
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

  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(window).height();
    var bodyHeight = $(document).height() - windowHeight;
    var scrollPercentage = (scrollTop / bodyHeight);

    if (scrollPercentage > 0.9) {
      $.ajax({
        url: nasaGaleryUrl
      }).done(function(response) {
        galeryImage(response.photos);
      }).fail(function(error) {
        alert('Nie można pobrać danych z serwera.');
      });
    }
  });
});
