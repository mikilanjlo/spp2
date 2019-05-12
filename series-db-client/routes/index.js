module.exports = {
    getGamePage: () => {
        var sql = "SELECT game.id, game.name, company.name  AS CompanyName, price FROM game  join company on Company = company.id ORDER BY game.id"; 

        // execute query
       var result = db.query(sql);
        return result;
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
                var games = {

                    title: "Welcome to GameShop | View Games",
                    titleadd: "Add Game",
                    countValues: countResult,
                    values:array,
                    valuesNames: ["id","name","Company","price $"],
                    isEdit:true,
                    
                
                };
    return games;
    },
    getCompanyPage: function() {
        var sql = "SELECT * FROM company ORDER BY id"; 
        
        // execute query
        var result =db.query(sql);
        return result;
            //function getarray(){
            var array = [];
                for(var i = 0; i < result.length; i++){
                    array[i] = [];
                    array[i][0] = result[i].id;
                    array[i][1] =result[i].name;
                }
            //}
            var countResult =result.length;
          var  company = {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add Company",
                countValues: countResult,
                values:array,//getarray(),
                valuesNames: ["id","name"],
                isEdit:false,
               

                
            };
  
            
        
        return company;
    },
    getCommentsPage: () => {
        var sql = "SELECT comment.id , game.name as gamename, comment.name FROM comment join game on Game = game.id ORDER BY comment.id"; 

        // execute query
        var result= db.query(sql)
        return result;
            var array = [];
                for(var i = 0; i < result.length; i++){
                    array[i] = [];
                    array[i][0] = result[i].id;
                    array[i][1] =result[i].gamename;
                    array[i][2] =result[i].name;
                }
            //}
            var countResult =result.length;
            var comments= {

                title: "Welcome to GameShop | View Games",
                titleadd: "Add comment",
                countValues: countResult,
                values:array,//getarray(),
                valuesNames: ["id","game id","content"],
                isEdit:true,
               

                
            };
            return comments;
        
    },
};


