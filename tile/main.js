(function(){
    var video = document.querySelector('#video');
    var player = video.querySelector('video');

    video.addEventListener('click', function(){
        this.classList.toggle('full-width');
        this.parentNode.classList.toggle('full-width');
        if(this.classList.contains('full-width')){
            player.play();
        } else {
            player.pause();
        }
    });
})();
