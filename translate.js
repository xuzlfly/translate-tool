var querystring = require("querystring");
var http = require("http");
module.exports={
    translate : function (params,opt,callback) {
        var data = {
            q:params.query,
            from:params.from,
            to:params.to,
            appid:params.appid,
            salt:params.salt,
            sign:params.sign
        };
        var postData = querystring.stringify(data);
        console.log(postData);
        var options = {
            hostname:opt.hostname,
            port:opt.port,
            method:opt.method,
            path:opt.path,
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        console.log(options);
        var req = http.request(options,function (res) {
            var result = '';
            console.log('Status:',res.statusCode);
            res.setEncoding('utf-8');
            res.on("data",function (chunk) {
                result += chunk;
            });
            res.on("end",function () {
                callback(result);
            });
        });
        req.on("error",function (err) {
            console.error(err);
        });
        req.write(postData);
        req.end();
    }
};