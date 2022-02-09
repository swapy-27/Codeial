//using express framework 
const express = require('express');
const app = express();

//defining port where application gonna run
const port = 8000;

//helps in parsing cookies from browser
const cookieParser = require('cookie-parser');

//using ejs --> embedded javascript 
const expressLayouts = require('express-ejs-layouts');



//creating login  session and authentication using passport js
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//setting up mongods database using mongoose
const db = require('./config/mongoose');
const   MongoStore =   require('connect-mongodb-session')(session);
//css styling using scss
const saasMiddleware = require ('node-sass-middleware');

//flash for notifications
const  flash = require('connect-flash');
const customMware = require('./config/middleware')


app.use(saasMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle:'extended',
        prefix:'/css'

    }
))

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//making files globally  available for server to acess
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'))



//extract style and script from sub pages into layout--> concept of layout and partials
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)



app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used too store the session cookie in the database
app.use(session({
    name: 'codial',
    //TODO change the secret before dep;oyment in production mode

    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  new MongoStore(
        {
        mongooseConnection:db,
        autoRemove:'disabled'
        
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express Router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on : ${port}`);
})