const fs = require('fs');

class Comment{
    costructor(){}
    /*AddPage(req, res){
        res.json( {
            message: '',
            title: "Add Comment",
            titleadd: "Add Comment",
            valuesNames: ["content","game_id"],
            module: moduleChange
        });
    }*/

    Add(comment){

        let message = '';
        let name = comment.name;
        let game_id= comment.gamename;

      

                    let query = "INSERT INTO comment (name,Game) VALUES ('" +
                    name + "' , '" + game_id +"')";
                    let result =db.query(query)
                        
                        //res.redirect('/Comments');
                    
                
    }

    /*EditPage(req, res){
        let Id = req.params.id;
        let query = "SELECT * FROM comment WHERE id = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({
                title: "Edit  Comment",
                //game: result[0],
                message: '',
                titleadd: "Edit Comment",
                valuesNames: ["content"],
                module: moduleChange
            });
        });
    }*/

    Edit(comment){
        let Id = comment.id;
        let name = comment.name;

        let query = "UPDATE comment SET name = '" + name + "' WHERE id = '" + Id + "'";
        let result=db.query(query)
           
            //res.redirect('/Comments');
        
    }

    Delete(id){
        let Id = id;
        let deleteCommentQuery = 'DELETE FROM comment WHERE id = "' + Id + '"';

             var result =db.query(deleteCommentQuery);
                
                //res.redirect('/Comments');
            
            
       
    }

    

};
module.exports= Comment;
