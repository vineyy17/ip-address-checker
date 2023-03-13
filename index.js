const ipForm = document.querySelector('.ipForm');
const details = document.querySelector('.details');
const myMap = L.map('mapid');

const address = new Address();

// updates the ui with data returned from api when called.
const updateUI = (data) => {
    const ipDets = data.ipDets;

    details.innerHTML = `
    <div class="card">
          <p class="card-upper-text">IP ADDRESS</p>
          <h1 class="card-lower-text">${ipDets.ip}</h1>
        </div>
        <div class="card">
          <p class="card-upper-text">LOCATION</p>
          <h1 class="card-lower-text">${ipDets.location.region}, ${ ipDets.location.country}</h1>
        </div>
        <div class="card">
          <p class="card-upper-text">TIMEZONE</p>
          <h1 class="card-lower-text">UTC${ipDets.location.timezone}</h1>
        </div>
        <div class="card">
          <p class="card-upper-text">ISP</p>
          <h1 class="card-lower-text">${ipDets.isp}</h1>
        </div>
    `
    // sets the latitude and longitude data as float when returned from api
    const lat = parseFloat(ipDets.location.lat);
    const lng = parseFloat(ipDets.location.lng);
    
    myMap.setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    const marker = L.marker([lat, lng]).addTo(myMap);
    marker.bindPopup("<b>" + `${ipDets.location.city}` + "</b>").openPopup();
};

let ip = ""
address.updateDetails(ip)
.then(data => {
    updateUI(data);
}).catch(err => {
    console.log(err);
});


// event listener for submit actions on form
ipForm.addEventListener('submit', e => {
    e.preventDefault();

    //get ip value
    let ip = ipForm.address.value;
    ipForm.reset();

    // update details in based on ip
    address.updateDetails(ip)
    .then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });

    localStorage.setItem('ip', ip);

});

if(localStorage.getItem('ip')){
    address.updateDetails(localStorage.getItem('ip'))
    .then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
};

console.log(localStorage.getItem('ip'));