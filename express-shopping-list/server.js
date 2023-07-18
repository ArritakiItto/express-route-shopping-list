const app = require('./app');

app.listen(3000, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is listening on port 3000');
});

