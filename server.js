const Express = require('express');
const app = new Express ();
const flash = require('express-flash');
const http = require('http')
const server = new http.Server(app);
const io = require('socket.io')(server);

/* Auth0 */
const session = require('express-session');
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const sess = {
  secret: 'chatApp',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

const strategy = new Auth0Strategy({
  domain: process.env.CHAT_CLIENT_DOMAIN,
  clientID: process.env.CHAT_CLIENT_ID,
  clientSecret: process.env.CHAT_CLIENT_SECRET,
  callbackURL: '/callback',
  state: true
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

app.set('views', './ui');
app.set('view engine', 'ejs');

/* middleware */
app.use('/public', Express.static('ui'));
app.use('/scripts', Express.static('lib'));
// TODO auth0 calls the callback on HTTP so the secure cookie cannot be retrieved.
// if (app.get('env') === 'production') sess.cookie.secure = true;

app.use(session(sess));
passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());
/* routes */
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) throw new Error('user null');
    res.redirect('/');
  }
);

app.get('/login', passport.authenticate('auth0', { scope: 'openid profile' }), function (req, res) {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
});

app.get('/', ensureLoggedIn('/login'), function(req, res) {
  res.render('index', {
    displayName: req.user.displayName,
    picture: req.user.picture,
  });
});

/* socket IO handlers */
const onlineUsers = {};
io.on('connection', function(socket) {

  socket.on('chatMessage', function(value) {
    socket.broadcast.emit('echoChatMessage', value);
  });

  socket.on('newClient', (user) => {
    onlineUsers[socket.id] = user;
    socket.broadcast.emit('addClient', user);
    socket.emit('onlineList', onlineUsers);
  });

  socket.on('disconnect', function() {
    if(onlineUsers[socket.id]) {
      const clientId = socket.id;
      const userName = onlineUsers[socket.id];
      delete onlineUsers[socket.id];
      socket.broadcast.emit('clientBye', { clientId: clientId, name: userName });
    }
  });
});

server.listen(process.env.PORT || 3000, function() {
  console.log('listening on *:', process.env.PORT || 3000);
});
