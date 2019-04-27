const fs = require('fs');

class Company{
    costructor(){}
    AddPage(req, res){
        res.render("MainHtml", {
            message: '',
            title: "Add Company",
            titleadd: "Add Company",
            valuesNames: ["name"],
            module: moduleChange
        });
    }


    Add(req, res){
        let message = '';
        let name = req.body.name;

        let sql = "SELECT * FROM company WHERE name = '" + name + "'";

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Company already exists';
                res.render('MainHtml.ejs', {
                    message
                });
            } else {
                    let query = "INSERT INTO company (name) VALUES ('" +
                    name + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                } 
        });
    }

    Delete(req, res){
        let companyId = req.params.id;
        let deleteCompanyQuery = 'DELETE FROM company WHERE id = "' + companyId + '"';

             db.query(deleteCompanyQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
            
       
    }
    GetWithId(req, res){
        let companyId = req.params.id;
        var sql = 'SELECT * FROM company WHERE id= "' + companyId + '"'; 

        // execute query
        db.query(sql, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            //function getarray(){
            var array = [];
                for(var i = 0; i < result.length; i++){
                    array[i] = [];
                    array[i][0] = result[i].id;
                    array[i][1] =result[i].name;
                }
            //}
            var countResult =result.length;
            res.render("MainHtml", {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add Company",
                countValues: countResult,
                values:array,
                valuesNames: ["id","name"],
                isEdit:false,
                module: moduleMain

                
            });
        });
    }
};
//let company = new Company();
module.exports= Company;
