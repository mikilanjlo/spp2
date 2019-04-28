const fs = require('fs');

class Game{
    costructor(){}
    AddPage(req, res){
        res.json( {
            message: '',
            title: "Add Game",
            titleadd: "Add Game",
            valuesNames: ["name","price","company_id"],
            module: moduleChange
        });
    }

    Add(req, res){

        let message = '';
        let name = req.body.name;
        let price = req.body.price;
        let company_id= req.body.company_id;

        let sql = "SELECT * FROM game WHERE name = '" + name + "'";

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Game already exists';
                res.json({
                    message
                });
            } else {
                    let query = "INSERT INTO game (name,price,Company) VALUES ('" +
                    name + "', '" + price +"' , '" + company_id +"')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/Games');
                    });
                } 
        });
    }

    EditPage(req, res){
        let Id = req.params.id;
        let query = "SELECT * FROM game WHERE id = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json( {
                title: "Edit  Game",
                //game: result[0],
                message: '',
                titleadd: "Edit Game",
                valuesNames: ["price"],
                module: moduleChange
            });
        });
    }

    Edit(req, res){
        let Id = req.params.id;
        let price = req.body.price;

        let query = "UPDATE game SET price = '" + price + "' WHERE id = '" + Id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/Games');
        });
    }

    Delete(req, res){
        let Id = req.params.id;
        let deleteGameQuery = 'DELETE FROM game WHERE id = "' + Id + '"';

             db.query(deleteGameQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Games');
            });
            
       
    }

    GetWithId(req,res){
        let gameid = req.params.id;
        var sql = 'SELECT game.id, game.name, company.name  AS CompanyName, price FROM game  join company on Company = company.id where id = game.id "' + gameId + '"'; 

        // execute query
        db.query(sql, (err, result) => {
            if (err) {
                res.redirect('/Games');
            }
                var array = [];
                    for(var i = 0; i < result.length; i++){
                        array[i] = [];
                        array[i][0] = result[i].id;
                        array[i][1] =result[i].name;
                        array[i][2] =result[i].CompanyName//companyName; //GetCompany(result[i].id);
                        array[i][3] =result[i].price;
                    }
                //}
                var countResult =result.length;// result.count;
                //pageData = new PageData("Welcome to GameShop | View Games",["id","name"],"Add Company",2,array);
                res.json( {

                    title: "Welcome to GameShop | View Games",
                    titleadd: "Add Game",
                    countValues: countResult,
                    values:array,
                    valuesNames: ["id","name","Company","price $"],
                    isEdit:true,
                    module: moduleMain

            });
        });
    }

};
module.exports= Game;
