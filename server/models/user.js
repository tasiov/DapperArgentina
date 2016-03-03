"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var User = function() {
 this._user = {};
};

User.prototype.getUserAsync = function(userHandle) {
  if ( this._user.login ) {
    return new Promise((resolve) => resolve(this._user));
  } else {
  return db.raw(`SELECT * FROM users WHERE login='${userHandle}'`)
           .then((results) => {
              this._user = results[0];
              return this._user;
           });
  }

}

User.prototype.updateUserAsync = function(userObj) {
  let userQuery = Object.keys(userObj).reduce((prev, key, index, coll) => {
    prev = prev + key + '=' + userObj(key);
    return index !== (coll.length -1) ? prev + ',' : prev;
  }, "");

  return db.raw(`UPDATE users SET ${userQuery} WHERE login='${userObj.login}'`)
  .then( () => {
    return this.getUserAsync(userObj.login);
  });
}

User.prototype.makeNewUserAsync = function(user) {
  if ( this._user.id ) {
    return new Promise((resolve) => resolve("You are already signed in."));
  } else {
    if(user.id && user.login) {

      // Function to map user properties to usable SQL strings
      let userKeys = [];
      let userVals = [];
       _.each(user,(val,key) => {
        userKeys.push( key + '');
        userVals.push( '"' + val + '"');
       })
      return db.raw(`INSERT INTO users ( ${userKeys.join()} )
      VALUES (${userVals.join()})`)
        .then((results) => {
          this._user = results[0];
          return this._user;
        });
    }
  }
}


module.exports = User;
