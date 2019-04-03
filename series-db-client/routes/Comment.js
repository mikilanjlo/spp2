const fs = require('fs');

class Comment{
    costructor(){}
    AddPage(req, res){
        res.render('add.ejs', {
            message: '',
            title: "Add Comment",
            titleadd: "Add Comment",
            valuesNames: ["content","game_id"]
        });
    }

    Add(req, res){

        let message = '';
        let name = req.body.content;
        let game_id= req.body.game_id;

        let sql = "SELECT * FROM comment WHERE name = '" + name + "'";

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

                    let query = "INSERT INTO comment (name,company) VALUES ('" +
                    name + "' , '" + game_id +"')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/Comments');
                    });
                
        });
    }

    EditPage(req, res){
        let Id = req.params.id;
        let query = "SELECT * FROM comment WHERE id = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit.ejs', {
                title: "Edit  Comment",
                //game: result[0],
                message: '',
                titleadd: "Edit Comment",
                valuesNames: ["content"]
            });
        });
    }

    Edit(req, res){
        let Id = req.params.id;
        let name = req.body.content;

        let query = "UPDATE comment SET name = '" + name + "' WHERE id = '" + Id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/Comments');
        });
    }

    Delete(req, res){
        let Id = req.params.id;
        let deleteCommentQuery = 'DELETE FROM comment WHERE id = "' + Id + '"';

             db.query(deleteCommentQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Comments');
            });
            
       
    }

};
module.exports= Comment;
