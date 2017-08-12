$(function(){

    console.log('p');
    var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr";
    var $top = $('.top');
    var nasaGaleryUrl ="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=6WpwqyBa7pKSUeUnrmYG6efhmGwNgyZQYhuU0Obr";
    var $ul = $('ul');
    var $button = $('button');
    console.log($button);

     function imageTop(image) {
        var $url = image.url;
        $top.css('background-image', 'url("'+ $url+ '")');
    }

    $.ajax({
            url: nasaUrl+"&date="+RandomDate()
        }).done(function (response) {
            imageTop(response);
                console.log(response);
        }).fail(function (error) {
            console.log(error);
        })//koniec ajax

    function galeryImage(marsImages){

        $.each(marsImages, function(indexImg, marsImg){
            console.log(marsImg.img_src);
            var $li = $('<li><img src="'+ marsImg.img_src +'" class="img-fluid">');
            $ul.append($li);
            return (indexImg !== 5);
        });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

    function RandomDate(){

        var $year = getRandomInt(2010, 2016);
        var $mouth = getRandomInt(1, 12);
        var $day = getRandomInt(1, 28);
        var $date = $year+'-'+$mouth+'-'+$day

        return $date;
    }

     $.ajax({
            url: nasaGaleryUrl
        }).done(function (response) {
                galeryImage(response.photos);
                console.log(response.photos);
        }).fail(function (error) {
            console.log(error);
        })//koniec ajax

//    $button.on('click', galeryImage(marsImages));

});
