var el = $('#map-canvas');
var map;

function enableScrollingWithMouseWheel() {
    map.setOptions({ scrollwheel: true });
}

function disableScrollingWithMouseWheel() {
    map.setOptions({ scrollwheel: false });
}

function init() {

    var styles = [
    {
      stylers: [
        { hue: "#2ecc71" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

    var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

    map = new google.maps.Map(el[0], {
        zoom: 17,
        center: new google.maps.LatLng(-6.886691,107.614986),
        scrollwheel: false,
        disableDefaultUI: true // disableScrollingWithMouseWheel as default
    });

      var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    title: 'Click to zoom'
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });



    google.maps.event.addListener(map, 'click', function(){
        enableScrollingWithMouseWheel()
    });
      map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

google.maps.event.addDomListener(window, 'load', init);

$('body').on('click', function(event) {
    var clickedInsideMap = $(event.target).parents('#map').length > 0;

    if(!clickedInsideMap) {
        disableScrollingWithMouseWheel();
    }
});

$(window).scroll(function() {
    disableScrollingWithMouseWheel();
});