import express from 'express';

export const userRouter = express.Router();

/**
 * This route expects an object with a usename and password. If the username and password is recognized it will set a role attribute on
 * the current session so that the role can be viewed upon future requests.
 */
userRouter.post('/login', (req, resp, next) => {
  const user = req.body && req.body;

  // should probably send a call to the db to get the actual user object to determine role
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    req.session.role = 'admin';
    resp.json({
      username: 'admin',
      role: 'admin'
    });
  } else if (req.body.username === 'blake' && req.body.password === 'pass') {
    req.session.role = 'employee';
    resp.json({
      username: 'blake',
      role: 'employee'
    });
  } else {
    resp.sendStatus(401);
  }
});

/**
 * This will reset the session so that all session data is removed and a new session id will be created
 */
userRouter.delete('/logout', (req, resp, next) => {
  req.session.regenerate(err => {
    if (err) {
      resp.sendStatus(500);
    } else {
      resp.end();
    }
  });
});
