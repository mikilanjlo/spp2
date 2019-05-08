const fs = require('fs');

class Company{
    costructor(){}
    /*AddPage(req, res){
        res.json({
            message: '',
            title: "Add Company",
            titleadd: "Add Company",
            valuesNames: ["name"],
            module: moduleChange
        });
    }*/


    Add(company){
        let message = '';
        let name = company.name;

        let sql = "SELECT * FROM company WHERE name = '" + name + "'";

     
                    let query = "INSERT INTO company (name) VALUES ('" +
                    name + "')";
                    var result =db.query(query)
  
        
    }

    Delete(id){
        let companyId = id;
        let deleteCompanyQuery = 'DELETE FROM company WHERE id = "' + companyId + '"';

        var result =db.query(deleteCompanyQuery)
               
                //res.redirect('/');
            
            
       
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
            res.json( {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add Company",
                values:array,
                valuesNames: ["id","name"],

                
            });
        });
    }
};
//let company = new Company();
module.exports= Company;
