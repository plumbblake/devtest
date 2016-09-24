(function(){
    var take = 5;
    var skip = 0;
    var request = new XMLHttpRequest();
    var data = {};
    var section = document.querySelector('section');

    var loadData = function(){
        for(skip; skip < take; skip++){
            
        }
    };

    request.open('GET', 'masonry-data.json');

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);
        loadData();
      }
    };
    request.send();
})();
