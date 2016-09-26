(function(){
    var take = 5;
    var skip = 0;
    var request = new XMLHttpRequest();
    var data = {};
    var leftColumn = document.querySelector('#left-column');
    var rightColumn = document.querySelector('#right-column');
    var loadMore = document.querySelector('#load-more');
    var template = document.querySelector('#template');
    var templateImage = template.content.querySelector('img');
    var templateHeading = template.content.querySelector('h3');
    var templateContent = template.content.querySelector('.content');
    var templateMeta = template.content.querySelector('.meta');
    var templateImageContainer = template.content.querySelector('.tile-img-container');
    var isMobile = false;
    var windowWidth = 0;
    var widthChange = 570;

    var updateWindowWidth = function(){
        windowWidth = window.innerWidth || document.documentElement.offsetWidth || document.querySelector('body').offsetWidth;
    };
    updateWindowWidth();

    var determineAppend = function(templateClone){
        if(leftColumn.offsetHeight > rightColumn.offsetHeight && !isMobile){
            rightColumn.appendChild(templateClone);
        } else {
            leftColumn.appendChild(templateClone);
        }
    };

    var loadData = function(){
        isMobile = windowWidth > widthChange ? false : true;
        for(skip; skip < take && skip < data.tiles.length; skip++) {
            var tile = data.tiles[skip];
            templateImage.src = tile.image;
            if(tile.image){
                templateImageContainer.classList.remove('hide');
            } else {
                templateImageContainer.classList.add('hide');
            }
            templateHeading.textContent = tile.heading;
            templateContent.textContent = tile.content;
            templateMeta.textContent = tile.meta;
            var templateClone = document.importNode(template.content, true);
            determineAppend(templateClone);
        }
    };

    var redraw = function(){
        while (rightColumn.firstChild) {
            rightColumn.removeChild(rightColumn.firstChild);
        }
        while (leftColumn.firstChild) {
            leftColumn.removeChild(leftColumn.firstChild);
        }
        skip = 0;
        loadData();
    };

    request.open('GET', 'masonry-data.json');

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);
        loadData();
      }
    };

    request.send();

    loadMore.addEventListener('click', function(){
        take += 5;
        if(take >= data.tiles.length){
            loadMore.style.display = 'none';
        }
        loadData();
    });

    window.addEventListener('resize', function(){
        updateWindowWidth();
        if((windowWidth > widthChange && isMobile) || (windowWidth < widthChange && !isMobile)) {
            redraw();
        }
    });
})();
