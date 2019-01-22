const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, static, etc)
server.use(middlewares);
// Make sure JSON bodies are parsed correctly
server.use(bodyParser.json());

const SECRET_KEY = '2mc';
const expiresIn = '1h';
let authToken;
// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function currentUser() {
  return userdb.users[0];
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Invalid username and password';
    res.status(status).json({status, message});
    return;
  }
  authToken = createToken({email, password});
  res.status(200).json({authToken});
});

server.post('/auth/logout', (req, res) => {
  const {logout} = req.body;
  authToken = null;
  res.status(200).json({logout});
});

server.get('/auth/user', (req, res) => {
  // draft
  const token = req.headers;
  if (token) {
    const user = currentUser();
    res.status(200).json(user);
  }
});

// Protect other routes
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if ((token === 'undefined') || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({status, message});
    return;
  }
  try {
    verifyToken(token);
    next()
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({status, message})
  }
});

// API routes
server.use(router);

// Start server
server.listen(3000, () => {
  console.log('JSON Server is running');
});