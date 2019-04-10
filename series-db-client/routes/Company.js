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
};
//let company = new Company();
module.exports= Company;
