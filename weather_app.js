const yargs = require('yargs');

const getLocalIPAdress = require('./get_local_ipaddress');
const request = require('./request');

const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const forcastApiUrl = 'https://api.forecast.io/forecast'
const apiKey = '7218edbe0a0e1cb964e0af3865d8535d'
const googleApiKey = 'AIzaSyBq_qun-ajVMf8HgrISBtDLU47IYqWewOY'

var address = yargs.argv.address;

showTemperature = (response) => {

    response = JSON.parse(response);
    var temperature = response.currently.temperature;
    var apparentTemperature = response1.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}

if(address){
    var encodedAddress = encodeURIComponent(address);
    request.get(`${googleApiUrl}${encodedAddress}&key=${googleApiKey}`)
    .then((response) => {
        response = JSON.parse(response);
        
        if(response.status === 'ZERO_RESULTS'){

            console.log('Address not found');
        
        }else if(response.results.length!=0){
            
            console.log(response.results[0].formatted_address);
            var location = response.results[0].geometry.location;
            
            request.get(`${forcastApiUrl}/${apiKey}/${location.lat},${location.lng}`)
            .then((response1)=>{
                showTemperature(response1);
            });
        }
    }).catch((error) => {console.log('Error : ',error)});

}else{

    console.log('Using your current location');
    
    getLocalIPAdress.get()
    .then((response) => {
        request.get('http://freegeoip.net/json/'+response)
        .then((response) => {
            response=JSON.parse(response);
            request.get(`${forcastApiUrl}/${apiKey}/${response.latitude},${response.longitude}`)
            .then((response1)=>{
                showTemperature(response1);
            });
        });
    }).catch((error)=>{
        
        console.log('Error',error);
    });
}