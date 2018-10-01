const express = require('express')
const edge = require("edge.js");

const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");




const app = new express()

const mongoStore = connectMongo(expressSession);
 
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(connectFlash());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(expressEdge);

app.use(fileUpload());

const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')



app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePostController);
app.get("/auth/register",redirectIfAuthenticated,  createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login',redirectIfAuthenticated, loginUserController);
app.get("/auth/logout",  logoutController);






app.listen(3000, () => {
    console.log('App is listening on Port 3000')
})