// handling connection to database (instead of in server.js)

const mongoose = require('mongoose');

// mongoose.connection object
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

// mongoose.connection object exported
module.exports = mongoose.connection;