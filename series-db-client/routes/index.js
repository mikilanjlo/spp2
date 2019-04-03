module.exports = {
    getGamePage: (req, res) => {
        var sql = "SELECT * FROM game ORDER BY id"; 

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
                        /*var companyName = "lala";
                         let companyQuery = "SELECT * FROM  company WHERE id = '" + result[i].Company + "'";
                         console.log("tyis " +companyQuery);
                        db.query(companyQuery, (err2, resul) => {
                            if (err2) {
                                console.log("err");
                                return res.status(500).send(err2);
                            }
                            console.log("norm "+ resul[i].name);
                            companyName = resul[i].name;
                        });*/
                        array[i][2] =result[i].Company//companyName; //GetCompany(result[i].id);
                        array[i][3] =result[i].price;
                    }
                //}
                var countResult =result.length;// result.count;
                //pageData = new PageData("Welcome to GameShop | View Games",["id","name"],"Add Company",2,array);
                res.render("index", {

                    title: "Welcome to GameShop | View Games",
                    titleadd: "Add Game",
                    countValues: countResult,
                    values:array,
                    valuesNames: ["id","name","Company Id","price $"],
                    isEdit:true

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
            res.render("index", {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add Company",
                countValues: countResult,
                values:array,//getarray(),
                valuesNames: ["id","name"],
                isEdit:false

                
            });
        });
    },
    getCommentsPage: (req, res) => {
        var sql = "SELECT * FROM comment ORDER BY id"; 

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
            res.render("index", {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add comment",
                countValues: countResult,
                values:array,//getarray(),
                valuesNames: ["id","game id","content"],
                isEdit:true

                
            });
            
        });
    },
};


