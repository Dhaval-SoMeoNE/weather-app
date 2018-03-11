const NODECMD = require('node-cmd');

get = () => {
    return new Promise((resolve,reject) =>{
        NODECMD.get('ipconfig',function(err, data, stderr){  
            if(err){
                reject (stderr);
            }
            var start = data.indexOf('IPv4 Address. . . . . . . . . . . : ');
            var end = data.indexOf('Subnet Mask . ');
            var dumy = data.substring(start+36,end);
            dumy = dumy.split('');
            dumy = dumy.filter((ch) => { return (ch>='1'&&ch<='9')||ch==='.'});
            dumy = dumy.join('');
            resolve (dumy);
        });
    });
};

module.exports = {
    get : get
};