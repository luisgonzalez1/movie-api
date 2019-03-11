import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import { movieRouter } from './routers/movie-router';
import { userRouter } from './routers/user-router';
const AWS = require('aws-sdk');

// Set region for AWS SDKs
AWS.config.region = process.env.REGION;
const app = express();

const port = 8081;
app.set('port', port);


const sess = {
  secret: 'keyboard cat',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};

// set up express to attach sessions
app.use(session(sess));

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'static'))
);

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});



// use the body parser to convert request json
app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
  (process.env.MOVIE_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
    : resp.header('Access-Control-Allow-Origin', 'http://localhost:9001');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.set('static', __dirname + '/views')

app.get('/sign-in', function (req, res) {
  res.render('index', {
    title: 'this is the sign in'
    })
    res.status(200).end();
})

// Enpoint just to test
app.get('/', (req, res) => {
  res.json({content: 'hello world'});
});

/*******************************************************************************
 * ROUTERS
 *******************************************************************************/
app.use('/movies', movieRouter);
app.use('/users', userRouter);



// start up the app
const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});

module.exports = server;
