'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { resolve } = path;

const pkg = require('../package.json');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(resolve(__dirname, '..', 'public')));// Serve static files from ../public

app.use('/api', require('./api')); // Serve our api

var frontendRoutes = ['/', '/campuses', '/campuses/:id', '/campuses/add', '/students', '/students/:id', '/students/add'];
var indexPath = path.join(__dirname, '..', 'public', 'index.html');
frontendRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(indexPath);
  });
});

app.use((err, req, res, next) => {
  res.status(res.status || 500).send(err.message || 'Server Error!');
});

module.exports = app;

  // notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need) in the function body that follows.

if (module === require.main) {
  // Start listening only if we're the main module.

  /*
    https://nodejs.org/api/modules.html#modules_accessing_the_main_module
      - This (module === require.main) will be true if run via node foo.js, but false if run by require('./foo')
      - If you want to test this, log `require.main` and `module` in this file and also in `api.js`.
        * Note how `require.main` logs the same thing in both files, because it is always referencing the "main" import, where we starting running in Node
        * In 'start.js', note how `module` is the same as `require.main` because that is the file we start with in our 'package.json' -- `node server/start.js`
        * In 'api.js', note how `module` (this specific file - i.e. module) is different from `require.main` because this is NOT the file we started in and `require.main` is the file we started in
          ~ To help compare these objects, reference each of their `id` attributes
  */
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`);
      console.log(`Listening on ${JSON.stringify(server.address())}`);
    }
  );
}
