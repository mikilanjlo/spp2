const fs = require('fs');

class User{
    costructor(){}


    SignInPage(req, res){
        res.render('MainHtml.ejs', {
            message: '',
            title: "Sign In",
            titleadd: "",
            module: moduleSign
        });
    }

    SignIn(req, res){

        let message = '';
        let login = req.body.login;
        let password = req.body.password;
        if((login !== "miki") || (password !== "098765")){
            message = 'No validate login or password';
                res.render('MainHtml.ejs', {
                    message,
                    title: "Sign In",
                    titleadd: "",
                    module: moduleSign
                });
        }else{
            userLog = login;
            res.redirect('/');    
        }

        
    }

   

    SignOut(req, res){
        userLog = null;   
        res.redirect('/');    
    }

};
module.exports= User;
