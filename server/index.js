require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());
const mainCtrl=require('./controller');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*24 }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.post('/api/register', mainCtrl.register);
app.post('/api/login', mainCtrl.login);
app.delete('/api/logout', mainCtrl.logout);

app.post('/api/post', mainCtrl.createPost);
app.get('/api/post/:id', mainCtrl.getUserPosts);
app.delete('/api/post/:id', mainCtrl.deletePost);
app.put('/api/post/:id', mainCtrl.updatePost);



app.listen(port, () => console.log(`Memeing on port ${port}`));