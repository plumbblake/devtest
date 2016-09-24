(function(){
    var mainImage = document.querySelector('#carousel > img');
    var thumbnails = document.querySelectorAll('#carousel-info > div:last-child img');

    [].slice.call(thumbnails).forEach(function(element){
        var src = element.getAttribute('src').replace('-thumbnail', '');
        element.addEventListener('click', function(){
            mainImage.setAttribute('src', src);
        });
        var cacheImage = new Image();
        cacheImage.src = src;
    });
})();
