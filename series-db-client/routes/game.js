const fs = require('fs');

class Game{
    costructor(){}
    AddPage(req, res){
        res.render('MainHtml.ejs', {
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
                res.render('MainHtml.ejs', {
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
            res.render('MainHtml.ejs', {
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

};
module.exports= Game;
