const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const cors = require('cors');
const formidable = require('express-formidable');

// routers
const userRouter = require('./routes/user');

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    formidable({
      encoding: 'utf-8',
      multiples: true,
      keepExtensions: true,
    })(req, res, next);
  } else {
    return next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../src')));

// route handlers
app.use('/user', userRouter);

// catch-all error handler
app.get('*', (req, res) => {
  return res.status(404).send("This is not the page you're looking for...");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Server listening on port 8080');
});

module.exports = app;
