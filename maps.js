function initMap() {
// const bounds = new google.maps.LatLngBounds();
const directionsRenderer = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
const center = {
        lat: 59.3307777,
        lng: 18.0591112,
    };
const zoom = 15;
const map = new google.maps.Map(document.querySelector('#map'), {
  center,
  zoom,
});
const marker = new google.maps.Marker({
    position: location,
    map: map,
});
const bounds = new google.maps.LatLngBounds();
            bounds.extend(center);
            [{
                    lat: 59.3423423,
                    lng: 18.0373421,
                    content: 'Hello',
                },
                {
                    lat: 59.3091398,
                    lng: 18.1036709,
                },
                {
                    lat: 59.3136618,
                    lng: 18.0744826,
                },
                {
                    lat: 59.3322572,
                    lng: 18.0737272,
                },
                {
                    lat: 59.3333767,
                    lng: 18.0558956,
                },
                {
                    lat: 59.3385269,
                    lng: 18.0360656,
                },
                {
                    lat: 59.3243329,
                    lng: 18.0758075,
                },
                {
                    lat: 59.3264689,
                    lng: 18.0435231,
                }
            ].forEach((marker) => {
                const m = new google.maps.Marker({
                    position: marker,
                    map: map,
                });
                m.addListener("click", () => {
                    infowindow.open(map, m);
                });
                const infowindow = new google.maps.InfoWindow({
                    content: 'One of my favorite restaurants in Stockholm',
                });
                bounds.extend(marker);
            });
            map.fitBounds(bounds);
            bounds.extend(center);

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.querySelector('#directions-panel'));

    document.querySelector('button').addEventListener('click', () => {
        calcRoute(directionsRenderer, directionsService);
    })
};

function calcRoute(renderer, service) {
    let start = 'T-Centralen, 111 20 Stockholm';
    let end = 'Indian Street Food & Co, Karlbergsvägen 43, 113 37 Stockholm';

    let request = {
        origin: start,
        destination: end,
        travelMode: 'TRANSIT'
    };
    service.route(request, (result, status) => {
        document.querySelector('#directions-panel').style.display = 'block';

        if (status == 'OK') {
            renderer.setDirections(result);
        }
    });
}