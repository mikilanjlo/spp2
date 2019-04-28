var Redux = require('redux');
var rootReducer =require('../reducers/index');

var store = Redux.createStore(rootReducer);

module.exports = store;