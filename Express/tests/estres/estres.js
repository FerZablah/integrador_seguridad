const axios = require('axios');

for (let i = 0; i < 1000; i++) {
    axios.post('http://localhost:4000/sos', {
        lat: "25.660015666666666",
        lon: "-100.44092133333334"
    }).then((res) => {
        console.log(res.status);
    }).catch((e) => {
        console.log(e.response.status);
    });
}