// Kory Kinter

const model = require('../models/user');
const Connection = require('../models/connection');
const rsvpModel = require('../models/rsvp');

exports.signUp = (req, res)=> {
    res.render('./user/new');
};

exports.createUser = (req, res, next)=>{
    let user = new model(req.body);
    user.save()
    .then(()=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email addres has been used');
            return res.redirect('/users/new');
        }
        next(err)
    });
};

exports.login = (req, res)=> {
    res.render('./user/login');
};

exports.getUser = (req, res, next)=>{
    
    let email = req.body.email;
    let password = req.body.password;

    
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.session.name = user.firstName + ' ' + user.lastName;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));

};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Connection.find({host: id}), rsvpModel.find({user:id}).populate('connection connection.ame')])
    .then(results=>{
        const [user, connections, rsvps] = results;
        console.log(rsvps);
        res.render('./user/profile', {user, connections, rsvps});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=> {
    req.session.destroy(err=>{
        if(err){
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};