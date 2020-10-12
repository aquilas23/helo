const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');
        const foundUser = await db.check_user({email});
        if(foundUser[0]){
            return res.status(400).send('Email already in use');
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        const newUser = await db.register_user({email, hash});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');
        const foundUser = await db.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email not in use');
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect');
        }

        delete foundUser[0].password;

        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    createPost: (req, res) => {
        const {id, postImage} = req.body,
              db = req.app.get('db');
        
        db.post.create_post(id, postImage)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getUserPosts: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    },
    deletePost: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.post.delete_post(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    updateUsername: (req, res) => {
        const {id} = req.params,
              {username} = req.body
              db = req.app.get('db');
        
        db.users.update_username(username, id)
        .then(user => res.status(200).send(user))
        .catch(err => console.log(err));
    }
}