const { makeExecutableSchema } = require('graphql-tools');
const {getGamePage,getCompanyPage, getCommentsPage} = require('./index');
 const Company = require("./Company");
 const Game = require("./game");
 const Comment = require("./Comment");
 let m_company = new Company();
 let m_game =  new Game();
 let m_comment = new Comment();

const typeDefs = `
 input Games { 
    id: Int, 
    name: String, 
    price: Int, 
    CompanyName: String
  }
  type Query { 
    games: [Game],
    comments: [Comment],  
    company: [Company],  
  }
  type Mutation {
    editGame(id:String , price: String): Game,
    editComment(id:String, name:String): Comment,
    createGame(name: String, price: String, CompanyName: String): Game,
    createCompany(name: String): Company,
    createComment(name: String,  gamename: String): Comment,
    deleteGame(id: Int): Game,
    deleteComment(id: Int): Comment
  }
  type Game { 
    id: Int, 
    name: String, 
     
    CompanyName: String,
    price: Int,
  }
  type Comment { 
    id: Int, 
    name: String, 
    gamename: String,
  }
  type Company { 
    id: Int, 
    name: String, 
  }
`;

const resolvers = {
  Query: { 
    games: () => getGamePage(),
    comments: () => getCommentsPage(),
    company: () => getCompanyPage(),
   },
  Mutation: {
    editGame: (root,args,context,info) => m_game.Edit(args),
    editComment: (root,args,context,info) => m_comment.Edit(args),
    createGame: (root,args,context,info) =>  m_game.Add(args),
    createCompany: (root,args,context,info) =>  m_company.Add(args),
    createComment: (root,args,context,info) => m_comment.Add(args),
    deleteGame: (root,args,context,info) => {
      let AuthorId = args.Author;
      console.log("AuthorID++:"+ args.Author);
      console.log("Args++:"+ args);
      let deleteTeamQuery = 'DELETE FROM authors WHERE idAuthors = "' + AuthorId + '"';

      let result = db.query(deleteTeamQuery);
      return result;
      },
    deleteComment: (root,args,context,info) => {
      let ranobeId = args.RanobeID;
      console.log("This is" + ranobeId);
      let deleteUserQuery = 'DELETE FROM ranobes WHERE RanobeID = "' + ranobeId + '"';

      let result = db.query(deleteUserQuery);
      return result
    }
  } 
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});