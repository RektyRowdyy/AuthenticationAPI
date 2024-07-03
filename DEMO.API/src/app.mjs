import express from 'express';
import passport from 'passport'
import session from 'express-session';
import cors from 'cors';
import { Users } from './models/users.models.mjs';
import { hashPassword } from './utils/encrypt.mjs';
import { isUserAllowed } from './middlewares/userAllowed.middleware.mjs';
import './strategies/local-strategy.mjs'


const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'rekty',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 1 // 1 minute
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//routes

//CREATE A USER
app.post('/api/createUser', async (req, res) => {

    let {username, password, allowedTo } = req.body;

    password = hashPassword(password);

    const newUser = new Users({username, password, allowedTo});
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
    
})

//Authenticate
app.post('/api/auth', passport.authenticate("local"), (req, res) => {
    return res.status(200).send({msg: "User Authenticated!"});
})

app.get('/api/authStatus', (req, res) => {
    return req.user ? res.status(200).send({msg: "User is Authenticated!", user: req.user, session: req.session}) : res.status(401).send({msg: "NOT AUTHORIZED!"})
})

//Logout
app.get('/api/logout', (req, res) => {
    if(!req.user) return res.status(401).send({msg: "NOT AUTHORIZED"});

    req.logout((err) => {
        if(err) return res.sendStatus(400);
        return res.status(200).send({msg: "You are Logged Out!"});
    })
})

//VISIT 1st Website
app.get('/api/UI-1', isUserAllowed, (req, res) => {
    res.status(200).send({msg: "You entered Website 1"});
})

//VISIT 2st Website
app.get('/api/UI-2', isUserAllowed, (req, res) => {
    res.status(200).send({msg: "You entered Website 2"});
})

export { app };