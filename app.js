
let sites = [
    { lat: 53.903192, lon: -1.629799, id: 1 },
    { lat: 53.818928, lon: -1.603168, id: 2 },
    { lat: 53.798325, lon: -1.525394, id: 3 },
    { lat: 53.799408, lon: -1.535259, id: 4 },
    { lat: 53.796259, lon: -1.547696, id: 5 },
    { lat: 53.796012, lon: -1.540937, id: 6 },
    { lat: 53.782096, lon: -1.559061, id: 7 },
]

let site_data = {};

currentSite = 7;
let currentField = 'Co2'

function blackmagicfuckery ([lat, lon])
    {
        if (lat == 53.903192 && lon == -1.629799)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab1.html', '_blank');
        else if (lat == 53.818928 && lon == -1.603168)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab2.html', '_blank');
        else if (lat == 53.798325 && lon == -1.525394)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab3.html', '_blank');
        else if (lat == 53.799408 && lon == -1.535259)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab4.html', '_blank');
        else if (lat == 53.796259 && lon == -1.547696)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab5.html', '_blank');
        else if (lat == 53.796012 && lon == -1.540937)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab6.html', '_blank');
        else if (lat == 53.782096 && lon == -1.559061)
            var win = window.open('https://vehemos.github.io/TrafficAye/tab7.html', '_blank');
    }
function loadData(siteId) {
    if (site_data[siteId]) {
        load();
        return;
    }
    fetch(`site_${siteId}.json`).then(res => res.json().then(data => {
        site_data[siteId] = data;
        load();
    }))
}


var mymap = L.map('map').setView([53.782096, -1.559061], 13);
loadData(currentSite);
    
addMarkers(sites);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

OpenStreetMap_Mapnik.addTo(mymap);

function addMarkers(site) {
    site.forEach(site => {
        let marker = L.marker([site.lat, site.lon]);
        marker.on('click', () => {
            blackmagicfuckery([site.lat, site.lon]);
  win.focus();        })
        marker.addTo(mymap);
    })
    
  
}
<html>
<script type='text/javascript' src='https://eu-west-1a.online.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='width: 1920px; height: 849px;'><object class='tableauViz' width='1920' height='849' style='display:none;'><param name='host_url' value='https%3A%2F%2Feu-west-1a.online.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='&#47;t&#47;hackjunction' /><param name='name' value='7CityCompare&#47;Sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='showAppBanner' value='false' /><param name='filter' value='iframeSizedToWindow=true' /></object></div>
</html>
