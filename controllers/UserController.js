/**
 * Author : Suresh Kumar 
 * Dated : 07 Aug-2022
 * Description: Controller handling all the  functionality related to Users
 */
 const ModelUsers        = require('../models/ModelUsers');
 const { body, validationResult } = require('express-validator');

 
 class UsersController {
     constructor() {
         this.model              = new ModelUsers();
        }

     async register(req,res,next){
         try{
            res.render('register')
         
         }catch(ex){
             console.log("Exception",ex)
             res.redirect('/404');
             
         }
    }
    /**
     * Function Insert the data in user table
     * @param {name, email,password} req 
     * @param {*} res 
     * @param {*} next 
     */
     async postRegister(req,res,next){
        try{
            let errors = validationResult(req);
            errors =errors.array();
            if(errors.length>0){
                req.flash('error', errors);
                res.render('register', { 
                    title: 'Registration Page',
                    name: req.body.name,
                    email: req.body.email,
                    password: ''
                })
                return;
            }
            let registerObject = {name : req.body.name , email : req.body.email, password: req.body.password};
            let response = await this.model.Create(registerObject);
            req.flash('success', 'You have successfully signup!');
            res.redirect('login');
        }catch(ex){
            console.log("Exception",ex)
            res.redirect('/404');
        }
    }
    
    async login(req,res,next){
        res.render('login');
    }

    /**
     *  Description: Hanlde the  authentication for login  and post login
     * @param {*} res 
     * @param {*} req  (Email and password)
     * @param {*} next 
     */
    async postLogin(req,res,next){
        try{
            let errors = validationResult(req);
            errors =errors.array();
            if(errors.length>0){
                req.flash('error', errors);
                res.render('login', { 
                    title: 'Login Page',
                    
                })
                return;
            }
            let getLogged = await this.model.Get({ email:req.body.email , password: req.body.password });
            if(getLogged){
                req.session.loggedin = true;
                req.session.name = getLogged.name;
                req.session.save();
                res.locals.loggedIn = true;
			    res.locals.fullName =getLogged.name;
                res.redirect('../films');
            }
          
            req.flash('errors', 'Please correct enter email and Password!')
            res.redirect('login')

        }catch(ex){
            console.log("Exception",ex);
            res.redirect('/404');
        }
    }
     
 }
 module.exports = UsersController;
 