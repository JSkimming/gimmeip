var http = require('http');
var port = process.env.PORT || 8080;

http.createServer(function(request, response) {

    // Try and get the IP address by various means.
    // http://stackoverflow.com/a/19524949
    var ip = request.headers['x-forwarded-for']
        || request.connection.remoteAddress
        || request.socket.remoteAddress
        || request.connection.socket.remoteAddress;

    // When testing locally, it always ends up as '::1'
    if (ip == '::1') {
        ip = 'localhost';
    }

    // Remove the port if there is one, e.g. 123.456.789.012:1234
    var index = ip.indexOf(':');
    if (index !== -1) {
        ip = ip.substring(0, index);
    }

    request.on('data', function() {
    }).on('end', function() {
        response.end(ip);
    });
}).listen(port);
