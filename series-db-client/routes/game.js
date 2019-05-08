const fs = require('fs');

class Game{
    costructor(){}


    Add(game){

        let message = '';
        let name = game.name;
        let price = game.price;
        let company_id= game.company_id;

        let sql = "SELECT * FROM game WHERE name = '" + name + "'";


                    let query = "INSERT INTO game (name,price,Company) VALUES ('" +
                    name + "', '" + price +"' , '" + company_id +"')";
                    var result =db.query(query)
                       
                      

        
    }



    Edit(game){
        let Id = game.id;
        let price = game.price;

        let query = "UPDATE game SET price = '" + price + "' WHERE id = '" + Id + "'";
        var result =db.query(query)
            if (err) {
                return res.status(500).send(err);
            }
        
    }

    Delete(id){
        let Id = id;
        let deleteGameQuery = 'DELETE FROM game WHERE id = "' + Id + '"';

            var result = db.query(deleteGameQuery)
                if (err) {
                    return res.status(500).send(err);
                }
            
            
       
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
                   

            });
        });
    }

};
module.exports= Game;
