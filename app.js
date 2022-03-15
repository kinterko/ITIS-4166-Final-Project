// Kory Kinter

// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cRoutes = require('./routes/cRoutes');
const pRoutes = require('./routes/pRoutes');
const uRoutes = require('./routes/uRoutes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// create application
const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch(er => console.log(err.message));

app.use(
    session({
        secret: "aabbccddeeffgghhiijjkkll",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/project' }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.name = req.session.name || 'Guest';
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


// routes
app.use('/', pRoutes);
app.use('/connections', cRoutes);
app.use('/users', uRoutes);

// error routes
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});