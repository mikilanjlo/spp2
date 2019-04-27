module.exports = {
    getGamePage: (req, res) => {
        var sql = "SELECT game.id, game.name, company.name  AS CompanyName, price FROM game  join company on Company = company.id ORDER BY game.id"; 

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
                res.render("MainHtml", {

                    title: "Welcome to GameShop | View Games",
                    titleadd: "Add Game",
                    countValues: countResult,
                    values:array,
                    valuesNames: ["id","name","Company","price $"],
                    isEdit:true,
                    module: moduleMain

            });
        });
    },
    getCompanyPage: (req, res) => {
        var sql = "SELECT * FROM company ORDER BY id"; 

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
                values:array,//getarray(),
                valuesNames: ["id","name"],
                isEdit:false,
                module: moduleMain

                
            });
        });
    },
    getCommentsPage: (req, res) => {
        var sql = "SELECT comment.id , game.name as gamename, name FROM comment join game on Game = game.id ORDER BY id"; 

        // execute query
        db.query(sql, (err, result) => {
            if (err) {
                res.redirect('/Comments');
            }
            var array = [];
                for(var i = 0; i < result.length; i++){
                    array[i] = [];
                    array[i][0] = result[i].id;
                    array[i][1] =result[i].Game;
                    array[i][2] =result[i].name;
                }
            //}
            var countResult =result.length;
            res.render("MainHtml", {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add comment",
                countValues: countResult,
                values:array,//getarray(),
                valuesNames: ["id","game id","content"],
                isEdit:true,
                module: moduleMain

                
            });
            
        });
    },
};


