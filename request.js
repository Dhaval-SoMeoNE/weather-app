/* Module for handling HTTP/HTTPS request with promise*/

const http = require("http");
const https = require("https");

get = (url) => {
    return new Promise((resolve, reject) => {
        var dumy=http; 
        if(url.indexOf("https") === 0){
            dumy = https;
        }

        const request = dumy;
        
        request.get(url, (response) => {
            let data = '';
        
            // A chunk of data has been recieved.
            response.on('data', (chunk) => {
            data += chunk;
            });
        
            // The whole response has been received. Print out the result.
            response.on('end', () => {
            resolve (data);
            });
        
        }).on("error", (err) => {  
            reject(err);
        });
    });
};

module.exports = {
    get : get
}
