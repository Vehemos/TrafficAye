
let sites = [
    { lat: 53.903192, lon: -1.629799, id: 1 },
    { lat: 53.799186, lon: -1.534937, id: 4 },
    { lat: 53.796259, lon: -1.547696, id: 5 },
    { lat: 53.782096, lon: -1.559061, id: 7 },
]

let site_data = {};

currentSite = 7;
let currentField = 'Co2'

function loadData(siteId) {
    function load() {
        initChart(site_data[siteId], currentField);
    }
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
            var win = window.open('https://bhaduriu.github.io/TrafficEye/tab.html', '_blank');
  win.focus();        })
        marker.addTo(mymap);
    })

    // mymap.panTo([points[0][0], points[0][1]]);
}

let chart = null;

function initChart(data, field) {
    let points = data.map(p => p[field])
    let counts = Object.entries(_.countBy(points))
    if (field !== 'Co2') {
        counts = counts.sort(([ka, va], [kb, vb]) => {
            return ka.localeCompare(kb);
        })
    }
    let labels = counts.map(([k, v], i) => {
        return k;
    });
    let values = counts.map(([k, v], i) => {
        return v;
    });
    let ctx = document.getElementById("myChart");
    if (chart != null) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scaleShowValues: true,
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    })
}

let dropdown = document.getElementById("dropdown");

dropdown.addEventListener('change', e => {
    currentField = e.target.value;
    initChart(site_data[currentSite], currentField);
})
