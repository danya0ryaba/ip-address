import { validateIp } from './helper/helpers'

const btn = document.querySelector('button')
const ipInput = document.querySelector('.search-bar__input')
const ipInfo = document.querySelector('#ip')
const location = document.querySelector('#location')
const timezone = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

function getData() {
    if (validateIp(ipInput.value)) {
        try {
            fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_GSYsUULnxrKx4IAJydzbyw0CXFVPB&ipAddress=${ipInput.value}`)
            fetch(`http://ipwho.is/${ipInput.value}`)
                .then(response => response.json())
                .then(response => setInfo(response))
        } catch (error) {
            console.error(error.message);
        }

    }
}

function handleKey(e) {
    if (e.key === 'Enter') getData()
}

function setInfo(mapData) {
    ipInfo.textContent = mapData.ip;
    location.textContent = mapData.city;
    timezone.textContent = mapData.timezone.utc;
    ispInfo.textContent = mapData.postal;
    map(mapData.latitude, mapData.longitude)
}

function map(latitude, longitude) {
    var map;
    DG.then(function () {
        map = DG.map('map', {
            center: [latitude, longitude],
            zoom: 13
        });
        DG.marker([latitude, longitude]).addTo(map);
    });
}